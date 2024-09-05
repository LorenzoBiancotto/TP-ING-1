const User = require('../models/user');

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

// Créer un nouvel utilisateur (CREATE)
exports.createUser = async (req, res) => {
    try {
        const { firstname, lastname, email, password, roles } = req.body;

        // Vérifier que toutes les données sont présentes
        if (!firstname || !lastname || !email || !password) {
            return res.status(400).json({ error: 'Tous les champs sont obligatoires' });
        }

        // Créer l'utilisateur
        const newUser = await User.create({
            firstname,
            lastname,
            email,
            password, // Attention : il faut hasher le mot de passe avant de le stocker
            roles,
        });

        res.status(200).json(newUser);
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur :', error);
        res.status(500).json({ message: error });
    }
};

// Mettre à jour un utilisateur (UPDATE)
exports.updateUser = async (req, res) => {
    const { firstname, lastname, email, password, roles } = req.body;
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            user.firstname = firstname;
            user.lastname = lastname;
            user.email = email;
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
