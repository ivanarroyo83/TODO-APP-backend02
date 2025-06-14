import express from "express"; // importo express
import { about, getUser, home } from "../controllers/auth.controller.js";

const router = express.Router(); //creo una instancia de express.Router

router.get("/", home)

router.get("/about" , about)

router.post("/getUser" , getUser)


export default router; //exporto la instancia de express.Router
