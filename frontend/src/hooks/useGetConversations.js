import { useEffect, useState } from "react"
import toast from "react-hot-toast";

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const getConversations = async () => {

            setLoading(true);
            try {
                const res = await fetch("/api/users", {
                    method:"GET", 
                    headers : { "Content-Type" : "application/json"},
                    
                });

                if(!res.ok){
                    throw new Error(`Server returned an error: ${res.statusText}`)
                }
            
                // Handle empty response
                if (res.status === 204 || res.headers.get("content-length") === "0") {
                    throw new Error("No content returned from server");
                }

                const data = await res.json();
                setConversations(data);
                // console.log(data);
                
            } catch (error) {
                // console.log(error.message);
                // console.error("Error fetching conversations:", error.message);

                toast.error(error.message || "An unexpected error occurred.");
            } finally {
                setLoading(false);
            }
        }
        getConversations();
    },[])

    return {loading, conversations}
}
export default useGetConversations