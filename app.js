import express, {urlencoded} from "express"; //imortar express
import dotenv from "dotenv";
import fs from "node:fs";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";


dotenv.config() //ejecuta dotenv

const app = express(); // crea una isntancia de express

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);





//middlewares//
const corsOptions = {
    origin:process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    methods:['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS' ],
    alllowedheaders:['content-type', 'authorization', 'set-cookie'],
    exposedheaders:['set-cookie']

}   
app.use(cors(corsOptions));

app.use(express.json());// analizar el cuerpo de la solicitud como json
app.use(urlencoded({extended:true// analixar el cuerpo de la slicitud como url codificado
}));
app.use(morgan('dev'));
app.use(cookieParser());

//configuracionde archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));






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

export default app;










