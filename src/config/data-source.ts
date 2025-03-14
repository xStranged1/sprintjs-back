import "reflect-metadata"
import { DataSource } from "typeorm"
import 'dotenv/config'
import { Sprint } from "@/entities/Sprint";
import { User } from "@/entities/User";
import { Circuit } from "@/entities/Circuit";

const {
    DB_HOST = 'http://localhost:3000/api',
    DB_USERNAME = '',
    DB_PASSWORD = '',
    DB_DATABASE = '',
    DB_PORT = 5432
} = process.env;

export const AppDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST,
    port: Number(}),
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    ssl: {
        rejectUnauthorized: false,
    },
    synchronize: false,
    logging: true,
    entities: [User, Sprint, Circuit],
    migrations: [],
    subscribers: [],
})