import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { AdminLayout } from '../components/AdminLayout'
import { DATUM, MAX_PLATSER, TID, bokadeplatser, hamtaBokningar } from '../bokningar'

export const Route = createFileRoute('/admin/')({
  validateSearch: (s) => ({ datum: DATUM.includes(s.datum) ? s.datum : DATUM[0] }),
  component: Admin,
  head: () => ({ meta: [{ title: 'Bokningar · Ljusrum' }] }),
})

function Admin() {
  const { datum } = Route.useSearch()
  const navigate = useNavigate({ from: Route.fullPath })
  const bokningar = hamtaBokningar()
  const lista = bokningar.filter((b) => b.datum === datum)
  const bokade = bokadeplatser(datum, bokningar)

  return (
    <AdminLayout>
      <div className="stack8">
        <p className="a-kurs">Ta kontroll över din kamera</p>
        <h1 className="a-h1">Bokningar</h1>
      </div>

      <section className="stack16">
        <div className="stack8">
          <h2 className="a-h2">Datum</h2>
          <p className="a-txt">Lördag · {TID}. Välj datum för att se bokningar.</p>
        </div>
        <div className="dagar">
          {DATUM.map((d) => (
            <button key={d} type="button" className="dag" aria-pressed={d === datum}
              onClick={() => navigate({ search: { datum: d }, replace: true })}>
              {d}
            </button>
          ))}
        </div>
      </section>

      <section className="stack16">
        <div className="stack8">
          <h2 className="a-h2">Bokningar {datum}</h2>
          <p className="a-txt">Tryck visa bokning för att se fler detaljer.</p>
        </div>
        <table className="tabell">
          <thead>
            <tr><th>Bokning</th><th>Deltagare</th><th className="c3">Antal platser</th><th>Visa bokning</th></tr>
          </thead>
          <tbody>
            {lista.length ? lista.map((b) => (
              <tr key={b.id}>
                <td data-l="Bokning">{b.id}</td>
                <td data-l="Deltagare">{b.namn}</td>
                <td data-l="Antal platser" className="c3">{b.platser}</td>
                <td data-l="Visa bokning">
                  <Link className="a-lank" to="/admin/$bokningId" params={{ bokningId: b.id }}>Visa bokning</Link>
                </td>
              </tr>
            )) : (
              <tr><td colSpan={4} className="tom">Inga bokningar ännu för detta datum.</td></tr>
            )}
          </tbody>
        </table>
      </section>

      <p className="a-txt summa">{bokade} bokade · {MAX_PLATSER - bokade} lediga</p>
    </AdminLayout>
  )
}
