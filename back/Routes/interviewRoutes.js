import express from "express";

import { addInterview, deleteInterview, editInterview, getInterview, getInterviews } from "../Controllers/interviewController.js";

const router = express.Router();

router.get('/', getInterviews);
router.get('/:id', getInterview);
router.post('/', addInterview);
router.put('/:id', editInterview);
router.delete('/:id', deleteInterview);

export default router;
