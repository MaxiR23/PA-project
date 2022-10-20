//INFO: Especifico de esta aplicación. Web server esta en index.js
import { sequelize } from "./database/database.js";
import indexRouter from './routes/index.js' 

async function initialize(app) {
    await sequelize.sync();
    app.use('/', indexRouter)
    return app;
}

export default initialize;