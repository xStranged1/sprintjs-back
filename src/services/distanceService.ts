import { AppDataSource } from "@/config/data-source"
import { Distance } from "@/entities/Distance"

const distanceRepository = AppDataSource.getRepository(Distance)

export const createDistance = async (distance: Omit<Distance, 'id'>) => {

    try {
        const newDistance = new Distance()
        newDistance.distance = distance.distance
        newDistance.description = distance.description
        await distanceRepository.save(newDistance)
        return newDistance
    } catch (error) {
        console.log(error);
        return null
    }
}

export const getAllDistances = async () => {
    try {
        const sprints = await distanceRepository.find()
        return sprints
    } catch (error) {
        console.log(error);
        return []
    }
}

export const deleteDistance = async (distanceId: number) => {
    try {
        const res = await distanceRepository.delete(distanceId)
        if (res.affected == 0) return 404
        return res
    }
    catch (error) {
        console.log(error);
        return null
    }
}

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

