import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "../entity/User"
import 'dotenv/config'

const {
    HOST = 'http://localhost:3000/api',
    USERNAME = '',
    PASSWORD = '',
    DATABASE = '',
} = process.env;

console.log(HOST);
console.log(USERNAME);
console.log(PASSWORD);
console.log(DATABASE);

export const AppDataSource = new DataSource({
    type: "postgres",
    host: HOST,
    port: 5432,
    username: USERNAME,
    password: PASSWORD,
    database: DATABASE,
    ssl: {
        rejectUnauthorized: false,
    },
    synchronize: false,
    logging: true,
    entities: [User],
    migrations: [],
    subscribers: [],
})