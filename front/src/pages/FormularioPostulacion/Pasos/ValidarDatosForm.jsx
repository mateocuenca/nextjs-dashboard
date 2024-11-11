import react from "react";
import {Box, TextField, Typography} from "@mui/material";
import React from "react";

export default function ValidarDatosForm({formData, handleInputChange, errors}) {
    return (<Box>
        <Typography variant="h6" gutterBottom>
            Paso 2: Valide sus datos
        </Typography>
        <TextField
            fullWidth
            label="Nombre"
            id="candidateFirstName"
            name='candidateFirstName'
            value={formData.candidateFirstName}
            onChange={handleInputChange}
            margin="normal"
            error={errors.candidateFirstName}
            helperText={errors.candidateFirstName}
        />
        <TextField
            fullWidth
            label="Apellido"
            id="candidateLastName"
            name='candidateLastName'
            value={formData.candidateLastName}
            onChange={handleInputChange}
            margin="normal"
            error={errors.candidateLastName}
            helperText={errors.candidateLastName}
        />
        <TextField
            fullWidth
            label="Teléfono"
            id='candidateNumber'
            name="candidateNumber"
            type="tel"
            value={formData.candidateNumber}
            onChange={handleInputChange}
            margin="normal"
            error={errors.candidateNumber}
            helperText={errors.candidateNumber}
        />
        <TextField
            fullWidth
            label="Email"
            id="candidateEmail"
            name='candidateEmail'
            type="email"
            value={formData.candidateEmail}
            onChange={handleInputChange}
            margin="normal"
            error={errors.candidateEmail}
            helperText={errors.candidateEmail}
        />
    </Box>)
}