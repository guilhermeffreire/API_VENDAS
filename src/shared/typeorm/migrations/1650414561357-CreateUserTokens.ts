import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserTokens1650414561357 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users_token',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'token',
                        type: 'uuid',
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'user_id',
                        type: 'uuid',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
                foreignKeys: [
                    {
                        name: 'TokenUser', //Nome da foreign key
                        referencedTableName: 'users', //Nome da tabela que ira buscar a chave
                        referencedColumnNames: ['id'], //Nome da coluna que será chave
                        columnNames: ['user_id'], //Nome da coluna da tabela atual,
                        onDelete: 'CASCADE', //Efeito cascada, se apagou o usuário também apaga o registro do user_token
                        onUpdate: 'CASCADE', //Efeito cascada, se alterou o usuário também apaga o registro do user_token
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users_token');
    }
}
