import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'
import { Task } from './Task.js';

/* esquema de proyecto */
export const Project = sequelize.define('projects', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
    },
    name: {
        type: DataTypes.STRING,
    },
    priority: {
        type: DataTypes.INTEGER,
    },
    description: {
        type: DataTypes.STRING,
    }, 
}, {
    timestamps: false,
});

/* relacionando con task */
/* un proyecto tiene muchas tareas */
Project.hasMany(Task,{
    foreingKey: 'projectId',
    sourceKey: 'id'
})

Task.belongsTo(Project, {
    foreingKey: 'projectId',
    targetId: 'id'
})