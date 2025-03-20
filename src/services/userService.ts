import { AppDataSource } from "@/config/data-source"
import { User } from "@/entities/User"

const userRepository = AppDataSource.getRepository(User)

export const createUser = async (user: Omit<User, 'id'>) => {

    try {
        const newUser = new User()
        newUser.sub = user.sub
        newUser.firstName = user.firstName
        newUser.lastName = user.lastName
        newUser.age = user.age

        await userRepository.save(newUser)
        return newUser
    } catch (error) {
        console.log(error);
        return null
    }

}

export const deleteUser = async (circuitId: number) => {
    try {
        const res = await userRepository.delete(circuitId)
        if (res.affected == 0) return 404
        return res
    }
    catch (error) {
        console.log(error);
        return null
    }
}

export const getUser = async (userId: number) => {
    try {
        const existingUser = await userRepository.findOneBy({ id: userId });
        if (!existingUser) return 404
        return existingUser
    } catch (error) {
        console.log(error);
        return null
    }
}

export const getAllUsers = async () => {
    try {
        const users = await userRepository.find()
        return users
    } catch (error) {
        console.log(error);
        return []
    }
}

// export const updateCircuit = async (circuitId: number, circuit: Partial<Circuit>) => {
//     try {
//         const existingUser = await circuitRepository.findOneBy({ id: circuitId });
//         if (!existingUser) return 404
//         await AppDataSource
//             .createQueryBuilder()
//             .update(Circuit)
//             .set(circuit)
//             .where("id = :id", { id: circuitId })
//             .execute();
//         return circuit;
//     } catch (error) {
//         console.error("Error updating circuit:", error);
//         return null;
//     }
// };
