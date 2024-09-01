import Message from './Message'
import useGetMessages from '../../hooks/useGetMessages'
import MessageSkeleton from '../skeletons/MessageSkeleton';
import { useEffect, useRef } from 'react';
import useListenMessages from '../../hooks/useListenMessages';

const Messages = () => {
  const { messages, loading } = useGetMessages();

  //listen any incoming messages from socket
  useListenMessages();

  // console.log("MESSAGES: ", messages);

  //when we sent msg it should scroll to bottom means to our last message 
  const lastMessageRef = useRef();
  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" })

    //we can also write in setTimeout if it doesn't scroll to bottom immediately
    // setTimeout(() => {
    //   lastMessageRef.current?.scrollIntoView({ behavior: "smooth" })
    // }, 10);

  }, [messages])


  // const validMessage = Array.isArray(messages) ? messages: [];
  // console.log("is Array : ",validMessage);
  // console.log("is array", messages);


  return (
    <div className='px-4 flex-1 overflow-auto'>
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          //when we sent msg it should scroll⬇️ to bottom means to our last message 
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}

      {/* ...Array(3) similar to three for loop */}
      {/* Show skeleton loaders while messages are loading */}
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {/* Show a prompt if there are no messages */}
      {!loading && messages.length === 0 && (
        <p className='text-center'>Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages



// STARTER CODE SNIPPET

// import React from 'react'
// import Message from './Message'
// const message = () => {
//   return (
//     <div className='px-4 flex-1 overflow-auto'>
//     <Message />
//     <Message/>
//     <Message/>
//     <Message/>
//     <Message/>
//     <Message/>
//     <Message/>
//     <Message/>
//     <Message/>
//     <Message/>
//     <Message/>
//     <Message/>
//     </div>
//   )
// }

// export default message