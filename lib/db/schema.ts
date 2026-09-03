import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const responses = pgTable('responses', {
  id: serial('id').primaryKey(),
  answer: text('answer').notNull(), // 'yes' | 'no'
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})
