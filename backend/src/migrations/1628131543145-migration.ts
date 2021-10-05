import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1628131543145 implements MigrationInterface {
    name = 'migration1628131543145'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "customer_gender_enum" AS ENUM('masculino', 'feminino', 'não informado')`);
        await queryRunner.query(`CREATE TABLE "customer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "document" character varying NOT NULL, "birth_date" character varying, "cellPhone" character varying NOT NULL, "fullName" character varying NOT NULL, "gender" "customer_gender_enum", "email" character varying NOT NULL, "password" character varying NOT NULL, "status" boolean NOT NULL, "create_date" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp without time zone, "update_date" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp without time zone, CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`DROP TYPE "customer_gender_enum"`);
    }

}
