import { AppDataSource } from "@/config/data-source"
import { Sprint } from "@/entities/Sprint"
import { handleNewRecord, isNewRecord } from "./personalRecordService"
import { getUserBySub } from "./userService"

const sprintRepository = AppDataSource.getRepository(Sprint)

export const createSprint = async (sprint: Omit<Sprint, 'id' | 'createDate' | 'updateDate'>, userSub: string) => {

    try {
        const user = await getUserBySub(userSub)
        if (!user || user == 404) {
            return null
        }

        const newSprint = new Sprint()
        newSprint.user = user
        newSprint.distance = sprint.distance
        newSprint.time = sprint.time
        newSprint.date = sprint.date
        newSprint.pace = sprint.pace
        newSprint.takeBreak = sprint.takeBreak
        newSprint.circuit = sprint.circuit
        newSprint.comment = sprint.comment
        newSprint.effort = sprint.effort
        newSprint.temperature = sprint.temperature
        newSprint.numberOfLaps = sprint.numberOfLaps
        newSprint.intervals = sprint.intervals // already are a valid intervals
        await sprintRepository.save(newSprint)
        const newPersonalRecord = await handleNewRecord(newSprint)
        return { newSprint, newPersonalRecord }
    } catch (error) {
        console.log(error);
        return null
    }

}

export const deleteSprint = async (sprintId: number) => {
    try {
        const res = await sprintRepository.delete(sprintId)
        if (res.affected == 0) return 404
        return res
    }
    catch (error) {
        console.log(error);
        return null
    }
}

export const updateSprint = async (sprintId: number, sprint: Partial<Sprint>) => {
    try {
        const existingSprint = await sprintRepository.findOneBy({ id: sprintId });
        if (!existingSprint) return 404
        // Calcula el nuevo "pace" si es necesario
        if (sprint.time !== undefined || sprint.distance !== undefined) {
            const time = sprint.time ?? existingSprint.time;
            const distance = sprint.distance ?? existingSprint.distance;
            if (time && distance) {
                const newPace = Math.round((time / distance) * 1000);
                sprint.pace = newPace
                existingSprint.pace = newPace
            }
        }

        await AppDataSource
            .createQueryBuilder()
            .update(Sprint)
            .set(sprint)
            .where("id = :id", { id: sprintId })
            .execute();
        return sprint;
    } catch (error) {
        console.error("Error updating sprint:", error);
        return null;
    }
};

export const getSprint = async (sprintId: number) => {
    try {
        const existingSprint = await sprintRepository.findOne({
            where: { id: sprintId },
            relations: { intervals: true, circuit: true }
        });
        if (!existingSprint) return 404
        return existingSprint
    } catch (error) {
        console.log(error);
        return null
    }
}

export const getAllSprints = async () => {
    try {
        const sprints = await sprintRepository.find({
            relations: { 'circuit': true, 'intervals': true },
            order: { date: 'DESC' }
        })
        return sprints
    } catch (error) {
        console.log(error);
        return []
    }
}

export const existSprint = async (sprintId: number) => {
    try {
        const existingSprint = await sprintRepository.exists({ where: { id: sprintId } });
        return existingSprint
    } catch (error) {
        console.log(error);
        return false
    }
}

export const getAllSprintsByUserSub = async (userSub: string) => {
    try {
        const user = await getUserBySub(userSub)
        if (!user || user == 404) {
            return []
        }

        const sprints = await sprintRepository.find({
            relations: { 'circuit': true, 'intervals': true },
            order: { date: 'DESC' },
            where: { user: user }
        })
        return sprints
    } catch (error) {
        console.log(error);
        return []
    }
}

export const getTotalSeconds = (hours: number | undefined, minutes: number | undefined, seconds: number | undefined) => {
    return (hours ?? 0) * 60 * 60 + (minutes ?? 0) * 60 + (seconds ?? 0)
}

export const getPace = (distance: number, hours: number | undefined, minutes: number | undefined, seconds: number | undefined) => {
    const totalSeconds = getTotalSeconds(hours, minutes, seconds)
    const timePerKm = totalSeconds / distance
    const minutesPerKm = timePerKm / 60
    const decimal = minutesPerKm % 1
    const secondsPerKm = Math.round((decimal * 100) * 60 / 100).toString()
    let textSeconds = secondsPerKm
    if (secondsPerKm.length == 1) {
        textSeconds = secondsPerKm + 0
    }
    const textPace = `${Math.floor(minutesPerKm)}:${(textSeconds)}m / KM`
    return textPace
}