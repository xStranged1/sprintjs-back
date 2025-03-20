
import { msgInternalError } from '@/errors/msgErrors';
import { createCircuit, deleteCircuit, getAllCircuits, getCircuit, updateCircuit } from '@/services/circuitService';
import type { Application, Request, Response } from 'express';
import { validate } from "class-validator"
import { Circuit } from '@/entities/Circuit';
import { createUser, deleteUser, getAllUsers, getUser } from '@/services/userService';
import { User } from '@/entities/User';
import { checkJwt, checkScopes } from '@/middlewares/authMiddleware';

const getAllUserController = async (req: Request, res: Response) => {
    const users = await getAllUsers()
    res.success(users, 'Users found', 200)
};

const getUserController = async (req: Request, res: Response) => {
    const { userId } = req.params
    const id = Number(userId)
    if (isNaN(id)) return res.error('The param "userId" must be a number.', 400)
    const user = await getUser(id)
    if (user == 404) return res.error('User not found', 404)
    if (user) return res.success(user, 'User found', 200)
    return res.error(msgInternalError, 500)
};

const createUserController = (async (req: Request, res: Response) => {

    const { age, firstName, lastName } = req.body;
    if (!lastName) return res.error('The lastName is required', 400)
    if (!firstName) return res.error('The firstName is required', 400)
    const sub = req.auth?.payload.sub
    if (!sub) return res.error('Invalid accessToken', 401)
    const user = new User
    user.age = age
    user.firstName = firstName
    user.lastName = lastName
    user.sub = sub
    const errors = await validate(user)
    if (errors.length > 0) return res.error('Invalid user', 400, errors)
    const newUser = await createUser(user)
    if (!newUser) return res.error(msgInternalError, 500)
    return res.success(newUser, 'User was created successfully', 201)

});


const deleteUserController = (async (req: Request, res: Response) => {
    const { userId } = req.params
    const id = Number(userId)
    if (isNaN(id)) return res.error('The param "userId" must be a number.', 400)
    const delRes = await deleteUser(id)
    if (delRes == 404) return res.error('User not found', 404)
    if (delRes) return res.success(true, 'User was deleted successfully')
    return res.error(msgInternalError, 500)
});

// const updateCircuitController = async (req: Request, res: Response) => {
//     const { name, distance } = req.body;
//     const { circuitId } = req.params
//     let circuit: any
//     if (name) circuit.name = name
//     if (isNaN(Number(circuitId))) return res.error('The param "circuitId" must be a number.', 400)
//     if (distance) {
//         const numberDistance = Number(distance)
//         if (isNaN(numberDistance)) return res.error('"distance" must be a number.', 400)
//         if (numberDistance <= 0) return res.error('"distance" must be a positive number.', 400)
//         circuit.distance = numberDistance
//     }
//     const updatedCircuit = await updateCircuit(Number(circuitId), circuit)
//     if (updatedCircuit == 404) return res.error('Circuit not found', 404)
//     if (updatedCircuit) return res.success(updatedCircuit, 'Circuit was updated successfully', 200)
//     return res.error(msgInternalError, 500)
// }

export const userRoutes = (app: Application): void => {
    app.post("/user", checkJwt, checkScopes, createUserController);
    app.get("/user", checkJwt, checkScopes, getAllUserController);
    app.get("/user/:userId", checkJwt, checkScopes, getUserController);
    app.delete("/user/:userId", deleteUserController);
    // app.patch("/circuit/:circuitId", updateCircuitController);
};