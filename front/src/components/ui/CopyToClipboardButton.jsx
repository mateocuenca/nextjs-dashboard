import {useState} from "react";
import {Button, Snackbar} from "@mui/material";
import {ClipboardCopy} from 'lucide-react';

const CopyToClipboardButton = ({searchUuid}) => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
        navigator.clipboard.writeText(`http://localhost:5173/enviar-postulacion/${searchUuid}`);
    };

    return (
        <>
            <Button variant="outlined" startIcon={<ClipboardCopy/>} onClick={handleClick}>
                Compartir enlace a postulación
            </Button>
            <Snackbar
                message='Enlace copiado!'
                anchorOrigin={{vertical: "top", horizontal: "center"}}
                autoHideDuration={2000}
                onClose={() => setOpen(false)}
                open={open}
            />
        </>
    );
};

export default CopyToClipboardButton;