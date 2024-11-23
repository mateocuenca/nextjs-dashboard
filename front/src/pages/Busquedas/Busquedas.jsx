import {useState} from 'react';
import {Plus, X,} from 'lucide-react';
import {CircularProgress} from '@mui/material';
import {useUserContext} from '../../context/UserContext';
import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import {
    DashboardContainer,
    ErrorMessage,
    Header,
    Title,
    CardGrid,
    Modal,
    ModalContent,
    CloseButton,
    Form,
    FormGroup,
    Label,
    Input,
    ButtonGroup,
} from "./Subcomponents/StyledComponents.jsx"
import Button from '../../components/ui/Button.jsx';
import Card from './Subcomponents/Card.jsx';


export default function Busquedas() {

    // Estados iniciales y variables
    const {jwt} = useUserContext()
    const [cards, setCards] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newCard, setNewCard] = useState({title: '', description: '', image: null, status: 'active', state: ''});
    const [nombreBusqueda, setNombreBusqueda] = useState('');
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    // Utils
    const filteredCards = cards.filter(card =>
        card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handlers
    const handleAddCard = async (event) => {
        event.preventDefault();
        setIsLoading(true)
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BACKEND}/api/search`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "x-token": jwt
                },
                body: JSON.stringify({name: nombreBusqueda})
            })

            const result = await response.json()

            if (result.error) {
                setError(result.msg)
            } else if (result.success) {
                // Assuming you have a login function in your context
                navigate('/busquedas/' + result.uuid)
            }
        } catch (e) {
            console.error(e)
            setError('Ha ocurrido un error. Por favor, inténtalo de nuevo.')
        }


    };


    const handleCardStatusChange = (id, newStatus) => {
        setCards(cards.map(card =>
            card.id === id ? {...card, status: newStatus} : card
        ));
    };

    // API
    const getAllSearches = async () => {
        try {

            let result = await fetch('http://localhost:5001/api/search/', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "x-token": jwt
                }
            })
            result = await result.json()
            setCards(result)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getAllSearches()
    }, []);

    return (
        <DashboardContainer>
            <Header>
                <Title>Busquedas</Title>
                <Button onClick={() => setIsModalOpen(true)}>
                    <Plus size={16}/>
                    Nueva busqueda
                </Button>
            </Header>

            <CardGrid>
                {filteredCards.map(card => (
                    <Card key={card.id} card={card} handleCardStatusChange={handleCardStatusChange}/>
                ))}
            </CardGrid>

            {isModalOpen && (
                <Modal>
                    <ModalContent>
                        <CloseButton onClick={() => setIsModalOpen(false)}>
                            <X size={24}/>
                        </CloseButton>
                        <Form onSubmit={handleAddCard}>
                            <FormGroup>
                                <Label htmlFor="title">Nombre de la busqueda</Label>
                                <Input
                                    id="title"
                                    type="text"
                                    placeholder="busqueda..."
                                    value={nombreBusqueda}
                                    onChange={(e) => setNombreBusqueda((e.target.value))}
                                    required
                                />
                            </FormGroup>
                            <ButtonGroup>
                                <Button type="button" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                                <Button type="submit"> {isLoading ? <CircularProgress color='white'/> : ''} Agregar
                                    busqueda</Button>
                            </ButtonGroup>
                            {error ? <ErrorMessage>{error}</ErrorMessage> : ''}
                        </Form>
                    </ModalContent>
                </Modal>
            )}
        </DashboardContainer>
    );
}