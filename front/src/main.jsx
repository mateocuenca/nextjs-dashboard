import ReactDOM from 'react-dom/client'
import {router} from './router'
import {RouterProvider} from 'react-router-dom'
import UserProvider from './context/UserContext'
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

ReactDOM.createRoot(document.getElementById('root')).render(
    <UserProvider>
        <RouterProvider router={router}/>
    </UserProvider>
)
