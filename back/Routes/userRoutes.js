import express from "express";

import { addUser, deleteUser, editUser, getUser, getUsers } from "../Controllers/userController.js";
import {validateJWT} from "../Helpers/jwtValidator.js";

const router = express.Router()

router.get('/', [validateJWT], getUsers)
router.get('/:id', [validateJWT], getUser)
router.post('/', [validateJWT], addUser)
router.put('/:id', [validateJWT], editUser)
router.delete('/:id', [validateJWT], deleteUser)

export default router