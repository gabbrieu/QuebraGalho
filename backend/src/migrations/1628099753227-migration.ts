import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1628099753227 implements MigrationInterface {
    name = 'migration1628099753227'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "worker" ADD "linkedIn" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "worker" DROP COLUMN "linkedIn"`);
    }

}
