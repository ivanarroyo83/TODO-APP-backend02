import express from "express"; //imortar express

const app = express(); // crea una isntancia de express


const PORT = 3001; //definimos el puerto

app.listen(PORT, ()=>{
console.log("server is running on port : http://localhost:" + PORT);
//inicalizar el puerto 3001
})

