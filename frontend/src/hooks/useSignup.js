import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {

    // loading is used to track the loading state during the signup process, and setLoading is used to update this state.
    const [loading, setLoading] = useState(false);//State Management
    const { setAuthUser } = useAuthContext();


    const signup = async ({fullName, username, password, confirmPassword, gender}) =>{
        const success = handleInputError({fullName, username, password, confirmPassword, gender})
        if(!success) return;

        setLoading(true);
        try {
            const res = await fetch("/api/auth/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ fullName, username, password, confirmPassword, gender }),
			});

            const data = await res.json();
            if (!res.ok) {
                toast.error(data.message || 'Signup failed');
            }else {
                console.log(data);
                toast.success("Signup successfully!");
            }
            // console.log(data);

            // localStorage
            localStorage.setItem("chat-user", JSON.stringify(data))
            
            //context
            setAuthUser(data);


            
        } catch (error) {
            toast.error(error.message)
        }finally{
            setLoading(false);
        }



    }
    return {loading, signup}
 
}

export default useSignup


function handleInputError({fullName, username, password, confirmPassword, gender}){
    if(!fullName || !username || !password || !confirmPassword || !gender){
        toast.error("please fill all fields");
        return false;
    }

    if(password !== confirmPassword){
        toast.error("Password do not match");
        return false;
    }

    if(password.length < 6){
        toast.error("Password must be at least 6 characters");
        return false;
    }

    return true;
}