import {useEffect, useState} from "react";
import {Outlet, Navigate} from "react-router-dom"
import {useUserContext} from '../context/UserContext'
import Header from "../components/Header/Header.jsx";
import Sidebar from "../components/Sidebar/Sidebar";

const LayoutUser = () => {

    const {jwt} = useUserContext()
    const [isOpen, setIsOpen] = useState(false)
    useEffect(() => {
    }, [jwt])


    return (jwt ?
        <>
            <Header setIsOpen={setIsOpen}/>

            <div style={{display: 'flex'}}>
                <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>
                <main style={{width: "100%", height: 'calc(100vh - 70px)', overflowY: 'scroll'}}>
                    <Outlet/>
                </main>

            </div>
        </>
        : <Navigate to="/auth/login" replace={true}/>)
}

export default LayoutUser