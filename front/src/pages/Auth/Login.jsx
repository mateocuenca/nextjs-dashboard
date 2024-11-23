import {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom"
import {useUserContext} from '../../context/UserContext';
import {
    LoginContainer,
    LoginForm,
    Title,
    InputGroup,
    Label,
    Input,
    Button,
    ErrorMessage
} from "./Subcomponents/StyledComponents.jsx"
import {fullNameWithPersistenceAtom} from "../../atoms/fullName-atom.js";
import {usersWithPersistenceAtom} from "../../atoms/users-atom.js";
import {useAtom} from "jotai";


export default function Login() {

    // Estados y variables iniciales
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const {login} = useUserContext()
    const [fullName, setFullName] = useAtom(fullNameWithPersistenceAtom)
    const [users, setUsers] = useAtom(usersWithPersistenceAtom)
    const isEmail = (email) =>
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError('')

        if (!isEmail(email)) {
            setError('Por favor, introduce un email válido')
            return
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BACKEND}/api/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({mail: email, pass: password})
            })

            const result = await response.json()

            if (result.error) {
                setError(result.msg)
            } else if (result.success) {
                // Assuming you have a login function in your context
                login(result.token, result.userType, email)
                fetchUsers(result.token)
                navigate('/')
            }
        } catch (e) {
            console.error(e)
            setError('Ha ocurrido un error. Por favor, inténtalo de nuevo.')
        }
    }

    // API
    const listUsers = async (token) => {


        try {
            const response = await fetch(`${import.meta.env.VITE_API_BACKEND}/api/user`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "x-token": token
                }
            })

            return await response.json()

        } catch (e) {
            console.error(e)
        }

    }

    const fetchUsers = async (token) => {
        const usersList = await listUsers(token); // Espera la resolución de la promesa
        setUsers(usersList); // Asegúrate de manejar posibles casos donde usersList sea undefined o null
    };

    // Utils
    const getNameByEmail = (email, users) => {
        const user = users.find(user => user.mail === email);
        return user ? {firstName: user.name, lastName: user.last_name} : null;
    };

    useEffect(() => {
        // Actualiza el nombre cuando cambien los usuarios o el email
        if (email && users.length > 0) {
            setFullName(getNameByEmail(email, users));
        }
    }, [email, users]); // Dependencias: email y users

    return (
        <LoginContainer>
            <LoginForm onSubmit={handleSubmit}>
                <Title>Iniciar Sesión</Title>
                <InputGroup>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="email@ejemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </InputGroup>
                <InputGroup>
                    <Label htmlFor="password">Contraseña</Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </InputGroup>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <Button type="submit">Iniciar Sesión</Button>
            </LoginForm>
        </LoginContainer>
    )
}