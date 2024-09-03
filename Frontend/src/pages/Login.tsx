import React from "react";
import { useNavigate } from "react-router-dom";
import LoginCard from "../components/LoginCard";

const ClientLogin = () => {

    const nav = useNavigate();

    const handleLogin = () => {
        nav("/foundList"); 
    }
    return ( 
        <div
        style={{backgroundSize: '100% auto'}} 
         className="w-screen h-screen 
         flex justify-center items-center 
         bg-login-background bg-bottom bg-auto bg-no-repeat p-5 "> 
            <LoginCard  
            onEmailChange={() => console.log()}   
            onPasswordChange={() => console.log()} 
            onLogin={handleLogin}/> 
        </div>
    )
}  
 
export default ClientLogin