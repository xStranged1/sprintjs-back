import { AppDataSource } from "@/config/data-source"
import { Sprint } from "@/entities/Sprint"

const sprintRepository = AppDataSource.getRepository(Sprint)

export const createSprint = async (sprint: Omit<Sprint, 'id' | 'createDate' | 'updateDate'>) => {

    try {
        const newSprint = new Sprint()
        newSprint.distance = sprint.distance
        newSprint.time = sprint.time
        newSprint.date = sprint.date
        await sprintRepository.save(newSprint)
        return newSprint
    } catch (error) {
        console.log(error);
        return null
    }

}

export const getAllSprints = async () => {
    try {
        const sprints = await sprintRepository.find()
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