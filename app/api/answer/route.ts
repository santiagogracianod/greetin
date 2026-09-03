import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { db } from '@/lib/db/client'
import { responses } from '@/lib/db/schema'

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'invalid body' }, { status: 400 })
  }

  const answer = (body as { answer?: unknown })?.answer
  if (answer !== 'yes' && answer !== 'no') {
    return NextResponse.json({ error: 'invalid answer' }, { status: 400 })
  }

  await db.insert(responses).values({ answer })

  const to = process.env.NOTIFY_EMAIL
  if (to && process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const when = new Date().toLocaleString('es', { dateStyle: 'long', timeStyle: 'short' })
    try {
      await resend.emails.send({
        from: 'Nuestra Historia <onboarding@resend.dev>',
        to,
        subject: answer === 'yes' ? 'Respondió que sí' : 'Respondió que no',
        html:
          answer === 'yes'
            ? `<p>Respondió <strong>"Sí, me gustaría"</strong>.</p><p>${when}</p>`
            : `<p>Respondió <strong>"Prefiero que no"</strong>.</p><p>${when}</p>`,
      })
    } catch (err) {
      // The answer is already saved — don't fail the request just because the email didn't go out.
      console.error('Failed to send notification email', err)
    }
  }

  return NextResponse.json({ ok: true })
}
