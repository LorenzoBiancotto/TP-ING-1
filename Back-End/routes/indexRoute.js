// routes/indexRoute.js
const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes'); // Importer les routes utilisateur
const productRoutes = require('./productRoutes'); // Importer les routes utilisateur
const reservationRoutes = require('./reservationRoutes'); // Importer les routes utilisateur


// Utilisation des routes
router.use('/users', userRoutes); // Définit la route de base pour les utilisateurs
router.use('/products', productRoutes); // Définit la route de base pour les utilisateurs
router.use('/reservations', reservationRoutes); // Définit la route de base pour les utilisateurs

module.exports = router; // Exporter le routeur principal
