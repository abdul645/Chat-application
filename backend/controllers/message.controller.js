import conversationModel from "../models/conversation.model.js"
import messageModel from "../models/message.model.js";

// The function is responsible for handling the sending of messages between users. 
export const sendMessage = async (req, res) => {
    // console.log("message sent", req.params.id);

    try {
        //we are getting message from user as an input
        const { message } = req.body; //The function retrieves the message from the request body (req.body), 
        //which contains the text of the message sent by the user.
        const { id: receiverId } = req.params;//representing the ID of the user who will receive the message.
        const senderId = req.user._id;//The senderId is taken from the req.user object, which is typically populated by 
        //an authentication middleware (like the protectRoute middleware we discussed earlier).

        //Finding or Creating a Conversation
        //The function checks if a conversation already exists between the senderId and receiverId.
        //It uses the $all operator to find a conversation document where both the sender and receiver are participants.
        let conversation = await conversationModel.findOne({
            participants: { $all: [senderId, receiverId] },
        })

        //if conversation does not exist then we create one
        //If no conversation exists, a new conversation document is created with the senderId and receiverId as participants.
        if (!conversation) {
            conversation = await conversationModel.create({
                participants: [senderId, receiverId],
            })
        }

        //create a new message
        //A new message document is created with the senderId, receiverId, and the actual message content.
        const newMessage = new messageModel({
            senderId,
            receiverId,
            message,
        })
        // Linking Message to Conversation
        // if there is new message (means message successfully created)
        //If the message is successfully created, its ID (newMessage._id) is added to the messages array of the 
        //corresponding conversation. This effectively links the new message to the conversation.
        if (newMessage) {
            conversation.messages.push(newMessage._id)
        }

        // SOCKET IO FUNCTIONALITY WILL GO HERE

        // save to database
        // await conversation.save();
        // await newMessage.save();

        // optimised way
        //this will run in parallel
        //Instead of saving the conversation and message separately (which would take more time as they would run sequentially), 
        //the function uses Promise.all() to save both in parallel. This optimization improves performance
        // by reducing the time required for both operations.
        await Promise.all([conversation.save(), newMessage.save()])

        //return the message
        //Returning the Response
        //After saving, the function responds with a 201 Created status and the newly created message object in JSON format.
        res.status(201).json(newMessage);


    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ error: "Internl server error" })
    }

}

//This code defines a controller function called getMessages that retrieves all messages in a conversation
// between two users in a chat application.
export const getMessages = async (req, res) => {
    try {
        // id:userToChatId => this is renaming from "id" to "userToChatId"
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;//The senderId is extracted from the req.user object, which contains the 
        //authenticated user's information

        //The function searches for a conversation that includes both the senderId and userToChatId as participants. 
        //It uses the $all operator to ensure that both participants are part of the conversation.
        const conversation = await conversationModel.findOne({
            participants: { $all: [senderId, userToChatId] }
        }).populate("messages");// not reference but actual message
        //⬆️ The populate("messages") method is used to retrieve the actual message documents instead of just their references (IDs).
        // This means the conversation object will include the full details of each message.

        //Handling the Case Where No Conversation Exists
        //If no conversation is found, the function responds with a 200 OK status and an empty array []. 
        //This indicates that there is no existing conversation between the two users.
        if(!conversation) return res.status(200).json([]);
       
        //If a conversation is found, the messages array from the conversation is extracted and sent back in 
        //the response with a 200 OK status. The array contains all the messages exchanged between the two users.
        const messages = conversation.messages;
        res.status(200).json(messages);
        
    } catch (error) {
        console.log("Error in getMessage controller ", error.message);
        res.status(500).json({ error: "Internal Server error" })

    }
}