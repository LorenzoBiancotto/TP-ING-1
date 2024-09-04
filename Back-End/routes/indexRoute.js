// routes/indexRoute.js
const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes'); // Importer les routes utilisateur

// Utilisation des routes
router.use('/users', userRoutes); // Définit la route de base pour les utilisateurs

module.exports = router; // Exporter le routeur principal
