import {connection} from "../Database/db.js";
import {response} from "express";
import bcrypt from 'bcrypt';

export const getUsers = async (req, res = response) =>{
    try {
        const conn = await connection.getConnection()

        const [result] = await conn.execute(`SELECT * FROM User`)
        conn.release()
        res.status(200).json(result)
    }
    catch(error){
        console.log(error)
        res.status(500).json({success:false, error: true, msg: 'se ha producido un error'})
    }

}

export const getUser = async (req, res = response) =>{

    const id = req.params.id

    try {
        const conn = await connection.getConnection()

        const [result] = await conn.execute(`SELECT * FROM User WHERE id = ${id}`)
        conn.release()
        res.status(200).json(result)
    }
    catch(error){
        console.log(error)
        res.status(500).json({success:false, error: true, msg: 'se ha producido un error'})
    }

}

export const addUser = async (req, res = response) =>{

    const mail = req.body.mail
    const pass = req.body.pass
    const name = req.body.name
    const lastName = req.body.lastName
    const status = req.body.status

    try {

        const saltRounds = 10; 
        const passHash = await bcrypt.hash(pass, saltRounds);

        const conn = await connection.getConnection()

        const [result] = await conn.execute('INSERT INTO User (name, last_name, mail, pass, status) values (?, ?, ?, ?, ?)', [name, lastName, mail, passHash, status])
        conn.release()
        res.status(200).json(result)
    }
    catch(error){
        console.log(error)
        res.status(500).json({success:false, error: true, msg: 'se ha producido un error'})
    }

}

export const editUser = async (req, res = response) =>{

    const id = req.params.id
    const fieldsToUpdate = req.body

    if (!fieldsToUpdate || Object.keys(fieldsToUpdate).length === 0) {
        return res.status(400).json({error: 'Se deben proporcionar campos para actualizar'});
    }

    try {
        const [result] = await connection.query(`UPDATE User SET ? WHERE id = ?`, [fieldsToUpdate, id])
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, error: true, msg: 'se ha producido un error'})
    }

}

export const deleteUser = async (req, res = response) => {

    const id = req.params.id

    try{
        const [result] = await connection.query(`UPDATE User SET status = 2 WHERE id = ${id}`)
        res.status(200).json(result)
    } catch (error){
        console.log(error)
        res.status(500).json({success:false, error: true, msg: 'se ha producido un error'})
    }

}



