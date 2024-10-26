import React, { createContext, ReactNode, useState } from "react"

interface UserContextType {
    userId : string | null;
    setUserId : (id : string | null) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider:React.FC< {children : ReactNode}> = ({children}) => {
    const [userId, setUserId] = useState<string | null>(null);

    return (
        <>
            <UserContext.Provider value={{userId, setUserId}}>
                {children}
            </UserContext.Provider>
        </>
    );
}