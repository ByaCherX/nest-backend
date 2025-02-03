import { DataSource } from "typeorm";

/**
 * User: <...>
 * Migration_taret: testa
 * Subscribers: None
 * Logging: console
 */
const dataSource = new DataSource({
    type: 'mariadb',
    host: 'localhost',
    port: 3306,
    username: '',
    password: '',
    database: '', 
    entities: [__dirname+'..\\enitity\\*.js'],
    migrations: [__dirname+'\\17*.js'],
    logger: "advanced-console"
})
export = { dataSource }

// npx typeorm migration:create .\src\db\migration/{migration_name}
/*
 * -d {path_dataSource} :: must be .js
*/
// npx typeorm migration:show -d .\dist\db\migration\migration-helper.js