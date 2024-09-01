//This code sets up a simple server using Express and Socket.IO to manage real-time, 
//bidirectional communication between the server and connected clients.


import { Server } from "socket.io";//Imports the Socket.IO server class to manage WebSocket connections.
import http from "http";// Imports the HTTP module to create a server.
import express from "express";//Imports Express, a web framework for Node.js, to manage the app's HTTP routes and middleware.

const app = express();// Initializes an Express application
const server = http.createServer(app);// Creates an HTTP server using the Express app. 
                                      // This server will later be used to handle WebSocket connections.

// Creates a new Socket.IO server instance attached to the HTTP server. The cors 
// configuration allows cross-origin requests from http://localhost:3000 using POST and GET methods.
const io = new Server(server, {
    cors:{
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
});


// for real time messaging
export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}


// Initializes an empty object to map user IDs to their corresponding socket IDs. 
//This is useful for tracking which users are currently connected and to manage targeted messaging.
const userSocketMap = {};  //{userId: socketId}

// Sets up an event listener for the connection event. This event triggers 
// whenever a new client connects to the server.
io.on('connection', (socket)=> {
    console.log("A user connected: ", socket.id);

    // Retrieves the userId from the client's connection query parameters. This is typically 
    // passed by the client during the connection handshake.
    const userId = socket.handshake.query.userId;

    //Maps the user's ID to their socket ID if the userId is defined.
    if(userId != "undefined") userSocketMap[userId] = socket.id;


    //send an event to all connected client
    //io.emit() is used to send event to all the connected clients.
    //Emits the getOnlineUsers event to all connected clients, sending an array of all connected user IDs 
    //(keys of userSocketMap). This can be used to show a list of online users to the clients.
    io.emit("getOnlineUsers", Object.keys(userSocketMap));


    //socket.on() is used to listen to the events. can be used both on client and server side
    socket.on("disconnect", ()=>{
        console.log("A user disconnected : ", socket.id);

        delete userSocketMap[userId]; // when user disconnected delete that user from connected use Array

        io.emit("getOnlineUsers", Object.keys(userSocketMap)); // again emit the event to all the connected client
        
    })
})


export {app ,io, server}