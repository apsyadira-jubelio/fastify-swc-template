import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.raw(`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    );
  `)
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.raw(`
    DROP TABLE IF EXISTS users; 
  `)
}
