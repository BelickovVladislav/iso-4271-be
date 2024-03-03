import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1709304225180 implements MigrationInterface {
  name = 'Migration1709304225180';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "currencies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(150) NOT NULL, "code" character varying(5) NOT NULL, CONSTRAINT "UQ_976da6960ec4f0c96c26e3dffa0" UNIQUE ("name"), CONSTRAINT "UQ_9f8d0972aeeb5a2277e40332d29" UNIQUE ("code"), CONSTRAINT "PK_d528c54860c4182db13548e08c4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "countries" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_fa1376321185575cf2226b1491d" UNIQUE ("name"), CONSTRAINT "PK_b2d7006793e8697ab3ae2deff18" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "countries_currencies_currencies" ("countriesId" uuid NOT NULL, "currenciesId" uuid NOT NULL, CONSTRAINT "PK_c4c8637b2ab9527bda490217a0e" PRIMARY KEY ("countriesId", "currenciesId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_04a08d689f08b60fcff4e945dc" ON "countries_currencies_currencies" ("countriesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0503b15781577633667a0291c1" ON "countries_currencies_currencies" ("currenciesId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "countries_currencies_currencies" ADD CONSTRAINT "FK_04a08d689f08b60fcff4e945dc1" FOREIGN KEY ("countriesId") REFERENCES "countries"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "countries_currencies_currencies" ADD CONSTRAINT "FK_0503b15781577633667a0291c1f" FOREIGN KEY ("currenciesId") REFERENCES "currencies"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "countries_currencies_currencies" DROP CONSTRAINT "FK_0503b15781577633667a0291c1f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "countries_currencies_currencies" DROP CONSTRAINT "FK_04a08d689f08b60fcff4e945dc1"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0503b15781577633667a0291c1"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_04a08d689f08b60fcff4e945dc"`,
    );
    await queryRunner.query(`DROP TABLE "countries_currencies_currencies"`);
    await queryRunner.query(`DROP TABLE "countries"`);
    await queryRunner.query(`DROP TABLE "currencies"`);
  }
}
