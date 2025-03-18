import { AppDataSource } from "@/config/data-source"
import { Distance } from "@/entities/Distance"
import { Sprint } from "@/entities/Sprint"

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
        const sprints = await distanceRepository.find({ order: { 'distance': 'asc' } })
        return sprints
    } catch (error) {
        console.log(error);
        return []
    }
}

export const getDistanceBySprint = async (sprint: Sprint): Promise<Distance | null> => {
    try {
        const closestDistanceRaw = await distanceRepository.query(`
            SELECT * FROM distance
            ORDER BY ABS(distance - $1)
            LIMIT 1
          `, [sprint.distance]);

        const closestDistance = closestDistanceRaw[0]
        if (!closestDistance) return null
        const max = closestDistance.distance + closestDistance.distance * 0.20
        if (sprint.distance >= closestDistance.distance && sprint.distance <= max) return closestDistance
        return null
    } catch (error) {
        console.log(error);
        return null
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