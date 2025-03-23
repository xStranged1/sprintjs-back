import { AppDataSource } from "@/config/data-source"
import { Circuit } from "@/entities/Circuit"
import { getUserBySub } from "./userService"

const circuitRepository = AppDataSource.getRepository(Circuit)

export const createCircuit = async (circuit: Omit<Circuit, 'id'>, userSub: string) => {

    try {
        const user = await getUserBySub(userSub)
        if (!user || user == 404) {
            return null
        }
        const newCircuit = new Circuit()
        newCircuit.user = user
        newCircuit.distance = circuit.distance
        newCircuit.name = circuit.name
        await circuitRepository.save(newCircuit)
        return newCircuit
    } catch (error) {
        console.log(error);
        return null
    }

}

export const deleteCircuit = async (circuitId: number) => {
    try {
        const res = await circuitRepository.delete(circuitId)
        if (res.affected == 0) return 404
        return res
    }
    catch (error) {
        console.log(error);
        return null
    }
}

export const getCircuit = async (circuitId: number) => {
    try {
        const existingcircuit = await circuitRepository.findOneBy({ id: circuitId });
        if (!existingcircuit) return 404
        return existingcircuit
    } catch (error) {
        console.log(error);
        return null
    }
}

export const getCircuitsBySub = async (userSub: string) => {
    try {
        const user = await getUserBySub(userSub)
        if (!user || user == 404) {
            return null
        }
        const circuits = await circuitRepository.find({ where: { user: user } })
        return circuits
    } catch (error) {
        console.log(error);
        return []
    }
}

export const updateCircuit = async (circuitId: number, circuit: Partial<Circuit>) => {
    try {
        const existingCircuit = await circuitRepository.findOneBy({ id: circuitId });
        if (!existingCircuit) return 404
        await AppDataSource
            .createQueryBuilder()
            .update(Circuit)
            .set(circuit)
            .where("id = :id", { id: circuitId })
            .execute();
        return circuit;
    } catch (error) {
        console.error("Error updating circuit:", error);
        return null;
    }
};
