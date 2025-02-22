import { SangKien } from "../entities/sang-kien.entity";
import { sangKienSeed } from "../seeds/admin.seed";
import { getRepository, MigrationInterface, QueryRunner } from "typeorm";

export class SeedSangKienTable1740197937460 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await getRepository(SangKien).save(sangKienSeed);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
