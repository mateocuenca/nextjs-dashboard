import express from "express";

import { addProcess, deleteProcess, editProcess, getCandidateProcess, getProcess, getProcesses } from "../Controllers/processController.js";

const router = express.Router();

router.get('/', getProcesses);
router.get('/:id', getProcess);
router.get('/getAllCandidateProcess/:searchId', getCandidateProcess)
router.post('/', addProcess);
router.put('/:id', editProcess);
router.delete('/:id', deleteProcess);


export default router;
