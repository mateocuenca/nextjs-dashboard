import express from "express";

import { addComentary, deleteComentary, editComentary, getComentary, getComentaries } from "../Controllers/comentariesController.js";

const router = express.Router();

router.get('/:processId', getComentaries);
router.post('/', addComentary);
router.put('/:id', editComentary);
router.delete('/:id', deleteComentary);

export default router;
