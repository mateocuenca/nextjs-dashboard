import express from "express";

import { addCandidate, deleteCandidate, editCandidate, getCandidate, getCandidates } from "../Controllers/candidateController.js";
import {validateJWT} from "../Helpers/jwtValidator.js";

const router = express.Router();

router.get('/', [validateJWT], getCandidates);
router.get('/:id', [validateJWT], getCandidate);
router.post('/', [validateJWT], addCandidate);
router.put('/:id', [validateJWT], editCandidate);
router.delete('/:id', [validateJWT], deleteCandidate);

export default router;
