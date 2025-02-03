import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

//? DBservice
import { DBservice } from './db.service';

//? Entity
import { User } from './entity/user.entity';
import { EntityTest } from './entity/entityTest.entity';

@Controller('db')
export class DBcontroller {
  constructor(private dbservice: DBservice) {}

  @Get()
  TestDBConnect() {
    return this.dbservice.TestDBConnect();
  }

  @Get('account')
  async getProfile(@Query('id') id: number) {
    return await this.dbservice.getAccount(id);
  }

  @Post('account')
  async createAccount() {
    await this.dbservice.createAccount();
  }

  @Get('user')
  async getEntity(@Query('id') id) {
    return await this.dbservice.getUser(id);
  }
  @Post('user') //^ **Experimental
  @UsePipes(new ValidationPipe({ transform: true }))
  async createUser(@Body() user: User) {
    return this.dbservice.createUser(user); //validated user ?
  }

  @Get('xtype')
  async xtypeCreate() {
    return this.dbservice.xtypeCreate()
  }

  @Get('_xtype')
  async xtypeGet() {
    return await this.dbservice.xtypeGet()
  }

  @Post('relationM-M')
  async relationCreate() {
    return await this.dbservice.many_to_many_create()
  }

  @Get('relationM-M')
  async relationGet(@Query('id') id: number) {
    return await this.dbservice.many_to_many_get(id)
  }

  @Get('Tentity')
  async Tentity() {
    return await this.dbservice.TEntityCreate()
  }

  @Post('apidata')
  async createApiData(@Query('metadata') metadata: string) {
    const ent = new EntityTest()
    ent.data = ['REF_0F7C1D5EA92']
    ent.metadata = Buffer.alloc(metadata.length+1, metadata)
    ent.dyn = {
      lr: {
        lnode: {p:[1,8,3],meta: ent.metadata},
        rnode: {p:[],meta: ent.metadata}
      },
      deep: 0.857436,
      pos: {x:0.6391,y:0.2375,z:0.5046}
    }
    this.dbservice.datasource.manager.save(ent)
  }

  @Get('apidata')
  async getApiData(@Query('id') id: number = 1) {
    const entity_test = await this.dbservice.datasource
      .createQueryBuilder(EntityTest, "ent")
      .select('ent.gid', 'id')
      .addSelect('ent.dyn')
      .where("ent.gid = :ent_id", { ent_id: id })
      .getOne()// as {data_ID: number, metadata: string, data: string}
    console.log(entity_test)
    return entity_test
  }
}
