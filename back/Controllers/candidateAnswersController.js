import { connection } from "../Database/db.js";
import { response } from "express";

export const getCandidateAnswers = async (req, res = response) => {
    try {
        const conn = await connection.getConnection();

        const [result] = await conn.execute(`SELECT * FROM CandidateAnswers`);
        conn.release();
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: true, msg: 'se ha producido un error' });
    }
};

export const getCandidateAnswer = async (req, res = response) => {
    const id = req.params.id;

    try {
        const conn = await connection.getConnection();

        const [result] = await conn.execute(`SELECT * FROM CandidateAnswers WHERE id = ${id}`);
        conn.release();
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: true, msg: 'se ha producido un error' });
    }
};

export const addCandidateAnswer = async (req, res = response) => {
    const candidateId = req.body.candidateId;
    const answerId = req.body.answerId;
    const responseText = req.body.responseText;

    try {
        const conn = await connection.getConnection();

        const [result] = await conn.execute('INSERT INTO CandidateAnswers (candidateId, answerId, responseText) values (?, ?, ?)', [candidateId, answerId, responseText]);
        conn.release();
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: true, msg: 'se ha producido un error' });
    }
};

export const editCandidateAnswer = async (req, res = response) => {
    const id = req.params.id;
    const fieldsToUpdate = req.body;

    if (!fieldsToUpdate || Object.keys(fieldsToUpdate).length === 0) {
        return res.status(400).json({ error: 'Se deben proporcionar campos para actualizar' });
    }

    try {
        const [result] = await connection.query(`UPDATE CandidateAnswers SET ? WHERE id = ?`, [fieldsToUpdate, id]);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: true, msg: 'se ha producido un error' });
    }
};

export const deleteCandidateAnswer = async (req, res = response) => {
    const id = req.params.id;

    try {
        const [result] = await connection.query(`DELETE FROM CandidateAnswers WHERE id = ${id}`);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: true, msg: 'se ha producido un error' });
    }
};
