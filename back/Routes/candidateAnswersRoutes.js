import express from "express";

import { addCandidateAnswer, deleteCandidateAnswer, editCandidateAnswer, getCandidateAnswer, getCandidateAnswers } from "../Controllers/candidateAnswersController.js";

const router = express.Router();

router.get('/', getCandidateAnswers);
router.get('/:id', getCandidateAnswer);
router.post('/', addCandidateAnswer);
router.put('/:id', editCandidateAnswer);
router.delete('/:id', deleteCandidateAnswer);

export default router;
