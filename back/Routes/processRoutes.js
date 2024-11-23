import express from "express";

import { addProcess, deleteProcess, editProcess, getCandidateProcess, getProcess, getProcesses } from "../Controllers/processController.js";
import {validateJWT} from "../Helpers/jwtValidator.js";

const router = express.Router();

router.get('/', [validateJWT], getProcesses);
router.get('/:id', [validateJWT], getProcess);
router.get('/getAllCandidateProcess/:searchId', [validateJWT], getCandidateProcess)
router.post('/', addProcess);
router.put('/:id', editProcess);
router.delete('/:id', [validateJWT], deleteProcess);


export default router;
