import express, { Express } from 'express';
import Server from './server';
import cors from 'cors';
import path from 'path';
import { errorHandler } from './config/errorhandler';
import dotenv from 'dotenv';
dotenv.config();

// creat the app var using express
const app: Express = express();

// make them using the json format for response
app.use(express.json());

// make them use the custom error handler
app.use(errorHandler);

// make them use the uploads dir for return file when ask for
app.use("/uploads", express.static(path.join(__dirname, 'uploads')));

// make them use the cors for cross origin request
app.use(cors({
    origin: (origin: any, callback: any): void => {
        if (!origin || ['http://localhost:3000'].indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(null, "URL not allowed by cors");
        }
    },
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD'],
    preflightContinue: false
}));

// make them use the routes
const server = new Server(app);

// start the serv
server.start();