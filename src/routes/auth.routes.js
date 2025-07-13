import express from "express"; // importo express
import { validateSchema } from "../middlewares/validator.middelware.js";
import { loginSchema, registerSchema } from "../validators/auth.validator.js";
import {login,  logout,  profile,  register, verifyEmail, verifyToken } from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validatetoken.js";

const router = express.Router(); //creo una instancia de express.Router

router.post("/register", validateSchema(registerSchema), register);
router.post('/login', validateSchema(loginSchema), login);
router.post('/logout', logout);
router.get('/profile', authRequired, profile);
router.get('/verify-token', verifyToken);
router.get('/verify-email', verifyEmail)

// estas son las rutas para la imagen del perfil para el usuario
router.post('/upload-profile-image');// sube la imagen del perrfil
router.get('/profile-image')


export default router; //exporto la instancia de express.Router()
