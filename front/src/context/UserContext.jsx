import { createContext, useContext, useState } from "react";
import Cookies from 'universal-cookie'

export const UserContext = createContext()

const UserProvider = ({children}) => {
    const cookies = new Cookies();
    const [jwt, setJwt] =  useState(cookies.get('jwt'))
    const [userType, setUserType] =  useState(cookies.get('userType'))

    const logout = () => {
        cookies.remove('jwt', { path: '/' })
        setJwt(cookies.get('jwt'))
    }

    const login = (token, userType) => {
        cookies.set('jwt', token, { path: '/' });
        cookies.set('userType', userType, { path: '/' });
        setJwt(cookies.get('jwt'))
        setUserType(cookies.get('userType'))
    }


    return (
        <UserContext.Provider value={{jwt,userType, login, logout}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider

export const useUserContext = () =>useContext(UserContext)