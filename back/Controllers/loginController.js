import jwt from 'jsonwebtoken';
import {connection} from "../Database/db.js";

import bcrypt from 'bcrypt';

export const login = async (req, res = response) => {

  const mail = req.body.mail;
  const pass = req.body.pass;

  console.log(req.body)

  try {
    const [result] = await connection.query('SELECT * FROM User WHERE mail = ?', [mail]);

    if (result.length === 0) {
      return res.status(400).json({ success: false, error: true, msg: 'El email no se encuentra registrado' });
    }

    const usuario = result[0];

    // Verificación de la contraseña cifrada
    const validPass = await bcrypt.compare(pass, usuario.pass);

    if (!validPass) {
      return res.status(400).json({ success: false, error: true, msg: 'Contraseña no válida' });
    }

    const token = jwt.sign({ id: usuario.id}, process.env.TOKEN_SECRET, { expiresIn: '3h' });

    res.status(200).json({ success: true, token: token});

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: true, msg: 'Se ha producido un error' });
  }
};