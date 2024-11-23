import express from "express";

import { addQuestion, deleteQuestion, editQuestion, getQuestion, getQuestions } from "../Controllers/questionsController.js";
import {validateJWT} from "../Helpers/jwtValidator.js";

const router = express.Router();

router.get('/:searchId', getQuestions);
router.get('/:id', [validateJWT], getQuestion);
router.post('/add', [validateJWT], addQuestion);
router.put('/:id', [validateJWT], editQuestion);
router.delete('/:id', [validateJWT],deleteQuestion);

export default router;
