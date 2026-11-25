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

function Bokningsdetaljer() {
  const b = Route.useLoaderData()
  return (
    <AdminLayout>
      <div className="stack8">
        <h1 className="a-h1">Bokningsdetaljer</h1>
        <p className="a-txt">Detaljerad information om vald bokning</p>
      </div>
      <div className="stack8">
        <h2 className="a-h2">Bokning {b.id}</h2>
        <p className="a-txt">Tryck på mejladressen för att skicka ett mejl direkt till deltagaren.</p>
      </div>
      <div className="kort">
        <div>
          <div className="stack8"><p className="k-label">Personuppgifter</p><p className="k-stor">{b.namn}</p></div>
          <div className="stack8"><p className="k-label">E-post</p><p className="k-varde"><a href={`mailto:${b.epost}`}>{b.epost}</a></p></div>
        </div>
        <div>
          <div className="stack8"><p className="k-label">Bokningsinformation</p><p className="k-stor">{b.datum}</p></div>
          <div className="stack16">
            <div className="stack8"><p className="k-label">Tid</p><p className="k-varde">{TID}</p></div>
            <div className="stack8"><p className="k-label">Bokad plats</p><p className="k-varde">{b.platser} {b.platser === 1 ? 'plats' : 'platser'}</p></div>
            <div className="stack8"><p className="k-label">Bokning</p><p className="k-varde">{b.id}</p></div>
          </div>
        </div>
      </div>
      <Link className="a-lank" to="/admin" search={{ datum: b.datum }}>Tillbaka till bokningar</Link>
    </AdminLayout>
  )
}
