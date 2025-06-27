import app from './app.js';
import connectToMongoDB from './db.js';



const PORT = process.env.PORT || 3000;  //definimos el puerto

connectToMongoDB();
//iniciar el servidor

const server = async ()=> {
    try {
        app.listen(PORT, ()=>{
          console.log("server is running on port : http://localhost:" + PORT);
//inicalizar el puerto 3001
})
        
    } catch (error) {
        console.log('error al incar el serividor', error);
        process.exit(1) // salir del proceso con un codigo de error 1
        
        
    }
}

server(); //ejecutar la funcion server


