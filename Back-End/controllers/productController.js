// controllers/productController.js
const Product = require('../models/product'); // Assurez-vous que ce chemin est correct

// Récupérer tous les produits (READ)
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des produits' });
    }
};

// Récupérer un produit par son ID (READ)
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Produit non trouvé' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération du produit' });
    }
};

// Créer un nouveau produit (CREATE)
exports.createProduct = async (req, res) => {
    try {
        const { name, description } = req.body;

        // Vérifier que toutes les données sont présentes
        if (!name || !description) {
            return res.status(400).json({ error: 'Tous les champs sont obligatoires' });
        }

        const newProduct = await Product.create({ name, description });
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Erreur lors de la création du produit :', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la création du produit' });
    }
};

// Mettre à jour un produit (UPDATE)
exports.updateProduct = async (req, res) => {
    try {
        const { name, description } = req.body;
        const product = await Product.findByPk(req.params.id);
        if (product) {
            product.name = name;
            product.description = description;
            await product.save();
            res.json(product);
        } else {
            res.status(404).json({ error: 'Produit non trouvé' });
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour du produit :', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour du produit' });
    }
};

// Supprimer un produit (DELETE)
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (product) {
            await product.destroy();
            res.json({ message: 'Produit supprimé avec succès' });
        } else {
            res.status(404).json({ error: 'Produit non trouvé' });
        }
    } catch (error) {
        console.error('Erreur lors de la suppression du produit :', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la suppression du produit' });
    }
};
