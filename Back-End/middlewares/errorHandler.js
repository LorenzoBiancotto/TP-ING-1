// errorHandler.js
const mongoose = require('mongoose');

// Classe pour les erreurs personnalisées
class CustomError extends Error {
    constructor(statusCode, errorMessage) {
        super(errorMessage);
        this.statusCode = statusCode;
    }
}

// Fonction middleware de gestion des erreurs
const errorHandler = (err, req, res, next) => {
    if (err instanceof CustomError) {
        // Gérer les erreurs personnalisées
        return res.status(200).json({ code: err.statusCode, message: err.message });
    } else if (err instanceof mongoose.Error.ValidationError) {
        // Gérer les erreurs de validation Mongoose
        return res.status(400).json({ message: err.message });
    } else if (err) {
        // Gérer les erreurs génériques
        console.error(err);
        return res.status(500).json({ message: err });
    }

    next(); // Appeler next() si aucune erreur n'est capturée
};

module.exports = {
    CustomError,
    errorHandler
};
