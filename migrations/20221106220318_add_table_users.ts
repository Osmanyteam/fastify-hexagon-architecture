import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary().notNullable();
    table.string('username').unique().notNullable();
    table.string('email').unique().notNullable();
    table.string('password').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('users');
}
