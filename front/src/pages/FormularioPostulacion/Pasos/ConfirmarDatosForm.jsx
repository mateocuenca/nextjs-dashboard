import {Box, Typography} from "@mui/material";

export default function ConfirmarDatosForm({formData, questions, cvName}) {
    // Utils
    function getQuestionDescriptionById(questions, questionId) {
        const question = questions.find(quest => quest.id == questionId.clave)
        return question ? question.description : null;
    }

    function getAnswerDescriptionById(questions, answerId) {
        // Encuentra la pregunta que coincida con `answerId.clave`
        const question = questions.find(quest => quest.id == answerId.clave);

        if (!question) {
            return null; // Si no se encuentra la pregunta, retorna `null`
        }

        // Busca la respuesta en las respuestas de la pregunta encontrada
        const foundAnswer = question.answers.find(answer => answer.id == answerId.valor);

        if (foundAnswer) {
            return foundAnswer.description; // Retorna la descripción de la respuesta encontrada
        }

        return null; // Retorna `null` si no se encuentra ninguna respuesta
    }


    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Confirme sus datos
            </Typography>
            <p>Nombre completo: {formData.candidateFirstName} {formData.candidateLastName}</p>
            <p>Telefono: {formData.candidateNumber}</p>
            <p>Email: {formData.candidateEmail}</p>
            <p>CV Adjunto: {cvName}</p>
            {formData.answers.length !== 0 ? <p>Respuestas</p> : null}
            {formData.answers.map((answer) => (
                <p>{getQuestionDescriptionById(questions, answer)}: {getAnswerDescriptionById(questions, answer)}</p>
            ))}
        </Box>
    )
}