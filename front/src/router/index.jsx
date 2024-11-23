import {createBrowserRouter} from "react-router-dom";
import LayoutAuth from "../layouts/LayoutAuth";
import Proceso from "../pages/Procesos/Subcomponents/Proceso.jsx";
import Procesos from "../pages/Procesos/Procesos";
import Busquedas from "../pages/Busquedas/Busquedas";
import LayoutUser from "../layouts/LayoutUser";
import Login from "../pages/Auth/Login";
import Configuracion from "../pages/Configuracion/Configuracion";
import FormularioPostulacion from "../pages/FormularioPostulacion/FormularioPostulacion.jsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <LayoutUser/>,
        children: [
            {
                path: '/',
                element: <Busquedas/>,
            },
            {
                path: '/busquedas/:id',
                element: <Procesos/>,
            },
            {
                path: '/procesos/:id',
                element: <Proceso/>,
            },
            {
                path: '/busquedas',
                element: <Busquedas/>,
            },

        ],
    },
    {
        path: '/auth',
        element: <LayoutAuth/>,
        children: [
            {
                path: '/auth/login',
                element: <Login/>,
            }
        ]
    },
    {
        path: '/configuracion',
        element: <LayoutUser/>,
        children: [
            {
                index: true,
                element: <Configuracion/>,
            },
            {
                path: '/configuracion/:path',
                element: <Configuracion/>,
            }
        ]
    },
    {
        path: '/enviar-postulacion/:id',
        element: <FormularioPostulacion/>,
    },

])