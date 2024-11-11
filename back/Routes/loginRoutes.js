import {Router} from "express";
import { login } from "../Controllers/loginController.js";

const router = Router();

router.post('/', login)


export default router;