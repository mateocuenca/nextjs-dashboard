import express from "express";

import { addQuestion, deleteQuestion, editQuestion, getQuestion, getQuestions } from "../Controllers/questionsController.js";

const router = express.Router();

router.get('/:searchId', getQuestions);
router.get('/:id', getQuestion);
router.post('/add', addQuestion);
router.put('/:id', editQuestion);
router.delete('/:id', deleteQuestion);

export default router;
