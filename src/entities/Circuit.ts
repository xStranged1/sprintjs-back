import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from "typeorm"
import { Sprint } from "./Sprint"
import { User } from "./User"

@Entity()
export class Circuit {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ type: 'float' })
    distance: number

    @OneToMany(() => Sprint, (sprint) => sprint.circuit)
    sprints: Sprint[]

    @ManyToOne(() => User, (user) => user.circuits)
    user: User
}
