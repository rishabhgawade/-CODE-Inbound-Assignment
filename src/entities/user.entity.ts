import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()

export class User {

@PrimaryGeneratedColumn()

id: number;

@Column({ length: 100 })

name: string;



@Column()

password: string;

}