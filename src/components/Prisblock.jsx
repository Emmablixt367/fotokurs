import { Link } from '@tanstack/react-router'

export function Prisblock({ knapp = true }) {
  return (
    <div className="stack16 prisblock">
      <div className="stack8">
        <p className="pris">1 200 kr</p>
        <p className="brod">Betalning sker på plats</p>
      </div>
      {knapp && <Link className="knapp" to="/bokning">Boka din workshop nu</Link>}
    </div>
  )
}
