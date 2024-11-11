import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ChevronRight, Plus, X } from 'lucide-react';
import Button from '../../components/ui/Button';
import TimePicker from 'react-time-picker';
import { DateTimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { ButtonGroup } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #a777e3;
  }
`
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

const Modal = styled.div`
  width: 60%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  display: flex;
  margin-left: auto;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

export default function Configuracion() {
  const navigate = useNavigate()
  const {path} = useParams()
  const [tabValue, setTabValue] = useState(0);
  const [openNewInterview, setOpenNewInterview] = useState(false);
  const [openInterviewDetails, setOpenInterviewDetails] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [openCvModal, setOpenCvModal] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([
    { id: 1, text: "Excelente comunicación durante la entrevista inicial.", author: "Sarah, RRHH" },
    { id: 2, text: "Demostró sólidos conocimientos técnicos.", author: "Mike, Tech Lead" },
  ]);
  const [emailForm, setEmailForm] = useState({ to: 'john.doe@example.com', subject: '', body: '' });
  const [openEmailModal, setOpenEmailModal] = useState(false);
  const [interviews, setInterviews] = useState([
    { id: 1, date: '2023-05-01', type: 'Entrevista inicial', notes: 'Candidate showed great potential.' },
    { id: 2, date: '2023-05-15', type: 'Entrevista tecnica', notes: 'Strong technical skills, especially in React.' },
  ]);
  const [newInterviewNote, setNewInterviewNote] = useState('');

  const handleTabChange = (newValue) => {
    if (newValue===0){
        navigate('/configuracion')
    }
    if (newValue===1){
        navigate('/configuracion/entrevistas')
    }
    if (newValue===2){
        navigate('/configuracion/mensajeria')
    }
    setTabValue(newValue)
  };

  const handleOpenNewInterview = () => {
    setOpenNewInterview(true);
  };

  const handleCloseNewInterview = () => {
    setOpenNewInterview(false);
  };

  const handleAddNewInterview = () => {
    // Add logic to save new interview
    setOpenNewInterview(false);
  };

  const handleAnalyzeWithAI = (interviewId) => {
    // Add logic to analyze interview with AI
    console.log(`Analyzing interview ${interviewId} with AI`);
  };

  const handleOpenInterviewDetails = (interview) => {
    setSelectedInterview(interview);
    setOpenInterviewDetails(true);
    setNewInterviewNote('');
  };

  const handleCloseInterviewDetails = () => {
    setOpenInterviewDetails(false);
  };

  const handleOpenCvModal = () => {
    setOpenCvModal(true);
  };

  const handleCloseCvModal = () => {
    setOpenCvModal(false);
  };

  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      setComments([...comments, { id: comments.length + 1, text: newComment, author: 'Current User' }]);
      setNewComment('');
    }
  };

  const handleEmailChange = (e) => {
    setEmailForm({ ...emailForm, [e.target.name]: e.target.value });
  };

  const handleOpenEmailModal = () => {
    setOpenEmailModal(true);
  };

  const handleCloseEmailModal = () => {
    setOpenEmailModal(false);
  };

  const handleSendEmail = () => {
    // Add logic to send email
    console.log('Sending email:', emailForm);
    // Reset form after sending
    setEmailForm({ ...emailForm, subject: '', body: '' });
    handleCloseEmailModal();
  };

  const handleAddInterviewNote = () => {
    if (newInterviewNote.trim() !== '' && selectedInterview) {
      const updatedInterviews = interviews.map(interview => 
        interview.id === selectedInterview.id 
          ? { ...interview, notes: interview.notes + '\n' + newInterviewNote }
          : interview
      );
      setInterviews(updatedInterviews);
      setSelectedInterview({ ...selectedInterview, notes: selectedInterview.notes + '\n' + newInterviewNote });
      setNewInterviewNote('');
    }
  };

  useEffect (()=>{
    if (path=='entrevistas') {
        setTabValue(1)
    }
    if (path=='mensajeria') {
        setTabValue(2)
    }
  }, [])

  return (
    <div style={{overflowY: 'scroll', background: 'white', padding: '1rem'}}>

    <h2>Configuracion</h2>
      <TabsContainer>
        <Tab active={tabValue === 0} onClick={() => handleTabChange(0)}>Usuarios</Tab>
        <Tab active={tabValue === 1} onClick={() => handleTabChange(1)}>Entrevistas</Tab>
        <Tab active={tabValue === 2} onClick={() => handleTabChange(2)}>Mensajeria</Tab>
        <Tab active={tabValue === 3} onClick={() => handleTabChange(3)}>Otros</Tab>
      </TabsContainer>

      {tabValue === 0 && (
        <div>
          <Card>
            <Button onClick={handleOpenCvModal}>
              + Agregar usuario
            </Button>
          </Card>

          <Card>
            <h6>Usuarios</h6>
            <p>prueba</p>
          </Card>

          
        </div>
      )}

      {tabValue === 1 && (
        <div>
        <p>
            Para poder agendar las reuniones desde la plataforma debes linkear tu cuenta de google
        </p>
          <Button onClick={handleOpenNewInterview}>
            Asociar Cuenta de Google Meet
          </Button>
          <br />
       

          {openInterviewDetails && selectedInterview && (
            <Modal>
              <h2>Detalles de la Entrevista</h2>
              <p><strong>Tipo:</strong> {selectedInterview.type}</p>
              <p><strong>Fecha:</strong> {selectedInterview.date}</p>
              <p><strong>Notas:</strong> {selectedInterview.notes}</p>
              <TextArea
                placeholder="Nueva nota"
                value={newInterviewNote}
                onChange={(e) => setNewInterviewNote(e.target.value)}
              />
              <Button onClick={handleAddInterviewNote}>
                Agregar Nota
              </Button>
              <Button onClick={handleCloseInterviewDetails}>Cerrar</Button>
            </Modal>
          )}
        </div>
      )}

      {tabValue === 2 && (
          <Button onClick={handleOpenEmailModal}>Vincular cuenta de email</Button>
      )}

      {tabValue === 3 && (
        <div>
          <h6>Otros</h6>
          <p>Esta sección puede ser utilizada para información adicional o funcionalidades futuras.</p>
        </div>
      )}

      {openCvModal && (
        <Modal>
          <h2>Agregar Usuario</h2>
          <label htmlFor=""> Nombre
          <Input type="text" placeholder='nombre'/>
          </label>
          <br />
          <label htmlFor=""> Apellido
          <Input type="text" placeholder='apellido'/>
          </label>
          <br />
          <label htmlFor=""> email
          <Input type="email" placeholder='email'/>
          </label>
          <br />
          <label htmlFor="">password
          <Input type="password" placeholder='***********'/>
          </label>
          <br />
          <br />
          <Button onClick={handleCloseCvModal}>Guardar</Button>
        </Modal>
      )}

      {openEmailModal && (
        <Modal>
          <h2>Enviar Email</h2>
          <Input
            name="to"
            placeholder="Para"
            value={emailForm.to}
            disabled
          />
          <Input
            name="subject"
            placeholder="Asunto"
            value={emailForm.subject}
            onChange={handleEmailChange}
          />
          <TextArea
            name="body"
            placeholder="Cuerpo del Email"
            value={emailForm.body}
            onChange={handleEmailChange}
          />
          <div style={{display: 'flex'}}>
          <Button onClick={handleCloseEmailModal}>Cancelar</Button>
          <Button onClick={handleSendEmail}>Enviar</Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
