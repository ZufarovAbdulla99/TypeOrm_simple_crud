import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "users"})
export class User {
  @PrimaryGeneratedColumn({type: "int"})
  id: number

  @Column({type: "varchar", nullable: false})
  name: string

  @Column({type: 'varchar', nullable: false})
  email: string
}