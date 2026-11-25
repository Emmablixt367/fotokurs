import { Link } from '@tanstack/react-router'
import '../admin.css'

export function AdminLayout({ children }) {
  return (
    <div className="admin">
      <header className="topp">
        <div className="topp-inre">
          <div className="logo-grupp">
            <Link className="logo" to="/">Ljusrum</Link>
            <span className="admin-etikett">Admin</span>
          </div>
          <span className="topp-kurs">Fotoworkshop</span>
        </div>
      </header>
      <main className="akropp">{children}</main>
    </div>
  )
}
