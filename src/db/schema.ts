import { serial, mysqlTableCreator, boolean, varchar, timestamp } from 'drizzle-orm/mysql-core';
// import { sql } from 'drizzle-orm'

const mysqlTable = mysqlTableCreator((name) => `web_dev_cody_${name}`);

export const todos = mysqlTable('todos', {
  id: serial('id').primaryKey(),
  completed: boolean('completed').default(false),
  content: varchar('content', { length: 255 }).notNull(),
  // If this causes problem, remove the commented part of code
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  // createdAt: timestamp('createdAt').default(sql`CURRENT_TIMESTAMP`),
});

export type TTodo = typeof todos.$inferSelect;
