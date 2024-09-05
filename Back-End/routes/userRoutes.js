const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Récupérer tous les utilisateurs
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Succès - Renvoie tous les utilisateurs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   firstname:
 *                     type: string
 *                   lastname:
 *                     type: string
 *                   email:
 *                     type: string
 *                   roles:
 *                     type: string
 *       500:
 *         description: Erreur serveur - Une erreur s'est produite lors de la récupération des utilisateurs
 */
router.get('/', userController.getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Récupérer un utilisateur par ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Succès - Renvoie l'utilisateur correspondant
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 firstname:
 *                   type: string
 *                 lastname:
 *                   type: string
 *                 email:
 *                   type: string
 *                 roles:
 *                   type: string
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur - Une erreur s'est produite lors de la récupération de l'utilisateur
 */
router.get('/:id', userController.getUserById);

/**
 * @swagger
 * /api/users/create:
 *   post:
 *     summary: Créer un nouvel utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               roles:
 *                 type: string
 *             example:
 *               firstname: Jean
 *               lastname: Dupont
 *               email: jean.dupont@example.com
 *               password: secret123
 *               roles: Admin
 *     responses:
 *       200:
 *         description: Succès - Utilisateur créé
 *       500:
 *         description: Erreur serveur - Une erreur s'est produite lors de la création de l'utilisateur
 */
router.post('/create', userController.createUser);

/**
 * @swagger
 * /api/users/update/{id}:
 *   put:
 *     summary: Mettre à jour un utilisateur
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               roles:
 *                 type: string
 *             example:
 *               firstname: Jean
 *               lastname: Dupont
 *               email: jean.dupont@example.com
 *               password: newSecret123
 *               roles: Admin
 *     responses:
 *       200:
 *         description: Succès - Utilisateur mis à jour
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur - Une erreur s'est produite lors de la mise à jour de l'utilisateur
 */
router.put('/update/:id', userController.updateUser);

/**
 * @swagger
 * /api/users/delete/{id}:
 *   delete:
 *     summary: Supprimer un utilisateur
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Succès - Utilisateur supprimé
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur - Une erreur s'est produite lors de la suppression de l'utilisateur
 */
router.delete('/delete/:id', userController.deleteUser);

module.exports = router;
