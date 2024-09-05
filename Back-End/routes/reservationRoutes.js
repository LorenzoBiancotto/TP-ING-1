const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController'); // Assurez-vous que ce chemin est correct

/**
 * @swagger
 * tags:
 *   name: Reservations
 *   description: API pour la gestion des réservations
 */

/**
 * @swagger
 * /api/reservations:
 *   get:
 *     summary: Récupérer toutes les réservations
 *     tags: [Reservations]
 *     responses:
 *       200:
 *         description: Succès - Renvoie toutes les réservations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   userId:
 *                     type: integer
 *                   productId:
 *                     type: integer
 *                   reservationDate:
 *                     type: string
 *                     format: date-time
 *                   status:
 *                     type: string
 *       500:
 *         description: Erreur serveur - Une erreur s'est produite lors de la récupération des réservations
 */
router.get('/', reservationController.getAllReservations);

/**
 * @swagger
 * /api/reservations/{id}:
 *   get:
 *     summary: Récupérer une réservation par ID
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la réservation
 *     responses:
 *       200:
 *         description: Succès - Renvoie la réservation correspondante
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 userId:
 *                   type: integer
 *                 productId:
 *                   type: integer
 *                 reservationDate:
 *                   type: string
 *                   format: date-time
 *                 status:
 *                   type: string
 *       404:
 *         description: Réservation non trouvée
 *       500:
 *         description: Erreur serveur - Une erreur s'est produite lors de la récupération de la réservation
 */
router.get('/:id', reservationController.getReservationById);

/**
 * @swagger
 * /api/reservations/create:
 *   post:
 *     summary: Créer une nouvelle réservation
 *     tags: [Reservations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               productId:
 *                 type: integer
 *               reservationDate:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *             example:
 *               userId: 1
 *               productId: 1
 *               reservationDate: 2024-09-05T12:00:00Z
 *               status: Reserved
 *     responses:
 *       201:
 *         description: Succès - Réservation créée
 *       400:
 *         description: Mauvaise requête - Les champs requis sont manquants
 *       500:
 *         description: Erreur serveur - Une erreur s'est produite lors de la création de la réservation
 */
router.post('/create', reservationController.createReservation);

/**
 * @swagger
 * /api/reservations/update/{id}:
 *   put:
 *     summary: Mettre à jour une réservation
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la réservation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reservationDate:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *             example:
 *               reservationDate: 2024-09-10T12:00:00Z
 *               status: Confirmed
 *     responses:
 *       200:
 *         description: Succès - Réservation mise à jour
 *       404:
 *         description: Réservation non trouvée
 *       500:
 *         description: Erreur serveur - Une erreur s'est produite lors de la mise à jour de la réservation
 */
router.put('/update/:id', reservationController.updateReservation);

/**
 * @swagger
 * /api/reservations/delete/{id}:
 *   delete:
 *     summary: Supprimer une réservation
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la réservation
 *     responses:
 *       200:
 *         description: Succès - Réservation supprimée
 *       404:
 *         description: Réservation non trouvée
 *       500:
 *         description: Erreur serveur - Une erreur s'est produite lors de la suppression de la réservation
 */
router.delete('/delete/:id', reservationController.deleteReservation);

module.exports = router;
