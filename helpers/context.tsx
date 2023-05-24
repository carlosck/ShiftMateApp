import React, { createContext, useContext, useState } from "react"

// create toggle context
const UserContext = createContext()

// create context provider
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
       darkMode: false,
    })
    // the value passed in here will be accessible anywhere in our application 
    // you can pass any value, in our case we pass our state and it's update method 
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

// useUserContext will be used to use and update state accross the app
// we can access to data and setData using this method 
// anywhere in any component that's inside ToggleProvider
export const useUserContext = useContext(UserContext)