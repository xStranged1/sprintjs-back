import { AppDataSource } from "@/config/data-source";
import { Circuit } from "@/entities/Circuit";
import { Sprint } from "@/entities/Sprint";
import * as fs from "fs";

export async function restoreState() {
    const sprintRepo = AppDataSource.getRepository(Sprint);
    const circuitRepo = AppDataSource.getRepository(Circuit);
    const data = JSON.parse(fs.readFileSync("backup.json", "utf-8"));
    await circuitRepo.save(data.circuits);
    await sprintRepo.save(data.sprints);
}
