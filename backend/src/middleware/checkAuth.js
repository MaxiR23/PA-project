/* INFO BEARER: https://swagger.io/docs/specification/authentication/bearer-authentication/ */
import jwt from "jsonwebtoken";
import Users from "../models/Users.js";

/* vamos a estar chequeando que un usuario sea validator, y este autenticado */
const checkAuth = async (req, res, next) => {

    let token;

    if (req.headers.authorization && 
        req.headers.authorization.startswith('Bearer')) { /* si hay un bearer vamos a obtener el token */

        /* extraemos el token desde headers */
            try {
                token = req.headers.authorization.split(" ")[1]; 
                const decoded = jwt.verify(token, process.env.JWT_SECRET); /* lee el token por verify */
                //TODO: revisar si esta expirado.
                req.user = await Usuario.findById(decoded.id).select('-password -confirmado -token -createdAt -updatedAt');     
                return next(); /* una vez que verificamos el token pasamos al siguiente middleware */
            } catch (error) {
                return res.status(404).json({msg: 'Hubo un error'})
            }
    }

    if (!token) {
        const error = new Error('Token no valido')
        res.status(401).json({msg: error.message})
    }

    next();
}

export default checkAuth