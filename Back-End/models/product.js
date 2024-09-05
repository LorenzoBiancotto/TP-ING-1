// models/user.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database'); // Importer l'instance Sequelize

const Product = sequelize.define('product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = Product;
