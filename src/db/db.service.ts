import { HttpStatus, HttpException, Injectable } from '@nestjs/common';
import { DataSource, Raw, SelectQueryBuilder, Table } from 'typeorm';
import { randomInt } from 'node:crypto';

function sleep(ms: number): Promise<unknown> {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000*ms);
  })
}

//? Entity
import { Account } from './entity/account.entity';
import { User } from './entity/user.entity';
import { xtype } from './entity/xtype.entity';
import { Category, Question, Question_Category } from './entity/ManyToMany.entity';
import { validate } from 'class-validator';
import { Tentity } from './entity/tentity';
import { Employee } from './entity/employee.entity';

@Injectable()
export class DBservice {
  constructor(public datasource: DataSource) {
    // Testing Connection and Transactions
    /*for (let i = 0; i < 16; i++) {
      this.testQueryRunner(i);
    }*/
    //this.testQueryBuilder();
    //this.advanced_RepoAndQueryBuilder()
  }

  TestDBConnect() {
    return this.datasource.isInitialized;
  }

  /**
   * Create Account
   * @noimpl
   */
  async createAccount() {
    //? User
    const user = new User();
    this.datasource.manager.save(user);

    //? Account
    const account = new Account();
    account.uuid = '<uuid>';
    account.explain = 'TEST';
    account.user = user; // User <id>>
    this.datasource.manager.save(account);
  }

  async getAccount(id: number) {
    return this.datasource.getRepository(Account)
      .createQueryBuilder('account')
      .select()
      .where('account.user.id = :usr_id', { usr_id: id })
      .leftJoinAndSelect('account.user', 'user')
      .getOne();
  }

  async getUser(id: number) {
    const _user = this.datasource.getRepository(User).find({
      where: { id: id },
    });
    return _user;
  }

  async createUser(user: User) {
    const dt = this.datasource.manager.create(User, {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      nickname: user.nickname,
      Email: user.Email,
      password: user.password,
    });
    this.datasource.manager.save(dt); // default save type
  }

  async xtypeCreate() {
    //* Tree Entities */
    const a1 = new xtype()
    a1.ival = "a1"
    await this.datasource.manager.save(a1)

    const a11 = new xtype()
    a11.ival = "a11"
    a11.parent = a1
    await this.datasource.manager.save(a11)

    const a12 = new xtype()
    a12.ival = "a12"
    a12.parent = a1
    await this.datasource.manager.save(a12)

    const a111 = new xtype()
    a111.ival = "a111",
    a111.parent = a11
    await this.datasource.manager.save(a111)

    /*
    const dt = this.datasource.manager.create(xtype, {
      ival: "->some str = &ptr->logic\\",
      //parent: {ival: 'parent_ival'}
    })
    this.datasource.manager.save(dt)
    */
  }

  async xtypeGet() {
    const xtypeRepo = this.datasource.getRepository(xtype)
    const df = xtypeRepo.create({
      id: 18,
      ival: '&0x1'
    })
    const err = await validate(df)
    if (err.length > 0) {
      throw new HttpException('Validation err -> '+err, HttpStatus.NOT_ACCEPTABLE)
    } else { await xtypeRepo.save(df) }
    
    /*
    const mpath = await xtypeRepo.findOne({
      relations: {parent: true},
      where: {id: 8}
    })
    mpath.ival = "a1"
    return await xtypeRepo.save(mpath); */
  }

  async many_to_many_create() {
    const category1 = new Category()
    category1.name = "ORMs"

    const category2 = new Category()
    category2.name = "Programming"

    const question = new Question()
    question.title = "How to ask questions?"
    question.text = "Where can I ask related quest"
    question.categories = [category1, category2]
    await this.datasource.manager.save(question)
  }

  async many_to_many_get(question_id: number) {
    const res = await this.datasource.createQueryBuilder()
      .select('q.title, q.text')
      .from('Question_Category', 'qc')
      .leftJoin('Question', 'q', 'qc.question_id = q.id')
      .where((qb) => {
        const subQuery = qb
          .subQuery()
          .select('id')
          .from('Category', 'c')
          .where('name = :c_name', {c_name: 'Finance'})
          .getQuery();
        return `qc.category_id = ${subQuery}`
      })
      .getRawMany()
    return res;
  }

  async TEntityCreate() {
    let t1 = new Tentity()
    t1.tarr = ["acx"]
    t1.tdata = "*Dyn<Box>"
    t1.user = {name: 'a1'}
    t1.xarr = [5,1,4,2]
    this.datasource.manager.save(t1)
  }
}
 