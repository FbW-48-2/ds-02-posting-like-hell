import React, { useState, useEffect } from 'react'
import { UserContext } from './UserContext'

export default function GlobalState({children}) {
    const [userStatus, setUserStatus] = useState({})

    useEffect(()=> {
        const initialState = async () => {
            try{
                const res = await fetch("/users")
                const data = await res.json()
                const findlogged = data.find(logged => logged.loggedIn)
               
                if(findlogged){
                    setUserStatus(findlogged)
                }
                else{
                    setUserStatus({
                        loggedIn: false
                    })
                }

                
            }
            catch(err){
                console.log(err);
            }
        }
        initialState()
    }, [])
    
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
