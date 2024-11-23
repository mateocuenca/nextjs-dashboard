import styled from "styled-components";

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

const Card = styled.div`
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 20px;
    margin-bottom: 20px;
`;

export {TabsContainer, Tab, Card};