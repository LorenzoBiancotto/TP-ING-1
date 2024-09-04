import { Express, Request, Response } from "express";
import notFound from "../config/notFound";
import User from './user';

export default class Routes {
    public baseUrl: string = "/api/v1/";

    constructor(app: Express) {
        // routes exemple
        app.use("/", (req: Request, res: Response): any => { console.log('Hello World'); return res.status(200).json({ message: "Hello World" }); });
        console.log(`Route / initialized`);

        // your route here
        app.use(`${this.baseUrl}users`, User)
        //

        // routes not found
        app.use('*', notFound);
        console.log("All routes initialized");

    };
}