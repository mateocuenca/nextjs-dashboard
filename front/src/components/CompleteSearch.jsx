import React, { useState, useEffect, createContext, useContext } from 'react'
import styled from 'styled-components'
import { Briefcase, HelpCircle, ChevronRight, ChevronLeft, PencilOff, Trash2, X } from 'lucide-react'
import { CircularProgress } from '@mui/material'
import Button from './ui/Button'
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
const FormHeader = styled.div`
  position: sticky;
  top: 0;
  background-color: white;
  padding: 20px 0;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
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

const StyledSelect = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  background-color: white;
  font-size: 16px;
  color: #495057;

  &:focus {
    outline: none;
    border-color: #80bdff;
    box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
  }
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

  ${({ active }) => active && `
    background-color: #e9ecef;
    font-weight: bold;
  `}
`
const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`


const SidebarContext = createContext()

const SidebarProvider = ({ children }) => {
  const [activeSection, setActiveSection] = useState('jobDescription')

  return (
    <SidebarContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </SidebarContext.Provider>
  )
}

const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}

export default function CompleteSearch(props) {
  console.log(props)
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

  const handleQuestionAdd = async () => {
    setCurrentQuestion({ description: '', answers: [{description: '', correct: false}] })
    setShowQuestionsInput(true)
  }

  const cancelAddQuestion = async () => {
    setCurrentQuestion(null)
    setShowQuestionsInput(false)
    console.log(questions)
  }

  const handleQuestionSubmit = async (e) => {
    console.log(currentQuestion)
    e.preventDefault()
    if (currentQuestion.answers.length === 0) {
      return
    }
    console.log(currentQuestion)
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
        setCurrentQuestion({ description: '', answers: [{description: '', correct: false}] })
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
        setCurrentQuestion({ description: '', answers: [] })
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
      answers: [...currentQuestion.answers, { description: '', correct: false }]
    })
  }

  const handleAnswerChange = (index, field, value) => {
    console.log(value)
    let newAnswers = [...currentQuestion.answers]
    if (value===true){
      for (let i = 0; i<newAnswers.length; i++){
        newAnswers[i].correct = false
      }
    }
    newAnswers[index] = { ...newAnswers[index], [field]: value }
    setCurrentQuestion({ ...currentQuestion, answers: newAnswers })
    console.log(newAnswers)
  }

  const handleQuestionEdit = (index) => {
    console.log(currentQuestion)
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
      setCurrentQuestion({ ...currentQuestion, answers: newAnswers })
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
    setCurrentQuestion({ ...currentQuestion, answers: [{description: '', correct: false}] })
  }

  const getAllQuestions = async () => {
    try {
      let result = await fetch('http://localhost:5001/api/questions/' + props.searchId)
      result = await result.json()
      setQuestions(result.questions)
      console.log(result)
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllQuestions()
  }, [])

  return (
    <SidebarProvider>
      <FormContainer>
        <Sidebar>
          <SidebarItems />
          <CloseButton>
          <X size={24} onClick={()=>props.setCompleteSearchModalOpen(false)}/>
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
            handleAnswerTypeChange = {handleAnswerTypeChange}
            isLoading={isLoading}
            setCompleteSearchModalOpen = {props.setCompleteSearchModalOpen}
          />
        </StepContent>
      </FormContainer>
    </SidebarProvider>
  )
}

const SidebarItems = () => {
  const { activeSection, setActiveSection } = useSidebar()

  return (
    <>
      <SidebarItem active={activeSection === 'jobDescription'} onClick={() => setActiveSection('jobDescription')}>
        Descripcion
      </SidebarItem>
      <SidebarItem active={activeSection === 'questions'} onClick={() => setActiveSection('questions')}>
        Preguntas
      </SidebarItem>
      <SidebarItem active={activeSection === 'resume'} onClick={() => setActiveSection('resume')}>
        Resumen
      </SidebarItem>
    </>
  )
}

const FormContent = ({
  searchId,
  jobDescription,
  setJobDescription,
  questions,
  setQuestions,
  showQuestionsInput,
  setShowQuestionsInput,
  currentQuestion,
  setCurrentQuestion,
  answerType,
  setAnswerType,
  handleQuestionSubmit,
  handleAnswerAdd,
  handleAnswerChange,
  handleAnswerDelete,
  handleQuestionAdd,
  cancelAddQuestion,
  handleQuestionEdit,
  handleQuestionDelete,
  handleAnswerTypeChange,
  isLoading,
  setCompleteSearchModalOpen
}) => {
  const { activeSection, setActiveSection } = useSidebar()

  const sections = ['jobDescription', 'questions', 'resume']

  const goToPreviousSection = () => {
    const currentIndex = sections.indexOf(activeSection)
    if (currentIndex > 0) {
      setActiveSection(sections[currentIndex - 1])
    }
  }

  const updateJobDescription = async () =>{
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BACKEND}/api/search/${searchId}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "x-token": ''
        },
        body: JSON.stringify({description: jobDescription})
      })

      const result = await response.json()
    } catch(error){
      console.log(error)
    }
  }

  const goToNextSection = () => {
    const currentIndex = sections.indexOf(activeSection)
    console.log(currentIndex)
    if (currentIndex===0){
      updateJobDescription ()
    }
    if (currentIndex < sections.length - 1) {
      setActiveSection(sections[currentIndex + 1])
    }
  }
  const isEquals = () =>{
    console.log(questions.filter(el=>el.id===currentQuestion.id)[0])
    console.log(currentQuestion)
    return currentQuestion !== questions.filter(el=>el.id===currentQuestion.id)[0]
  }
  return (
    <div style={{overflowY: 'scroll'}}>
      {activeSection === 'jobDescription' && (
        <>
          <Form>
            <FormGroup>
              <Label htmlFor="description">Job Description</Label>
              <TextArea
                id="description"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                required
              />
            </FormGroup>
          </Form>
        </>
      )}
      {activeSection === 'questions' && (
        <>
          <span>opcional: Agrega preguntas a la busqueda</span>
          <br />
         <br/>
          <Form onSubmit={handleQuestionSubmit}>
            {showQuestionsInput ? (
              <FormGroup>
                <Label htmlFor="questionText">Pregunta:</Label>
                <Input
                  id="questionText"
                  value={currentQuestion.description}
                  onChange={(e) => setCurrentQuestion({...currentQuestion, description: e.target.value})}
                  required
                />
                <SelectWrapper>
                  <Label htmlFor="answerType">Respuestas:</Label>
                </SelectWrapper>
                {currentQuestion.answers.map((answer, index) => (
                  <FormGroup key={index}>
                    <div style={{display: 'flex'}}>
                    
                        <Checkbox
                          type={'radio'}
                          name="correctAnswer"
                          checked={answer.correct}
                          onChange={(e) => handleAnswerChange(index, 'correct', e.target.checked)}
                        />
                    
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Input
                          id={`answer${index}`}
                          value={answer.description}
                          disabled={answerType === 'input'}
                          onChange={(e) => handleAnswerChange(index, 'description', e.target.value)}
                          required
                        />
                        <DeleteButton onClick={() => handleAnswerDelete(-1, index)}>
                          <X size={16} />
                        </DeleteButton>
                      </div>
                    </div>
                  </FormGroup>
                ))}
                <div style={{display: 'flex', justifyContent: 'space-between'}} className="">
                  {answerType !== 'input' && <Button type="button" onClick={handleAnswerAdd}>Agregar respuesta</Button>}
                  <div>
                    <Button type="button" onClick={cancelAddQuestion}>Cancelar</Button>
                    <SubmitButton disabled={currentQuestion.answers.length === 0 || !isEquals()} type="submit">
                      {isLoading ? <CircularProgress color='white'/> : ''} Guardar
                    </SubmitButton>
                  </div>
                </div>
              </FormGroup>
            ) : (
              
              <Button onClick={handleQuestionAdd}>Agregar Pregunta</Button>
            )}
          </Form>
          <br />
          <QuestionList>
            {questions.map((question, index) => (
              <QuestionItem key={index}>
                <span>Pregunta:</span>
              <br />
              <br />
                <Input type="text" value={question.description} disabled/>
                <br />
                <br />
                <span>Respuestas:</span>
                <AnswerList>
                  {question.answers.map((answer, answerIndex) => (
                    <AnswerItem key={answerIndex}>
                                         
                        <div style={{display: 'flex'}}>
                    
                            <Checkbox
                              type={'radio'}
                              checked={answer.correct}
                            />
                        
                          <Input value={answer.description} disabled/>
                        </div>                
                    </AnswerItem>
                  ))}
                </AnswerList>
                <div style={{display: 'flex', justifyContent: 'right', columnGap: '1rem'}} className="buttons">
                  <Button onClick={() => handleQuestionEdit(index)}><PencilOff size={16}/></Button>
                  <Button onClick={() => handleQuestionDelete(index)}><Trash2 size={16}/></Button>
                </div>
              </QuestionItem>
            ))}
          </QuestionList>
        </>
      )}
      {activeSection === 'resume' && (
        <>
          <span><b>Job Description:</b></span>
          <p>{jobDescription}</p>
          <span><b>Preguntas</b></span>
          <QuestionList>
            {questions.map((question, index) => (
              <QuestionItem key={index}>
                <span>Pregunta:</span>
              <br />
              <br />
                <Input type="text" value={question.description} disabled/>
                <br />
                <br />
                <span>Respuestas:</span>
                <AnswerList>
                  {question.answers.map((answer, answerIndex) => (
                    <AnswerItem key={answerIndex}>
                                         
                        <div style={{display: 'flex'}}>
                    
                            <Checkbox
                              type={'radio'}
                              checked={answer.correct}
                            />
                        
                          <Input value={answer.description} disabled/>
                        </div>                
                    </AnswerItem>
                  ))}
                </AnswerList>
              </QuestionItem>
            ))}
          </QuestionList>
        </>
      )}
       <NavigationButtons>
          {activeSection!=='jobDescription' ? 
        <Button type="button" onClick={goToPreviousSection} disabled={activeSection === 'personal'}>
        <ChevronLeft size={20} /> Anterior
      </Button>
      : null  
        }
          <Button type="button" onClick={goToNextSection} disabled={jobDescription.length==0}>
            {activeSection==='resume' ? 'Finalizar' : 'Siguiente'} <ChevronRight size={20} />
          </Button>
        </NavigationButtons>
    </div>
  )
}