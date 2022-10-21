/* Servicio utilizado para los test de mails / ver y USAR integraciones una vez creada una cuenta: https://mailtrap.io/ */
import nodemailer from 'nodemailer';

export const emailRegistro = async (datos) => {
    /* traemos el email, name y token de un usuario una vez que se registre en la base de datos */
    const { email, name, token } = datos;

    /* configuramos el cliente para mandar el mail,
     MAS INFO: https://nodemailer.com/about/ - https://nodemailer.com/usage/ */

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    /* Informacion del email */

    /* confirmamos que el usuario que esta registrando su cuenta tiene el token , visita el enlace y confirmamos el token.
    y POR EJ si no confirman la cuenta se podría chequear una vez el mes, para dar de baja el usuario.
    */
    const info = await transport.sendMail({
        from: '"PA project - Admin" <cuentas@paproject.com>',
        to: email,
        subject: 'PA-project - Confirma tu cuenta',
        text: 'Comprueba tu cuenta en PA Project',
        html: `<p> Hola, ${name} confirma tu cuenta en PA-project </p>
        <p> Tu cuenta ya esta casi lista, solo debes ingresar al siguiente link para finalizar con su verificación: 
        <a href='${process.env.FRONTEND_URL}/confirm/${token}'> Confirmar cuenta </a> 
        <p> Si tu no creaste esta cuenta, podés ignorar el e-mail. </p> 

        `
    })
}

export const emailOlvidePassword = async (datos) => {
    /* traemos el email, name y token de un usuario una vez que se registre en la base de datos */
    const { email, name, token } = datos;

    /* configuramos el cliente para mandar el mail,
     MAS INFO: https://nodemailer.com/about/ - https://nodemailer.com/usage/ */
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    /* Informacion del email */
    const info = await transport.sendMail({
        from: '"PA project - Admin" <cuentas@paproject.com>',
        to: email,
        subject: 'PA-project - Restablecer la contraseña',
        text: 'Restablece la contraseña de tu cuenta en PA Project',
        html: `<p> Hola, ${name} has solicitado reestablecer tu contraseña de tu cuenta de PA-project </p>
        <p> Seguí el siguiente link para generar una contraseña nueva: 
        <a href='${process.env.FRONTEND_URL}/reset-password/${token}'> Reestablecer contraseña </a> 
        <p> Si tu no solicitaste un cambio de contraseña en tu cuenta, podés ignorar el e-mail. </p> 

        `
    })
}
