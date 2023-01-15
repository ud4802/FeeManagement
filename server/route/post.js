import  express  from "express";

import {log} from '../controller/login.js';

import {regi} from '../controller/register.js';

const router = express.Router();

router.post('/login',log);

router.post("/register",regi);

export default router;