import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1638314762062 implements MigrationInterface {
    name = 'migration1638314762062'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contract" ALTER COLUMN "endDate" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contract" ALTER COLUMN "endDate" SET NOT NULL`);
    }

}
