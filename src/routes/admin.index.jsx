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
      <div className="a-rubrik">
        <p className="a-etikett">Ta kontroll över din kamera</p>
        <h1 className="a-h1">Bokningar</h1>
        <p className="a-txt">Lördagar · {TID} · Max {MAX_PLATSER} deltagare per tillfälle</p>
      </div>

      <section className="a-rubrik" aria-labelledby="datum-rubrik">
        <h2 className="a-h2" id="datum-rubrik">Välj datum</h2>
        <div className="dagar" style={{ marginTop: 10 }}>
          {DATUM.map((d) => {
            const n = bokadeplatser(d, bokningar)
            return (
              <button key={d} type="button" className="dag" aria-pressed={d === datum}
                onClick={() => navigate({ search: { datum: d }, replace: true })}>
                <span className="dag-datum">{d}</span>
                <span className="dag-antal">{n} av {MAX_PLATSER} platser</span>
              </button>
            )
          })}
        </div>
      </section>

      <section className="a-rubrik" aria-labelledby="lista-rubrik">
        <h2 className="a-h2" id="lista-rubrik">Lördag {datum}</h2>

        <div className="nyckeltal" style={{ marginTop: 10 }}>
          <div>
            <p className="a-etikett">Bokade</p>
            <p className="nt-varde">{bokade}</p>
          </div>
          <div>
            <p className="a-etikett">Lediga</p>
            <p className="nt-varde">{MAX_PLATSER - bokade}</p>
          </div>
        </div>

        <div className="tabell-ram" style={{ marginTop: 16 }}>
          <table className="tabell">
            <thead>
              <tr>
                <th className="id">Bokning</th>
                <th>Deltagare</th>
                <th className="platser">Platser</th>
                <th className="pil"><span className="visually-hidden">Visa</span></th>
              </tr>
            </thead>
            <tbody>
              {lista.length ? lista.map((b) => (
                <tr key={b.id}>
                  <td className="id">{b.id}</td>
                  <td>
                    <div className="namn">{b.namn}</div>
                    <div className="epost">{b.epost}</div>
                  </td>
                  <td className="platser">{b.platser}</td>
                  <td className="pil">
                    <Link className="a-lank" to="/admin/$bokningId" params={{ bokningId: b.id }}
                      aria-label={`Visa bokning ${b.id}, ${b.namn}`}>→</Link>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={4} className="tom">Inga bokningar ännu för {datum}.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </AdminLayout>
  )
}
