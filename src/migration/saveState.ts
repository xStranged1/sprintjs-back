import * as fs from "fs";
import { Sprint } from "@/entities/Sprint";
import { Circuit } from "@/entities/Circuit";
import { AppDataSource } from "@/config/data-source";

export async function saveState() {
    const sprintRepo = AppDataSource.getRepository(Sprint);
    const circuitRepo = AppDataSource.getRepository(Circuit);

    const sprints = await sprintRepo.find();

    const backup = { sprints };
    console.log(backup);

    fs.writeFileSync("backup.json", JSON.stringify(backup, null, 2));
}
