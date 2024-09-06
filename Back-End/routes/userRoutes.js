const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API pour la gestion des utilisateurs
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Récupérer tous les utilisateurs
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
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
router.get('/',authMiddleware, userController.getAllUsers);

/**
 * @swagger
 * /api/users/test:
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
router.get('/test', userController.getAllUsersTest);

/**
 * @swagger
 * /api/users/getMe:
 *   get:
 *     summary: Récupérer tous les utilisateurs
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Succès - Renvoie tous les utilisateurs
 *       500:
 *         description: Erreur serveur - Une erreur s'est produite lors de la récupération des utilisateurs
 */
router.get('/getMe', authMiddleware, userController.getUsersMe);

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
 *               confirmPassword:
 *                 type: string
 *               roles:
 *                 type: string
 *             example:
 *               firstname: Jean
 *               lastname: Dupont
 *               email: jean.dupont@example.com
 *               password: P@ssword123
 *               confirmPassword: P@ssword123
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
 * /api/users/updateInfo:
 *   put:
 *     summary: Mettre à jour un utilisateur
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
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
 *             example:
 *               firstname: Jean
 *               lastname: Dupont
 *     responses:
 *       200:
 *         description: Succès - Utilisateur mis à jour
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur - Une erreur s'est produite lors de la mise à jour de l'utilisateur
 */
router.put('/updateInfo',authMiddleware, userController.updateUserInfo);

/**
 * @swagger
 * /api/users/updateRole:
 *   put:
 *     summary: Mettre à jour un utilisateur
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *             example:
 *               role: Membre
 *     responses:
 *       200:
 *         description: Succès - Utilisateur mis à jour
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur - Une erreur s'est produite lors de la mise à jour de l'utilisateur
 */
router.put('/updateRole',authMiddleware, userController.updateUserRole);

/**
 * @swagger
 * /api/users/updatePassword:
 *   put:
 *     summary: Mettre à jour un utilisateur
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *             example:
 *               password: P@ssword1234
 *               confirmPassword: P@ssword1234
 *     responses:
 *       200:
 *         description: Succès - Utilisateur mis à jour
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur - Une erreur s'est produite lors de la mise à jour de l'utilisateur
 */
router.put('/updatePassword',authMiddleware, userController.updateUserPassword);


/**
 * @swagger
 * /api/users/delete:
 *   delete:
 *     summary: Supprimer un utilisateur
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Succès - Utilisateur supprimé
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur - Une erreur s'est produite lors de la suppression de l'utilisateur
 */
router.delete('/delete/:id',authMiddleware, userController.deleteUser);


/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Connexion d'un utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: jean.dupont@example.com
 *               password: P@ssword123
 *     responses:
 *       200:
 *         description: Succès - Renvoie un message de connexion réussie
 *       401:
 *         description: Non autorisé - Les informations d'identification sont incorrectes
 *       500:
 *         description: Erreur serveur - Une erreur s'est produite lors de la connexion
 */
router.post('/login', userController.login);

module.exports = router;
