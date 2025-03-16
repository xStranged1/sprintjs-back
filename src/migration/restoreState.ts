import { AppDataSource } from "@/config/data-source";
import { Circuit } from "@/entities/Circuit";
import { Distance } from "@/entities/Distance";
import { PersonalRecord } from "@/entities/PersonalRecord";
import { Sprint } from "@/entities/Sprint";
import * as fs from "fs";

export async function restoreState() {
    const sprintRepo = AppDataSource.getRepository(Sprint);
    const circuitRepo = AppDataSource.getRepository(Circuit);
    const distanceRepo = AppDataSource.getRepository(Distance);
    const personalRecordRepo = AppDataSource.getRepository(PersonalRecord);

    const data = JSON.parse(fs.readFileSync("backup.json", "utf-8"));
    await circuitRepo.save(data.circuits);
    await sprintRepo.save(data.sprints);
    await distanceRepo.save(data.distances);
    await personalRecordRepo.save(data.personalRecords);
}
