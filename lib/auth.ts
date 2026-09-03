import { createHash, timingSafeEqual } from 'node:crypto'
import { cookies } from 'next/headers'

const COOKIE_NAME = 'admin_session'

function expectedToken() {
  const secret = process.env.ADMIN_PASSWORD ?? ''
  return createHash('sha256').update(`${secret}:admin-session`).digest('hex')
}

export function checkPassword(password: string) {
  return password === process.env.ADMIN_PASSWORD
}

export async function createSession() {
  const store = await cookies()
  store.set(COOKIE_NAME, expectedToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  })
}

export async function destroySession() {
  const store = await cookies()
  store.delete(COOKIE_NAME)
}

export async function isAuthenticated() {
  const store = await cookies()
  const cookie = store.get(COOKIE_NAME)?.value
  if (!cookie) return false
  const expected = expectedToken()
  const a = Buffer.from(cookie)
  const b = Buffer.from(expected)
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}
