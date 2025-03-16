import * as fs from "fs";
import { Sprint } from "@/entities/Sprint";
import { Circuit } from "@/entities/Circuit";
import { AppDataSource } from "@/config/data-source";
import { Distance } from "@/entities/Distance";
import { PersonalRecord } from "@/entities/PersonalRecord";

export async function saveState() {
    const sprintRepo = AppDataSource.getRepository(Sprint);
    const circuitRepo = AppDataSource.getRepository(Circuit);
    const distanceRepo = AppDataSource.getRepository(Distance);
    const personalRecordRepo = AppDataSource.getRepository(PersonalRecord);
    const circuits = await circuitRepo.find();
    const sprints = await sprintRepo.find({ relations: { circuit: true } });
    const distances = await distanceRepo.find();
    const personalRecords = await personalRecordRepo.find({ relations: { distance: true, sprint: true } });
    const backup = { sprints, circuits, distances, personalRecords };
    fs.writeFileSync("backup.json", JSON.stringify(backup, null, 2));
}
