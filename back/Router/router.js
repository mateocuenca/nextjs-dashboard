import express from "express";
import userRoutes from "../Routes/userRoutes.js";
import comentariesRoutes from "../Routes/comentariesRoutes.js";
import processRoutes from "../Routes/processRoutes.js";
import searchRoutes from "../Routes/searchRoutes.js";
import candidateRoutes from "../Routes/candidateRoutes.js";
import interviewRoutes from "../Routes/interviewRoutes.js";
import notesRoutes from "../Routes/notesRoutes.js";
import questionsRoutes from "../Routes/questionsRoutes.js";
import answersRoutes from "../Routes/answersRoutes.js";
import candidateAnswersRoutes from "../Routes/candidateAnswersRoutes.js";
import loginRoutes from "../Routes/loginRoutes.js";
import analyzerRoutes from '../Routes/analyzer.js'
import oauthRoutes from '../Routes/googleOauthController.js'

const router = express.Router()

router.use('/user', userRoutes)
router.use('/comentaries', comentariesRoutes)
router.use('/process', processRoutes)
router.use('/search', searchRoutes)
router.use('/candidate', candidateRoutes)
router.use('/interview', interviewRoutes)
router.use('/notes', notesRoutes)
router.use('/questions', questionsRoutes)
router.use('/answers', answersRoutes)
router.use('/candidateAnswers', candidateAnswersRoutes)
router.use('/login', loginRoutes)
router.use('/analyzer', analyzerRoutes)
router.use('/oauth', oauthRoutes)

export default router