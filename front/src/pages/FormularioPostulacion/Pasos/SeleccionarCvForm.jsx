import {Box, Typography, Button} from "@mui/material";
import styled from "styled-components";
import {CloudUpload} from "lucide-react";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function SeleccionarCvForm({handleInputChange, errors, cvName}) {
    return (<Box>
        <Typography variant="h6" gutterBottom>
            Paso 1: Seleccione CV
        </Typography>
        <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUpload/>}
        >
            Seleccione CV
            <VisuallyHiddenInput
                type="file"
                id='cv'
                name='cv'
                onChange={handleInputChange}
            />
        </Button>
        {cvName ? (<p>{cvName}</p>) : (<p>No hay CV seleccionado</p>)}
        {errors.cv ? (<p>{errors.cv}</p>) : null}
    </Box>)
}