// models/user.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database'); // Importer l'instance Sequelize

const User = sequelize.define('user', {
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        // unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    roles: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Membre', // Valeur par défaut pour le rôle de l'utilisateur
    }
});

module.exports = User;
