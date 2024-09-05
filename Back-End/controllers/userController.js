const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const secretKey = 'synexis_13013';

// Récupérer tous les utilisateurs
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue' });
    }
};

exports.getUsersMe = async (req, res) => {
    try {
        const userId = req.user.userId;
        const users = await User.findByPk(userId, { attributes: { exclude: ['password'] } });
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
};

// Récupérer un utilisateur par son ID (READ)
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue' });
    }
};

// Fonction pour valider l'adresse e-mail
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Créer un nouvel utilisateur (CREATE)
exports.createUser = async (req, res) => {
    try {
        const { firstname, lastname, email, password, roles } = req.body;

        // Vérifier que toutes les données sont présentes
        if (!firstname || !lastname || !email || !password) {
            return res.status(400).json({ error: 'Tous les champs sont obligatoires' });
        }

        // Vérifier la structure de l'adresse e-mail
        if (!isValidEmail(email)) {
            return res.status(400).json({ error: 'L\'adresse e-mail fournie est invalide' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer l'utilisateur
        const newUser = await User.create({
            firstname,
            lastname,
            email,
            password: hashedPassword, // Attention : il faut hasher le mot de passe avant de le stocker
            roles,
        });

        res.status(201).json(newUser); // Utiliser 201 pour indiquer que l'utilisateur a été créé
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur :', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la création de l\'utilisateur' });
    }
};

// Mettre à jour un utilisateur (UPDATE)
exports.updateUser = async (req, res) => {
    const { firstname, lastname, password, roles } = req.body;
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            user.firstname = firstname;
            user.lastname = lastname;
            user.password = password;
            user.roles = roles;
            await user.save();
            res.json(user);
        } else {
            res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
};

// Supprimer un utilisateur (DELETE)
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.destroy();
            res.json({ message: 'Utilisateur supprimé avec succès' });
        } else {
            res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la suppression de l\'utilisateur' });
    }
};


// Fonction de connexion
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Rechercher l'utilisateur par email dans la base de données
        const user = await User.findOne({ where: { email } });

        if (!user) {
            // L'utilisateur n'existe pas
            return res.status(401).json({ error: 'Mauvais email ou mot de passe' });
        }

        // Vérifier le mot de passe
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            // Le mot de passe est incorrect
            return res.status(401).json({ error: 'Mauvais email ou mot de passe' });
        }

        // Le mot de passe est correct, et le compte est activé
        // Générer le token JWT
        const token = jwt.sign({ userId: user.id, role: user.role, email: user.email, firstname: user.firstname, lastname: user.lastname }, secretKey);

        res.json({ message: 'Connexion réussie', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
};