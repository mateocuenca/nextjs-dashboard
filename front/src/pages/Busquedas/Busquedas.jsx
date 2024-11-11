import React, {useState, useMemo} from 'react';
import styled from 'styled-components';
import {Search, Plus, MoreVertical, Upload, X,} from 'lucide-react';
import {CircularProgress} from '@mui/material';
import {useUserContext} from '../../context/UserContext';
import {useNavigate} from 'react-router-dom';
import Procesos from '../Procesos/Procesos.jsx'
import {useEffect} from 'react';
import {Link} from 'react-router-dom';
import Button from '../../components/ui/Button.jsx';
// Styled components (unchanged)
const DashboardContainer = styled.div`
    margin: 0 auto;
    padding: 1rem;
    font-family: Arial, sans-serif;
    background: white;
`;
const ErrorMessage = styled.span`
    color: red;
`;

const Header = styled.div`
    display: flex;
    flex-wrap: wrap;
    row-gap: 1rem;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: bold;
`;

const SearchContainer = styled.div`
    position: relative;
    width: 300px;
`;

const SearchInput = styled.input`
    width: 100%;
    padding: 10px 10px 10px 40px;
    border: 1px solid #ccc;
    border-radius: 20px;
    font-size: 14px;
`;

const SearchIcon = styled(Search)`
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #888;
`;


const CardGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
`;

const CardContainer = styled.div`
    display: flex;
    flex-direction: row;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border: 1px solid gainsboro;
    padding: 1rem;
    overflow: hidden;
`;

const ColorBar = styled.div`
    background-color: ${(props) => props.color};
    width: 8px;
    height: 100%;
    border-radius: 4px 0 0 4px;
    margin-right: 16px;
`;

const CardImage = styled.img`
    width: 100%;
    height: 200px;
    object-fit: cover;
`;

const CardContent = styled.div`
    padding: 0px;
`;

const CardTitle = styled.h2`
    font-size: 18px;
    margin: 0 0 5px 0;
`;

const CardCompany = styled.p`
    font-size: 14px;
    color: #666;
    height: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
`;

const CardDate = styled.p`
    font-size: 12px;
    color: #888;
    margin: 0;
`;

const CardActions = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
`;

const ActionButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    color: white;
`;

// Updated Modal styles
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
`;

const ModalContent = styled.div`
    background-color: white;
    padding: 30px;
    border-radius: 12px;
    width: 500px;
    max-width: 90%;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    position: relative;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 20px;
    color: #6b7280;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const Label = styled.label`
    font-size: 14px;
    font-weight: 600;
    color: #374151;
`;

const Input = styled.input`
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 16px;
    transition: border-color 0.3s;

    &:focus {
        outline: none;
        border-color: #6366f1;
    }
`;

const TextArea = styled.textarea`
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 16px;
    min-height: 100px;
    resize: vertical;
    transition: border-color 0.3s;

    &:focus {
        outline: none;
        border-color: #6366f1;
    }
`;

const Select = styled.select`
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 16px;
    transition: border-color 0.3s;

    &:focus {
        outline: none;
        border-color: #6366f1;
    }
`;

const FileInput = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const FileInputLabel = styled.label`
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 10px 15px;
    background-color: #f3f4f6;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #e5e7eb;
    }
`;

const HiddenFileInput = styled.input`
    display: none;
`;

const FileName = styled.span`
    font-size: 14px;
    color: #6b7280;
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
`;

const Card = ({card, handleCardStatusChange}) => {

    const randomColor = useMemo(() => {
        const getRandomColor = () => {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        };
        return getRandomColor();
    }, []); // Dependencias vacías para que se ejecute solo una vez

    return (
        <CardContainer key={card.id}>
            <ColorBar color={randomColor}/>
            <Link to={'/busquedas/' + card.uuid}>
                <CardContent>
                    <CardTitle>{card.name}</CardTitle>
                    <CardCompany>{card.description}</CardCompany>
                </CardContent>
                <CardActions>
                    <ActionButton
                        onClick={() => handleCardStatusChange(card.id, card.status === 'active' ? 'inactive' : 'active')}>
                        <MoreVertical size={20}/>
                    </ActionButton>
                </CardActions>
            </Link>
        </CardContainer>
    )
}

// Main component
export default function Busquedas() {
    const {jwt, login, logout} = useUserContext()

    const [cards, setCards] = useState([])
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalCandidateOpen, setIsModalCandidateOpen] = useState(false);
    const [newCard, setNewCard] = useState({title: '', description: '', image: null, status: 'active', state: ''});
    const [nombreBusqueda, setNombreBusqueda] = useState('');

    const [fileName, setFileName] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
        console.log(e.target.files[0])
    };

    const filteredCards = cards.filter(card =>
        card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const uploadImage = async () => {
        if (!image) {
            alert('Please select an image');
            return;
        }
        console.log(image)


        // Prepara el objeto FormData para enviar la imagen
        const formData = new FormData();
        formData.append('file', image);

        try {
            const url = "https://workers.waltercristanchi21.workers.dev/corsproxy/?apiurl=" + "https://api.cloudflare.com/client/v4/accounts/6d3968a12887f506ccd23d6be6b5edce/images/v1"
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer aDCHmREtIPdy2JVaduV8Cz_hwukIzcXCPp8eBwup`,
                },
                body: formData,
            });

            const data = await response.json();
            return data
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleAddCard = async (event) => {
        event.preventDefault();
        console.log(newCard)
        setIsLoading(true)
        /*
        const newCardWithId = { ...newCard, id: cards.length + 1, company: 'Company Name', date: `Opened ${new Date().toLocaleDateString()}` };
        setCards([...cards, newCardWithId]);
        setNewCard({ title: '', description: '', image: null, status: 'active', state: '' });
        setFileName('');
         */
        // const image = await uploadImage()
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

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setNewCard({...newCard, image: URL.createObjectURL(file)});
            setFileName(file.name);
        }
    };

    const getAllSearches = async () => {
        try {

            let result = await fetch('http://localhost:5001/api/search/')
            result = await result.json()
            console.log(result)
            setCards(result)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllSearches()
    }, []);

    return (
        <DashboardContainer>
            <Header>
                <Title>Busquedas</Title>
                <SearchContainer>
                    <SearchIcon size={20}/>
                    <SearchInput
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </SearchContainer>
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