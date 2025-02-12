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