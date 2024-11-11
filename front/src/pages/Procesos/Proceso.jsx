import React, { useState } from 'react';
import styled from 'styled-components';
import { ChevronRight, Plus, X } from 'lucide-react';
import Button from '../../components/ui/Button';
import TimePicker from 'react-time-picker';
import { DateTimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { ButtonGroup } from '@mui/material';

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

const Modal = styled.div`
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

export default function Proceso(props) {
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
    setTabValue(newValue);
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

  return (
    <div style={{overflowY: 'scroll'}}>
      <div style={{ margin: '20px 0' }}>
        <span>{props.candidateName}</span>
        <ChevronRight />
        <span>Analista de QA</span>
      </div>

      <TabsContainer>
        <Tab active={tabValue === 0} onClick={() => handleTabChange(0)}>Detalles</Tab>
        <Tab active={tabValue === 1} onClick={() => handleTabChange(1)}>Entrevistas</Tab>
        <Tab active={tabValue === 2} onClick={() => handleTabChange(2)}>Mensajeria</Tab>
        <Tab active={tabValue === 3} onClick={() => handleTabChange(3)}>Otros</Tab>
      </TabsContainer>

      {tabValue === 0 && (
        <div>
          <Card>
            <h6>Información Personal</h6>
            <p>Nombre: {props.currentCandidate.candidateName}</p>
            <p>Email: {props.currentCandidate.email}</p>
            <p>Teléfono: {props.currentCandidate.phone}</p>
            <Button onClick={handleOpenCvModal}>
              Ver CV
            </Button>
          </Card>

          <Card>
            <h6>Análisis de CV con IA</h6>
            <p>{props.currentCandidate.analysys}</p>
          </Card>

          <Card>
            <h6>Comentarios</h6>
            <ul>
              {comments.map((comment) => (
                <li key={comment.id}>
                  <p>{comment.text}</p>
                  <small>{comment.author}</small>
                </li>
              ))}
            </ul>
            <Input
              placeholder="Nuevo comentario"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button onClick={handleAddComment}>
              Agregar Comentario
            </Button>
          </Card>
        </div>
      )}

      {tabValue === 1 && (
        <div>
          <Button onClick={handleOpenNewInterview}>
            Nueva Entrevista
          </Button>
          <br />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
            {interviews.map((interview) => (
              <Card key={interview.id}>
                <h6>{interview.type}</h6>
                <p>Fecha: {interview.date}</p>
                <p>Notas: {interview.notes}</p>
                <Button onClick={() => handleOpenInterviewDetails(interview)}>
                  Ver Detalles
                </Button>
                <br />
                <Button onClick={() => handleAnalyzeWithAI(interview.id)}>
                  Analizar con IA
                </Button>
              </Card>
            ))}
          </div>

          {openNewInterview && (
            <Modal>
              <h2>Nueva Entrevista</h2>
              <label htmlFor="select-tipo-entrevista">Fecha</label> <br />
              <LocalizationProvider dateAdapter={AdapterMoment}>
              <DateTimePicker label="selecciona la fecha de la entrevista" />
             </LocalizationProvider>
             <label htmlFor="select-tipo-entrevista">Tipo de entrevista <br />
              <Select id='select-tipo-entrevista' name = 'select-tipo-entrevista'>
                <option value="Entrevista inicial">Entrevista inicial</option>
                <option value="Entrevista tecnica">Entrevista técnica</option>
                <option value="Entrevista con el equipo">Entrevista con el equipo</option>
              </Select>
              </label> 
              <label htmlFor="select-tipo-entrevista">Lugar de la entrevista

              <Select id='select-tipo-entrevista' name = 'select-tipo-entrevista'>
                <option value="Entrevista inicial">Google Meet</option>
                <option value="Entrevista tecnica">Zoom</option>
                <option value="Entrevista con el equipo">Microsoft Teams</option>
              </Select>
              </label> <br />
             <label htmlFor="meet">
             <input type="checkbox" name="meet" id="meet" /> crear link automaticamente (para esto es necesario tener integrado google meet)
             <Input placeholder='si no esta la integracion muestro el input para agregar el link'/>
             </label>
            <br />
            <ButtonGroup>
            <Button onClick={handleAddNewInterview}>Agregar</Button>
              <Button onClick={()=>setOpenNewInterview(false)}>Cancelar</Button>

            </ButtonGroup>
            </Modal>
          )}

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
        <ButtonGroup style={{columnGap: '1rem'}}>
          <Button onClick={handleOpenEmailModal}>Enviar Email</Button>
          <Button onClick={handleOpenEmailModal}>Enviar Whatsapp</Button>
          </ButtonGroup>
      )}

      {tabValue === 3 && (
        <div>
          <h6>Otros</h6>
          <p>Esta sección puede ser utilizada para información adicional o funcionalidades futuras.</p>
        </div>
      )}

      {openCvModal && (
        <Modal>
          <h2>CV del Candidato</h2>
          <p>[Aquí se mostraría el CV del candidato. Puede ser un PDF embebido o el contenido formateado del CV.]</p>
          <Button onClick={handleCloseCvModal}>Cerrar</Button>
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
