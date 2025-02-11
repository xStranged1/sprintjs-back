import express, { Request, Response } from "express";
import "reflect-metadata"
import { User } from "./entity/User"
import { AppDataSource } from "./config/data-source";
import sprintRoute from '../src/controllers/sprint'



AppDataSource.initialize().then(async () => {
    const app = express()
    app.use(express.json());
    const routes = [
        {
            path: '/sprint',
            route: sprintRoute,
        },
    ];

    routes.forEach((route) => {
        app.use(route.path, route.route);
    });

    console.log("Inserting a new user into the database...")
    const user = new User()
    user.firstName = "Timber"
    user.lastName = "Saw"
    user.age = 25
    await AppDataSource.manager.save(user)
    console.log("Saved a new user with id: " + user.id)

    console.log("Loading users from the database...")
    const users = await AppDataSource.manager.find(User)
    console.log("Loaded users: ", users)

    console.log('Running at http://localhost:3000/');

    app.get('/', (req: Request, res: Response) => {
        res.send('hello world')
    })
    app.get('/dd', (req: Request, res: Response) => {
        res.send('hello dd')
    })

    app.listen(3000)

}).catch(error => console.log(error))
