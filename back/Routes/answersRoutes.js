import express from "express";

import { addAnswer, deleteAnswer, editAnswer, getAnswer, getAnswers } from "../Controllers/answersController.js";
import {validateJWT} from "../Helpers/jwtValidator.js";

const router = express.Router();

router.get('/', [validateJWT], getAnswers);
router.get('/:id', [validateJWT], getAnswer);
router.post('/', [validateJWT], addAnswer);
router.put('/:id', [validateJWT], editAnswer);
router.delete('/:id', [validateJWT], deleteAnswer);

export default router;
