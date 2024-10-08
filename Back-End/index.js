const express = require('express');
const app = express();
const swaggerSetup = require('./docs/swagger');
const routes = require('./routes/indexRoute.js');
const cors = require('cors');
const { dbConnect,sequelize }  = require('./config/database'); // Importer la fonction de connexion à la base de données
const { errorHandler } = require('./middlewares/errorHandler'); // Importer le gestionnaire d'erreurs
const notFound = require('./middlewares/notFound'); // Importer le gestionnaire notFound

sequelize
    .sync({
        alter: true 
    })
    .then(() => {
        console.log('Database sync successfully');
    })
    .catch((err) => {
        console.log('Erreur: ', err);
    });

// Middleware pour le parsing des données au format JSON
app.use(express.json());

// Connexion à la base de données
dbConnect(); // Établir la connexion avec MongoDB

// Utilisation de Swagger
swaggerSetup(app);

// Port d'écoute du serveur
const port = process.env.PORT;

app.use(cors({
    origin: (origin, callback) => {
        // Autoriser les requêtes avec une origine non définie (par exemple, requêtes cURL) ou de localhost:3000
        if (!origin || ['http://localhost:3000','http://localhost:'+port].indexOf(origin) !== -1) {
            callback(null, true);  // Origine autorisée
        } else {
            callback(new Error('URL not allowed by CORS'));  // Origine non autorisée
        }
    },
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD'],
    preflightContinue: false
}));


// Utilisation des routes
app.use('/api', routes); // Toutes les routes commencent par '/api'


app.use(notFound);
app.use(errorHandler);



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
