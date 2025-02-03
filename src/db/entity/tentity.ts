import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Tentity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tdata: string;

  @Column({ type: 'simple-json' })
  user: { name: string };

  @Column({
    type: 'simple-array',
  })
  tarr: string[];

  @Column({ type: 'simple-array' })
  xarr: number[]
}
