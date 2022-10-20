/* tendra la config de express */
import express from "express";

/* rutas */
import projectRoutes from './routes/projects.routes.js'
import tasksRoutes from './routes/tasks.routes.js'
import userRoutes from './routes/users.routes.js'

import cors from 'cors';
/* CONFIGURACION DE CORS */
const whiteList = ['http://localhost:3001'];

const corsOptions = {
    origin: function (origin, callback) {
        if (whiteList.includes(origin)) {
            //Puede consultar la API
            callback(null,true);
        } else {
            /* No puede consultar */
            callback(new Error('Error de Cors'))
        }
    }
}


import indexRouter from './routes/index.js' 

const app = express();

app.use(cors({origin:'*'})) // Permitimos el acceso público a la API
/* middlewares */ 
app.use(express.json());
/* podrá procesar las respuestas json gracias a esta linea */
app.use('/', indexRouter)


export default app;