import express, { Request, Response } from "express";
import "reflect-metadata"
import sprintRoute from './controllers/sprintController'
import { AppDataSource } from "./config/data-source";
import cors from 'cors';
import "tsconfig-paths/register";

AppDataSource.initialize().then(async () => {
    const app = express()
    app.use(express.json());
    app.use(cors())
    const routes = [
        {
            path: '/sprint',
            route: sprintRoute,
        },
    ];

    routes.forEach((route) => {
        app.use(route.path, route.route);
    });

    console.log('Running at http://localhost:3000/');

    app.get('/', (req: Request, res: Response) => {
        res.send('hello world')
    })
    app.get('/dd', (req: Request, res: Response) => {
        res.send('hello dd')
    })

    app.listen(3000)

}).catch(error => {
    console.log('Failed to connect to db');
    console.log(error)
})
