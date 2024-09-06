const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const secretKey = 'synexis_13013';

// Récupérer tous les utilisateurs
exports.getAllUsersTest = async (req, res) => {
    try {
        const users = await User.findAll({ attributes: { exclude: ['password'] } });
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue' });
    }
};

// Récupérer tous les utilisateurs
exports.getAllUsers = async (req, res) => {
    try {
        const userRole = req.user.role;
        
        if (userRole == 'Admin') {
            const users = await User.findAll({ attributes: { exclude: ['password'] } });
            res.json(users);
        }else{
            res.status(404).json({ error: 'Accès refusé' });
        }
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
        const idUser = req.params.id
        const user = await User.findByPk(idUser.trim());
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

const isValidPassword = (password) => {
    // Regex qui vérifie tous les critères pour un mot de passe sécurisé
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/;

    // Utilisation de la méthode `test` pour vérifier si le mot de passe correspond à la regex
    return passwordRegex.test(password);
};

// Créer un nouvel utilisateur (CREATE)
exports.createUser = async (req, res) => {
    try {
        const { firstname, lastname, email, password,confirmPassword, roles } = req.body;

        // Vérifier que toutes les données sont présentes
        if (!firstname.trim() || !lastname.trim() || !email.trim() || !password.trim() || !confirmPassword.trim() || !roles.trim()) {
            return res.status(400).json({ error: 'Tous les champs sont obligatoires' });
        }

        // Vérifier la structure de l'adresse e-mail
        if (!isValidPassword(password)) {
            return res.status(400).json({ error: 'Le mot de passe fournie est invalide' });
        }
        
        // Vérifier la structure de l'adresse e-mail
        if (!isValidEmail(email)) {
            return res.status(400).json({ error: 'L\'adresse e-mail fournie est invalide' });
        }

        // Vérifier la correspondance des mots de passe
        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'La confirmation du mot de passe ne correspond pas.' });
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

        res.status(200).json({ message: 'Votre compte a été créé avec succès.' });
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur :', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la création de l\'utilisateur' });
    }
};

// Mettre à jour un utilisateur (UPDATE)
exports.updateUserInfo = async (req, res) => {
    const userId = req.user.userId;
    const { firstname, lastname } = req.body;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            // L'utilisateur n'existe pas
            return res.status(404).json({ error: 'Utilisateur non trouvé.' });
        }
        if (!firstname.trim() && !lastname.trim()) {
            return res.status(400).json({ error: 'Minimum un champs obligatoires' });
        }

            if (firstname) user.firstname = firstname;
            if (lastname) user.lastname = lastname;

            await user.save();
            res.status(200).json({ message: 'Information de votre compte a été modifier avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
};

exports.updateUserRole = async (req, res) => {
    const userId = req.user.userId;
    const { role } = req.body;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            // L'utilisateur n'existe pas
            return res.status(404).json({ error: 'Utilisateur non trouvé.' });
        }

            if (role.trim()) 
                {
                    user.roles = role.trim();
                    
                    await user.save();
                    res.status(200).json({ message: 'Information de votre compte a été modifier avec succès.' });
                }
            else {
                return res.status(404).json({ error: 'Champ non remplie' });
            }

            
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
};


exports.updateUserPassword = async (req, res) => {
    const userId = req.user.userId;
    const { password,confirmPassword } = req.body;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            // L'utilisateur n'existe pas
            return res.status(404).json({ error: 'Utilisateur non trouvé.' });
        }
        if (!password.trim() || !confirmPassword.trim()) {
            return res.status(400).json({ error: 'Tous les champs sont obligatoires' });
        }

        // Vérifier la structure de l'adresse e-mail
        if (!isValidPassword(password)) {
            return res.status(400).json({ error: 'Le mot de passe fournie est invalide' });
        }

        // Vérifier la correspondance des mots de passe
        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'La confirmation du mot de passe ne correspond pas.' });
        }else{

            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
            
            await user.save();
            res.status(200).json({ message: 'Information de votre compte a été modifier avec succès.' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
};

// Supprimer un utilisateur (DELETE)
exports.deleteUser = async (req, res) => {
    const userId = req.user.userId;
    try {
        const user = await User.findByPk(userId);
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
        const isPasswordValid = await bcrypt.compare(password.trim(), user.password);

        if (!isPasswordValid) {
            // Le mot de passe est incorrect
            return res.status(401).json({ error: 'Mauvais email ou mot de passe' });
        }

        // Le mot de passe est correct, et le compte est activé
        // Générer le token JWT
        const token = jwt.sign({ userId: user.id, role: user.roles, email: user.email, firstname: user.firstname, lastname: user.lastname }, secretKey);

        res.json({ message: 'Connexion réussie', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
};