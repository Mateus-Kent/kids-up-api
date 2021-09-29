import {MigrationInterface, QueryRunner} from "typeorm";

export class RelationMessageParent1632876038657 implements MigrationInterface {
    name = 'RelationMessageParent1632876038657'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "messageText"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "messenger"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "receiver"`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "MessageText" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "messengerId" uuid`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "receiverId" uuid`);
        await queryRunner.query(`ALTER TABLE "parents" DROP CONSTRAINT "UQ_07b4151ae2a983823d922d5cf03"`);
        await queryRunner.query(`ALTER TABLE "messages" ALTER COLUMN "send_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_7c4f133c1465b57c764178345ff" FOREIGN KEY ("messengerId") REFERENCES "parents"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_acf951a58e3b9611dd96ce89042" FOREIGN KEY ("receiverId") REFERENCES "parents"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_acf951a58e3b9611dd96ce89042"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_7c4f133c1465b57c764178345ff"`);
        await queryRunner.query(`ALTER TABLE "messages" ALTER COLUMN "send_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "parents" ADD CONSTRAINT "UQ_07b4151ae2a983823d922d5cf03" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "receiverId"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "messengerId"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "MessageText"`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "receiver" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "messenger" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "messageText" character varying NOT NULL`);
    }

}
