import express, {urlencoded} from "express"; //imortar express
import dotenv from "dotenv";
import fs from "node:fs";
import cors from "cors";

dotenv.config() //ejecuta dotenv

const app = express(); // crea una isntancia de express


const PORT = process.env.PORT || 3000;  //definimos el puerto

//middlewares//
app.use(cors({
    origin: "*", // con esto voy a permitir las soliciyudes dedesde cualquier origen cruzado
    credentials:true // permitir el intercambio de credenciales (cookies, encabezados de autorizacion, etc)
}));
app.use(express.json());// analizar el cuerpo de la solicitud como json
app.use(urlencoded({extended:true// analixar el cuerpo de la slicitud como url codificado

}))






//manejo de rutas
//leemos todos los archivos dentro del directorio '.src/routes' de forma sincrona
//fs.readdirsync deveil ve un array con los nombre de toso los archivos del direvtorio
const routeFiles = fs.readdirSync('./src/routes')
console.log(routeFiles);

//iteramos sobre cada archivo encontrado en el directorio de rutas
//usamos importaciones dinamicas (import())para cargar cada modulo de ruta
routeFiles.forEach((file) =>{

    import(`./src/routes/${file}`).then((route)=>{
        //registramos la ruta en nuestr a aplicacion express
        //todas las rutas importadas seran prefijadas con '/api/v1' esto nos da
        //versionado de api
        //un punto de entrada comun para todas las rutas
        // mejor oraganizacion de lcodigo
        app.use('/api/v1', route.default);


    }).catch((err)=>{
        console.error(`error al cargar la ruta ${file}:`, err)
    })
})


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






