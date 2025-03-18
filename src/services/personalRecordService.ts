import { AppDataSource } from "@/config/data-source"
import { PersonalRecord } from "@/entities/PersonalRecord"
import { Sprint } from "@/entities/Sprint"
import { getAllSprints } from "./sprintService"
import { Distance } from "@/entities/Distance"
import { getAllDistances, getDistanceBySprint } from "./distanceService"

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

export const getPersonalRecordByDistance = async (distance: Distance): Promise<PersonalRecord | null> => {
    try {
        const pr = await personalRecordRepository.findOne({
            relations: { 'distance': true, 'sprint': true },
            where: { distance: distance }  // Comparas con el objeto distance
        });
        return pr
    } catch (error) {
        console.log(error);
        return null
    }
}

export const handleNewRecord = async (sprint: Sprint) => {
    console.log('handleNewRecord');
    console.log("sprint");
    console.log(sprint);

    const distance = await isNewRecord(sprint)
    console.log("distance handleNewRecord");
    console.log(distance);

    if (!distance) return false

    const newPR = new PersonalRecord()
    newPR.distance = distance
    newPR.sprint = sprint
    personalRecordRepository.save(newPR)
}

export const isNewRecord = async (sprint: Sprint): Promise<Distance | false> => {
    if (sprint.takeBreak) return false
    const distance = await getDistanceBySprint(sprint)
    console.log("distance close");
    console.log(distance);
    if (!distance) return false
    const pr = await getPersonalRecordByDistance(distance)
    console.log("pr in that distance");
    console.log(pr);

    if (!pr) return distance
    if (sprint.pace < pr.sprint.pace) return distance
    return false
}
