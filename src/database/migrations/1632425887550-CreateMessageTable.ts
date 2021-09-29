import {MigrationInterface, QueryRunner, Table, Timestamp} from "typeorm";

export class CreateMessageTable1632425887550 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

        await queryRunner.createTable(new Table({
            name: 'messages',
            columns: [{
                name: 'id',
                type: 'uuid',
                isPrimary: true,
                generationStrategy: 'uuid',
                default: 'uuid_generate_v4()',
            },
            {
               name: 'messageText',
               type: 'varchar',
            },
            {
                name: 'send_at',
                type: 'timestamp',
                default: 'now()'
            },
            {
                name: 'messenger',
                type: 'uuid',
            },
            {
                name: 'receiver',
                type: 'uuid'
            },
            {
                name: 'isViewed',
                type: 'boolean'
            }
        ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('messages');
        await queryRunner.query('DROP EXTENSION "uuid-ossp"');
    }

}
