import React from "react";
import Button from "../../../components/ui/Button.jsx";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";

const FormDialogAddUser = ({jwt}) => {

    // Estados y variables iniciales
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(true);

    // Handlers
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    // API
    const addUser = async (formJson) => {

        setLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BACKEND}/api/user`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "x-token": jwt
                },
                body: JSON.stringify({
                    name: formJson.firstName,
                    lastName: formJson.lastName,
                    mail: formJson.email,
                    pass: formJson.password,
                    status: 1
                })
            })

            const result = await response.json()


        } catch (e) {
            console.error(e)
        }

        setLoading(false);
    }

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Agregar usuario
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        addUser(formJson)
                        window.location.reload();
                        handleClose();
                    },
                }}
            >
                <DialogTitle>Agregar usuario</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Complete este formulario para agregar un nuevo usuario
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="firstName"
                        name="firstName"
                        label="Nombre"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="lastName"
                        name="lastName"
                        label="Apellido"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="email"
                        name="email"
                        label="Email"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="password"
                        name="password"
                        label="Contraseña"
                        type="password"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button type="submit">Agregar</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default FormDialogAddUser;