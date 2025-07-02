import express from "express"; // importo express
import { validateSchema } from "../middlewares/validator.middelware.js";
import { registerSchema } from "../validators/auth.validator.js";
import { register } from "../controllers/auth.controller.js";

const router = express.Router(); //creo una instancia de express.Router

router.post("/register", validateSchema(registerSchema), register)


export default router; //exporto la instancia de express.Router()
