import { connection } from "../Database/db.js";
import { response } from "express";

export const getCandidates = async (req, res = response) => {
    try {
        const conn = await connection.getConnection();

        const [result] = await conn.execute(`SELECT * FROM Candidate`);
        conn.release();
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: true, msg: 'se ha producido un error' });
    }
};

export const getCandidate = async (req, res = response) => {
    const id = req.params.id;

    try {
        const conn = await connection.getConnection();

        const [result] = await conn.execute(`SELECT * FROM Candidate WHERE id = ${id}`);
        conn.release();
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: true, msg: 'se ha producido un error' });
    }
};

export const addCandidate = async (req, res = response) => {
    const name = req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;
    const status = req.body.status;

    try {
        const conn = await connection.getConnection();

        const [result] = await conn.execute('INSERT INTO Candidate (name, phone, email, status) values (?, ?, ?, ?)', [name, phone, email, status]);
        conn.release();
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: true, msg: 'se ha producido un error' });
    }
};

export const editCandidate = async (req, res = response) => {
    const id = req.params.id;
    const fieldsToUpdate = req.body;

    if (!fieldsToUpdate || Object.keys(fieldsToUpdate).length === 0) {
        return res.status(400).json({ error: 'Se deben proporcionar campos para actualizar' });
    }

    try {
        const [result] = await connection.query(`UPDATE Candidate SET ? WHERE id = ?`, [fieldsToUpdate, id]);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: true, msg: 'se ha producido un error' });
    }
};

export const deleteCandidate = async (req, res = response) => {
    const id = req.params.id;

    try {
        const [result] = await connection.query(`DELETE FROM Candidate WHERE id = ${id}`);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: true, msg: 'se ha producido un error' });
    }
};
