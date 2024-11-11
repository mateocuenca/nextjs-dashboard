import express from "express";

import { addNote, deleteNote, editNote, getNote, getNotes } from "../Controllers/notesController.js";

const router = express.Router();

router.get('/', getNotes);
router.get('/:id', getNote);
router.post('/', addNote);
router.put('/:id', editNote);
router.delete('/:id', deleteNote);

export default router;
