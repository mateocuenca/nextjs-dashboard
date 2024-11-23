import styled from 'styled-components'

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

export {
    LoginContainer,
    LoginForm,
    Title,
    InputGroup,
    Label,
    Input,
    Button,
    ErrorMessage
};
