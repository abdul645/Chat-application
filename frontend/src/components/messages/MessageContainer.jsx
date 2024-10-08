import React, { useEffect } from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'
import { TiMessages } from "react-icons/ti";
import useConversation from '../../zustand/useConversation';
import useAuthContext from '../../context/AuthContext';


const MessageContainer = () => {
  const {selectedConversation, setSelectedConversation} = useConversation();

  useEffect(() => {
    //cleanup function (unmounts)
    return() => setSelectedConversation(null);

  }, [setSelectedConversation]);


  return (
    <div className='md:min-w-[450px] flex flex-col'>
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
           <div className='flex items-center bg-sky-500 px-4 py-2 mb-2'>
            <div className=' w-9'>
              <img src={selectedConversation.profilePic} className='w-6 h-6' />
            </div>
            <div >
              <span className='text-white font-bold'> {selectedConversation.fullName}</span>
            </div>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>

  )
}

export default MessageContainer

const NoChatSelected = () => {

  const { authUser } = useAuthContext();
  return (
    <div className='flex items-center justify-center w-full h-full'>
      <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col
      items-center gap-2'>
        <p>Welcome 👋 {authUser.fullName}</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className='text-3xl md:text-6xl text-center' />
      </div>
    </div>
  )
}




//STARTER CODE SNIPPET 
// import React from 'react'
// import Messages from './Messages'
// import MessageInput from './MessageInput'
// import { TiMessages } from "react-icons/ti";


// const MessageContainer = () => {
//   const noChatSelected = true;
//   return (
//     <div className='md:min-w-[450px] flex flex-col'>
//       {noChatSelected ? (
//         <NoChatSelected />
//       ) : (
//         <>
//           <div className='bg-slate-400 px-4 py-2 mb-2'>
//             <span className='label-text'>To:</span>
//             <span className='text-gray-900 font-bold'> User name</span>
//           </div>
//           <Messages />
//           <MessageInput />
//         </>
//       )}
//     </div>

//   )
// }

// export default MessageContainer

// const NoChatSelected = () => {
//   return (
//     <div className='flex items-center justify-center w-full h-full'>
//       <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col
//       items-center gap-2'>
//         <p>Welcome 👋 Abdul Azeem</p>
//         <p>Select a chat to start messaging</p>
//         <TiMessages className='text-3xl md:text-6xl text-center' />
//       </div>
//     </div>
//   )
// }




// 1. STARTER CODE SNIPPET
// import React from 'react'
// import Messages from './Messages'
// const MessageContainer = () => {
//   return (
//     <>
//     <div className='md:min-w-[450px] px-4 py-2 mb-2'>
//         <span className='label-text'>To:</span>
//         <span className='text-gray-900 font-bold'> User name</span>
//     </div>
//     <Messages />
//     <Messageinput/>
//     </>
//   )
// }

// export default MessageContainer