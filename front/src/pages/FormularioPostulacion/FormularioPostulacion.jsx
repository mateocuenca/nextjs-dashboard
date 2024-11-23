import {useState, useEffect} from 'react';
import {
    Stepper, Box, Step, StepLabel, Button
} from '@mui/material';
import SeleccionarCvForm from './Pasos/SeleccionarCvForm.jsx'
import ValidarDatosForm from "./Pasos/ValidarDatosForm.jsx";
import RespuestasForm from "./Pasos/RespuestasForm.jsx"
import ConfirmarDatosForm from "./Pasos/ConfirmarDatosForm.jsx";
import {useParams} from "react-router-dom";


export default function FormularioPostulacion() {

    // Se obtiene uuid de la busqueda
    const {id} = useParams();

    // Estados
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
        processId: '',
        cv: '',
        candidateFirstName: '',
        candidateLastName: '',
        candidateEmail: '',
        candidateNumber: '',
        answers: []
    });
    //
    const [errors, setErrors] = useState({});
    const [cvName, setCvName] = useState('');
    const [answers, setAnswers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [searchData, setSearchData] = useState({});
    const [questions, setQuestions] = useState({});
    const [success, setSuccess] = useState(false);

    // Pasos
    const steps = [
        "Seleccionar CV",
        "Validar datos",
        ...(Object.keys(questions).length > 0 ? ["Responder preguntas"] : []),
        "Confirmar datos"
    ];

    const handleInputChange = (event) => {
        const {name, files, value, type} = event.target;

        if (type === 'file') {
            const reader = new FileReader();
            reader.readAsDataURL(files[0]);
            setCvName(files[0].name);
            reader.onloadend = () => {
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: reader.result,
                }));
            };
            reader.onerror = (error) => {
                console.error("Error al convertir el archivo a base64: ", error);
            };
        } else if (type === 'radio') {
            // Actualiza el array de answers para mantener el formato correcto
            const updatedAnswers = [
                ...answers.filter(answer => answer.clave !== name), // Elimina entradas previas de la misma pregunta
                {clave: name, valor: value}, // Agrega la nueva respuesta
            ];
            setAnswers(updatedAnswers);

            // También actualiza formData si es necesario
            setFormData((prevData) => ({
                ...prevData,
                answers: updatedAnswers,
            }));

        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
        setErrors((prevErrors) => ({...prevErrors, [name]: ''}));
    };


    // Validadores de Steps
    const validateCV = () => {
        const newErrors = {};
        if (!formData.cv) newErrors.cv = 'El CV es requerido';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const validateCandidateData = () => {
        const newErrors = {};
        if (!formData.candidateFirstName.trim()) newErrors.candidateFirstName = 'El nombre es requerido';
        if (!formData.candidateLastName.trim()) newErrors.candidateLastName = 'El apellido es requerido';
        if (!formData.candidateNumber.trim()) newErrors.candidateNumber = 'El numero de telefono es requerido';
        if (!formData.candidateEmail.trim()) newErrors.candidateEmail = 'El email es requerido';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const validateAnswers = () => {
        const newErrors = {};
        return Object.keys(newErrors).length === 0;
    }

    // Utils
    const limpiarDatosSearchData = (data) => {
        return Object.fromEntries(
            Object.entries(data).map(([key, value]) => [
                key,
                value === 'No se proporciona' || value === 'Desconocido' || value === 'No especificado' ? '' : value
            ])
        );
    }

    // API
    const postCv = async () => {

        setLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BACKEND}/api/process`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    searchId: searchData.searchId,
                    cv: formData.cv.replace('data:application/pdf;base64,', ''),
                    busqueda: id
                })
            })

            const result = await response.json()
            const data = limpiarDatosSearchData(result.result)


            formData.processId = result.processId
            formData.candidateFirstName = data.nombre
            formData.candidateLastName = data.apellido
            formData.candidateEmail = data.email
            formData.candidateNumber = data.telefono

        } catch (e) {
            console.error(e)
            setError('Ha ocurrido un error. Por favor, inténtalo de nuevo.')
        }

        setLoading(false);
    }

    const fetchQuestions = async () => {

        setLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BACKEND}/api/questions/${id}`, {
                method: 'GET'
            })

            const result = await response.json()
            const questions = result.questions

            setQuestions(questions)

        } catch (e) {
            console.error(e)
            setError('Ha ocurrido un error. Por favor, inténtalo de nuevo.')
        }

        setLoading(false);
    }

    const updateCandidateData = async () => {
        setLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BACKEND}/api/process/${formData.processId}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    processId: formData.processId, fieldsToUpdate: {
                        candidate_name: formData.candidateFirstName,
                        candidate_lastname: formData.candidateLastName,
                        candidate_email: formData.candidateEmail,
                        candidate_phone: formData.candidateNumber
                    }, answers: formData.answers
                })
            })

            if (response.status === 200) {
                setSuccess(true)
            }

            const result = await response.json()


        } catch (e) {
            console.error(e)
            setError('Ha ocurrido un error. Por favor, inténtalo de nuevo.')
        }

        setLoading(false);
    }

    // Manejadores de Stepper
    const handleNext = () => {
        if (activeStep === 0) {
            if (!validateCV()) {
                return;
            }
            postCv()
        }
        if (activeStep === 1 && !validateCandidateData()) {
            return;
        }
        if (activeStep === 2 && Object.keys(questions).length > 0 && !validateAnswers()) {
            return;
        }
        if (activeStep === steps.length - 1) {
            updateCandidateData();
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <>
                        <SeleccionarCvForm handleInputChange={handleInputChange} errors={errors} cvName={cvName}/>
                    </>
                )
            case 1:
                return (
                    loading ? (<p>Cargando...</p>) : (
                        <ValidarDatosForm formData={formData} handleInputChange={handleInputChange} errors={errors}/>)
                );
            case 2:
                if (Object.keys(questions).length > 0) {
                    return (
                        <RespuestasForm
                            questions={questions}
                            answers={answers}
                            handleInputChange={handleInputChange}
                            errors={errors}
                        />
                    );
                }
                return (
                    <ConfirmarDatosForm formData={formData} questions={questions} cvName={cvName}/>
                );
            case 3:
                if (Object.keys(questions).length > 0) {
                    return (
                        <ConfirmarDatosForm formData={formData} questions={questions} cvName={cvName}/>
                    );
                }
                return (success ? <p>Información enviada con éxito</p> :
                    null)
            case 4:
                return (success ? <p>Información enviada con éxito</p> :
                    null)
            default:
                return null;
        }
    }

    useEffect(() => {

        const fetchSearchData = async () => {
            setLoading(true)
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BACKEND}/api/search/${id}`, {
                    method: 'GET'
                })

                const result = await response.json()

                setSearchData((prevData) => ({
                    ...prevData,
                    searchName: result.name,
                    searchDescription: result.description,
                    searchId: result.id,
                }))

            } catch (e) {
                console.error(e)
                setError('Ha ocurrido un error. Por favor, inténtalo de nuevo.')
            }
            setLoading(false)
        }
        fetchSearchData()
        fetchQuestions();
    }, [])


    return (
        <Box sx={{width: '100%', maxWidth: 800, margin: 'auto', padding: 3}}>
            <h1>{searchData.searchName}</h1>
            <h6>{searchData.searchDescription}</h6>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => (
                    <Step key={index}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <Box sx={{mt: 4}}>{renderStepContent(activeStep)}</Box>

            <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 4}}>
                {!loading &&
                    <Button onClick={handleBack} disabled={activeStep === 0 || activeStep === steps.length}>
                        Atrás
                    </Button>}
                {activeStep !== steps.length && !loading && (
                    <Button variant="contained" color="primary" onClick={handleNext}>
                        {activeStep === steps.length - 1 ? 'Enviar Postulación' : 'Siguiente'}
                    </Button>
                )}
            </Box>
        </Box>

    )
}