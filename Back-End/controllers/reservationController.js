// controllers/reservationController.js
const Reservation = require('../models/reservation');
const User = require('../models/user');
const Product = require('../models/product');

// Récupérer toutes les réservations (READ)
exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.findAll({
            include: [User, Product]  // Inclure les données des utilisateurs et des produits liés
        });
        res.json(reservations);
    } catch (error) {
        console.error('Erreur lors de la récupération des réservations :', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des réservations' });
    }
};

// Récupérer une réservation par son ID (READ)
exports.getReservationById = async (req, res) => {
    try {
        const reservation = await Reservation.findByPk(req.params.id, {
            include: [User, Product]  // Inclure les données des utilisateurs et des produits liés
        });
        if (reservation) {
            res.json(reservation);
        } else {
            res.status(404).json({ error: 'Réservation non trouvée' });
        }
    } catch (error) {
        console.error('Erreur lors de la récupération de la réservation :', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération de la réservation' });
    }
};

// Créer une nouvelle réservation (CREATE)
exports.createReservation = async (req, res) => {
    try {
        const { userId, productId, reservationDate, status } = req.body;

        // Vérifier que toutes les données nécessaires sont présentes
        if (!userId || !productId || !reservationDate) {
            return res.status(400).json({ error: 'Les champs userId, productId et reservationDate sont obligatoires' });
        }

        // Vérifier que l'utilisateur et le produit existent
        const user = await User.findByPk(userId);
        const product = await Product.findByPk(productId);

        if (!user || !product) {
            return res.status(404).json({ error: 'Utilisateur ou produit non trouvé' });
        }

        const newReservation = await Reservation.create({
            userId,
            productId,
            reservationDate,
            status: status || 'Reserved'  // Utiliser le statut par défaut si aucun n'est fourni
        });

        res.status(201).json(newReservation);
    } catch (error) {
        console.error('Erreur lors de la création de la réservation :', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la création de la réservation' });
    }
};

// Mettre à jour une réservation (UPDATE)
exports.updateReservation = async (req, res) => {
    try {
        const { reservationDate, status } = req.body;
        const reservation = await Reservation.findByPk(req.params.id);

        if (!reservation) {
            return res.status(404).json({ error: 'Réservation non trouvée' });
        }

        // Mettre à jour uniquement les champs fournis
        if (reservationDate) reservation.reservationDate = reservationDate;
        if (status) reservation.status = status;

        await reservation.save();
        res.json(reservation);
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la réservation :', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour de la réservation' });
    }
};

// Supprimer une réservation (DELETE)
exports.deleteReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findByPk(req.params.id);
        if (!reservation) {
            return res.status(404).json({ error: 'Réservation non trouvée' });
        }

        await reservation.destroy();
        res.json({ message: 'Réservation supprimée avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression de la réservation :', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la suppression de la réservation' });
    }
};
