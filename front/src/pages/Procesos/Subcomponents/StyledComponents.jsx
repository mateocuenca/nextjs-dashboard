import styled from "styled-components";

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

const CloseButton = styled.button`
    display: flex;
    margin-left: auto;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
`;

const TabsContainer = styled.div`
    display: flex;
    margin-bottom: 20px;
    background: #f8f9fa;
    padding: 20px;
`;

const Tab = styled.button`
    padding: 10px 20px;
    background-color: ${props => props.active ? '#e9ecef' : '#f8f9fa'};
    color: ${props => props.active ? 'black' : 'black'};
    border: none;
    font-weight: ${props => props.active ? 'bold' : 'normal'};
    border-radius: 5px;
    cursor: pointer;
`;

const CardProceso = styled.div`
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 20px;
    margin-bottom: 20px;
`;


const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
`;

const TextArea = styled.textarea`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
`;

const Select = styled.select`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    background: white;
    border: none;
    border: 1px solid gainsboro;
`;

const ModalProceso = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 4px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export {
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
    TabsContainer, Tab, CardProceso, Input, TextArea, Select, ModalProceso
};
