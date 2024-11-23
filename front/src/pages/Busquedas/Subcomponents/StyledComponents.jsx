import styled from "styled-components";


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

const ButtonGroup = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
`;

export {
    DashboardContainer,
    ErrorMessage,
    Header,
    Title,
    CardGrid,
    CardContainer,
    ColorBar,
    CardContent,
    CardTitle,
    CardCompany,
    CardActions,
    ActionButton,
    Modal,
    ModalContent,
    CloseButton,
    Form,
    FormGroup,
    Label,
    Input,
    ButtonGroup,
};
