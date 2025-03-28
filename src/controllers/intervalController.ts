
import { msgInternalError } from '@/errors/msgErrors';
import { createIntervals, deleteInterval, getAllIntervals, getAllIntervalsByUserSub, getInterval } from '@/services/intervalService';
import type { Application, Request, Response } from 'express';
import { validate } from "class-validator"
import { Interval } from '@/entities/Interval';
import { checkJwt, checkScopes, checkSub } from '@/middlewares/authMiddleware';
import { Sprint } from '@/entities/Sprint';
import { checkIntervals } from '@/middlewares/checkIntervals';

const getAllIntervalController = async (req: Request, res: Response) => {
    const intervals = await getAllIntervals()
    res.success(intervals, 'Intervals found', 200)
};

const getIntervalsController = async (req: Request, res: Response) => {
    const sub = req.sub
    const intervals = await getAllIntervalsByUserSub(sub)
    res.success(intervals, 'Intervals found', 200)
};

const getIntervalController = async (req: Request, res: Response) => {
    const { intervalId } = req.params
    const id = Number(intervalId)
    const interval = await getInterval(id)
    if (interval == 404) return res.error('Interval not found', 404)
    if (interval) return res.success(interval, 'Interval found', 200)
    return res.error(msgInternalError, 500)
};

const createIntervalController = (async (req: Request, res: Response) => {

    const sub = req.sub
    const intervals = req.intervals
    const { sprintId } = req.body;
    if (!intervals) return res.error('The interval are required', 400)
    if (!sprintId) return res.error('The sprintId are required', 400)

    const data = await createIntervals(intervals, sprintId, sub)
    if (data == 404) return res.error(`Sprint with id ${sprintId} doesn't exist`, 400)
    if (data == '!takeBreak') return res.error('The takeBreak is false in the sprint asociated, only sprints with takeBreak = true can have Intervals', 400)
    if (!data) return res.error(msgInternalError, 500)

    // if (data.newPersonalRecord) {
    //     return res.success(data, 'Interval was successfully created and a personal record was broken.', 201)
    // }
    return res.success(data, 'Interval was successfully created', 201)

});

const deleteIntervalController = (async (req: Request, res: Response) => {
    const { intervalId } = req.params
    const id = Number(intervalId)
    if (isNaN(id)) return res.error('The param "intervalId" must be a number.', 400)
    const delRes = await deleteInterval(id)
    if (delRes == 404) return res.error('Interval not found', 404)
    if (delRes) return res.success(true, 'Interval was deleted successfully')
    return res.error(msgInternalError, 500)
});

// const updateIntervalController = async (req: Request, res: Response) => {
//     const { distance, time, date, takeBreak, id } = req.body;
//     const { intervalId } = req.params
//     if (isNaN(Number(intervalId))) return res.error('The param "intervalId" must be a number.', 400)
//     const updatedInterval = await updateInterval(Number(intervalId), { distance, time, id })
//     if (updatedInterval == 404) return res.error('Interval not found', 404)
//     if (updatedInterval) return res.success(updatedInterval, 'Interval was updated successfully', 200)
//     return res.error(msgInternalError, 500)
// }

export const intervalRoutes = (app: Application): void => {
    app.post("/interval", checkJwt, checkScopes, checkSub, checkIntervals, createIntervalController);
    app.get("/interval", checkJwt, checkScopes, checkSub, getIntervalsController);
    app.get("/intervalAll", checkJwt, checkScopes, checkSub, getAllIntervalController);
    app.get("/interval/:intervalId", checkJwt, checkScopes, checkSub, getIntervalController);
    // app.patch("/interval/:intervalId", checkJwt, checkScopes, checkSub, updateIntervalController);
    app.delete("/interval/:intervalId", checkJwt, checkScopes, checkSub, deleteIntervalController);
};