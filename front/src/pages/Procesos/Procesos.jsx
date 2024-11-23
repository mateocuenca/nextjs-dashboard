import {useState} from 'react';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import {Briefcase, MoreVertical, X} from 'lucide-react';
import {useParams} from 'react-router-dom';
import {useEffect} from 'react';
import Proceso from './Subcomponents/Proceso.jsx'
import CompleteSearch from '../../components/CompleteSearch/CompleteSearch.jsx';
import {useUserContext} from '../../context/UserContext.jsx';
import CopyToClipboardButton from "../../components/ui/CopyToClipboardButton.jsx";
import {
    Container,
    Header,
    Title,
    Button,
    ColumnsContainer,
    Column,
    ColumnHeader,
    ColumnTitle,
    IconButton,
    Card,
    CardContent,
    CardTitle,
    CardSubtitle,
    CardActions,
    Checkbox,
    ActionMenu,
    FilterContainer,
    FilterLabel,
    FilterInput,
    Modal,
    ModalContent,
    ModalHeader,
    CloseButton,
} from "./Subcomponents/StyledComponents.jsx"


// Component
export default function Procesos() {

    // Estados y variables iniciales
    const {id} = useParams();
    const {jwt} = useUserContext()
    const [isLoading, setIsLoading] = useState(true)
    const [currentSearch, setCurrentSearch] = useState({})
    const [columns, setColumns] = useState([]);
    const [selectedCards, setSelectedCards] = useState({});
    const [showCheckboxes] = useState({});
    const [assuranceFilter, setAssuranceFilter] = useState({});
    const [correctAnswersFilter, setCorrectAnswersFilter] = useState({});
    const [actionMenuOpen, setActionMenuOpen] = useState({});
    const [completeSearchModalOpen, setCompleteSearchModalOpen] = useState(false);
    const [candidateModalOpen, setCandidateModalOpen] = useState(false);
    const [currentCandidate, setCurrentCandidate] = useState({})
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [respuestasCorrectas, setRespuestasCorrectas] = useState([]);

    // Handlers
    const handleDragEnd = (result) => {
        const {source, destination} = result
        if (!destination) return

        const sourceColIndex = parseInt(source.droppableId)
        const destColIndex = parseInt(destination.droppableId)

        const newColumns = [...columns]
        const sourceColumn = newColumns[sourceColIndex]
        const destColumn = newColumns[destColIndex]

        const [movedCard] = sourceColumn.cards.splice(source.index, 1)
        destColumn.cards.splice(destination.index, 0, movedCard)

        const processId = movedCard.processId
        const stateId = destColumn.stateId

        updateColumnInDatabase(processId, stateId)

        setColumns(newColumns)
        setIsLoading(false)
    }

    const handleCardSelect = (columnId, cardIndex) => {
        setSelectedCards(prev => ({
            ...prev,
            [columnId]: {
                ...prev[columnId],
                [cardIndex]: !prev[columnId]?.[cardIndex]
            }
        }));
    };

    const handleAssuranceFilterChange = (columnId, value) => {
        const valueInt = parseInt(value, 10) || 0;
        setAssuranceFilter(prev => ({
            ...prev,
            [columnId]: valueInt
        }));
    };

    const handleCorrectAnswersFilterChange = (columnId, value) => {
        setCorrectAnswersFilter(prev => ({
            ...prev,
            [columnId]: value
        }));
    }

    const toggleActionMenu = (columnId) => {
        setActionMenuOpen(prev => ({
            ...prev,
            [columnId]: !prev[columnId]
        }));
    };

    // API
    const getSearch = async () => {
        try {

            let result = await fetch('http://localhost:5001/api/search/' + id,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-token': jwt
                    }
                })
            result = await result.json()
            setCurrentSearch(result)
            if (!result.description || result.description.length === 0) {
                setCompleteSearchModalOpen(true)
            } else {
                setCompleteSearchModalOpen(false)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const getAllProcess = async () => {
        try {

            let result = await fetch('http://localhost:5001/api/process/getAllCandidateProcess/' + id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-token': jwt
                }
            })
            result = await result.json()
            setColumns(result)
            setIsLoading(false)
        } catch (error) {
            console.error(error)
        }
    }

    const obtenerRespuestasCorrectas = (preguntas) => {
        return preguntas.map(pregunta => {
            const respuestaCorrecta = pregunta.answers.find(respuesta => respuesta.correct === 1);
            return {
                preguntaId: pregunta.id,
                respuestaCorrectaId: respuestaCorrecta ? respuestaCorrecta.id : null
            };
        });
    }

    const getAllQuestions = async () => {
        try {
            let result = await fetch('http://localhost:5001/api/questions/' + id, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "x-token": jwt
                }
            })
            result = await result.json()
            setQuestions(result.questions)
            setRespuestasCorrectas(obtenerRespuestasCorrectas(result.questions))
        } catch (error) {
            console.error(error)
        }
    }

    const getAllAnswers = async () => {
        try {
            let result = await fetch('http://localhost:5001/api/candidateAnswers/', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "x-token": jwt
                }
            })
            result = await result.json()
            setAnswers(result)
        } catch (error) {
            console.error(error)
        }
    }

    const updateColumnInDatabase = async (processId, statusId) => {
        try {
            const response = await fetch(`http://localhost:5001/api/process/${processId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-token': jwt
                },
                body: JSON.stringify({fieldsToUpdate: {status: statusId}}) // Aquí faltaba un paréntesis de cierre
            });
            if (!response.ok) {
                throw new Error('Error al actualizar la columna');
            }
        } catch (error) {
            console.error('Error actualizando la columna:', error);
        }
    };

    useEffect(() => {
        getSearch()
        getAllProcess()
        getAllQuestions()
        getAllAnswers()
    }, []);


    const openCandidateModal = (card) => {
        setCurrentCandidate(card)
        setCandidateModalOpen(true)
    }

    const validarRespuestas = (processId, respuestas, respuestasCorrectas) => {
        // Filtrar las respuestas del proceso específico
        const respuestasDelProceso = respuestas.filter(respuesta => respuesta.processId === processId);

        // Validar si todas las respuestas coinciden con las respuestas correctas
        return respuestasDelProceso.every(respuesta => {
            const respuestaCorrecta = respuestasCorrectas.find(rc => rc.preguntaId === respuesta.questionId);
            return respuestaCorrecta && respuesta.answerId === respuestaCorrecta.respuestaCorrectaId;
        });
    }

    return (
        <Container>
            <Header>
                <Title>{currentSearch.name}</Title>
                <CopyToClipboardButton searchUuid={currentSearch.uuid}/>
                <Button onClick={() => setCompleteSearchModalOpen(true)}>
                    <Briefcase size={16}/>
                    Editar busqueda
                </Button>
            </Header>

            {columns[0] && ((columns[0].cards.length) || (columns[1].cards.length) || (columns[2].cards.length) || (columns[3].cards.length) || (columns[4].cards.length)) > 0 ?
                <DragDropContext onDragEnd={handleDragEnd}>
                    <ColumnsContainer>
                        {Object.entries(columns).map(([columnId, column]) => (
                            <Droppable droppableId={columnId} key={columnId}>
                                {(provided, snapshot) => (
                                    <Column
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        isDraggingOver={snapshot.isDraggingOver}
                                    >
                                        <ColumnHeader>
                                            <ColumnTitle>{column.description}</ColumnTitle>
                                            <div style={{position: 'relative'}}>
                                                <IconButton onClick={() => toggleActionMenu(columnId)}>
                                                    <MoreVertical size={16}/>
                                                </IconButton>
                                                {actionMenuOpen[columnId] && (
                                                    <ActionMenu>
                                                        <FilterContainer>
                                                            <FilterLabel>Filtro de afinidad (%)</FilterLabel>
                                                            <FilterInput
                                                                type="number"
                                                                min="0"
                                                                max="100"
                                                                value={assuranceFilter[columnId] || ''}
                                                                onChange={(e) => handleAssuranceFilterChange(columnId, e.target.value)}
                                                            />
                                                        </FilterContainer>
                                                        <FilterContainer>
                                                            <FilterLabel>Filtro de respuestas correctas</FilterLabel>
                                                            <Checkbox
                                                                type="checkbox"
                                                                onChange={(e) => handleCorrectAnswersFilterChange(columnId, e.target.checked)}
                                                            />
                                                        </FilterContainer>
                                                    </ActionMenu>
                                                )}
                                            </div>
                                        </ColumnHeader>
                                        {column.cards
                                            .filter(card => {
                                                const pasaFiltroCoincidencia = !assuranceFilter[columnId] || parseInt(card.coincidence) >= assuranceFilter[columnId];
                                                const pasaFiltroRespuestas = !correctAnswersFilter[columnId] || validarRespuestas(card.processId, answers, respuestasCorrectas);
                                                return pasaFiltroCoincidencia && pasaFiltroRespuestas;
                                            })
                                            .map((card, index) => (
                                                <Draggable key={card.processId} draggableId={card.processId.toString()}
                                                           index={index}>
                                                    {(provided, snapshot) => (
                                                        <Card
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            isDragging={snapshot.isDragging}
                                                        >
                                                            <CardContent>
                                                                {showCheckboxes[columnId] && (
                                                                    <Checkbox
                                                                        type="checkbox"
                                                                        checked={selectedCards[columnId]?.[index] || false}
                                                                        onChange={() => handleCardSelect(columnId, index)}
                                                                    />
                                                                )}
                                                                <div>
                                                                    <CardTitle>{card.candidateName}</CardTitle>
                                                                    <CardSubtitle>Afinidad: {card.coincidence}%</CardSubtitle>
                                                                </div>
                                                            </CardContent>
                                                            <CardActions>
                                                                <IconButton onClick={() => openCandidateModal(card)}
                                                                            title="View Details">
                                                                    <MoreVertical size={16}/>
                                                                </IconButton>
                                                            </CardActions>
                                                        </Card>
                                                    )}
                                                </Draggable>
                                            ))}
                                        {provided.placeholder}
                                    </Column>
                                )}
                            </Droppable>
                        ))}
                    </ColumnsContainer>
                </DragDropContext>
                : isLoading ? <span>cargando...</span> :
                    <span>No existen candidatos, cuando un candidato se  postule lo veras aqui</span>
            }
            {completeSearchModalOpen && (
                <Modal>
                    <ModalContent>
                        <CompleteSearch setCompleteSearchModalOpen={setCompleteSearchModalOpen}
                                        currentSearch={currentSearch} searchId={id} jwt={jwt}/>
                    </ModalContent>
                </Modal>
            )}
            {candidateModalOpen && (
                <Modal>
                    <ModalContent>
                        <ModalHeader>
                            <CloseButton onClick={() => setCandidateModalOpen(false)}>
                                <X size={24}/>
                            </CloseButton>
                        </ModalHeader>
                        <Proceso currentCandidate={currentCandidate}/>
                    </ModalContent>
                </Modal>
            )}

        </Container>
    );
}