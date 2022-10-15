/* sera el encargado de arracar la app */
import app from "./app.js";
import dotenv from "dotenv";
import { sequelize } from "./database/database.js";

async function main() {

    const PORT = process.env.PORT || 3000;

    try {
        await sequelize.sync();
        dotenv.config();
        app.listen(PORT)
        console.log('server is listening on port', PORT)
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

main();



