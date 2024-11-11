import React, { useState } from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Modal,
  Paper,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Radio,
  RadioGroup,
} from '@mui/material';
import { PlusCircle, Edit, Trash2, FileText, Linkedin, Github, X } from 'lucide-react';

export default function AgregarBusqueda() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    searchName: '',
    jobDescription: '',
    location: '',
    attachCV: false,
    includeLinkedIn: false,
    includeGitHub: false,
    questions: [],
  });
  const [openQuestionModal, setOpenQuestionModal] = useState(false);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [errors, setErrors] = useState({});

  const validateBasicInfo = () => {
    const newErrors = {};
    if (!formData.searchName.trim()) newErrors.searchName = 'Search Name is required';
    if (!formData.jobDescription.trim()) newErrors.jobDescription = 'Job Description is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateQuestionForm = () => {
    if (!currentQuestion) return false;
    const newErrors = {};
    if (!currentQuestion.text.trim()) newErrors.questionText = 'Question text is required';
    if (currentQuestion.points === '' || isNaN(currentQuestion.points)) newErrors.points = 'Valid points are required';
    if (currentQuestion.options.length < 2) newErrors.options = 'At least two options are required';
    if (!currentQuestion.options.some(opt => opt.isCorrect)) newErrors.correctOption = 'One correct option is required';
    if (currentQuestion.options.some(opt => !opt.text.trim())) newErrors.optionText = 'All option texts are required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (activeStep === 0 && !validateBasicInfo()) {
      return;
    }
    if (activeStep === 2) {
      setOpenConfirmationModal(true);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleInputChange = (event) => {
    const { name, value, checked, type } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleAddQuestion = () => {
    setCurrentQuestion({
      id: Date.now(),
      text: '',
      options: [
        { id: Date.now(), text: '', isCorrect: true },
        { id: Date.now() + 1, text: '', isCorrect: false }
      ],
      points: 0,
    });
    setErrors({});
    setOpenQuestionModal(true);
  };

  const handleEditQuestion = (question) => {
    setCurrentQuestion({ ...question });
    setErrors({});
    setOpenQuestionModal(true);
  };

  const handleDeleteQuestion = (questionId) => {
    setFormData((prevData) => ({
      ...prevData,
      questions: prevData.questions.filter((q) => q.id !== questionId),
    }));
  };

  const handleSaveQuestion = () => {
    if (validateQuestionForm()) {
      setFormData((prevData) => {
        const updatedQuestions = prevData.questions.some(q => q.id === currentQuestion.id)
          ? prevData.questions.map((q) => (q.id === currentQuestion.id ? currentQuestion : q))
          : [...prevData.questions, currentQuestion];
        return { ...prevData, questions: updatedQuestions };
      });
      setOpenQuestionModal(false);
      setCurrentQuestion(null);
    }
  };

  const handleQuestionChange = (event) => {
    const { name, value } = event.target;
    setCurrentQuestion((prevQuestion) => ({
      ...prevQuestion,
      [name]: name === 'points' ? parseInt(value, 10) : value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleOptionChange = (optionId, field, value) => {
    setCurrentQuestion((prevQuestion) => ({
      ...prevQuestion,
      options: prevQuestion.options.map((option) =>
        option.id === optionId ? { ...option, [field]: value } : { ...option, isCorrect: false }
      ),
    }));
    setErrors((prevErrors) => ({ ...prevErrors, options: '', correctOption: '', optionText: '' }));
  };

  const handleAddOption = () => {
    setCurrentQuestion((prevQuestion) => ({
      ...prevQuestion,
      options: [
        ...prevQuestion.options,
        { id: Date.now(), text: '', isCorrect: false },
      ],
    }));
  };

  const handleDeleteOption = (optionId) => {
    setCurrentQuestion((prevQuestion) => ({
      ...prevQuestion,
      options: prevQuestion.options.filter((option) => option.id !== optionId),
    }));
  };

  const handleFinish = () => {
    console.log('Form submitted:', formData);
    setOpenConfirmationModal(false);
    // Reset form or navigate away
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Step 1: Basic Information
            </Typography>
            <TextField
              fullWidth
              label="Search Name"
              name="searchName"
              value={formData.searchName}
              onChange={handleInputChange}
              margin="normal"
              error={!!errors.searchName}
              helperText={errors.searchName}
            />
            <TextField
              fullWidth
              label="Job Description"
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleInputChange}
              margin="normal"
              multiline
              rows={4}
              error={!!errors.jobDescription}
              helperText={errors.jobDescription}
            />
            <TextField
              fullWidth
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              margin="normal"
              error={!!errors.location}
              helperText={errors.location}
            />
          </Box>
        );
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Step 2: Screening Questions
            </Typography>
            <Button
              startIcon={<PlusCircle size={20} />}
              variant="contained"
              color="primary"
              onClick={handleAddQuestion}
              sx={{ mb: 2 }}
            >
              Add Question
            </Button>
            <List>
              {formData.questions.map((question, index) => (
                <Paper key={question.id} elevation={3} sx={{ p: 2, mb: 2 }}>
                  <ListItem>
                    <ListItemText
                      primary={`Pregunta ${index + 1}`}
                      secondary={
                        <>
                          <Typography variant="body2">{question.text}</Typography>
                          <Typography variant="caption">Points: {question.points}</Typography>
                        </>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" onClick={() => handleEditQuestion(question)}>
                        <Edit size={20} />
                      </IconButton>
                      <IconButton edge="end" onClick={() => handleDeleteQuestion(question.id)}>
                        <Trash2 size={20} />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </Paper>
              ))}
            </List>
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Step 3: Candidate Requirements
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.attachCV}
                  onChange={handleInputChange}
                  name="attachCV"
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <FileText size={24} style={{ marginRight: '8px' }} />
                  Attach CV
                </Box>
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.includeLinkedIn}
                  onChange={handleInputChange}
                  name="includeLinkedIn"
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Linkedin size={24} style={{ marginRight: '8px' }} />
                  Include LinkedIn Profile
                </Box>
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.includeGitHub}
                  onChange={handleInputChange}
                  name="includeGitHub"
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Github size={24} style={{ marginRight: '8px' }} />
                  Include GitHub Profile
                </Box>
              }
            />
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 800, margin: 'auto', padding: 3 }}>
      <Stepper activeStep={activeStep}>
        <Step>
          <StepLabel>Basic Information</StepLabel>
        </Step>
        <Step>
          <StepLabel>Screening Questions</StepLabel>
        </Step>
        <Step>
          <StepLabel>Candidate Requirements</StepLabel>
        </Step>
      </Stepper>

      <Box sx={{ mt: 4 }}>{renderStepContent(activeStep)}</Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button onClick={handleBack} disabled={activeStep === 0}>
          Back
        </Button>
        <Button variant="contained" color="primary" onClick={handleNext}>
          {activeStep === 2 ? 'Finish' : 'Next'}
        </Button>
      </Box>

      <Modal open={openQuestionModal} onClose={() => setOpenQuestionModal(false)}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" component="h2">
              {currentQuestion?.id ? 'Edit Question' : 'Add Question'}
            </Typography>
            <IconButton onClick={() => setOpenQuestionModal(false)}>
              <X size={20} />
            </IconButton>
          </Box>
          <TextField
            fullWidth
            label="Question"
            name="text"
            value={currentQuestion?.text || ''}
            onChange={handleQuestionChange}
            margin="normal"
            error={!!errors.questionText}
            helperText={errors.questionText}
          />
          <TextField
            fullWidth
            label="Points"
            name="points"
            type="number"
            value={currentQuestion?.points || 0}
            onChange={handleQuestionChange}
            margin="normal"
            error={!!errors.points}
            helperText={errors.points}
          />
          <Typography variant="subtitle1" gutterBottom>
            Options
          </Typography>
          {errors.options && <Typography color="error">{errors.options}</Typography>}
          {errors.correctOption && <Typography color="error">{errors.correctOption}</Typography>}
          <RadioGroup
            value={currentQuestion?.options.findIndex(opt => opt.isCorrect)}
            onChange={(e, value) => {
              const index = parseInt(value, 10);
              setCurrentQuestion(prevQuestion => ({
                ...prevQuestion,
                options: prevQuestion.options.map((opt, i) => ({
                  ...opt,
                  isCorrect: i === index
                }))
              }));
            }}
          >
            {currentQuestion?.options.map((option, index) => (
              <Box key={option.id} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Radio value={index} />
                <TextField
                  fullWidth
                  label={`Option ${index + 1}`}
                  value={option.text}
                  onChange={(e) => handleOptionChange(option.id, 'text', e.target.value)}
                  margin="dense"
                  error={!!errors.optionText}
                />
                <IconButton onClick={() => handleDeleteOption(option.id)}>
                  <Trash2 size={20} />
                </IconButton>
              </Box>
            ))}
          </RadioGroup>
          <Button startIcon={<PlusCircle size={20} />} onClick={handleAddOption}>
            Add Option
          </Button>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" color="primary" onClick={handleSaveQuestion}>
              Save Question
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal open={openConfirmationModal} onClose={() => setOpenConfirmationModal(false)}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Confirm Submission
          </Typography>
          <Typography variant="body1" gutterBottom>
            Are you sure you want to submit this hiring search?
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={() => setOpenConfirmationModal(false)} sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button variant="contained" color="primary"

 onClick={handleFinish}>
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}