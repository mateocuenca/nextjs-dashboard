import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import styled from 'styled-components'
import { useUserContext } from '../../context/UserContext';

const LoginContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
`

const LoginForm = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`

const Title = styled.h2`
  color: #333;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  text-align: center;
`

const InputGroup = styled.div`
  margin-bottom: 1rem;
`

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
`

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #a777e3;
  }
`

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.9;
  }
`

const ErrorMessage = styled.p`
  color: #ff3860;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const {jwt, login, logout} =  useUserContext()

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
        body: JSON.stringify({mail: email, pass: password })
      })

      const result = await response.json()

      if (result.error) {
        setError(result.msg)
      } else if (result.success) {
        // Assuming you have a login function in your context
        login(result.token, result.userType)
        navigate('/')
      }
    } catch (e) {
      console.error(e)
      setError('Ha ocurrido un error. Por favor, inténtalo de nuevo.')
    }
  }

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