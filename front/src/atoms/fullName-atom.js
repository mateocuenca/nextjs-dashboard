import {atom} from "jotai";

// Función para obtener el valor inicial desde localStorage
const getInitialFullName = () => {
    const storedFullName = localStorage.getItem("fullName");
    return storedFullName ? JSON.parse(storedFullName) : {}; // Devuelve el valor almacenado o un objeto vacío
};

// Átomo que persiste en localStorage
export const fullNameAtom = atom(getInitialFullName());

// Listener para actualizar localStorage cuando el átomo cambie
export const fullNameWithPersistenceAtom = atom(
    (get) => get(fullNameAtom),
    (get, set, newValue) => {
        set(fullNameAtom, newValue);
        localStorage.setItem("fullName", JSON.stringify(newValue));
    }
);
