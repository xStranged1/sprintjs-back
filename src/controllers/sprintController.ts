
import { msgInternalError } from '@/errors/msgErrors';
import { createSprint, deleteSprint, getAllSprints, getSprint, updateSprint } from '@/services/sprintService';
import type { Application, Request, Response } from 'express';
import { validate } from "class-validator"
import { Sprint } from '@/entities/Sprint';
import { Circuit } from '@/entities/Circuit';

const getAllSprintController = async (req: Request, res: Response) => {
    const sprints = await getAllSprints()
    res.success(sprints, 'Sprints found', 200)
};

const getSprintController = async (req: Request, res: Response) => {
    const { sprintId } = req.params
    const id = Number(sprintId)
    const sprint = await getSprint(id)
    if (sprint == 404) return res.error('Sprint not found', 404)
    if (sprint) return res.success(sprint, 'Sprint found', 200)
    return res.error(msgInternalError, 500)
};

const createSprintController = (async (req: Request, res: Response) => {

    const { distance, time, date, takeBreak, circuit, comment, effort, temperature, numberOfLaps } = req.body;
    if (!distance) return res.error('The distance is required', 400)
    if (!time) return res.error('The time is required', 400)
    if (circuit) {
        const errors = await validate(Object.assign(new Circuit(), circuit));
        if (errors.length > 0) return res.error('Invalid sprint', 400, errors)
    }
    if (typeof takeBreak !== 'boolean') return res.error('Boolean takeBreak is required', 400)
    const pace = Math.round((time / distance) * 1000)
    const sprint = Object.assign(new Sprint(), { distance, time, date, pace, takeBreak, circuit, comment, effort, temperature, numberOfLaps })
    const errors = await validate(sprint)
    if (errors.length > 0) return res.error('Invalid sprint', 400, errors)
    const newSprint = await createSprint(sprint)
    if (!newSprint) return res.error(msgInternalError, 500)
    return res.success(newSprint, 'Sprint was created successfully', 201)

});

const deleteSprintController = (async (req: Request, res: Response) => {
    const { sprintId } = req.params
    const id = Number(sprintId)
    if (isNaN(id)) return res.error('The param "sprintId" must be a number.', 400)
    const delRes = await deleteSprint(id)
    if (delRes == 404) return res.error('Sprint not found', 404)
    if (delRes) return res.success(true, 'Sprint was deleted successfully')
    return res.error(msgInternalError, 500)
});

const updateSprintController = async (req: Request, res: Response) => {
    const { distance, time, date, takeBreak, id } = req.body;
    const { sprintId } = req.params
    if (isNaN(Number(sprintId))) return res.error('The param "sprintId" must be a number.', 400)
    const updatedSprint = await updateSprint(Number(sprintId), { distance, time, date, takeBreak, id })
    if (updatedSprint == 404) return res.error('Sprint not found', 404)
    if (updatedSprint) return res.success(updatedSprint, 'Sprint was updated successfully', 200)
    return res.error(msgInternalError, 500)
}

export const sprintRoutes = (app: Application): void => {
    app.post("/sprint", createSprintController);
    app.get("/sprint", getAllSprintController);
    app.get("/sprint/:sprintId", getSprintController);
    app.patch("/sprint/:sprintId", updateSprintController);
    app.delete("/sprint/:sprintId", deleteSprintController);
};