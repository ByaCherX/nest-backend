import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

type dyn_type = {
  lr: {
    lnode: {p: number[], meta: Buffer},
    rnode: {p: number[], meta: Buffer}
  },
  deep: number,
  pos: {x: number, y: number, z: number},
}

enum UsrRole {
  ADMIN = "admin",
  EDTIOR = "editor",
  GHOST = "ghost"
}

/**
 * Supported DataTypes: 
 * tinyint(8bit), smallint(16bit), int(32bit), bigint(64bit)
 * boolean, bit, float(32bit), double(64bit)
 * char, varchar, enum, binary, tinyblob, mediumblob, blob, longblob, text, json, set
 * date, time, datetime, timestamp
 */
@Entity({
  schema: 'test', 
  name: 'entity_test', 
  engine: 'InnoDB', 
  synchronize: true,
  comment: 'It is a table designed to test dynamic column and json object types. ! For testing purposes only. !'})
export class EntityTest {
  @PrimaryGeneratedColumn('increment')
  gid: number;

  @Column({ type: 'varchar', nullable: true, length: 255, comment: 'Array[]' })
  data: any[];

  @Column({ type: 'json', nullable: true, unique: true })
  dyn: dyn_type;

  @Column({ type: 'blob', nullable: true })
  metadata: Buffer;

  @Column({ type: 'enum', enum: UsrRole, default: UsrRole.GHOST })
  role: UsrRole

  @Column({ type: 'datetime', onUpdate: 'CURRENT_TIMESTAMP()' })
  updateTime: Date
}