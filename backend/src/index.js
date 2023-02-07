//INFO: Solo web-server e inicializa app.
import initialize_app from "./app.js";
import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
dotenv.config();

/* CONFIGURACION DE CORS */
const whiteList = [process.env.FRONTEND_URL];

console.log('acepto estos servidores:', process.env.FRONTEND_URL)

const corsOptions = {
    origin: function (origin, callback) {
        if (whiteList.includes(origin)) {
            //Puede consultar la API
            callback(null, true);
        } else {
            /* No puede consultar */
            callback(new Error('Error de Cors'))
        }
    }
}

const main = async () => {
    const PORT = process.env.PORT || 3000;
    /* Solucionar nuevo problema de cors */
    try {
        let app = express();
        app.use(cors(corsOptions)) // Permitimos el acceso público a la API
        /* middlewares */
        app.use(express.json());
        
        app = await initialize_app(app);
        app.listen(PORT)
        console.log('server is listening on port', PORT)
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

main();