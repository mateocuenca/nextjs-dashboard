import express from "express";

import { addSearch, deleteSearch, editSearch, getSearch, getSearches } from "../Controllers/searchController.js";
import { validateJWT } from "../Helpers/jwtValidator.js";

const router = express.Router();

router.get('/', [], getSearches);
router.get('/:id', [], getSearch);
router.post('/', [], addSearch);
router.put('/:id', [], editSearch);
router.delete('/:id', [validateJWT], deleteSearch);

export default router;
