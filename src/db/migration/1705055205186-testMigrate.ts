import { MigrationInterface, QueryRunner, TableIndex } from "typeorm"
import { Tentity } from "../entity/tentity"

export class TestMigrate1705055205186 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createIndex("tentity", new TableIndex({
            name: 'IDX_TENTITY_XARR',
            columnNames: ["xarr"]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        //^ REVERT REJECTED
    }

}
