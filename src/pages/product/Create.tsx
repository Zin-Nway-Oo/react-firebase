import React, { useContext, useEffect } from "react";
import { UserContext } from "../../provider/UserProvider";
import { useNavigate } from "react-router-dom";

export const ProductCreate: React.FC = () => {
    const userContext = useContext(UserContext);
    const navigate = useNavigate();

    // Check if userContext is defined
    if (!userContext) {
        return <p>Loading...</p>; // Or handle it as needed
    }

    const { userId, setUserId } = userContext;


    useEffect(() => {
        if (userId === null) {
            navigate('/');
            console.log('Please log in again');
        }
    }, [userId, navigate]);

    return (
        <>
            <h1>Create Product</h1>
            <p>User ID: {userId}</p>
            <button
                onClick={() => {
                    setUserId('');
                    navigate('/');
                }}
            >Log out</button>
        </>
    );
}
