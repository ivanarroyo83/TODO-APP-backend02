import express from "express"; // importo express
import { validateSchema } from "../middlewares/validator.middelware.js";
import { loginSchema, registerSchema } from "../validators/auth.validator.js";
import {login,  register } from "../controllers/auth.controller.js";

const router = express.Router(); //creo una instancia de express.Router

router.post("/register", validateSchema(registerSchema), register);
router.post('/login', validateSchema(loginSchema), login)

export default router; //exporto la instancia de express.Router()
