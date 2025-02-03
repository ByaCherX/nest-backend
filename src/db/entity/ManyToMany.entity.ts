import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ schema: 'testn', name: 'Category', synchronize: false })
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 32 })
  name: string

  @ManyToMany((type) => Question, (question) => question.categories)
  questions: Question[]

  @OneToMany(() => Question_Category, questionCategory => questionCategory.category)
  public question_category: Question_Category[];
}

@Entity({ schema: 'testn', name: 'Question', synchronize: false })
export class Question {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 64 })
  title: string

  @Column({ type: 'varchar', length: 255 })
  text: string

  @ManyToMany((type) => Category, (category) => category.questions, {
    cascade: true
  })
  @JoinTable()
  categories: Category[]

  @OneToMany(() => Question_Category, questionCategory => questionCategory.question)
  public question_category: Question_Category[];
}

@Entity({ schema: 'testn', name: 'Question_Category', synchronize: false })
export class Question_Category {
  @Column({ type: 'int', primary: true, name: 'question_id' })
  public question_id: number

  @Column({ type: 'int', primary: true, name: 'category_id' })
  public category_id: number

  @ManyToOne(() => Question, (question) => question.question_category)
  public question: Question

  @ManyToOne(() => Category, (category) => category.question_category)
  public category: Category
}