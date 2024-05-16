const { Sequelize } = require('sequelize');
require('dotenv').config();

const db = process.env.APP_ENV === 'production' ?
    new Sequelize({
        dialect: "postgres",
        host: process.env.POSTGRES_HOST || "localhost",
        port: process.env.POSTGRES_PORT || 5432,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,

        // Enable on Production
        dialectOptions: {
            ssl: {
                require: true, // This will help you. But you will see nwe error
                rejectUnauthorized: false // This line will fix new error
            }
        },
    })
    :
    new Sequelize({
        dialect: "postgres",
        host: process.env.POSTGRES_HOST || "localhost",
        port: process.env.POSTGRES_PORT || 5432,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
    });

// Sync DB
async function init() {
    try {
        await db.sync();
    } catch (e) {
        console.log(e);
    }
}

init();

export default db;