import {useState} from "react";
import {Outlet, Navigate} from "react-router-dom"
import Cookies from 'universal-cookie';

const LayoutAuth = () => {

    const cookies = new Cookies();
    const [jwt, setJwt] = useState(cookies.get('jwt'))

    return (!jwt ? <Outlet/> : <Navigate to="/" replace={true}/>)

}

export default LayoutAuth