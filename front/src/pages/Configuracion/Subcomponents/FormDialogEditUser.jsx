import React, {useEffect} from "react";
import {useAtomValue, useSetAtom} from "jotai";
import {fullNameWithPersistenceAtom} from "../../../atoms/fullName-atom.js";
import Button from "../../../components/ui/Button.jsx";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";

const FormDialogEditUser = ({email, users, jwt}) => {

    // Estados y variables iniciales
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [userData, setUserData] = React.useState({});
    const fullName = useAtomValue(fullNameWithPersistenceAtom)
    const setFullName = useSetAtom(fullNameWithPersistenceAtom);

    // Handlers
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    // API
    const editUser = async (formJson) => {

        setLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BACKEND}/api/user/${userData.id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "x-token": `${jwt}`
                },
                body: JSON.stringify({
                    name: formJson.firstName,
                    last_name: formJson.lastName
                })
            })

            const result = await response.json()


        } catch (e) {
            console.error(e)
        }

        setLoading(false);
    }

    // Utils
    const getUserByEmail = (email, users) => {
        const user = users.find(user => user.mail === email);
        return user ? {id: user.id} : null;
    };

    useEffect(() => {
        setUserData(getUserByEmail(email, users))
    }, [])

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Editar usuario
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
                        editUser(formJson)
                        setFullName({
                            firstName: formJson.firstName,
                            lastName: formJson.lastName,
                        })
                        handleClose();
                    },
                }}
            >
                <DialogTitle>Editar usuario</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Edite usuario
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="firstName"
                        name="firstName"
                        defaultValue={fullName.firstName}
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
                        defaultValue={fullName.lastName}
                        label="Apellido"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button type="submit">Editar</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default FormDialogEditUser;