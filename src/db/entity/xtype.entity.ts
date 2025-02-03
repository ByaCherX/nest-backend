import { Entity, Column, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent, EntitySchema } from "typeorm"
import { Contains, Length } from 'class-validator'

@Entity({ name: 'xtype' })
@Tree("materialized-path")
export class xtype {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'text',
    comment: 'example comment'
  })
  @Contains("&")
  @Length(4,20)
  ival: string

  @TreeChildren()
  children: xtype[]

  @TreeParent()
  parent: xtype
}

/** -> xtypeE - Schema */
export const xtypeEntity = new EntitySchema({
  name: "xtypeE",
  synchronize: true,
  columns: {
    id: {type: Number, primary: true, generated: true},
    ival: {type: String},
    ptr: {type: 'int', default: 8}
  },
  checks: [
    {expression: `"id" < 3`},
    {expression: `"ival" <> 'some str 0'`}
  ],
  uniques: [
    {name: "UNIQUE_TEST", columns: ["ival"]}
  ]
})