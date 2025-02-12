import "reflect-metadata"
import { DataSource } from "typeorm"
import 'dotenv/config'
import { Sprint } from "@/entities/Sprint";
import { User } from "@/entities/User";

const {
    DB_HOST = 'http://localhost:3000/api',
    DB_USERNAME = '',
    DB_PASSWORD = '',
    DB_DATABASE = '',
} = process.env;

export const AppDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST,
    port: 5432,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    ssl: {
        rejectUnauthorized: false,
    },
    synchronize: true,
    logging: true,
    entities: [User, Sprint],
    migrations: [],
    subscribers: [],
})