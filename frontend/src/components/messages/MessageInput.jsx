import React, { useState } from 'react'
import { FiSend } from "react-icons/fi";
import useSendMessage from '../../hooks/useSendMessage';


const MessageInput = () => {
    const [message, setMessage] = useState("");
    const {loading, sendMessage} = useSendMessage(); //hooks

    const handleSubmit =  async (e) => {
        e.preventDefault();

        //if input field is null, there is no msg then dont send
        if(!message) return;
        await sendMessage(message)
        // if msg successfully send then set input field null again
        setMessage("");
    };
    
    return (
        <form className='px-4 my-3' onSubmit={handleSubmit}>
            <div className='w-full relative'>
                <input type="text"
                    className='border text-sm rounded-lg block w-full p-2.5 bg-gray-500 border-gray-600 text-white'
                    placeholder='Send a message'
                    value={message}
                    onChange={(e)=> setMessage(e.target.value)}
                    />
                <button 
                    type='submit'
                    className='absolute inset-y-0 end-0 flex items-center pe-3'>
                    {loading ? <div className='loading loading-spinner'/>: <FiSend />}
                </button>
            </div>
        </form>
    )
}

export default MessageInput




// STARTER CODE SNIPPET

// import React from 'react'
// import BeSend from "react-icons/bs";
// const MessageInput = () => {
//   return (
//    <form  className='px-4 my-3'>
//     <div className='w-full'>
//         <input type="text"
//         className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white'
//         placeholder='Send a message'
//         />
//         <button type='submit'
//         className='absolute inset-y-0 end-0 flex items-center pe-3'>
//         <BeSend/>
//         </button>

//     </div>
//    </form>
//   )
// }

// export default MessageInput