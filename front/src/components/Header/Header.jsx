import {logoStyle, logoTextStyle} from "./styles.js";
import Navbar from "./Subcomponents/Navbar.jsx"

const Header = () => {

    return (
        <header style={{background: '#f3f4f6'}} className='d-flex align-items-center'>
            <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                <div style={logoStyle}>
                    <span style={logoTextStyle}>HH</span>
                </div>
                <Navbar/>
            </div>
        </header>
    );
};

export default Header;
