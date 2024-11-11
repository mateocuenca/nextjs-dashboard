import express from "express";

import { addAnswer, deleteAnswer, editAnswer, getAnswer, getAnswers } from "../Controllers/answersController.js";

const router = express.Router();

router.get('/', getAnswers);
router.get('/:id', getAnswer);
router.post('/', addAnswer);
router.put('/:id', editAnswer);
router.delete('/:id', deleteAnswer);

export default router;
