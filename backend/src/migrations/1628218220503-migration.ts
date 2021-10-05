import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1628218220503 implements MigrationInterface {
    name = 'migration1628218220503'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service" DROP CONSTRAINT "FK_33b8bff697dec6fd69e754619a3"`);
        await queryRunner.query(`ALTER TABLE "service" RENAME COLUMN "workersId" TO "workerId"`);
        await queryRunner.query(`ALTER TABLE "service" ADD CONSTRAINT "FK_8df746cf5aa26461cd530d71cda" FOREIGN KEY ("workerId") REFERENCES "worker"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service" DROP CONSTRAINT "FK_8df746cf5aa26461cd530d71cda"`);
        await queryRunner.query(`ALTER TABLE "service" RENAME COLUMN "workerId" TO "workersId"`);
        await queryRunner.query(`ALTER TABLE "service" ADD CONSTRAINT "FK_33b8bff697dec6fd69e754619a3" FOREIGN KEY ("workersId") REFERENCES "worker"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
