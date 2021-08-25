import React, { useState } from 'react'
import { UserContext } from './UserContext'

export default function GlobalState({children}) {
    const [userStatus, setUserStatus] = useState({
        username: "", 
        loggedIn: false
    })
    console.log(userStatus);
    return (
        <UserContext.Provider
            value={{
                userStatus, setUserStatus
            }}
        >
            {children}
        </UserContext.Provider>
    )
}
