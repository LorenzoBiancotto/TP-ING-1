import { Express } from 'express';
import Routes from './Routes';
import dbConnect from './config/DB.config';

export default class Server {

    public port: number = Number(process.env.PORT) || 5002;
    public app: Express;

    constructor(app: Express) {
        this.app = app;
        new Routes(this.app);

    };

    public start(): void {
        dbConnect();
        this.app.listen(this.port, (): void => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}