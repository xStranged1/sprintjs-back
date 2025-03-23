import { AppDataSource } from "@/config/data-source";
import { getUserBySub } from "./userService";
import { Sprint } from "@/entities/Sprint";
import { Circuit } from "@/entities/Circuit";
import { getCircuit } from "./circuitService";
import { PersonalRecord } from "@/entities/PersonalRecord";

export const sqlSprints = async (sub: string) => {

    try {
        const user = await getUserBySub(sub)
        console.log(user);
        await AppDataSource
            .createQueryBuilder()
            .update(Sprint)
            .set({ user: user })
            .execute();
    } catch (err) {
        console.log(err);
    }
}

export const sqlCircuits = async (sub: string) => {

    try {
        const user = await getUserBySub(sub)
        console.log(user);
        await AppDataSource
            .createQueryBuilder()
            .update(Circuit)
            .set({ user: user })
            .execute();
    } catch (err) {
        console.log(err);
    }
}

export const sqlPersonalRecords = async (sub: string) => {

    try {
        const user = await getUserBySub(sub)
        console.log(user);
        await AppDataSource
            .createQueryBuilder()
            .update(PersonalRecord)
            .set({ user: user })
            .execute();
    } catch (err) {
        console.log(err);
    }
}

export const updateSprints = async (sprintId: number) => {

    try {
        const circuit = await getCircuit(3)
        await AppDataSource
            .createQueryBuilder()
            .update(Sprint)
            .set({ circuit: circuit })
            .where("id = :id", { id: sprintId })
            .execute();
    } catch (err) {
        console.log(err);
    }
}