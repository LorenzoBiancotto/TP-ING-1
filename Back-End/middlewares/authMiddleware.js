const jwt = require('jsonwebtoken');
const secretKey = 'synexis_13013';

exports.authMiddleware = (req, res, next) => {
    // Récupérer le jeton d'authentification du header de la requête
    const authHeader = req.headers.authorization;
    const token = authHeader ? authHeader.split(' ')[1] : null;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        // Vérifier le jeton et extraire les informations de l'utilisateur
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded; // Ajouter les informations de l'utilisateur à la requête
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Invalid token' });
    }
};
