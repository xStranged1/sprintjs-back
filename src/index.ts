import "reflect-metadata"
import "tsconfig-paths/register";
import 'module-alias/register';
import express, { Request, Response } from "express";
import cors from 'cors';
import { sprintRoutes } from './controllers/sprintController'
import { circuitRoutes } from "./controllers/circuitController";
import { AppDataSource } from "./config/data-source";
import responseMiddleware from "./middlewares/responseMiddleware";
import { personalRecordRoutes } from "./controllers/personalRecordController";
import { distancesRoutes } from "./controllers/distanceController";
import { checkJwt, checkScopes } from "./middlewares/authMiddleware";
import { userRoutes } from "./controllers/userController";
import { intervalRoutes } from "./controllers/intervalController";

AppDataSource.initialize().then(async () => {
    const app = express()
    app.use(express.json());
    app.use(cors())
    app.use(responseMiddleware);
    userRoutes(app)
    sprintRoutes(app)
    circuitRoutes(app)
    personalRecordRoutes(app)
    distancesRoutes(app)
    intervalRoutes(app)

    console.log('Running at http://localhost:3000/');
    app.get('/err', (req: Request, res: Response) => {
        res.error("No se pudo obtener el usuario", 400, { reason: "ID inválido" });
    })
    app.get('/dd', (req: Request, res: Response) => {
        res.success({ user: "Federico Valle" }, "Usuario obtenido correctamente");
    })

    app.get('/private', checkJwt, (req: Request, res: Response) => {
        const user = req.auth?.payload
        res.success({ user: user }, "Deberias estar autenticado para recibir esto");
    })

    app.get('/private-scoped', checkJwt, checkScopes, (req: Request, res: Response) => {
        res.success({ user: "Federico Valle" }, "Deberias estar autenticado y tener permiso para leer mensajes para recibir esto");
    })

    app.listen(3000)

}).catch(error => {
    console.log('Failed to connect to db');
    console.log(error)
})
