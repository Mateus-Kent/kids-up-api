import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsersTable1624901494885 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

        await queryRunner.createTable(new Table({
            name: 'parents',
            columns: [{
                name: 'id',
                type: 'uuid',
                isPrimary: true,
                generationStrategy: 'uuid',
                default: 'uuid_generate_v4()',
            },
            {
               name: 'username',
               type: 'varchar',
            },
            {
                name: 'email',
                type: 'varchar',
                isUnique: true,
            },
            {
                name: 'phone_number',
                type: 'varchar',
            },
            {
                name: 'password',
                type: 'varchar',
            },
            {
                name: 'profile_photo',
                type: 'varchar',
            },
        ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
        await queryRunner.query('DROP EXTENSION "uuid-ossp"');
    }

}
