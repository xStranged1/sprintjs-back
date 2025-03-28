import { AppDataSource } from "@/config/data-source"
import { Interval } from "@/entities/Interval"
import { handleNewRecord, isNewRecord } from "./personalRecordService"
import { getUserBySub } from "./userService"
import { Sprint } from "@/entities/Sprint"
import { getSprint } from "./sprintService"

const intervalRepository = AppDataSource.getRepository(Interval)

export const createIntervals = async (newIntervals: Interval[], sprintId: number, userSub: string) => {

    try {
        const user = await getUserBySub(userSub)
        if (!user || user == 404) {
            return null
        }
        const sprint = await getSprint(sprintId)
        if (sprint == 404 || sprint == null) return 404
        if (!sprint.takeBreak) return '!takeBreak'
        if (sprint.intervals.length > 0) {
            await intervalRepository.delete({ sprint: sprint })
        }
        await intervalRepository.save(newIntervals)
        return newIntervals
    } catch (error) {
        console.log(error);
        return null
    }

}

export const deleteInterval = async (intervalId: number) => {
    try {
        const res = await intervalRepository.delete(intervalId)
        if (res.affected == 0) return 404
        return res
    }
    catch (error) {
        console.log(error);
        return null
    }
}

// export const updateInterval = async (intervalId: number, interval: Partial<Interval>) => {
//     try {
//         const existingInterval = await intervalRepository.findOneBy({ id: intervalId });
//         if (!existingInterval) return 404
//         // Calcula el nuevo "pace" si es necesario
//         if (interval.time !== undefined || interval.distance !== undefined) {
//             const time = interval.time ?? existingInterval.time;
//             const distance = interval.distance ?? existingInterval.distance;
//             if (time && distance) {
//                 const newPace = Math.round((time / distance) * 1000);
//                 interval.pace = newPace
//                 existingInterval.pace = newPace
//             }
//         }

//         await AppDataSource
//             .createQueryBuilder()
//             .update(Interval)
//             .set(interval)
//             .where("id = :id", { id: intervalId })
//             .execute();
//         return interval;
//     } catch (error) {
//         console.error("Error updating interval:", error);
//         return null;
//     }
// };

export const getInterval = async (intervalId: number) => {
    try {
        const existingInterval = await intervalRepository.findOneBy({ id: intervalId });
        if (!existingInterval) return 404
        return existingInterval
    } catch (error) {
        console.log(error);
        return null
    }
}


export const getAllIntervals = async () => {
    try {
        const intervals = await intervalRepository.find({
            relations: ['sprint'],
            select: {
                id: true,
                distance: true,
                numberOfRep: true,
                order: true,
                effort: true,
                pace: true,
                startWithRest: true,
                time: true,
                timeRest: true,
                sprint: { id: true }
            },
            order: { order: 'ASC' },
        })

        return intervals
    } catch (error) {
        console.log(error);
        return []
    }
}

export const getAllIntervalsByUserSub = async (userSub: string) => {
    try {
        const user = await getUserBySub(userSub)
        if (!user || user == 404) {
            return []
        }

        const intervals = await intervalRepository.find({
            relations: ['sprint'],
            select: {
                id: true,
                distance: true,
                numberOfRep: true,
                order: true,
                effort: true,
                pace: true,
                startWithRest: true,
                time: true,
                timeRest: true,
                sprint: { id: true }
            },
            where: { sprint: { user: user } },
            order: { order: 'ASC' },
        })
        return intervals
    } catch (error) {
        console.log(error);
        return []
    }
}