import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import mariadb from 'mariadb';

//? Service
import { DBservice } from './db.service';

//? Controller
import { DBcontroller } from './db.controller';


//? Entity
// Entity loading with this directory: 'dist/db/entity'
import { DataSource } from 'typeorm';
import { DataBaseLogger } from './db.logger';
const pth = __dirname+'\\entity\\*.js';


const dataSource: TypeOrmModuleOptions = {
  type: 'mariadb', //using mysql2 connector
  host: process.env.HOST,
  port: Number(process.env.PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_SCHEMA,
  entities: [pth],
  autoLoadEntities: true,
  migrations: [],
  subscribers: [],
  synchronize: false,  //^ Not Production,
  cache: false,
  poolSize: 4,
  logger: new DataBaseLogger(["error", "migration", "schema", "query"]),
  debug: false,
  trace: true,
  connectorPackage: 'mysql2',
  retryAttempts: 3,
  retryDelay: 5000,
  bigNumberStrings: false,
  supportBigNumbers: true,
  dateStrings: false
}

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSource),
  ],
  providers: [DBservice],
  controllers: [DBcontroller],
  exports: [],
})
export class DataBase {
  constructor(datasource: DataSource) {
    let targ_schema = datasource.driver.schema
  }
  /** Mariadb Connector
   * ^ Experimental progress
   * some sql queries and multiple operations use mariadb-nodejs-connector
   * * Version: 10.8.3-mariadb
   * 
   * --- Project Target ---
   * Typeorm-sql-generate -> executing on mariadb-connector
   * DataBase Handler <-> Typeorm/mariadb/redis
   * CrossPlatform Mariadb System (mariadb-nodejs)
   */
  async mariadbConnect() {
    const db = await mariadb.createConnection({
      host: 'localhost',
      port: 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_SCHEMA,
      compress: true
    })
  }
}
