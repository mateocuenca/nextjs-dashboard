import { connection } from "../Database/db.js";
import { response } from "express";

export const getQuestions = async (req, res = response) => {
    const searchId = req.params.searchId
    
    try {
        let questions = [];
        const conn = await connection.getConnection();
        
        const [result] = await conn.execute(`SELECT * FROM Questions WHERE searchId = (select id from Searches where uuid = ?)`, [searchId]);
        
        for (const el of result) {
            let question = { id: el.id, description: el.question, answers: [] };
        
            const [result2] = await conn.execute(`SELECT * FROM Answers WHERE questionId = ?`, [question.id]);
            question.answers = result2.map(answer => ({
                ...answer,
                description: answer.answer, // Asignar el valor de 'text' a 'description'
            }));
        
            questions.push(question);
        }
        
        conn.release();
        res.status(200).json({success: true, questions: questions});
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: true, msg: 'se ha producido un error' });
    }
};

export const getQuestion = async (req, res = response) => {
    const id = req.params.id;

    try {
        const conn = await connection.getConnection();

        const [result] = await conn.execute(`SELECT * FROM Questions WHERE id = ${id}`);
        conn.release();
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: true, msg: 'se ha producido un error' });
    }
};

export const addQuestion = async (req, res = response) => {
    const searchId = req.body.searchId;
    const question = req.body.question;

    try {
        const conn = await connection.getConnection();

        const [result] = await conn.execute(
            `INSERT INTO Questions (searchId, question) 
             VALUES ((SELECT id FROM Searches WHERE uuid = ?), ?)`,
            [searchId, question.description]
        );       
        
        question.answers.forEach(async (answer) => {
            const [result2] = await conn.execute('INSERT INTO Answers (answer, correct, questionId) values (?, ?, ?)', [answer.description, answer.correct, result.insertId]);

        });
        conn.release();
        res.status(200).json({success: true});
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: true, msg: 'se ha producido un error' });
    }
};

export const editQuestion = async (req, res = response) => {
    const id = req.params.id;
    const question = req.body.question
    console.log(id)
    console.log(question)

    try {
        const conn = await connection.getConnection();

        const [result] = await conn.execute(
            `UPDATE Questions set question = ? WHERE id = ?`,
            [question.description, id]
        );       

 
        question.answers.forEach(async (answer) => {
          
            console.log(answer)
            if (answer.id) {
                const [result2] = await conn.execute('UPDATE Answers set answer = ?, correct = ? WHERE id = ?', [answer.description, answer.correct, answer.id]);

            }
            else {
               console.log(answer)
                const [result2] = await conn.execute('INSERT INTO Answers (answer, correct, questionId) values (?, ?, ?)', [answer.description, answer.correct, id]);

            }


        });

        res.status(200).json({success: true});
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: true, msg: 'se ha producido un error' });
    }
};

export const deleteQuestion = async (req, res = response) => {
    const id = req.params.id;

    try {
        const [result] = await connection.query(`DELETE FROM Questions WHERE id = ${id}`);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: true, msg: 'se ha producido un error' });
    }
};
