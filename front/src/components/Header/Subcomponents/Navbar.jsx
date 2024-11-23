import {Link} from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Logout from "@mui/icons-material/Logout";
import {useState} from "react";
import {Settings} from 'lucide-react'
import {useUserContext} from '../../../context/UserContext.jsx';
import {fullNameAtom} from "../../../atoms/fullName-atom.js";
import {useAtom} from "jotai";
import ProfileImage from "./ProfileImage.jsx";

const Navbar = () => {
    // Estados y variables iniciales
    const [anchorEl, setAnchorEl] = useState(null);
    const {logout} = useUserContext()
    const open = Boolean(anchorEl);
    const [fullName, setFullName] = useAtom(fullNameAtom);

    // Handlers
    const handleOpenMyAccDr = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMyAccDr = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        logout()
    }

    return (
        <div className='col-sm-7 d-flex align-items-center justify-content-end part3'>

            <div className='myAccWrapper'>
                <Button
                    className='myAcc d-flex align-items-center'
                    onClick={handleOpenMyAccDr}
                >
                    <div className='userImg'>
                  <span className='rounded-circle'>
                      <ProfileImage name={`${fullName.firstName} ${fullName.lastName}`}/>
                  </span>
                    </div>

                    <div className='userInfo'>
                        <h4>{fullName.firstName} {fullName.lastName}</h4>
                    </div>
                </Button>

                <Menu
                    anchorEl={anchorEl}
                    id='account-menu'
                    open={open}
                    onClose={handleCloseMyAccDr}
                    onClick={handleCloseMyAccDr}
                    slotProps={{
                        paper: {
                            elevation: 0,
                            sx: {
                                overflow: "visible",
                                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                mt: 1.5,
                                "& .MuiAvatar-root": {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                "&::before": {
                                    content: '""',
                                    display: "block",
                                    position: "absolute",
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: "background.paper",
                                    transform: "translateY(-50%) rotate(45deg)",
                                    zIndex: 0,
                                },
                            },
                        },
                    }}
                    transformOrigin={{horizontal: "right", vertical: "top"}}
                    anchorOrigin={{horizontal: "right", vertical: "bottom"}}
                >
                    <MenuItem onClick={handleCloseMyAccDr} as={Link} to='/configuracion'>
                        <ListItemIcon>
                            <Settings size={24}/>
                        </ListItemIcon>
                        Configuración
                    </MenuItem>
                    <Divider/>
                    <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                            <Logout fontSize='small'/>
                        </ListItemIcon>
                        Cerrar sesión
                    </MenuItem>
                </Menu>
            </div>
        </div>
    )

}

export default Navbar;