const routes = require('../routes/indexRoute.js');
const { sequelize } = require('../config/database'); 
sequelize
    .sync({
        alter: true 
    })
    .then(() => {
        console.log('Database sync successfully');
    })
    .catch((err) => {
        console.log('Erreur: ', err);
    });