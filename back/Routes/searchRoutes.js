import express from "express";

import { addSearch, deleteSearch, editSearch, getSearch, getSearches } from "../Controllers/searchController.js";
import { validateJWT } from "../Helpers/jwtValidator.js";

const router = express.Router();

router.get('/', [validateJWT], getSearches);
router.get('/:id', [], getSearch);
router.post('/', [validateJWT], addSearch);
router.put('/:id', [validateJWT], editSearch);
router.delete('/:id', [validateJWT], deleteSearch);

export default router;
