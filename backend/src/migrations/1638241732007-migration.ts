import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1638241732007 implements MigrationInterface {
    name = 'migration1638241732007'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contract" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price" numeric(12,2) NOT NULL, "startDate" date NOT NULL, "endDate" date NOT NULL, "descriptionService" text NOT NULL, "ratingWorker" integer, "textRatingWorker" character varying, "ratingCustomer" integer, "textRatingCustomer" character varying, "status" boolean NOT NULL, "create_date" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp without time zone, "update_date" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp without time zone, "customerId" uuid, "serviceId" uuid, CONSTRAINT "PK_17c3a89f58a2997276084e706e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "contract" ADD CONSTRAINT "FK_936abe955fb4bf453631ba04de9" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contract" ADD CONSTRAINT "FK_0360eaab28155405bf08cf3f9c0" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contract" DROP CONSTRAINT "FK_0360eaab28155405bf08cf3f9c0"`);
        await queryRunner.query(`ALTER TABLE "contract" DROP CONSTRAINT "FK_936abe955fb4bf453631ba04de9"`);
        await queryRunner.query(`DROP TABLE "contract"`);
    }

}
