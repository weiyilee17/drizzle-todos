import { serial, mysqlTableCreator, boolean, varchar, timestamp } from 'drizzle-orm/mysql-core';
// import { sql } from 'drizzle-orm'

const mysqlTable = mysqlTableCreator((name) => `web_dev_cody_${name}`);

export const todos = mysqlTable('todos', {
  id: serial('id').primaryKey(),
  // I think default(false) doesn't work should be considered a bug, but I don't see others posting about it on the net
  completed: boolean('completed').notNull().default(!!0),
  content: varchar('content', { length: 255 }).notNull(),
  // If this causes problem, remove the commented part of code
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  // createdAt: timestamp('createdAt').default(sql`CURRENT_TIMESTAMP`),
});

export type TTodo = typeof todos.$inferSelect;
