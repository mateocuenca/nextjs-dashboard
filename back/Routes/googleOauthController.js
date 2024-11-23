import express from "express";

import { getAuthUrl, createMeetEventWithParticipants} from "../Controllers/googleOauthController.js";
import {validateJWT} from "../Helpers/jwtValidator.js";

const router = express.Router();

router.get('/', [validateJWT], getAuthUrl);
router.get('/google', [validateJWT], createMeetEventWithParticipants);



export default router;
