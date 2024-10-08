
import { createContext, useContext, useEffect, useState } from "react";
import useAuthContext from "./AuthContext";
import io from "socket.io-client";


const socketContext = createContext();

export const useSocketContext = () =>{
    return useContext(socketContext)
}

export const SocketContextProvider = ({ children }) =>{

    const [ socket, setSocket ] = useState(null);
    const [ onlineUsers, setOnlineUsers ]  = useState([]);
    const { authUser } = useAuthContext();

    useEffect(()=> {
        if(authUser){
            const socket = io("https://chat-application-oil9.onrender.com",{
                query:{
                    userId: authUser._id,
                },
            });


            setSocket(socket);
            // socket.on() is used to listen  to the event. can be used both on client and server side.
            socket.on("getOnlineUsers", (users)=>{
                setOnlineUsers(users);
            });
            return () => socket.close();

        }else{
            if(socket){
                socket.close();
                setSocket(null);
            }
        }
    },[authUser]) // whenever this authuser changes it will run useEffect

    return <socketContext.Provider value={{socket, onlineUsers}}>{ children }</socketContext.Provider>
}