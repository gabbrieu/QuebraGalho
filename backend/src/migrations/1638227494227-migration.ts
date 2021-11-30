import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1638227494227 implements MigrationInterface {
    name = 'migration1638227494227'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" ADD "photoUrl" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "photoUrl"`);
    }

}
