import express from "express";
import { login, logout, logut, signup } from "../controllers/controller.js";
const router  = express.Router();

router.get('/signup',signup);

router.get('/login',login);

router.get('/logout',logout)

 export default router;