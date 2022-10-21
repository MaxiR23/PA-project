import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import bcrypt from "bcrypt"

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

//Uso: guardar el hash del password en la DB.
function hashPassword(user) {
    if (user.password) {
        const saltRounds = (10);
        user.password = bcrypt.hashSync(user.password, saltRounds)
    }
}

Users.addHook('beforeCreate', hashPassword);
Users.addHook('beforeUpdate', hashPassword)

export default Users;