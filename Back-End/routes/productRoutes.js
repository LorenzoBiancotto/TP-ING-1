const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController'); // Assurez-vous que ce chemin est correct

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API pour la gestion des produits
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Récupérer tous les produits
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Succès - Renvoie tous les produits
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *       500:
 *         description: Erreur serveur - Une erreur s'est produite lors de la récupération des produits
 */
router.get('/', productController.getAllProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Récupérer un produit par ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du produit
 *     responses:
 *       200:
 *         description: Succès - Renvoie le produit correspondant
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *       404:
 *         description: Produit non trouvé
 *       500:
 *         description: Erreur serveur - Une erreur s'est produite lors de la récupération du produit
 */
router.get('/:id', productController.getProductById);

/**
 * @swagger
 * /api/products/create:
 *   post:
 *     summary: Créer un nouveau produit
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *             example:
 *               name: Nouveau produit
 *               description: Description du produit
 *     responses:
 *       201:
 *         description: Succès - produit créé
 *       400:
 *         description: Mauvaise requête - Les champs requis sont manquants
 *       500:
 *         description: Erreur serveur - Une erreur s'est produite lors de la création du produit
 */
router.post('/create', productController.createProduct);

/**
 * @swagger
 * /api/products/update/{id}:
 *   put:
 *     summary: Mettre à jour un produit
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du produit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *             example:
 *               name: Produit mis à jour
 *               description: Description mise à jour
 *     responses:
 *       200:
 *         description: Succès - produit mis à jour
 *       404:
 *         description: Produit non trouvé
 *       500:
 *         description: Erreur serveur - Une erreur s'est produite lors de la mise à jour du produit
 */
router.put('/update/:id', productController.updateProduct);

/**
 * @swagger
 * /api/products/delete/{id}:
 *   delete:
 *     summary: Supprimer un produit
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du produit
 *     responses:
 *       200:
 *         description: Succès - produit supprimé
 *       404:
 *         description: Produit non trouvé
 *       500:
 *         description: Erreur serveur - Une erreur s'est produite lors de la suppression du produit
 */
router.delete('/delete/:id', productController.deleteProduct);

module.exports = router;
