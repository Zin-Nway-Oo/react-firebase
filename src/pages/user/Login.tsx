import React, { FormEvent, useContext, useState } from "react"
import { validLogin } from "../../services/user"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../provider/UserProvider";


export const Login:React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const userContext = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (event : FormEvent) => {
        
        event.preventDefault();
        let result = await validLogin(email,password);
        if (result.userId === '') {
            setMessage('Invalid email and password');
        } else {
            userContext?.setUserId(result.userId);
            navigate('/product');
        }
       
    }
    
    return (
        <>
            <p>{message}</p>
            <form onSubmit={handleSubmit}>
                <input type="email"
                       placeholder="john@mail.com"
                       value={email}
                       onChange={(e) => {setEmail(e.target.value)}}
                />
                <input type="password"
                       placeholder="password"
                       value={password}
                       onChange={(e) => {setPassword(e.target.value)}}
                />
                <button>
                    Login
                </button>
            </form>
        </>
    );
}