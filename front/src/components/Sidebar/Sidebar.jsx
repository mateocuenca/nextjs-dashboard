import React, { useState, useEffect } from 'react'
import { Search, User, Menu, Settings } from 'lucide-react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'; 

const StyledSidebar = styled.nav`
  position: fixed;
  left: 0;
  top: 0;
  height: calc(100vh - 70px);
  width: ${props => props.isOpen ? '80px' : '80px'};
  background-color: rgb(243, 244, 246);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 300ms ease-in-out;
  transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(-100%)'};

  @media (min-width: 768px) {
    position: relative;
    transform: translateX(0);
  }
`

const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  margin-top: 16px;
  padding: 0;
  list-style-type: none;
`

const MenuItem = styled.li`
  width: 100%;
`

const MenuLink = styled(Link)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 0;
  color: hsl(var(--foreground));
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: hsl(var(--accent));
  }

  &.selected {
    background-color: #e0e0e0;
    font-weight: bold;
  }
`

const MenuItemText = styled.span`
  font-size: 12px;
  margin-top: 4px;
  transition: opacity 0.3s ease;
  opacity: ${props => props.isOpen ? 1 : 0};
`

const MenuButton = styled.button`
  position: fixed;
  z-index: 60;
  background-color: hsl(var(--background));
  padding: 8px;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  transition: all 300ms ease-in-out;
  left: ${props => props.isOpen ? '64px' : '16px'};
  top: 16px;
  display: ${props => props.isMobile ? 'block' : 'none'};
  border: none;
  cursor: pointer;

  &:hover {
    background-color: hsl(var(--accent));
  }
`

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const location = useLocation();

  useEffect(() => {
    console.log(location)
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
      setIsOpen(window.innerWidth >= 768)
    }
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    return () => window.removeEventListener('resize', checkIfMobile)

   
  }, [])

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <StyledSidebar isOpen={isOpen}>
        <MenuList>
          <MenuItem>
            <MenuLink to="/busquedas" className={location.pathname==='/busquedas' ? 'selected' : ''}>
              <Search size={24} />
              <MenuItemText isOpen={isOpen}>Busquedas</MenuItemText>
            </MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink to="#">
              <User size={24} />
              <MenuItemText isOpen={isOpen}>Mi cuenta</MenuItemText>
            </MenuLink>
          </MenuItem>
          <MenuItem style={{marginTop: 'auto'}}>
            <MenuLink to="/configuracion" className={location.pathname==='/configuracion' ? 'selected' : ''}>
              <Settings size={24} />
              <MenuItemText isOpen={isOpen}>Configuracion</MenuItemText>
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
        <Menu size={24} />
      </MenuButton>
    </>
  )
}