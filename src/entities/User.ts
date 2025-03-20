import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    sub: string

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number

}
