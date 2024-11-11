import express from "express";

import { getAuthUrl, createMeetEventWithParticipants} from "../Controllers/googleOauthController.js";

const router = express.Router();

router.get('/', getAuthUrl);
router.get('/google', createMeetEventWithParticipants);



export default router;
