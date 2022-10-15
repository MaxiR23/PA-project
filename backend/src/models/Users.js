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
async function hashPassword(user) {
    if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = bcrypt.hashSync(user.password, salt)
    }
}

Users.addHook('beforeCreate', hashPassword);
Users.addHook('beforeUpdate', hashPassword)

/* add a custom method */
Users.prototype.checkPassword = async function (formPassword, users) {
    /* compare va a comprobar un string no hasheado con uno que si lo esta y nos dirá si es el mismo */
    console.log('formPass:' ,formPassword)
    console.log('Pass:', this.password)
    return await bcrypt.compare(formPassword, this.password); /* comprobará si el password que pasamos por form es el mismo que esta en la db */
    
    /*Ver: https://github.com/kelektiv/node.bcrypt.js#with-promises */
} 

export default Users;