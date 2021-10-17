import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1633458324529 implements MigrationInterface {
    name = 'migration1633458324529'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "FK_9ac3dc4185fe260de30b1756443"`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "FK_3c8ddd991a3e7cc26517def48ed"`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "REL_9ac3dc4185fe260de30b175644"`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "workerId"`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "REL_3c8ddd991a3e7cc26517def48e"`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "customerId"`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "accountsId" uuid`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "UQ_1b4287dc6a15690364adcf698bb" UNIQUE ("accountsId")`);
        await queryRunner.query(`ALTER TABLE "worker" ADD "accountsId" uuid`);
        await queryRunner.query(`ALTER TABLE "worker" ADD CONSTRAINT "UQ_8de049df4b17a0836f66b5c7114" UNIQUE ("accountsId")`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "FK_1b4287dc6a15690364adcf698bb" FOREIGN KEY ("accountsId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "worker" ADD CONSTRAINT "FK_8de049df4b17a0836f66b5c7114" FOREIGN KEY ("accountsId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "worker" DROP CONSTRAINT "FK_8de049df4b17a0836f66b5c7114"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "FK_1b4287dc6a15690364adcf698bb"`);
        await queryRunner.query(`ALTER TABLE "worker" DROP CONSTRAINT "UQ_8de049df4b17a0836f66b5c7114"`);
        await queryRunner.query(`ALTER TABLE "worker" DROP COLUMN "accountsId"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "UQ_1b4287dc6a15690364adcf698bb"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "accountsId"`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD "customerId" uuid`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "REL_3c8ddd991a3e7cc26517def48e" UNIQUE ("customerId")`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD "workerId" uuid`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "REL_9ac3dc4185fe260de30b175644" UNIQUE ("workerId")`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "FK_3c8ddd991a3e7cc26517def48ed" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "FK_9ac3dc4185fe260de30b1756443" FOREIGN KEY ("workerId") REFERENCES "worker"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
