import { Link } from '@tanstack/react-router'

export function AdminLayout({ children }) {
  return (
    <div className="admin">
      <header className="topp">
        <Link className="logo" to="/">Ljusrum</Link>
        <span>Fotoworkshop</span>
      </header>
      <main className="akropp">{children}</main>
    </div>
  )
}
