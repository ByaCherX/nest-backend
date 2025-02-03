import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  JoinColumn,
  OneToOne,
  JoinTable,
} from 'typeorm';

//? Entity
import { User } from './user.entity';

@Entity()
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  explain: string;

  // Test generated
  @OneToOne(() => User)
  @JoinColumn({ name: 'userID' })
  user: User;
}
