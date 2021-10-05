import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1633392962581 implements MigrationInterface {
    name = 'migration1633392962581'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "accounts_gender_enum" AS ENUM('masculino', 'feminino', 'não informado')`);
        await queryRunner.query(`CREATE TYPE "accounts_type_enum" AS ENUM('WORKER', 'CUSTOMER')`);
        await queryRunner.query(`CREATE TABLE "accounts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "document" character varying NOT NULL, "birth_date" character varying, "cellPhone" character varying NOT NULL, "fullName" character varying NOT NULL, "gender" "accounts_gender_enum", "status" boolean NOT NULL, "create_date" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp without time zone, "update_date" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp without time zone, "email" character varying NOT NULL, "password" character varying NOT NULL, "type" "accounts_type_enum" NOT NULL, "workerId" uuid, "customerId" uuid, CONSTRAINT "UQ_ac3811aaeffd9f5581ef644bcd4" UNIQUE ("document"), CONSTRAINT "UQ_ee66de6cdc53993296d1ceb8aa0" UNIQUE ("email"), CONSTRAINT "REL_9ac3dc4185fe260de30b175644" UNIQUE ("workerId"), CONSTRAINT "REL_3c8ddd991a3e7cc26517def48e" UNIQUE ("customerId"), CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "worker" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "worker" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "UQ_cd6c4fbf1a8c274d31f072fa21c" UNIQUE ("document")`);
        await queryRunner.query(`ALTER TABLE "worker" ADD CONSTRAINT "UQ_b434729eef3bcfdcab966465313" UNIQUE ("document")`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "FK_9ac3dc4185fe260de30b1756443" FOREIGN KEY ("workerId") REFERENCES "worker"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "FK_3c8ddd991a3e7cc26517def48ed" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "FK_3c8ddd991a3e7cc26517def48ed"`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "FK_9ac3dc4185fe260de30b1756443"`);
        await queryRunner.query(`ALTER TABLE "worker" DROP CONSTRAINT "UQ_b434729eef3bcfdcab966465313"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "UQ_cd6c4fbf1a8c274d31f072fa21c"`);
        await queryRunner.query(`ALTER TABLE "worker" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "worker" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "accounts"`);
        await queryRunner.query(`DROP TYPE "accounts_type_enum"`);
        await queryRunner.query(`DROP TYPE "accounts_gender_enum"`);
    }

}
