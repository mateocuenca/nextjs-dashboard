import { response, request } from 'express';
import jwt from 'jsonwebtoken';
import { connection } from '../Database/db.js';

export const validateJWT = async (req, res, next) => {
    
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        const uid = decoded.id;

        const [rows] = await connection.query('SELECT * FROM User WHERE id = ?', [uid]);

        if (!rows.length) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe en la DB'
            });
        }
        else {
            req.user = decoded
            next()
        }

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        });
    }
};
