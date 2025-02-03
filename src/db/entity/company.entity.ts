import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany } from "typeorm";
import { Employee } from "./employee.entity";

@Entity({
  schema: 'test',
  name: 'company',
  synchronize: false,
})
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 32})
  name: string;
  
  @OneToMany(() => Employee, (employee) => employee.company)
  employees: Employee[];
}