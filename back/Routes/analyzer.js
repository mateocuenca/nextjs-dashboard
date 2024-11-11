import  { Router } from 'express';
import   { analyze } from '../Controllers/openAiAnalyzer.js'

const router = Router();


router.post('/:uuidSearch/:uuidProcess', analyze);



export default router