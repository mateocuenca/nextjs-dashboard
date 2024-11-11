import React, {useState} from 'react';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import styled from 'styled-components';
import {Plus, Briefcase, ListOrdered, Filter, MoreVertical, X} from 'lucide-react';
import {useParams} from 'react-router-dom';
import {useEffect} from 'react';
import Proceso from '../Procesos/Proceso.jsx'
import CompleteSearch from '../../components/CompleteSearch.jsx';
import {useUserContext} from '../../context/UserContext.jsx';
// Styled components (existing styles remain unchanged)
const Container = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 100%;
    overflow-x: hidden;
`;

const Header = styled.div`
    padding: 16px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`;

const Title = styled.h1`
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 16px;

    @media (max-width: 768px) {
        font-size: 1.5rem;
    }
`;

const ButtonGroup = styled.div`
    padding: 16px;
    display: flex;
    justify-content: flex-end;
    column-gap: 1rem;
    row-gap: 1rem;
    flex-wrap: wrap;
    width: 100%;
`;

const Button = styled.button`
    background-color: #6366f1;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 14px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;

    &:hover {
        background-color: #4f46e5;
    }
`;

const ColumnsContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    row-gap: 1rem;
    overflow-x: auto;
    min-height: 480px;
    padding-bottom: 16px;

    @media (max-width: 768px) {
        flex-direction: column;
        overflow-x: hidden;
    }
`;

const Column = styled.div`
    min-width: 280px;
    width: 280px;
    height: fit-content;
    max-height: 480px;
    min-height: 480px;
    overflow-y: scroll;
    margin-right: 16px;
    background-color: ${props => props.isDraggingOver ? '#e3f2fd' : 'white'};
    border-radius: 4px;
    padding: 16px;
    flex-shrink: 0;

    @media (max-width: 768px) {
        width: 100%;
        margin-right: 0;
        margin-bottom: 16px;
    }
`;

const ColumnHeader = styled.div`
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ColumnTitle = styled.h2`
    font-size: 1.25rem;
    font-weight: bold;
`;

const IconButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    color: #757575;

    &:hover {
        color: #424242;
    }
`;

const Card = styled.div`
    margin-bottom: 8px;
    box-shadow: ${props => props.isDragging ? '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)' : '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'};
    background-color: white;
    border-radius: 4px;
    padding: 16px;
`;

const CardContent = styled.div`
    display: flex;
    align-items: center;
`;

const CardTitle = styled.p`
    font-size: 1rem;
    margin-bottom: 8px;
`;

const CardSubtitle = styled.p`
    font-size: 0.875rem;
    color: #757575;
`;

const CardActions = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 8px;
`;

const Checkbox = styled.input`
    margin-right: 8px;
`;

const ActionMenu = styled.div`
    position: absolute;
    right: 0;
    top: 100%;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
`;

const ActionMenuItem = styled.button`
    display: block;
    width: 100%;
    padding: 8px 16px;
    text-align: left;
    background: none;
    border: none;
    cursor: pointer;

    &:hover {
        background-color: #f5f5f5;
    }

    &:disabled {
        color: #ccc;
        cursor: not-allowed;
    }
`;

const FilterContainer = styled.div`
    margin-top: 8px;
    padding: 8px;
    background-color: #f5f5f5;
    border-radius: 4px;
`;

const FilterLabel = styled.label`
    display: block;
    margin-bottom: 4px;
`;

const FilterInput = styled.input`
    width: 100%;
    padding: 4px;
    border: 1px solid #ddd;
    border-radius: 4px;
`;

const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`

const ModalContent = styled.div`
    background-color: white;
    border-radius: 10px;
    width: 90%;
    max-width: 1200px;
    height: 90vh;
    display: flex;
    padding: 1rem;
    overflow-y: scroll;
    flex-direction: column;
    overflow: hidden;
`
const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
`;

const ModalTitle = styled.h2`
    font-size: 1.5rem;
    font-weight: bold;
`;

const CloseButton = styled.button`
    display: flex;
    margin-left: auto;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
