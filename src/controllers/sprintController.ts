
import { msgInternalError } from '@/errors/msgErrors';
import { createSprint, deleteSprint, getAllSprints, updateSprint } from '@/services/sprintService';
import type { Application, Request, Response } from 'express';
import { validate } from "class-validator"

const getAllSprintController = async (req: Request, res: Response) => {
    const sprints = await getAllSprints()
    res.success(sprints, '', 200)
};

const createSprintController = (async (req: Request, res: Response) => {

    const { distance, time, date, takeBreak } = req.body;
    if (!distance) return res.error('The distance is required', 400)
    if (!time) return res.error('The time is required', 400)
    if (typeof takeBreak !== 'boolean') return res.error('Boolean takeBreak is required', 400)
    const pace = Math.round((time / distance) * 1000)
    const sprint = { distance, time, date, pace, takeBreak }
    const errors = await validate(sprint)
    if (errors.length > 0) return res.error('Invalid sprint', 400, errors)
    const newSprint = await createSprint(sprint)
    if (!newSprint) return res.error(msgInternalError, 500)
    return res.success(newSprint, 'Sprint was created successfully', 201)

});

const deleteSprintController = (async (req: Request, res: Response) => {
    const { id } = req.body;
    if (!id) return res.error('The field "id" is required.', 400)
    const delRes = await deleteSprint(id)
    if (delRes == 404) return res.error('Sprint not found', 404)
    if (delRes) return res.success(true, 'Sprint was deleted successfully')
    return res.error(msgInternalError, 500)
});

const updateSprintController = async (req: Request, res: Response) => {
    const { distance, time, date, takeBreak, id } = req.body;
    if (!id) return res.error('The field "id" is required.', 400)
    const updatedSprint = await updateSprint({ distance, time, date, takeBreak, id })
    if (updatedSprint) return res.success(updatedSprint, 'Sprint was updated successfully', 200)
    return res.error(msgInternalError, 500)
}

export const sprintRoutes = (app: Application): void => {
    app.post("/sprint", createSprintController);
    app.get("/sprint", getAllSprintController);
    app.patch("/sprint", updateSprintController);
    app.delete("/sprint", deleteSprintController);
};