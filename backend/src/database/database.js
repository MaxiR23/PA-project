import Sequelize from 'sequelize';

export const sequelize = new Sequelize(
    'test_project',
    'root',
    '',
    {
    host: 'localhost',
    dialect: 'mysql',
    }
);

