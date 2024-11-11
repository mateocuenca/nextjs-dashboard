import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Logout from "@mui/icons-material/Logout";
import { MdMenuOpen } from "react-icons/md";
import SearchBox from "../SearchBox";
import { CiLight } from "react-icons/ci";
import { IoShieldHalfSharp } from "react-icons/io5";
import { useState } from "react";
const logoStyle = {
  height: '64px',
  width: '72.45px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const logoTextStyle = {
  color: '#6366f1',
  fontWeight: 'bold',
  fontSize: '24px',
};

const Header = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleOpenMyAccDr = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMyAccDr = () => {
    setAnchorEl(null);
  };

  return (
    <header style={{background: '#f3f4f6'}} className='d-flex align-items-center'>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between'}}>
      <div style={logoStyle}>
          <span style={logoTextStyle}>HH</span>
        </div>

          <div className='col-sm-7 d-flex align-items-center justify-content-end part3'>
            <Button className='rounded-circle mr-3'>
              <CiLight />
            </Button>

            <div className='myAccWrapper'>
              <Button
                className='myAcc d-flex align-items-center'
                onClick={handleOpenMyAccDr}
              >
                <div className='userImg'>
                  <span className='rounded-circle'>
                    <img
                      src='https://mironcoder-hotash.netlify.app/images/avatar/01.webp'
                      alt='Foto de perfil del usuario'
                    />
                  </span>
                </div>

                <div className='userInfo'>
                  <h4>Juan Lopez</h4>
                  <p className='mb-0'>@j.lopez</p>
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
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleCloseMyAccDr}>
                  <ListItemIcon>
                    <Avatar fontSize='small' />
                  </ListItemIcon>
                  Mi cuenta
                </MenuItem>
                <MenuItem onClick={handleCloseMyAccDr}>
                  <ListItemIcon>
                    <IoShieldHalfSharp />
                  </ListItemIcon>
                  Cambiar contraseña
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleCloseMyAccDr}>
                  <ListItemIcon>
                    <Logout fontSize='small' />
                  </ListItemIcon>
                  Cerrar sesión
                </MenuItem>
              </Menu>
            </div>
          </div>
      </div>
    </header>
  );
};

export default Header;
