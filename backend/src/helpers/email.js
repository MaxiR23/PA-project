import nodemailer from 'nodemailer';

const emailRegistro = (datos) => {
    const { email, name, password } = datos;

    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "be2c5ddf198cff",
            pass: "93c17d442cf694"
        }
    });

    /* Informacion del email */
}

export default emailRegistro;
