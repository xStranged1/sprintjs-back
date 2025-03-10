
import { msgInternalError } from '@/errors/msgErrors';
import { createCircuit, deleteCircuit, getAllCircuits, getCircuit, updateCircuit } from '@/services/circuitService';
import type { Application, Request, Response } from 'express';
import { validate } from "class-validator"
import { Circuit } from '@/entities/Circuit';

const getAllCircuitController = async (req: Request, res: Response) => {
    const circuits = await getAllCircuits()
    res.success(circuits, 'Circuits found', 200)
};

const getCircuitController = async (req: Request, res: Response) => {
    const { circuitId } = req.params
    const id = Number(circuitId)
    const circuit = await getCircuit(id)
    if (circuit == 404) return res.error('Circuit not found', 404)
    if (circuit) return res.success(circuit, 'Circuit found', 200)
    return res.error(msgInternalError, 500)
};

const createCircuitController = (async (req: Request, res: Response) => {

    const { name, distance } = req.body;
    if (!distance) return res.error('The distance is required', 400)
    if (!name) return res.error('The time is required', 400)
    const circuit = { distance, name }
    const errors = await validate(circuit)
    if (errors.length > 0) return res.error('Invalid circuit', 400, errors)
    const newCircuit = await createCircuit(circuit as Circuit)
    if (!newCircuit) return res.error(msgInternalError, 500)
    return res.success(newCircuit, 'Circuit was created successfully', 201)

});

const deleteCircuitController = (async (req: Request, res: Response) => {
    const { circuitId } = req.params
    const id = Number(circuitId)
    if (isNaN(id)) return res.error('The param "circuitId" must be a number.', 400)
    const delRes = await deleteCircuit(id)
    if (delRes == 404) return res.error('Circuit not found', 404)
    if (delRes) return res.success(true, 'Circuit was deleted successfully')
    return res.error(msgInternalError, 500)
});

const updateCircuitController = async (req: Request, res: Response) => {
    const { name, distance } = req.body;
    const { circuitId } = req.params
    let circuit: any
    if (name) circuit.name = name
    if (isNaN(Number(circuitId))) return res.error('The param "circuitId" must be a number.', 400)
    if (distance) {
        const numberDistance = Number(distance)
        if (isNaN(numberDistance)) return res.error('"distance" must be a number.', 400)
        if (numberDistance <= 0) return res.error('"distance" must be a positive number.', 400)
        circuit.distance = numberDistance
    }
    const updatedCircuit = await updateCircuit(Number(circuitId), circuit)
    if (updatedCircuit == 404) return res.error('Circuit not found', 404)
    if (updatedCircuit) return res.success(updatedCircuit, 'Circuit was updated successfully', 200)
    return res.error(msgInternalError, 500)
}

export const circuitRoutes = (app: Application): void => {
    app.post("/circuit", createCircuitController);
    app.get("/circuit", getAllCircuitController);
    app.get("/circuit/:circuitId", getCircuitController);
    app.patch("/circuit/:circuitId", updateCircuitController);
    app.delete("/circuit/:circuitId", deleteCircuitController);
};