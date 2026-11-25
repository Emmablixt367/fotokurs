import { Link } from '@tanstack/react-router'

// Diskret topplist för de publika sidorna: små länkar till vänster och höger,
// logotypen i glesa versaler i mitten. Med overlay ligger den ovanpå startbilden med vit text.
export function Topplist({ overlay = false }) {
  return (
    <header className={overlay ? 'topplist topplist-overlay' : 'topplist'}>
      <nav className="topplist-vanster" aria-label="Huvudmeny">
        <Link to="/information" className="topplist-lank">Workshopen</Link>
      </nav>
      <Link to="/" className="topplist-logo" aria-label="Ljusrum, till startsidan">Ljusrum</Link>
      <div className="topplist-hoger">
        <Link to="/bokning" className="topplist-lank">Boka</Link>
      </div>
    </header>
  )
}
