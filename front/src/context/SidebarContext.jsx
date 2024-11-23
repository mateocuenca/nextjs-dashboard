import {createContext, useContext, useState} from "react";


const SidebarContext = createContext()

const SidebarProvider = ({children}) => {
    const [activeSection, setActiveSection] = useState('jobDescription')

    return (
        <SidebarContext.Provider value={{activeSection, setActiveSection}}>
            {children}
        </SidebarContext.Provider>
    )
}

const useSidebar = () => {
    const context = useContext(SidebarContext)
    if (context === undefined) {
        throw new Error('useSidebar must be used within a SidebarProvider')
    }
    return context
}

export {SidebarProvider, useSidebar}