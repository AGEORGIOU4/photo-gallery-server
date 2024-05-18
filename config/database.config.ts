import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const db = process.env.APP_ENV === 'production' ?
    new Sequelize({
        dialect: "mysql",
        host: process.env.MYSQL_HOST || "localhost",
        port: Number(process.env.MYSQL_PORT) || 3306,
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DB,

        // Enable on Production
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
    })
    :
    new Sequelize({
        dialect: "mysql",
        host: process.env.MYSQL_HOST || "localhost",
        port: Number(process.env.MYSQL_PORT) || 3306,
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DB,
    });

// Sync DB
async function init() {
    try {
        await db.sync();
    } catch (e) {
        console.error(e);
    }
}

init();

export default db;
