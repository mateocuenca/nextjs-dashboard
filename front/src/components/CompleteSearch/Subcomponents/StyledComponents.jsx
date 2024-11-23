import styled from 'styled-components'
import Button from '../../ui/Button.jsx'

const FormContainer = styled.div`
    margin: 0 auto;
    background-color: #f0f0f0;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`

const StepContent = styled.div`
    background-color: #ffffff;
    padding: 20px;
    border-radius: 8px;
    overflow-y: scroll;
`

const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ced4da;
    border-radius: 4px;
`

const TextArea = styled.textarea`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ced4da;
    border-radius: 4px;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;
`

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
`

const Label = styled.label`
    margin-bottom: 4px;
    font-weight: bold;
`

const SubmitButton = styled(Button)`
    margin-top: 16px;
    background-color: ${props => (!props.disabled ? '#007bff' : 'gray')};

    &:hover {
        background-color: ${props => (!props.disabled ? '#0056b3' : 'gray')};
        cursor: ${props => (!props.disabled ? 'pointer' : 'unset')};
    }
`

const QuestionList = styled.ul`
    list-style-type: none;
    padding: 0;
`

const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    margin-left: auto;
`


const QuestionItem = styled.li`
    margin-bottom: 16px;
    padding: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
`

const AnswerList = styled.ul`
    list-style-type: none;
    padding: 0;
    margin-top: 8px;
`

const AnswerItem = styled.li`
    display: flex;
    flex-direction: column;
    margin-bottom: 4px;
`

const Checkbox = styled.input`
    margin-right: 8px;
`

const DeleteButton = styled.button`
    background: none;
    border: none;
    color: #dc3545;
    cursor: pointer;
    padding: 0;
    margin-left: 8px;
`

const SelectWrapper = styled.div`
    margin-bottom: 10px;
    width: 100%;
`

const Sidebar = styled.div`
    display: flex;
    background-color: #f8f9fa;
    padding: 20px;
`

const SidebarItem = styled.div`
    padding: 10px;
    margin-bottom: 5px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #e9ecef;
    }

    ${({active}) => active && `
    background-color: #e9ecef;
    font-weight: bold;
  `}
`
const NavigationButtons = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`

export {
    FormContainer,
    StepContent,
    Input,
    TextArea,
    Form,
    FormGroup,
    Label,
    SubmitButton,
    QuestionList,
    CloseButton,
    QuestionItem,
    AnswerList,
    AnswerItem,
    Checkbox,
    DeleteButton,
    SelectWrapper,
    Sidebar,
    SidebarItem,
    NavigationButtons
};
