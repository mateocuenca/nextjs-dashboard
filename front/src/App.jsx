import {BrowserRouter, Route, Routes} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header/Header.jsx";
import Sidebar from "./components/Sidebar";
import {Provider} from "jotai";

function App() {
    return (
        <Provider>
            <BrowserRouter>
                <Header/>
                <div className='main d-flex'>
                    <div className='sidebarWrapper'>
                        <Sidebar/>
                    </div>
                    <div className='content'>
                        <Routes>
                            <Route path='/' exact={true} element={<Dashboard/>}/>
                            <Route path='/dashboard' exact={true} element={<Dashboard/>}/>
                        </Routes>
                    </div>
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default App;

