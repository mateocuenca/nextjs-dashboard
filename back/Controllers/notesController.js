import { connection } from "../Database/db.js";
import { response } from "express";

export const getNotes = async (req, res = response) => {
    try {
        const conn = await connection.getConnection();

        const [result] = await conn.execute(`SELECT * FROM Notes`);
        conn.release();
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: true, msg: 'se ha producido un error' });
    }
};

export const getNote = async (req, res = response) => {
    const id = req.params.id;

    try {
        const conn = await connection.getConnection();

        const [result] = await conn.execute(`SELECT * FROM Notes WHERE id = ${id}`);
        conn.release();
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: true, msg: 'se ha producido un error' });
    }
};

export const addNote = async (req, res = response) => {
    const interviewId = req.body.interviewId;
    const content = req.body.content;
    const status = req.body.status;

    try {
        const conn = await connection.getConnection();

        const [result] = await conn.execute('INSERT INTO Notes (interviewId, content, status) values (?, ?, ?)', [interviewId, content, status]);
        conn.release();
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: true, msg: 'se ha producido un error' });
    }
};

export const editNote = async (req, res = response) => {
    const id = req.params.id;
    const fieldsToUpdate = req.body;

    if (!fieldsToUpdate || Object.keys(fieldsToUpdate).length === 0) {
        return res.status(400).json({ error: 'Se deben proporcionar campos para actualizar' });
    }

    try {
        const [result] = await connection.query(`UPDATE Notes SET ? WHERE id = ?`, [fieldsToUpdate, id]);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: true, msg: 'se ha producido un error' });
    }
};

export const deleteNote = async (req, res = response) => {
    const id = req.params.id;

    try {
        const [result] = await connection.query(`DELETE FROM Notes WHERE id = ${id}`);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: true, msg: 'se ha producido un error' });
    }
};
