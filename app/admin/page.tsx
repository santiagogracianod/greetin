import { desc } from 'drizzle-orm'
import { db } from '@/lib/db/client'
import { responses } from '@/lib/db/schema'
import { isAuthenticated } from '@/lib/auth'
import AdminLogin from './AdminLogin'
import LogoutButton from './LogoutButton'
import './admin.css'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const authed = await isAuthenticated()
  if (!authed) return <AdminLogin />

  const rows = await db.select().from(responses).orderBy(desc(responses.createdAt))

  return (
    <div className="admin-shell">
      <header className="admin-topbar">
        <span>Nuestra Historia — Respuestas</span>
        <LogoutButton />
      </header>
      <div className="admin-body">
        <h1>Respuestas</h1>
        <p className="admin-count">
          {rows.length === 0 ? 'Todavía no hay respuestas.' : `${rows.length} respuesta${rows.length === 1 ? '' : 's'}`}
        </p>
        {rows.length === 0 ? (
          <div className="admin-empty">Cuando alguien responda la pregunta final, aparecerá aquí.</div>
        ) : (
          <div className="admin-list">
            {rows.map((r) => (
              <div className="admin-row" key={r.id}>
                <div className="admin-answer">
                  <span className={`admin-badge ${r.answer}`} />
                  {r.answer === 'yes' ? 'Sí, me gustaría' : 'Prefiero que no'}
                </div>
                <span className="admin-date">
                  {new Date(r.createdAt).toLocaleString('es', { dateStyle: 'long', timeStyle: 'short' })}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
