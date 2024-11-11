import { connection } from "../Database/db.js";
import { response } from "express";

export const getComentaries = async (req, res = response) => {
    const processId = req.params.processId
    try {
        const conn = await connection.getConnection();

        const [result] = await conn.execute(`SELECT * FROM Comentaries WHERE processId = ?`, [processId]);
        conn.release();
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: true, msg: 'se ha producido un error' });
    }
};

export const getComentary = async (req, res = response) => {
    const id = req.params.id;

    try {
        const conn = await connection.getConnection();

        const [result] = await conn.execute(`SELECT * FROM Comentaries WHERE id = ${id}`);
        conn.release();
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: true, msg: 'se ha producido un error' });
    }
};

export const addComentary = async (req, res = response) => {
    const title = req.body.title;
    const description = req.body.description;
    const processId = req.body.processId;

    try {
        const conn = await connection.getConnection();

        const [result] = await conn.execute('INSERT INTO Comentaries (title, description, processId) values (?, ?, ?)', [title, description, processId]);
        conn.release();
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: true, msg: 'se ha producido un error' });
    }
};

export const editComentary = async (req, res = response) => {
    const id = req.params.id;
    const fieldsToUpdate = req.body;

    if (!fieldsToUpdate || Object.keys(fieldsToUpdate).length === 0) {
        return res.status(400).json({ error: 'Se deben proporcionar campos para actualizar' });
    }

    try {
        const [result] = await connection.query(`UPDATE Comentaries SET ? WHERE id = ?`, [fieldsToUpdate, id]);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: true, msg: 'se ha producido un error' });
    }
};

export const deleteComentary = async (req, res = response) => {
    const id = req.params.id;

    try {
        const [result] = await connection.query(`DELETE FROM Comentaries WHERE id = ${id}`);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: true, msg: 'se ha producido un error' });
    }
};
