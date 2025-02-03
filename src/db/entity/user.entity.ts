import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Exclude } from 'class-transformer';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' }) //^ Very Important defination
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  nickname: string;

  @Column()
  @IsEmail()
  Email: string;

  @Column()
  @IsNotEmpty()
  @Exclude()
  password: string;
}
