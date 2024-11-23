import express from "express";

import { addInterview, deleteInterview, editInterview, getInterview, getInterviews } from "../Controllers/interviewController.js";
import {validateJWT} from "../Helpers/jwtValidator.js";

const router = express.Router();

router.get('/', [validateJWT], getInterviews);
router.get('/:id', [validateJWT], getInterview);
router.post('/', [validateJWT], addInterview);
router.put('/:id', [validateJWT], editInterview);
router.delete('/:id', [validateJWT], deleteInterview);

export default router;
