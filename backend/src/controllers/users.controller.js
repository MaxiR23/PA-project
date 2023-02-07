import Users from '../models/Users.js';
import generateId from "../helpers/generarId.js"
import generateJWT from "../helpers/generarJWT.js"
import { emailRegistro, emailOlvidePassword } from '../helpers/email.js'
import bcrypt from 'bcrypt'

const signIn = async (request, response) => { //TODO: Cambiar por singUp
    const { name, lastname, email, password } = request.body;
    const userExist = await Users.findOne({ where: { email } });
    //A: Concurrencia: E-mail unique en el modelo Users.
    try {

        const storedUser = await Users.crearDeForm(name, lastname, email, password);

        /* enviamos el mail una vez que el usuario se registró a la base de datos */
        emailRegistro({
            email: storedUser.email,
            name: storedUser.name,
            token: storedUser.token
        })

        response.send({ msg: 'Usuario registrado correctamente', status: 'ok' })

    } catch (error) {

        throw(error);

        if (error.message == 'Validation error') { //TODO: Comparar excepcion por tipo.
            const error = new Error('Usuario ya registrado') //TODO:Necesito Error o paso directo el msg
            return response.status(400).json({ msg: error.message, status: 'error' })
        }

        return response.status(500).json({ msg: error.message, status: 'error' });
    }
}

const checkPassword = async (formPassword, dbPassword) => {
    const compare = await bcrypt.compare(formPassword, dbPassword);
    console.log('Checkpassword: ', {compare,formPassword,dbPassword}) //TODO: SEC!!
    return compare;
}

//Uso: se invoca para revisar usuario y clave
const auth = async (req, res) => {
    const { email, password } = req.body;
    /* comprobar si el usuario existe */
    const user = await Users.findOne({ where: { email } });

    if (!user) {
        const error = new Error('Usuario no existente');
        return res.status(404).json({ msg: error.message })
    }
    /* comprobar si confirmo el e-mail*/
    if (!user.isVerified) {
        const error = new Error('Tu cuenta no ha sido confirmada. Por favor confirme su cuenta');
        return res.status(403).json({ msg: error.message })
    }
    /* comprobar su password*/
    if (await checkPassword(password, user.password)) { //A: Si da el mismo hash que la db
        res.json({
            id: user.id,
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            token: generateJWT(user.id)
        })
    } else {
        const error = new Error('Contraseña incorrecta');
        return res.status(403).json({ msg: error.message })
    }
}

/* al estar los valores en la url necesitaremos req.params para acceder a ellos*/
const confirmUser = async (req, res) => {
    const { token } = req.params; /* pido el token por parametro */
    const confirmUser = await Users.findOne({ where: { token } }); /* busco el usuario que contiene dicho token */

    /* si no existe el token en el user */
    if (!confirmUser) {
        const error = new Error('Token no valido');
        return res.status(403).json({ msg: error.message })
    }

    /* si existe el token buscamos el usuario por id y actualizamos solo los campos isVerified y token */
    try {
        const userUpdated = await Users.findByPk(confirmUser.id);
        userUpdated.isVerified = true;
        userUpdated.token = ''; /* esta vacio porq es de un solo uso */
        await userUpdated.save() /* guardamos datos actualizados en la db */
        res.json({ msg: 'Usuario creado correctamente' })
    } catch (err) {
        console.warn(err)
    }
}

const resetPassword = async (req, res) => {
    const { email } = req.body;
    /* comprobamos si el usuario que quiere utilizar contraseña existe */
    const user = await Users.findOne({ where: { email } });

    if (!user) {
        const error = new Error('Hubo un error');
        return res.status(404).json({ msg: error.message })
    }

    try {
        const tokenUpdated = await Users.findByPk(user.id);
        tokenUpdated.token = generateId();
        tokenUpdated.save();

        //Enviamos el mail
        emailOlvidePassword({
            email: tokenUpdated.email,
            name: tokenUpdated.name,
            token: tokenUpdated.token
        })

        res.json({ msg: 'Hemos enviado un e-mail con las instrucciones' })
    } catch (err) {
        console.warn(err)
        //TODO: Devolver un msg de error.
    }
}

const checkToken = async (req, res) => {
    const { token } = req.params;
    /* retorna el primer resultado que sea correcto */
    const validToken = await Users.findOne({ where: { token } })

    if (validToken) {
        res.json({ msg: 'Token valido' })
    } else {
        const error = new Error('Token no valido');
        return res.status(404).json({ msg: error.message })
    }
}

const newPassword = async (req, res) => {
    const { token } = req.params; /* traemos el token */
    const { password } = req.body; /* requerimos el nuevo password que esta tipeado el usuario en form */

    /* primero comprobamos que el token sea valido */
    const user = await Users.findOne({ where: { token } })

    /* si es valido vamos a guardar la nueva contraseña traida por req.body */
    if (user) {
        const userUpdated = await Users.nuevaContraseña(user.id, password)
        try {
            console.log('userUpdated DESDE CONTROLLERS', userUpdated)
            await userUpdated.save();
            res.json({ msg: 'Contraseña modificada correctamente' })
        } catch (error) {
            console.warn(error)
        }
    } else {
        const error = new Error('Token no valido');
        return res.status(404).json({ msg: error.message })
    }
}

const profile = (req, res) => {
    const { user } = req
    res.json(user)
}

export { signIn, auth, confirmUser, resetPassword, checkToken, newPassword, profile }