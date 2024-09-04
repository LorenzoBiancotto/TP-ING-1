// const mongoose = require('mongoose');
// require('dotenv').config(); // Charger les variables d'environnement à partir du fichier .env

// async function dbConnect() {
//     try {
//         const dbUri = process.env.MONGODB_URL; // Assurez-vous que la variable d'environnement est chargée
//         if (!dbUri) {
//             throw new Error('MONGODB_URL is not defined in .env file');
//         }
        
//         await mongoose.connect(dbUri, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log('Connection to DB established');
//     } catch (error) {
//         console.error('Database connection error:', error);
//         process.exit(1); // Sortir du processus en cas d'échec de connexion
//     }
// }

// module.exports = dbConnect;


// config/database.js
const { Sequelize } = require('sequelize');
require('dotenv').config(); // Charger les variables d'environnement à partir du fichier .env

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql', // Spécifiez le dialecte MySQL
    logging: false,   // Désactiver le logging SQL si vous ne voulez pas le voir
});

async function dbConnect() {
    try {
        await sequelize.authenticate();
        console.log('Connection to DB established');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1); // Sortir du processus en cas d'échec de connexion
    }
}

module.exports = { sequelize, dbConnect };