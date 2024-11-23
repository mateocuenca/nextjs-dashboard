import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useUserContext} from "../../context/UserContext.jsx";
import {useAtomValue, useSetAtom} from "jotai";
import {usersWithPersistenceAtom} from "../../atoms/users-atom.js";
import {TabsContainer, Tab, Card} from "./Subcomponents/StyledComponents.jsx";
import FormDialogAddUser from "./Subcomponents/FormDialogAddUser.jsx";
import FormDialogEditUser from "./Subcomponents/FormDialogEditUser.jsx";

export default function Configuracion() {

    // Estados y variables iniciales
    const navigate = useNavigate()
    const {path} = useParams()
    const [tabValue, setTabValue] = useState(0);
    const users = useAtomValue(usersWithPersistenceAtom)
    const setUsers = useSetAtom(usersWithPersistenceAtom);
    const {jwt, email} = useUserContext()

    // Handlers
    const handleTabChange = (newValue) => {
        if (newValue === 0) {
            navigate('/configuracion')
        }
        if (newValue === 1) {
            navigate('/configuracion/informacion-usuario')
        }
        setTabValue(newValue)
    };


    // API
    const listUsers = async () => {


        try {
            const response = await fetch(`${import.meta.env.VITE_API_BACKEND}/api/user`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "x-token": jwt
                }
            })

            return await response.json()

        } catch (e) {
            console.error(e)
        }

    }

    const fetchUsers = async () => {
        const usersList = await listUsers(); // Espera la resolución de la promesa
        setUsers(usersList); // Asegúrate de manejar posibles casos donde usersList sea undefined o null
    };

    useEffect(() => {
        fetchUsers(); // Llama a la función async
        if (path == 'informacion-usuario') {
            setTabValue(1)
        }
    }, [tabValue])

    return (
        <div style={{overflowY: 'scroll', background: 'white', padding: '1rem'}}>

            <h2>Configuracion</h2>
            <TabsContainer>
                <Tab active={tabValue === 0} onClick={() => handleTabChange(0)}>Usuarios</Tab>
                <Tab active={tabValue === 1} onClick={() => handleTabChange(1)}>Información del usuario</Tab>
            </TabsContainer>

            {tabValue === 0 && (
                <div>
                    <Card>
                        <FormDialogAddUser setUsers={setUsers} jwt={jwt}/>
                    </Card>

                    <Card>
                        <h6>Usuarios</h6>
                        {users.map((user) => (
                            <p>{user.mail}</p>
                        ))}
                    </Card>


                </div>
            )}

            {tabValue === 1 && (
                <div>
                    <Card>
                        <FormDialogEditUser email={email} users={users} jwt={jwt}/>
                    </Card>


                </div>
            )
            }
        </div>
    )
}