import {createContext, useContext, useState} from "react";
import Cookies from 'universal-cookie'

export const UserContext = createContext()

const UserProvider = ({children}) => {
    const cookies = new Cookies();
    const [jwt, setJwt] = useState(cookies.get('jwt'))
    const [email, setEmail] = useState(cookies.get('email'))
    const [userType, setUserType] = useState(cookies.get('userType'))

    const logout = () => {
        cookies.remove('jwt', {path: '/'})
        cookies.remove('email', {path: '/'})
        setJwt(cookies.get('jwt'))
        setEmail(cookies.get('email'))
    }

    const login = (token, userType, email) => {
        cookies.set('jwt', token, {path: '/'});
        cookies.set('userType', userType, {path: '/'});
        cookies.set('email', email, {path: '/'});
        setJwt(cookies.get('jwt'))
        setUserType(cookies.get('userType'))
        setEmail(cookies.get('email'))
    }


    return (
        <UserContext.Provider value={{jwt, userType, email, login, logout}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider

export const useUserContext = () => useContext(UserContext)