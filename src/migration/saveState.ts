import * as fs from "fs";
import { Sprint } from "@/entities/Sprint";
import { Circuit } from "@/entities/Circuit";
import { AppDataSource } from "@/config/data-source";

export async function saveState() {
    const sprintRepo = AppDataSource.getRepository(Sprint);
    const circuitRepo = AppDataSource.getRepository(Circuit);
    const circuits = await circuitRepo.find();
    const sprints = await sprintRepo.find({ relations: { circuit: true } });
    const backup = { sprints, circuits };
    fs.writeFileSync("backup.json", JSON.stringify(backup, null, 2));
}
