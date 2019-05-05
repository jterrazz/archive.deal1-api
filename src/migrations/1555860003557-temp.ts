import {MigrationInterface, QueryRunner} from "typeorm";

export class temp1555860003557 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" ADD "facebookId" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "googleId" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "googleId"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "facebookId"`);
    }

}
