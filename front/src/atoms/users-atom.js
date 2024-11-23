import {atom} from "jotai";

// Función para obtener el valor inicial desde localStorage
const getInitialFullName = () => {
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : []; // Devuelve el valor almacenado o un objeto vacío
};

// Átomo que persiste en localStorage
export const usersAtom = atom(getInitialFullName());

// Listener para actualizar localStorage cuando el átomo cambie
export const usersWithPersistenceAtom = atom(
    (get) => get(usersAtom),
    (get, set, newValue) => {
        set(usersAtom, newValue);
        localStorage.setItem("users", JSON.stringify(newValue));
    }
);