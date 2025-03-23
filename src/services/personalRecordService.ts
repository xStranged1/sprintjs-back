import { AppDataSource } from "@/config/data-source"
import { PersonalRecord } from "@/entities/PersonalRecord"
import { Sprint } from "@/entities/Sprint"
import { getAllSprints } from "./sprintService"
import { Distance } from "@/entities/Distance"
import { getAllDistances, getDistanceBySprint } from "./distanceService"
import { getUserBySub } from "./userService"

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

export const getPersonalRecords = async (userSub: string): Promise<PersonalRecord[]> => {
    try {
        const user = await getUserBySub(userSub)
        if (!user || user == 404) return []
        const prs = await personalRecordRepository.find({
            relations: { 'distance': true, 'sprint': true },
            where: { user: user }
        })
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
            where: { distance: distance }
        });
        return pr
    } catch (error) {
        console.log(error);
        return null
    }
}

export const handleNewRecord = async (sprint: Sprint) => {
    const distance = await isNewRecord(sprint)
    if (!distance) return false
    const newPR = new PersonalRecord()
    newPR.distance = distance
    newPR.sprint = sprint
    newPR.user = sprint.user
    await personalRecordRepository.save(newPR)
    return newPR
}

export const isNewRecord = async (sprint: Sprint): Promise<Distance | false> => {
    if (sprint.takeBreak) return false
    const distance = await getDistanceBySprint(sprint)
    if (!distance) return false
    const pr = await getPersonalRecordByDistance(distance)
    if (!pr) return distance
    if (sprint.pace < pr.sprint.pace) return distance
    return false
}
