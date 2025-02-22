import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddFilesToSangKien1740235104031 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('sang_kien', [
            new TableColumn({
                name: 'thumb',
                type: 'varchar',
                length: '255',
                isNullable: true,
            }),
            new TableColumn({
                name: 'sound',
                type: 'varchar',
                length: '255',
                isNullable: true,
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('sang_kien', 'thumb');
        await queryRunner.dropColumn('sang_kien', 'sound');
    }

}
