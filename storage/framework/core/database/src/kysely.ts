import type { ColumnType, Generated } from 'kysely'
import { Kysely, MysqlDialect } from 'kysely'
import { BunWorkerDialect } from 'kysely-bun-worker'
import { createPool } from 'mysql2'

// TODO: we need an action that auto-generates these table interfaces
export interface UsersTable {
  // Columns that are generated by the database should be marked
  // using the `Generated` type. This way they are automatically
  // made optional in inserts and updates.
  id: Generated<number>

  name: string
  email: string

  // If the column is nullable in the database, make its type nullable.
  // Don't use optional properties. Optionality is always determined
  // automatically by Kysely.
  password: string

  // You can specify a different type for each operation (select, insert and
  // update) using the `ColumnType<SelectType, InsertType, UpdateType>`
  // wrapper. Here we define a column `created_at` that is selected as
  // a `Date`, can optionally be provided as a `string` in inserts and
  // can never be updated:
  created_at: ColumnType<Date, string | undefined, never>
  deleted_at: ColumnType<Date, string | undefined, never>
}

export interface Database {
  users: UsersTable
}

const driver = config.database.default ?? 'sqlite'

export function getDialect() {
  if (driver === 'sqlite') {
    return new BunWorkerDialect({
      url: 'stacks.sqlite',
    })
  }

  if (driver === 'mysql') {
    return new MysqlDialect({
      pool: createPool({
        database: 'stacks',
        host: '127.0.0.1',
        user: 'root',
        password: '',
        port: 3306,
      }),
    })
  }

  throw new Error(`Unsupported driver: ${driver}`)
}

export const db = new Kysely<Database>({
  dialect: getDialect(),
})
