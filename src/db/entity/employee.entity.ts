import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm";
import { Company } from "./company.entity";

@Entity({
  schema: 'test',
  name: 'employee',
  synchronize: false,
})
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 28})
  name: string;

  @Column({type: 'varchar', length: 28})
  job: string;

  @Column({type: 'float', unsigned: true})
  salary: number

  @ManyToOne(() => Company, (company) => company.employees)
  @JoinColumn({name: 'company_id'})
  company: Company
}