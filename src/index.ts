import express, { Request, Response } from "express";
import 'dotenv/config'
const app = express()

console.log('running at http://localhost:3000/');
console.log(process.env.API_KEY)

app.get('/', (req: Request, res: Response) => {
    res.send('hello world')
})

app.listen(3000)