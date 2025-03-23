import * as fs from "fs";
import { Sprint } from "@/entities/Sprint";
import { Circuit } from "@/entities/Circuit";
import { AppDataSource } from "@/config/data-source";
import { Distance } from "@/entities/Distance";
import { PersonalRecord } from "@/entities/PersonalRecord";
import { User } from "@/entities/User";

export async function saveState() {
    const timer1 = performance.now()
    const sprintRepo = AppDataSource.getRepository(Sprint);
    const circuitRepo = AppDataSource.getRepository(Circuit);
    const distanceRepo = AppDataSource.getRepository(Distance);
    const personalRecordRepo = AppDataSource.getRepository(PersonalRecord);
    const userRepo = AppDataSource.getRepository(User);

    const users = await userRepo.find();
    const circuits = await circuitRepo.find({ relations: { user: true } });
    const sprints = await sprintRepo.find({ relations: { circuit: true, user: true } });
    const distances = await distanceRepo.find();
    const personalRecords = await personalRecordRepo.find({ relations: { distance: true, sprint: true, user: true } });
    const backup = { sprints, circuits, distances, personalRecords, users };
    fs.writeFileSync("backup.json", JSON.stringify(backup, null, 2));
    const timer2 = performance.now()
    console.log(`tiempo en guardar estado: ${timer2 - timer1}ms`);
}
