import {useState, useEffect} from 'react'
import {Search, Menu, Settings} from 'lucide-react'
import {useLocation} from 'react-router-dom';
import {
    StyledSidebar,
    MenuList,
    MenuItem,
    MenuLink,
    MenuItemText,
    MenuButton
} from "./Subcomponents/StyledComponents.jsx";


export default function Sidebar() {

    // Estados y variables iniciales
    const [isOpen, setIsOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const location = useLocation();

    // Handlers
    const toggleSidebar = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768)
            setIsOpen(window.innerWidth >= 768)
        }
        checkIfMobile()
        window.addEventListener('resize', checkIfMobile)
        return () => window.removeEventListener('resize', checkIfMobile)

    }, [])

    return (
        <>
            <StyledSidebar isOpen={isOpen}>
                <MenuList>
                    <MenuItem>
                        <MenuLink to="/busquedas" className={location.pathname === '/busquedas' ? 'selected' : ''}>
                            <Search size={24}/>
                            <MenuItemText isOpen={isOpen}>Búsquedas</MenuItemText>
                        </MenuLink>
                    </MenuItem>
                    <MenuItem style={{marginTop: 'auto'}}>
                        <MenuLink to="/configuracion"
                                  className={location.pathname === '/configuracion' ? 'selected' : ''}>
                            <Settings size={24}/>
                            <MenuItemText isOpen={isOpen}>Configuración</MenuItemText>
                        </MenuLink>
                    </MenuItem>
                </MenuList>
            </StyledSidebar>

            <MenuButton
                isOpen={isOpen}
                isMobile={isMobile}
                onClick={toggleSidebar}
                aria-label="Toggle sidebar"
            >
                <Menu size={24}/>
            </MenuButton>
        </>
    )
}