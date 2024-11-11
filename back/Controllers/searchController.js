import { connection } from "../Database/db.js";
import { response } from "express";
import {v4 as uuidv4} from 'uuid';
import path from 'path';
import fs  from 'fs';

export const getSearches = async (req, res = response) => {
    try {
        const conn = await connection.getConnection();

        const [result] = await conn.execute(`SELECT * FROM Searches`);
        conn.release();
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: true, msg: 'se ha producido un error' });
    }
};

export const getSearch = async (req, res = response) => {
    const id = req.params.id;

    try {
        const conn = await connection.getConnection();

        const [result] = await conn.execute(`SELECT * FROM Searches WHERE uuid = '${id}'`);
        conn.release();
        res.status(200).json(result[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: true, msg: 'se ha producido un error' });
    }
};

export const addSearch = async (req, res = response) => {
    const name = req.body.name;
    const uuid = uuidv4() 
    const states = ['pending', 'in course', 'interviews', 'discarded', 'finished']

    try {
        const conn = await connection.getConnection();

        const [result] = await conn.execute('INSERT INTO Searches (uuid, name) values (?, ?)', [uuid, name]);

        for (const el of states) {
            const [result2] = await conn.execute('INSERT INTO rrhh.SearchStates (searchId, description) values (?, ?)', [result.insertId, el])
        }

        conn.release();

        //

        const nombreCarpeta = `./busquedas/${uuid}`
    

        if (!fs.existsSync(nombreCarpeta)) {
          fs.mkdirSync(nombreCarpeta);          
        }



        res.status(200).json({success: true, uuid: uuid});
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: true, msg: 'se ha producido un error' });
    }
};

export const editSearch = async (req, res = response) => {
    const id = req.params.id;
    const fieldsToUpdate = req.body;

    if (!fieldsToUpdate || Object.keys(fieldsToUpdate).length === 0) {
        return res.status(400).json({ error: 'Se deben proporcionar campos para actualizar' });
    }

    try {
        const [result] = await connection.query(`UPDATE Searches SET ? WHERE uuid = ?`, [fieldsToUpdate, id]);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: true, msg: 'se ha producido un error' });
    }
};

export const deleteSearch = async (req, res = response) => {
    const id = req.params.id;

    try {
        const [result] = await connection.query(`DELETE FROM Searches WHERE id = ${id}`);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: true, msg: 'se ha producido un error' });
    }
};
