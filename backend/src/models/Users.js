import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import bcrypt from "bcrypt";
import generateId from "../helpers/generarId.js";

const Users = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    token: {
        type: DataTypes.STRING,
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
}, {
    timestamp: true,
});

Users.crearDeForm = async function (name, lastname, email, formPassword) {
    const datos = { name, lastname, email, formPassword };
    hashPassword(datos); //A: Solo queda password hasheado.
    console.log('crearDeForm: ', datos)
    const storedUser = new Users(datos);
    storedUser.token = generateId()
    return await Users.create(storedUser.dataValues);
}

Users.nuevaContraseña = async function (id, formPassword) {
    const userUpdated = await Users.findByPk(id);
    const constraseña = { formPassword: formPassword }
    console.log('CONTRASEÑA: ', constraseña)
    const contra = hashPassword(constraseña); 
    userUpdated.token = '';
    userUpdated.password = contra
    console.log('userUpdated DESDE USER.JS: ', userUpdated)
    return userUpdated;
}

//Uso: guardar el hash del password en la DB.
function hashPassword(user) { //A: user.password siempre debe estar encriptado, formPassword no se guarda en la db.
    let userPass = user.password;
    if (user.formPassword) {
        const saltRounds = (10);
        const formPassword = user.formPassword;
        userPass = bcrypt.hashSync(user.formPassword, saltRounds)
        console.log('hashPassword: ', { formPassword, dbPassword: userPass });
        user.formPassword = null;
    }

    return userPass;
}

export default Users;