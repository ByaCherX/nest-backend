import { MigrationInterface, QueryRunner } from "typeorm"

export class TentityRefactoring1704746710867 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE tentity ADD COLUMN (xarr text)`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE tentity DROP COLUMN xarr`
        )
    }

}