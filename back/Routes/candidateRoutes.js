import express from "express";

import { addCandidate, deleteCandidate, editCandidate, getCandidate, getCandidates } from "../Controllers/candidateController.js";

const router = express.Router();

router.get('/', getCandidates);
router.get('/:id', getCandidate);
router.post('/', addCandidate);
router.put('/:id', editCandidate);
router.delete('/:id', deleteCandidate);

export default router;
