import React from "react";
import { useNavigate } from "react-router-dom";
import LoginCard from "../components/LoginCard";

const ClientLogin = () => {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const nav = useNavigate();

    const handleLogin = () => {
        nav("/list");
    }
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    return (
        <div 
        style={{backgroundSize: '100% auto'}}
         className="w-screen h-screen 
         flex justify-center items-center 
         bg-login-background bg-bottom bg-auto bg-no-repeat ">
            <LoginCard 
            onEmailChange={handleEmailChange} 
            onPasswordChange={handlePasswordChange}
            onLogin={handleLogin}/>
        </div>
    )
}

export default ClientLogin