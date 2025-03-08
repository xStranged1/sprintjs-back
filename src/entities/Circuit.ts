import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Circuit {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    distance: number

}
