import express from "express";

import { addComentary, deleteComentary, editComentary, getComentary, getComentaries } from "../Controllers/comentariesController.js";
import {validateJWT} from "../Helpers/jwtValidator.js";

const router = express.Router();

router.get('/:processId', [validateJWT], getComentaries);
router.post('/', [validateJWT], addComentary);
router.put('/:id', [validateJWT], editComentary);
router.delete('/:id', [validateJWT], deleteComentary);

export default router;
