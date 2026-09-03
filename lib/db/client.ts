import { attachDatabasePool } from '@vercel/functions'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

// Pooled connection: right choice for request-scoped serverless queries.
const pool = new Pool({ connectionString: process.env.DATABASE_URL })

// Lets Fluid Compute close the pool cleanly when the function instance is reclaimed.
attachDatabasePool(pool)

export const db = drizzle(pool, { schema })
