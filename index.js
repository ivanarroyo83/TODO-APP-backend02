import express from "express"; //imortar express
import dotenv from "dotenv";
import fs from "node:fs";
dotenv.config() //ejecuta dotenv

const app = express(); // crea una isntancia de express


const PORT = process.env.PORT || 3000;  //definimos el puerto

app.listen(PORT, ()=>{
console.log("server is running on port : http://localhost:" + PORT);
//inicalizar el puerto 3001
})

//manejo de rutas
