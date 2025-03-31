import { Interval } from "@/entities/Interval";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";

export const checkIntervals = async (req: Request, res: Response, next: NextFunction) => {
    const { intervals, sprintId } = req.body;
    if (!intervals) return res.error('The interval are required', 400)

    let orders: number[] = []
    for (const interval of intervals) {
        if (!interval.order && interval.order != 0) return res.error('The interval.order is required', 400)
        const order = Number(interval.order)
        if (isNaN(order)) return res.error('The order must be a number.', 400)
        if (orders.includes(order)) return res.error(`The interval.order can't be repeated`, 400)
        if (interval.startWithRest) {
            if (interval.startWithRest !== true && interval.startWithRest !== false) return res.error('The interval.startWithRest must be boolean', 400)
        }
        if (interval.effort) {
            if (isNaN(Number(interval.effort))) return res.error('The interval.effort must be a number.', 400)
        }
        if (!interval.distance) return res.error('The interval.distance is required', 400)
        if (isNaN(interval.distance)) return res.error('The distance must be a number.', 400)
        if (!interval.time) return res.error('The interval.time is required', 400)
        if (isNaN(interval.time)) return res.error('The time must be a number.', 400)
        if (!interval.timeRest) return res.error('The interval.timeRest is required', 400)
        if (isNaN(interval.timeRest)) return res.error('The time rest must be a number.', 400)
        if (!interval.numberOfRep) return res.error('The interval.numberOfRep is required', 400)
        if (isNaN(interval.numberOfRep)) return res.error('The numberOfRep must be a number.', 400)
        const errors = await validate(interval as Interval)
        if (errors.length > 0) return res.error('Invalid interval', 400, errors)
        interval.sprint = { id: sprintId }
        interval.pace = Math.round((interval.time / interval.distance) * 1000)
    }
    req.intervals = intervals
    next()
}


export const checkOptionalIntervals = async (req: Request, res: Response, next: NextFunction) => {
    const { intervals, takeBreak } = req.body;
    if (!intervals) return next()
    if (intervals.length == 0) return next()
    if (!takeBreak) return res.error('Only sprints with takeBreak = true can have Intervals', 400)

    let orders: number[] = []
    for (const interval of intervals) {
        if (!interval.order && interval.order != 0) return res.error('The interval.order is required', 400)
        const order = Number(interval.order)
        if (isNaN(order)) return res.error('The order must be a number.', 400)
        if (orders.includes(order)) return res.error(`The interval.order can't be repeated`, 400)
        if (interval.startWithRest) {
            if (interval.startWithRest !== true && interval.startWithRest !== false) return res.error('The interval.startWithRest must be boolean', 400)
        }
        if (interval.effort) {
            if (isNaN(Number(interval.effort))) return res.error('The interval.effort must be a number.', 400)
        }
        if (!interval.distance) return res.error('The interval.distance is required', 400)
        if (isNaN(interval.distance)) return res.error('The distance must be a number.', 400)
        if (!interval.time) return res.error('The interval.time is required', 400)
        if (isNaN(interval.time)) return res.error('The time must be a number.', 400)
        if (!interval.timeRest) return res.error('The interval.timeRest is required', 400)
        if (isNaN(interval.timeRest)) return res.error('The time rest must be a number.', 400)
        if (!interval.numberOfRep) return res.error('The interval.numberOfRep is required', 400)
        if (isNaN(interval.numberOfRep)) return res.error('The numberOfRep must be a number.', 400)
        if (interval.numberOfLaps) {
            if (isNaN(Number(interval.numberOfLaps))) return res.error('The interval.numberOfLaps must be a number.', 400)
        }
        const errors = await validate(interval as Interval)
        if (errors.length > 0) return res.error('Invalid interval', 400, errors)
        // interval.sprint = { id: sprintId }
        interval.pace = Math.round((interval.time / interval.distance) * 1000)
    }
    req.intervals = intervals
    next()
}