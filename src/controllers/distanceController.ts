
import { msgInternalError } from '@/errors/msgErrors';
import type { Application, Request, Response } from 'express';
import { validate } from "class-validator"
import { Distance } from '@/entities/Distance';
import { createDistance, deleteDistance, getAllDistances } from '@/services/distanceService';



// const getCircuitController = async (req: Request, res: Response) => {
//     const { circuitId } = req.params
//     const id = Number(circuitId)
//     const circuit = await getCircuit(id)
//     if (circuit == 404) return res.error('Circuit not found', 404)
//     if (circuit) return res.success(circuit, 'Circuit found', 200)
//     return res.error(msgInternalError, 500)
// };

const createDistanceController = (async (req: Request, res: Response) => {

    const { distance, description } = req.body;
    if (!distance) return res.error('The distance is required', 400)
    const newDistance = Object.assign(new Distance(), { distance, description })
    const errors = await validate(newDistance)
    if (errors.length > 0) return res.error('Invalid distance', 400, errors)
    const createdDistance = await createDistance(newDistance)
    if (!createdDistance) return res.error(msgInternalError, 500)
    return res.success(createdDistance, 'Distance category was created successfully', 201)

});

const getAllDistancesController = async (req: Request, res: Response) => {
    const distances = await getAllDistances()
    res.success(distances, 'Distances found', 200)
};

const deleteDistanceController = (async (req: Request, res: Response) => {
    const { distanceId } = req.params
    const id = Number(distanceId)
    if (isNaN(id)) return res.error('The param "distanceId" must be a number.', 400)
    const delRes = await deleteDistance(id)
    if (delRes == 404) return res.error('Distance not found', 404)
    if (delRes) return res.success(true, 'Distance was deleted successfully')
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

export const distancesRoutes = (app: Application): void => {
    app.post("/distance", createDistanceController);
    app.get("/distance", getAllDistancesController);
    app.delete("/distance/:distanceId", deleteDistanceController);
    // app.get("/circuit/:circuitId", getCircuitController);
    // app.patch("/circuit/:circuitId", updateCircuitController);
};