import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1634492079726 implements MigrationInterface {
    name = 'migration1634492079726'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "birth_date"`);
        await queryRunner.query(`ALTER TABLE "worker" DROP COLUMN "photo_url"`);
        await queryRunner.query(`ALTER TABLE "worker" DROP COLUMN "available"`);
        await queryRunner.query(`ALTER TABLE "worker" DROP COLUMN "birth_date"`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "birth_date"`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "birthDate" character varying`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "cep" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "address" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "worker" ADD "birthDate" character varying`);
        await queryRunner.query(`ALTER TABLE "worker" ADD "cep" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "worker" ADD "address" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "worker" ADD "description" text`);
        await queryRunner.query(`ALTER TABLE "worker" ADD "photoUrl" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "worker" ADD "mainProfession" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD "birthDate" character varying`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD "cep" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD "address" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "cep"`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "birthDate"`);
        await queryRunner.query(`ALTER TABLE "worker" DROP COLUMN "mainProfession"`);
        await queryRunner.query(`ALTER TABLE "worker" DROP COLUMN "photoUrl"`);
        await queryRunner.query(`ALTER TABLE "worker" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "worker" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "worker" DROP COLUMN "cep"`);
        await queryRunner.query(`ALTER TABLE "worker" DROP COLUMN "birthDate"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "cep"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "birthDate"`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD "birth_date" character varying`);
        await queryRunner.query(`ALTER TABLE "worker" ADD "birth_date" character varying`);
        await queryRunner.query(`ALTER TABLE "worker" ADD "available" character varying`);
        await queryRunner.query(`ALTER TABLE "worker" ADD "photo_url" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "birth_date" character varying`);
    }

}
