import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1628045101698 implements MigrationInterface {
  name = 'migration1628045101698';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "worker_gender_enum" AS ENUM('masculino', 'feminino', 'não informado')`,
    );
    await queryRunner.query(
      `CREATE TABLE "worker" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "document" character varying NOT NULL, "birth_date" character varying, "cellPhone" character varying NOT NULL, "fullName" character varying NOT NULL, "gender" "worker_gender_enum", "email" character varying NOT NULL, "password" character varying NOT NULL, "status" boolean NOT NULL, "create_date" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp without time zone, "update_date" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp without time zone, "available" character varying, "photo_url" character varying NOT NULL, CONSTRAINT "PK_dc8175fa0e34ce7a39e4ec73b94" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "worker"`);
    await queryRunner.query(`DROP TYPE "worker_gender_enum"`);
  }
}
