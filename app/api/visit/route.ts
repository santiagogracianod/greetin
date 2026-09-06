import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST() {
  const to = process.env.NOTIFY_EMAIL
  if (to && process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const when = new Date().toLocaleString('es', { dateStyle: 'long', timeStyle: 'short' })
    try {
      await resend.emails.send({
        from: 'Nuestra Historia <onboarding@resend.dev>',
        to,
        subject: 'Alguien entró a la página',
        html: `<p>Alguien abrió el sitio.</p><p>${when}</p>`,
      })
    } catch (err) {
      // Not critical — a missed visit notification shouldn't break anything for the visitor.
      console.error('Failed to send visit notification email', err)
    }
  }
  return NextResponse.json({ ok: true })
}
