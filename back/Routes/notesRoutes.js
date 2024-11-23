import express from "express";

import { addNote, deleteNote, editNote, getNote, getNotes } from "../Controllers/notesController.js";
import {validateJWT} from "../Helpers/jwtValidator.js";

const router = express.Router();

router.get('/', [validateJWT], getNotes);
router.get('/:id', [validateJWT], getNote);
router.post('/', [validateJWT], addNote);
router.put('/:id', [validateJWT], editNote);
router.delete('/:id', [validateJWT], deleteNote);

export default router;
