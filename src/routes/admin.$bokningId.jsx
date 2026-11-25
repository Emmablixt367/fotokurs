import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { AdminLayout } from '../components/AdminLayout'
import { TID, hittaBokning } from '../bokningar'

export const Route = createFileRoute('/admin/$bokningId')({
  loader: ({ params }) => {
    const bokning = hittaBokning(params.bokningId)
    if (!bokning) throw notFound()
    return bokning
  },
  component: Bokningsdetaljer,
  head: ({ loaderData }) => ({ meta: [{ title: `Bokning ${loaderData?.id ?? ''} · Ljusrum` }] }),
})

const initialer = (namn) =>
  namn.split(/\s+/).filter(Boolean).slice(0, 2).map((d) => d[0].toUpperCase()).join('')

function Bokningsdetaljer() {
  const b = Route.useLoaderData()
  return (
    <AdminLayout>
      <Link className="a-lank" to="/admin" search={{ datum: b.datum }}>← Tillbaka till bokningar</Link>

      <div className="profil">
        <span className="initialer" aria-hidden="true">{initialer(b.namn)}</span>
        <div className="a-rubrik">
          <p className="a-etikett">Bokning {b.id}</p>
          <h1 className="profil-namn">{b.namn}</h1>
        </div>
      </div>

      <div className="detaljer">
        <section className="detaljkort" aria-labelledby="person">
          <h2 className="a-h2" id="person">Kontakt</h2>
          <dl>
            <div className="rad"><dt>E-post</dt><dd>{b.epost}</dd></div>
          </dl>
          <div className="knapprad">
            <a className="knapp" href={`mailto:${b.epost}`}>Skicka mejl</a>
          </div>
        </section>

        <section className="detaljkort" aria-labelledby="info">
          <h2 className="a-h2" id="info">Bokning</h2>
          <dl>
            <div className="rad"><dt>Workshop</dt><dd>Ta kontroll över din kamera</dd></div>
            <div className="rad"><dt>Datum</dt><dd>Lördag {b.datum}</dd></div>
            <div className="rad"><dt>Tid</dt><dd>{TID}</dd></div>
            <div className="rad"><dt>Platser</dt><dd>{b.platser} {b.platser === 1 ? 'plats' : 'platser'}</dd></div>
            <div className="rad"><dt>Bokningsnr</dt><dd>{b.id}</dd></div>
          </dl>
        </section>
      </div>
    </AdminLayout>
  )
}
