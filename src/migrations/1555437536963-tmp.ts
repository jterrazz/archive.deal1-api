import {MigrationInterface, QueryRunner} from "typeorm";

export class tmp1555437536963 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "title" character varying(256) NOT NULL, "description" character varying(256), "storeId" integer, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tag" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_6a9775008add570dc3e5a0bab7" ON "tag" ("name") `);
        await queryRunner.query(`CREATE TABLE "store" ("id" SERIAL NOT NULL, "name" character varying(256) NOT NULL, "description" character varying(256), "profileImageId" character varying(256) NOT NULL, "bannerImageId" character varying(256) NOT NULL, CONSTRAINT "PK_f3172007d4de5ae8e7692759d79" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying(256) NOT NULL, "lastName" character varying(256) NOT NULL, "email" character varying(256) NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `);
        await queryRunner.query(`CREATE TABLE "tag_products" ("tagId" integer NOT NULL, "productId" integer NOT NULL, CONSTRAINT "PK_30250513387a2b8164069e73206" PRIMARY KEY ("tagId", "productId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_41e6489fcece17fc25dcd30dc4" ON "tag_products" ("tagId") `);
        await queryRunner.query(`CREATE INDEX "IDX_66362fa615ee00a926c959c4ed" ON "tag_products" ("productId") `);
        await queryRunner.query(`CREATE TABLE "tag_stores" ("tagId" integer NOT NULL, "storeId" integer NOT NULL, CONSTRAINT "PK_d9f28fb969c1ae5105a49bebdc8" PRIMARY KEY ("tagId", "storeId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9aaa9cc2f14149e4519fdc33ff" ON "tag_stores" ("tagId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9c85743ed3b66280133b9e727e" ON "tag_stores" ("storeId") `);
        await queryRunner.query(`CREATE TABLE "user_stores" ("userId" integer NOT NULL, "storeId" integer NOT NULL, CONSTRAINT "PK_46fc8dd09795472adbf4ee45035" PRIMARY KEY ("userId", "storeId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c1ae840a5dd1c3b47e9e0295e7" ON "user_stores" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_fa944659f67025510ca20ccb7e" ON "user_stores" ("storeId") `);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_32eaa54ad96b26459158464379a" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tag_products" ADD CONSTRAINT "FK_41e6489fcece17fc25dcd30dc41" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tag_products" ADD CONSTRAINT "FK_66362fa615ee00a926c959c4ed0" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tag_stores" ADD CONSTRAINT "FK_9aaa9cc2f14149e4519fdc33ff8" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tag_stores" ADD CONSTRAINT "FK_9c85743ed3b66280133b9e727e4" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_stores" ADD CONSTRAINT "FK_c1ae840a5dd1c3b47e9e0295e71" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_stores" ADD CONSTRAINT "FK_fa944659f67025510ca20ccb7ed" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user_stores" DROP CONSTRAINT "FK_fa944659f67025510ca20ccb7ed"`);
        await queryRunner.query(`ALTER TABLE "user_stores" DROP CONSTRAINT "FK_c1ae840a5dd1c3b47e9e0295e71"`);
        await queryRunner.query(`ALTER TABLE "tag_stores" DROP CONSTRAINT "FK_9c85743ed3b66280133b9e727e4"`);
        await queryRunner.query(`ALTER TABLE "tag_stores" DROP CONSTRAINT "FK_9aaa9cc2f14149e4519fdc33ff8"`);
        await queryRunner.query(`ALTER TABLE "tag_products" DROP CONSTRAINT "FK_66362fa615ee00a926c959c4ed0"`);
        await queryRunner.query(`ALTER TABLE "tag_products" DROP CONSTRAINT "FK_41e6489fcece17fc25dcd30dc41"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_32eaa54ad96b26459158464379a"`);
        await queryRunner.query(`DROP INDEX "IDX_fa944659f67025510ca20ccb7e"`);
        await queryRunner.query(`DROP INDEX "IDX_c1ae840a5dd1c3b47e9e0295e7"`);
        await queryRunner.query(`DROP TABLE "user_stores"`);
        await queryRunner.query(`DROP INDEX "IDX_9c85743ed3b66280133b9e727e"`);
        await queryRunner.query(`DROP INDEX "IDX_9aaa9cc2f14149e4519fdc33ff"`);
        await queryRunner.query(`DROP TABLE "tag_stores"`);
        await queryRunner.query(`DROP INDEX "IDX_66362fa615ee00a926c959c4ed"`);
        await queryRunner.query(`DROP INDEX "IDX_41e6489fcece17fc25dcd30dc4"`);
        await queryRunner.query(`DROP TABLE "tag_products"`);
        await queryRunner.query(`DROP INDEX "IDX_e12875dfb3b1d92d7d7c5377e2"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "store"`);
        await queryRunner.query(`DROP INDEX "IDX_6a9775008add570dc3e5a0bab7"`);
        await queryRunner.query(`DROP TABLE "tag"`);
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
