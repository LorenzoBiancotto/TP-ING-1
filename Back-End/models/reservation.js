// models/reservation.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database'); // Importer l'instance Sequelize
const User = require('./user');  // Importer le modèle User
const Product = require('./product');  // Importer le modèle Product

const Reservation = sequelize.define('reservation', {
    reservationDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Reserved', // Valeur par défaut pour le statut de la réservation
    }
});

// Définir les relations entre les tables
User.hasMany(Reservation, { foreignKey: 'userId' });
Reservation.belongsTo(User, { foreignKey: 'userId' });

Product.hasMany(Reservation, { foreignKey: 'productId' });
Reservation.belongsTo(Product, { foreignKey: 'productId' });

module.exports = Reservation;
