import jwt from 'jsonwebtoken';

const generarJWT = (id) => {
    /* genera un json web token con un objeto con el id tomado del usuario */
    return jwt.sign({ id }, process.env.JWT_SECRET, { /* firma el token */
        expiresIn: '30d' /* el tiempo que estará vigente el JSON web Token */
    })
}

export default generarJWT;