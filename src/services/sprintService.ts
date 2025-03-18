import { AppDataSource } from "@/config/data-source"
import { Sprint } from "@/entities/Sprint"
import { handleNewRecord, isNewRecord } from "./personalRecordService"

const sprintRepository = AppDataSource.getRepository(Sprint)

export const createSprint = async (sprint: Omit<Sprint, 'id' | 'createDate' | 'updateDate'>) => {

    try {
        const newSprint = new Sprint()
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
        await sprintRepository.save(newSprint)
        handleNewRecord(newSprint)
        return newSprint
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
        const existingSprint = await sprintRepository.findOneBy({ id: sprintId });
        if (!existingSprint) return 404
        return existingSprint
    } catch (error) {
        console.log(error);
        return null
    }
}

export const getAllSprints = async () => {
    try {
        const sprints = await sprintRepository.find({ relations: { 'circuit': true }, order: { date: 'DESC' } })
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