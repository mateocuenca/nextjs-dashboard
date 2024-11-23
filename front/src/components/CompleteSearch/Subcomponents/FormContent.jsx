import {useSidebar} from "../../../context/SidebarContext.jsx";
import {
    AnswerItem,
    AnswerList,
    Checkbox,
    DeleteButton,
    Form,
    FormGroup,
    Input,
    Label, NavigationButtons, QuestionItem, QuestionList,
    SelectWrapper,
    SubmitButton,
    TextArea
} from "./StyledComponents.jsx";
import {ChevronLeft, ChevronRight, PencilOff, Trash2, X} from "lucide-react";
import Button from "../../ui/Button.jsx";
import {CircularProgress} from "@mui/material";

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
                         setCompleteSearchModalOpen,
                         setSuccessAlert,
                         jwt
                     }) => {
    const {activeSection, setActiveSection} = useSidebar()

    const sections = ['jobDescription', 'questions', 'resume']

    const goToPreviousSection = () => {
        const currentIndex = sections.indexOf(activeSection)
        if (currentIndex > 0) {
            setActiveSection(sections[currentIndex - 1])
        }
    }

    const updateJobDescription = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BACKEND}/api/search/${searchId}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "x-token": jwt
                },
                body: JSON.stringify({description: jobDescription})
            })

            const result = await response.json()
        } catch (error) {
            console.error(error)
        }
    }

    const goToNextSection = () => {
        const currentIndex = sections.indexOf(activeSection)
        if (currentIndex === 0) {
            updateJobDescription()
        }
        if (currentIndex < sections.length - 1) {
            setActiveSection(sections[currentIndex + 1])
        }
        if (currentIndex === 2) {
            // Fin del formulario: muestra la alerta y cierra el modal
            setSuccessAlert(true);
            setTimeout(() => {
                setCompleteSearchModalOpen(false); // Cierra el modal después de un tiempo
            }, 1000); // Ajusta el tiempo según sea necesario
        }
    }
    const isEquals = () => {
        return currentQuestion !== questions.filter(el => el.id === currentQuestion.id)[0]
    }
    return (
        <div style={{overflowY: 'scroll'}}>
            {activeSection === 'jobDescription' && (
                <>
                    <Form>
                        <FormGroup>
                            <Label htmlFor="description">Descripción del puesto</Label>
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
                    <br/>
                    <br/>
                    <Form onSubmit={handleQuestionSubmit}>
                        {showQuestionsInput ? (
                            <FormGroup>
                                <Label htmlFor="questionText">Pregunta:</Label>
                                <Input
                                    id="questionText"
                                    value={currentQuestion.description}
                                    onChange={(e) => setCurrentQuestion({
                                        ...currentQuestion,
                                        description: e.target.value
                                    })}
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

                                            <div style={{display: 'flex', alignItems: 'center'}}>
                                                <Input
                                                    id={`answer${index}`}
                                                    value={answer.description}
                                                    disabled={answerType === 'input'}
                                                    onChange={(e) => handleAnswerChange(index, 'description', e.target.value)}
                                                    required
                                                />
                                                <DeleteButton onClick={() => handleAnswerDelete(-1, index)}>
                                                    <X size={16}/>
                                                </DeleteButton>
                                            </div>
                                        </div>
                                    </FormGroup>
                                ))}
                                <div style={{display: 'flex', justifyContent: 'space-between'}} className="">
                                    {answerType !== 'input' &&
                                        <Button type="button" onClick={handleAnswerAdd}>Agregar respuesta</Button>}
                                    <div>
                                        <Button type="button" onClick={cancelAddQuestion}>Cancelar</Button>
                                        <SubmitButton disabled={currentQuestion.answers.length === 0 || !isEquals()}
                                                      type="submit">
                                            {isLoading ? <CircularProgress color='white'/> : ''} Guardar
                                        </SubmitButton>
                                    </div>
                                </div>
                            </FormGroup>
                        ) : (

                            <Button onClick={handleQuestionAdd}>Agregar Pregunta</Button>
                        )}
                    </Form>
                    <br/>
                    <QuestionList>
                        {questions.map((question, index) => (
                            <QuestionItem key={index}>
                                <span>Pregunta:</span>
                                <br/>
                                <br/>
                                <Input type="text" value={question.description} disabled/>
                                <br/>
                                <br/>
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
                                <div style={{display: 'flex', justifyContent: 'right', columnGap: '1rem'}}
                                     className="buttons">
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
                    <span><b>Descripción del puesto:</b></span>
                    <p>{jobDescription}</p>
                    <span><b>Preguntas</b></span>
                    <QuestionList>
                        {questions.map((question, index) => (
                            <QuestionItem key={index}>
                                <span>Pregunta:</span>
                                <br/>
                                <br/>
                                <Input type="text" value={question.description} disabled/>
                                <br/>
                                <br/>
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
                {activeSection !== 'jobDescription' ?
                    <Button type="button" onClick={goToPreviousSection} disabled={activeSection === 'personal'}>
                        <ChevronLeft size={20}/> Anterior
                    </Button>
                    : null
                }
                <Button type="button" onClick={goToNextSection} disabled={jobDescription.length == 0}>
                    {activeSection === 'resume' ? 'Finalizar' : 'Siguiente'} <ChevronRight size={20}/>
                </Button>
            </NavigationButtons>
        </div>
    )
}

export default FormContent;