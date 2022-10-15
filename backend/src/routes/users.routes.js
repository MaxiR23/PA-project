import { Router } from "express";
import { auth, checkToken, confirmUser, newPassword, resetPassword, profile, signIn } from "../controllers/users.controller.js";
import checkAuth from "../middleware/checkAuth.js";
import Users from "../models/Users.js";

const router = Router();

/* Autenticación, Registro, Confirmación de usuarios */
router.post('/signin', signIn)
router.post('/login', auth)
router.post('/reset-password', resetPassword)
/* en este caso los valores van a estar en la url = ver users.controlers.js */
/* despues de los : es la variable que generará express dinamicamente */
router.get('/confirm/:token', confirmUser)
/* al ser la misma ruta, si es un get va a hacer una cosa y post otra */
router.route('/reset-password/:token').get(checkToken).post(newPassword)

/* verificamos primero el JWT, que sea validator, si todo esta bien puede pasar al siguiente middleware */
router.get('/profile', checkAuth, profile)

export default router;