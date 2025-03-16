import { AppDataSource } from "@/config/data-source"
import { PersonalRecord } from "@/entities/PersonalRecord"
import { Sprint } from "@/entities/Sprint"
import { getAllSprints } from "./sprintService"
import { Distance } from "@/entities/Distance"
import { getAllDistances } from "./distanceService"

const personalRecordRepository = AppDataSource.getRepository(PersonalRecord)

export const calculateAllRecords = async () => {
    const sprints = await getAllSprints()
    if (sprints.length == 0) return undefined
    const distances = await getAllDistances()

    const newPrs = []
    for (const distance of distances) {
        const min = distance.distance
        const max = min + min * 0.2
        const filteredSprints = sprints.filter((sprint) => (sprint.distance >= min && sprint.distance <= max && sprint.takeBreak === false))
            .sort((a, b) => a.pace - b.pace)
        const result = filteredSprints[0]
        const newPR = new PersonalRecord()

        if (result) {
            newPR.distance = distance
            newPR.sprint = result
            newPrs.push(newPR)
        }
    }
    personalRecordRepository.save(newPrs)

    return newPrs
}

export const deleteAllPrs = async () => {
    const res = await personalRecordRepository.clear()
    return res
}

export const getAllPersonalRecords = async (): Promise<PersonalRecord[]> => {
    try {
        const prs = await personalRecordRepository.find({ relations: { 'distance': true, 'sprint': true } })
        return prs
    } catch (error) {
        console.log(error);
        return []
    }
}


// export const createSprint = async (sprint: Omit<Sprint, 'id' | 'createDate' | 'updateDate'>) => {

//     try {
//         const newSprint = new Sprint()
//         newSprint.distance = sprint.distance
//         newSprint.time = sprint.time
//         newSprint.date = sprint.date
//         newSprint.pace = sprint.pace
//         newSprint.takeBreak = sprint.takeBreak
//         newSprint.circuit = sprint.circuit
//         newSprint.comment = sprint.comment
//         newSprint.effort = sprint.effort
//         newSprint.temperature = sprint.temperature
//         newSprint.numberOfLaps = sprint.numberOfLaps
//         await sprintRepository.save(newSprint)
//         return newSprint
//     } catch (error) {
//         console.log(error);
//         return null
//     }

// }

// export const deleteSprint = async (sprintId: number) => {
//     try {
//         const res = await sprintRepository.delete(sprintId)
//         if (res.affected == 0) return 404
//         return res
//     }
//     catch (error) {
//         console.log(error);
//         return null
//     }
// }

// export const updateSprint = async (sprintId: number, sprint: Partial<Sprint>) => {
//     try {
//         const existingSprint = await sprintRepository.findOneBy({ id: sprintId });
//         if (!existingSprint) return 404
//         // Calcula el nuevo "pace" si es necesario
//         if (sprint.time !== null || sprint.distance !== null) {
//             const time = sprint.time ?? existingSprint.time;
//             const distance = sprint.distance ?? existingSprint.distance;
//             if (time && distance) {
//                 const newPace = Math.round((time / distance) * 1000);
//                 sprint.pace = newPace
//                 existingSprint.pace = newPace
//             }
//         }

//         await AppDataSource
//             .createQueryBuilder()
//             .update(Sprint)
//             .set(sprint)
//             .where("id = :id", { id: sprintId })
//             .execute();
//         return sprint;
//     } catch (error) {
//         console.error("Error updating sprint:", error);
//         return null;
//     }
// };

// export const getSprint = async (sprintId: number) => {
//     try {
//         const existingSprint = await sprintRepository.findOneBy({ id: sprintId });
//         if (!existingSprint) return 404
//         return existingSprint
//     } catch (error) {
//         console.log(error);
//         return null
//     }
// }

// export const getAllSprints = async () => {
//     try {
//         const sprints = await sprintRepository.find({ relations: { 'circuit': true }, order: { date: 'DESC' } })
//         return sprints
//     } catch (error) {
//         console.log(error);
//         return []
//     }
// }
