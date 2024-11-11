import {body, validationResult} from 'express-validator'
import { connection } from '../Database/db.js'

export const validateUser = [
    body('username', 'Debes Ingresar un Nombre').exists(),
    body('email', "Debes Ingresar un Email Valido").exists().isEmail(),
    body('password', "Debes Ingresar una Contraseña de al menos 8 carcateres")   
    .isLength({min:8}),
    (req,res,next)=>{
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            return res.status(422).json({errors: errors.array()})
        }
        next()

                  
    }
   ]

