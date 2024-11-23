import {useState, useEffect} from 'react'
import {SidebarProvider} from "../../context/SidebarContext.jsx";
import {X} from 'lucide-react'
import {Snackbar, Alert} from '@mui/material';
import {
    FormContainer,
    StepContent,
    CloseButton,
    Sidebar,
} from "./Subcomponents/StyledComponents.jsx"
import SidebarItems from "./Subcomponents/SidebarItems.jsx";
import FormContent from "./Subcomponents/FormContent.jsx";

export default function CompleteSearch(props) {

    // Estados y variables iniciales
    const [jobDescription, setJobDescription] = useState(props.currentSearch.description || '')
    const [questions, setQuestions] = useState([])
    const [showQuestionsInput, setShowQuestionsInput] = useState(false)
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [currentQuestion, setCurrentQuestion] = useState({
        description: '',
        answers: []
    })
    const [answerType, setAnswerType] = useState('multiple')
    const [successAlert, setSuccessAlert] = useState(false);

    // Handlers
    const handleQuestionAdd = async () => {
        setCurrentQuestion({description: '', answers: [{description: '', correct: false}]})
        setShowQuestionsInput(true)
    }

    const cancelAddQuestion = async () => {
        setCurrentQuestion(null)
        setShowQuestionsInput(false)
    }

    const handleQuestionSubmit = async (e) => {
        e.preventDefault()
        if (currentQuestion.answers.length === 0) {
            return
        }
        setIsLoading(true)
        if (isEditing) {
            const response = await fetch(`${import.meta.env.VITE_API_BACKEND}/api/questions/${currentQuestion.id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "x-token": props.jwt
                },
                body: JSON.stringify({question: currentQuestion})
            })

            const result = await response.json()
            if (result.success) {
                setQuestions([...questions, currentQuestion])
                setCurrentQuestion({description: '', answers: [{description: '', correct: false}]})
                setShowQuestionsInput(false)
                setIsLoading(false)
                setIsEditing(false)
            } else {
                setError(result.msg)
                setIsLoading(false)
                setIsEditing(false)
            }
        } else {
            const response = await fetch(`${import.meta.env.VITE_API_BACKEND}/api/questions/add`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "x-token": props.jwt
                },
                body: JSON.stringify({searchId: props.searchId, question: currentQuestion})
            })

            const result = await response.json()
            if (result.success) {
                setQuestions([...questions, currentQuestion])
                setCurrentQuestion({description: '', answers: []})
                setShowQuestionsInput(false)
                setIsLoading(false)
            } else {
                setError(result.msg)
                setIsLoading(false)
            }
        }
    }

    const handleAnswerAdd = () => {
        setCurrentQuestion({
            ...currentQuestion,
            answers: [...currentQuestion.answers, {description: '', correct: false}]
        })
    }

    const handleAnswerChange = (index, field, value) => {
        let newAnswers = [...currentQuestion.answers]
        if (value === true) {
            for (let i = 0; i < newAnswers.length; i++) {
                newAnswers[i].correct = false
            }
        }
        newAnswers[index] = {...newAnswers[index], [field]: value}
        setCurrentQuestion({...currentQuestion, answers: newAnswers})
    }

    const handleQuestionEdit = (index) => {
        setCurrentQuestion(questions[index])
        //setQuestions(questions.filter((_, i) => i !== index))
        setIsEditing(true)
        setShowQuestionsInput(true)
    }

    const handleQuestionDelete = (index) => {
        setQuestions(questions.filter((_, i) => i !== index))
    }

    const handleAnswerDelete = (questionIndex, answerIndex) => {
        if (questionIndex === -1) {
            // Deleting from current question being edited
            const newAnswers = [...currentQuestion.answers]
            newAnswers.splice(answerIndex, 1)
            setCurrentQuestion({...currentQuestion, answers: newAnswers})
        } else {
            // Deleting from existing questions
            const newQuestions = [...questions]
            newQuestions[questionIndex].answers.splice(answerIndex, 1)
            setQuestions(newQuestions)
        }
    }

    const handleAnswerTypeChange = (e) => {
        setAnswerType(e.target.value)
        // Reset answers when changing type
        setCurrentQuestion({...currentQuestion, answers: [{description: '', correct: false}]})
    }

    // Api
    const getAllQuestions = async () => {
        try {
            let result = await fetch('http://localhost:5001/api/questions/' + props.searchId, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "x-token": props.jwt
                }
            })
            result = await result.json()
            setQuestions(result.questions)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getAllQuestions()
    }, [])

    return (
        <SidebarProvider>
            <FormContainer>
                <Sidebar>
                    <SidebarItems/>
                    <CloseButton>
                        <X size={24} onClick={() => props.setCompleteSearchModalOpen(false)}/>
                    </CloseButton>
                </Sidebar>
                <StepContent>
                    <FormContent
                        searchId={props.searchId}
                        jobDescription={jobDescription}
                        setJobDescription={setJobDescription}
                        questions={questions}
                        setQuestions={setQuestions}
                        showQuestionsInput={showQuestionsInput}
                        setShowQuestionsInput={setShowQuestionsInput}
                        currentQuestion={currentQuestion}
                        setCurrentQuestion={setCurrentQuestion}
                        answerType={answerType}
                        setAnswerType={setAnswerType}
                        handleQuestionSubmit={handleQuestionSubmit}
                        handleAnswerAdd={handleAnswerAdd}
                        handleAnswerChange={handleAnswerChange}
                        handleAnswerDelete={handleAnswerDelete}
                        handleQuestionAdd={handleQuestionAdd}
                        cancelAddQuestion={cancelAddQuestion}
                        handleQuestionEdit={handleQuestionEdit}
                        handleQuestionDelete={handleQuestionDelete}
                        handleAnswerTypeChange={handleAnswerTypeChange}
                        isLoading={isLoading}
                        setCompleteSearchModalOpen={props.setCompleteSearchModalOpen}
                        setSuccessAlert={setSuccessAlert}
                        jwt={props.jwt}
                    />
                </StepContent>
                <Snackbar
                    open={successAlert}
                    autoHideDuration={1000}
                    onClose={() => setSuccessAlert(false)}
                    anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                >
                    <Alert onClose={() => setSuccessAlert(false)} severity="success" sx={{width: '100%'}}>
                        ¡Búsqueda guardada con éxito!
                    </Alert>
                </Snackbar>
            </FormContainer>
        </SidebarProvider>
    )
}