import knexConfig from './knexfile'

import 'dotenv/config'
import { knex } from 'knex'
import yargs from 'yargs'

//TODO: Add command to create a new migration
// Still not running
yargs.command({
  command: 'make:migration',
  describe: 'Create file migrations',
  builder: {
    name: {
      describe: 'Name of migration',
      demandOption: true,
      type: 'string',
    },
    env: {
      describe: 'Set environment database',
      demandOption: false,
      type: 'string',
    },
  },

  //TODO: Argv
  handler: async (argv: any) => {
    await knex({
      ...knexConfig[argv.env || 'local'],
      migrations: {
        directory: './migrations/system',
        extension: 'ts',
      },
    }).migrate.make(argv.name)
  },
})

yargs.command({
  command: 'make:migration:tenant',
  describe: 'Create file migration for tenant',
  builder: {
    name: {
      describe: 'Name of migration',
      demandOption: true,
      type: 'string',
    },
    env: {
      describe: 'Set environment database',
      demandOption: false,
      type: 'string',
    },
  },

  //TODO: Argv
  handler: async (argv: any) => {
    await knex({
      ...knexConfig[argv.env || 'local'],
      migrations: {
        directory: './migrations/tenant',
        extension: 'ts',
      },
    }).migrate.make(argv.name)
  },
})

yargs.parse()
