import {useSidebar} from "../../../context/SidebarContext.jsx";
import {SidebarItem} from "./StyledComponents.jsx";

const SidebarItems = () => {
    const {activeSection, setActiveSection} = useSidebar()

    return (
        <>
            <SidebarItem active={activeSection === 'jobDescription'} onClick={() => setActiveSection('jobDescription')}>
                Descripcion
            </SidebarItem>
            <SidebarItem active={activeSection === 'questions'} onClick={() => setActiveSection('questions')}>
                Preguntas
            </SidebarItem>
            <SidebarItem active={activeSection === 'resume'} onClick={() => setActiveSection('resume')}>
                Resumen
            </SidebarItem>
        </>
    )
}

export default SidebarItems;