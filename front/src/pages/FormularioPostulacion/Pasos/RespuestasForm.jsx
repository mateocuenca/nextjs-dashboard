import react from "react";
import {Box, FormControlLabel, Radio, RadioGroup, Typography} from "@mui/material";
import React from "react";

export default function RespuestasForm({
                                           questions,
                                           answers,
                                           handleInputChange,
                                           errors
                                       }) {


    return (<Box>
        <Typography variant="h6" gutterBottom>
            Paso 3: Responda las preguntas
        </Typography>
        {questions.map((question) => (
    <div key={question.id} style={{ marginBottom: '20px' }}>
        <Typography variant="h6">{question.description}-{question.id}</Typography>
        <RadioGroup
            value={Array.isArray(answers) ? (answers.find(answer => answer.clave == question.id)?.valor || '') : ''}
            onChange={handleInputChange}
            name={question.id}
        >
            {question.answers.map((answer) => (
                <FormControlLabel
                    key={answer.id}
                    value={answer.id}
                    control={<Radio selected = {true}/>}
                    label={answer.description + '-' + answer.id}
                />
            ))}
        </RadioGroup>
        {errors[question.id] && (<p>{errors[question.id]}</p>)}
    </div>
))}




    </Box>)
}