`;


// Component
export default function Component() {
    const {id} = useParams();
    const {jwt, login, logout} = useUserContext()
    const [isLoading, setIsLoading] = useState(true)
    const [currentSearch, setCurrentSearch] = useState({})
    const [columns, setColumns] = useState([]);
    const [selectedCards, setSelectedCards] = useState({});
    const [showCheckboxes, setShowCheckboxes] = useState({});
    const [assuranceFilter, setAssuranceFilter] = useState({});
    const [actionMenuOpen, setActionMenuOpen] = useState({});
    const [completeSearchModalOpen, setCompleteSearchModalOpen] = useState(false);
    const [candidateModalOpen, setCandidateModalOpen] = useState(false);
    const [currentCandidate, setCurrentCandidate] = useState({})
    const [questionsModalOpen, setQuestionsModalOpen] = useState(false);
    const [jobDescription, setJobDescription] = useState({
        searchName: '',
        description: '',
        city: ''
    });


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

        setColumns(newColumns)
        console.log(newColumns)
        setIsLoading(false)
    }

    const handleAddColumn = () => {
        const newColumnId = `column-${Object.keys(columns).length + 1}`;
        setColumns({
            ...columns,
            [newColumnId]: {
                id: newColumnId,
                title: `New Column ${Object.keys(columns).length + 1}`,
                cards: []
            }
        });
    };

    const handleCardSelect = (columnId, cardIndex) => {
        setSelectedCards(prev => ({
            ...prev,
            [columnId]: {
                ...prev[columnId],
                [cardIndex]: !prev[columnId]?.[cardIndex]
            }
        }));
    };

    const toggleCheckboxes = (columnId) => {
        setShowCheckboxes(prev => ({
            ...prev,
            [columnId]: !prev[columnId]
        }));
    };

    const handleAssuranceFilterChange = (columnId, value) => {
        setAssuranceFilter(prev => ({
            ...prev,
            [columnId]: value
        }));
    };

    const toggleActionMenu = (columnId) => {
        setActionMenuOpen(prev => ({
            ...prev,
            [columnId]: !prev[columnId]
        }));
    };

    const moveSelectedCards = (sourceColumnId, destinationColumnId) => {
        const sourceColumn = columns[sourceColumnId];
        const destColumn = columns[destinationColumnId];
        const movedCards = sourceColumn.cards.filter((_, index) => selectedCards[sourceColumnId]?.[index]);
        const remainingCards = sourceColumn.cards.filter((_, index) => !selectedCards[sourceColumnId]?.[index]);

        setColumns({
            ...columns,
            [sourceColumnId]: {
                ...sourceColumn,
                cards: remainingCards
            },
            [destinationColumnId]: {
                ...destColumn,
                cards: [...destColumn.cards, ...movedCards]
            }
        });

        setSelectedCards({
            ...selectedCards,
            [sourceColumnId]: {}
        });
    };

    const isAnyCardSelected = function (columnId) {
        return Object.values(selectedCards[columnId] || {}).some(Boolean);
    };

    const handleJobDescriptionSubmit = (e) => {
        e.preventDefault();
        // Here you would typically save the job description data
        console.log('Job Description:', jobDescription);
        setJobDescriptionModalOpen(false);
    };


    const getSearch = async () => {
        try {

            let result = await fetch('http://localhost:5001/api/search/' + id)
            result = await result.json()
            console.log(result)
            setCurrentSearch(result)
            if (!result.description || result.description.length === 0) {
                setCompleteSearchModalOpen(true)
            } else {
                setCompleteSearchModalOpen(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getAllProcess = async () => {
        try {

            let result = await fetch('http://localhost:5001/api/process/getAllCandidateProcess/' + id)
            result = await result.json()
            console.log(result)
            setColumns(result)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getSearch()
        getAllProcess()

    }, []);


    const openCandidateModal = (card) => {
        console.log(card)
        setCurrentCandidate(card)
        setCandidateModalOpen(true)
    }

    return (
        <Container>
            <Header>
                <Title>Busqueda: Scrum Master</Title>
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
                                                <IconButton onClick={() => toggleCheckboxes(columnId)}>
                                                    <Filter size={16}/>
                                                </IconButton>
                                                <IconButton onClick={() => toggleActionMenu(columnId)}>
                                                    <MoreVertical size={16}/>
                                                </IconButton>
                                                {actionMenuOpen[columnId] && (
                                                    <ActionMenu>
                                                        {Object.keys(columns).filter(key => key !== columnId).map(destColumnId => (
                                                            <ActionMenuItem
                                                                key={destColumnId}
                                                                onClick={() => moveSelectedCards(columnId, destColumnId)}
                                                                disabled={!isAnyCardSelected(columnId)}
                                                            >
                                                                Move selected to {columns[destColumnId].title}
                                                            </ActionMenuItem>
                                                        ))}
                                                        <FilterContainer>
                                                            <FilterLabel>Assurance Filter (%)</FilterLabel>
                                                            <FilterInput
                                                                type="number"
                                                                min="0"
                                                                max="100"
                                                                value={assuranceFilter[columnId] || ''}
                                                                onChange={(e) => handleAssuranceFilterChange(columnId, e.target.value)}
                                                            />
                                                        </FilterContainer>
                                                    </ActionMenu>
                                                )}
                                            </div>
                                        </ColumnHeader>
                                        {column.cards
                                            .filter(card => !assuranceFilter[columnId] || parseInt(card.assurance) >= assuranceFilter[columnId])
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
                                                                    <CardSubtitle>Assurance: {card.coincidence}%</CardSubtitle>
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