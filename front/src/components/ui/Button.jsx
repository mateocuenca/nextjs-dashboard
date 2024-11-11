import styled from 'styled-components'

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
export default Button