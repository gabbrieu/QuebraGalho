import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1628211256802 implements MigrationInterface {
    name = 'migration1628211256802'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "service" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "status" boolean NOT NULL, "description" character varying NOT NULL, "price" numeric(12,2) NOT NULL, "create_date" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp without time zone, "update_date" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp without time zone, "workersId" uuid, CONSTRAINT "PK_85a21558c006647cd76fdce044b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "service" ADD CONSTRAINT "FK_33b8bff697dec6fd69e754619a3" FOREIGN KEY ("workersId") REFERENCES "worker"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service" DROP CONSTRAINT "FK_33b8bff697dec6fd69e754619a3"`);
        await queryRunner.query(`DROP TABLE "service"`);
    }

}
