import express from "express"; // importo express
import { validateSchema } from "../middlewares/validator.middelware.js";
import { loginSchema, registerSchema } from "../validators/auth.validator.js";
import {login,  logout,  profile,  register, verifyEmail, verifyToken } from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validatetoken.js";
import uploadIconProfileImage from "../helpers/multer.config.iconProfile.js";
import { uploadProfileImage,  } from "../controllers/profile.controller.js";

const router = express.Router(); //creo una instancia de express.Router

router.post("/register", validateSchema(registerSchema), register);
router.post('/login', validateSchema(loginSchema), login);
router.post('/logout', logout);
router.get('/profile', authRequired, profile);
router.get('/verify-token', verifyToken);
router.get('/verify-email', verifyEmail);

// estas son las rutas para la imagen del perfil para el usuario
router.post('/upload-profile-image', 
    authRequired,
    uploadIconProfileImage.single("iconProfile"),
    uploadProfileImage
);// sube la imagen del perrfil

//router.get('/profile-image')//pide la imagen de perfil


export default router; //exporto la instancia de express.Router()
