import express from "express";

import { addCandidateAnswer, deleteCandidateAnswer, editCandidateAnswer, getCandidateAnswer, getCandidateAnswers } from "../Controllers/candidateAnswersController.js";
import {validateJWT} from "../Helpers/jwtValidator.js";

const router = express.Router();

router.get('/', [validateJWT], getCandidateAnswers);
router.get('/:id', [validateJWT], getCandidateAnswer);
router.post('/', [validateJWT], addCandidateAnswer);
router.put('/:id', [validateJWT], editCandidateAnswer);
router.delete('/:id', [validateJWT], deleteCandidateAnswer);

export default router;
