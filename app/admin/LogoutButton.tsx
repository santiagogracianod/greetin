'use client'

import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()
  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.refresh()
  }
  return (
    <a href="#" onClick={(e) => { e.preventDefault(); logout() }}>
      Salir
    </a>
  )
}
