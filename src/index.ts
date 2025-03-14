import express, { Request, Response } from "express";
import "reflect-metadata"
import { sprintRoutes } from './controllers/sprintController'
import { circuitRoutes } from "./controllers/circuitController";
import { AppDataSource } from "./config/data-source";
import cors from 'cors';
import "tsconfig-paths/register";
import responseMiddleware from "./middlewares/responseMiddleware";
import { saveState } from "./migration/saveState";
import { restoreState } from "./migration/restoreState";

AppDataSource.initialize().then(async () => {
    const app = express()
    app.use(express.json());
    app.use(cors())
    app.use(responseMiddleware);
    sprintRoutes(app)
    circuitRoutes(app)
    // saveState()
    console.log('Running at http://localhost:3000/');
    app.get('/err', (req: Request, res: Response) => {
        res.error("No se pudo obtener el usuario", 400, { reason: "ID inválido" });
    })
    app.get('/dd', (req: Request, res: Response) => {
        res.success({ user: "Federico Valle" }, "Usuario obtenido correctamente");
    })

    app.listen(3000)

}).catch(error => {
    console.log('Failed to connect to db');
    console.log(error)
})
