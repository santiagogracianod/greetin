import { NextResponse } from 'next/server'
import { checkPassword, createSession } from '@/lib/auth'

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'invalid body' }, { status: 400 })
  }

  const password = (body as { password?: unknown })?.password
  if (typeof password !== 'string' || !checkPassword(password)) {
    return NextResponse.json({ error: 'wrong password' }, { status: 401 })
  }

  await createSession()
  return NextResponse.json({ ok: true })
}
