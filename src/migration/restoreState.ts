import { AppDataSource } from "@/config/data-source";
import { Sprint } from "@/entities/Sprint";
import * as fs from "fs";

export async function restoreState() {
    const sprintRepo = AppDataSource.getRepository(Sprint);
    const data = JSON.parse(fs.readFileSync("backup.json", "utf-8"));
    await sprintRepo.save(data.sprints);
}
