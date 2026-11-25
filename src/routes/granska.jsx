import { createFileRoute, Link, redirect, useNavigate } from '@tanstack/react-router'
import { TID, bekraftaBokning, hamtaUtkast } from '../bokningar'

export const Route = createFileRoute('/granska')({
  beforeLoad: () => {
    if (!hamtaUtkast().namn) throw redirect({ to: '/bokning' })
  },
  component: Granska,
  head: () => ({ meta: [{ title: 'Granska bokning · Ljusrum' }] }),
})

function Granska() {
  const navigate = useNavigate()
  const utkast = hamtaUtkast()

  function bekrafta() {
    const bokning = bekraftaBokning()
    if (!bokning) return navigate({ to: '/bokning' })
    navigate({ to: '/klar', search: { datum: bokning.datum } })
  }

  return (
    <main className="sida smal">
      <h1 className="sidtitel">Granska bokning</h1>
      <section className="sektion stack16">
        <h2 className="sektionsrubrik">Ta kontroll över din kamera</h2>
        <div className="stack8">
          <p className="liten">Lördag {utkast.datum}</p>
          <p className="brod">Kl. {TID}</p>
          <p className="brod">Ljusrums fotostudio på Södermalm i Stockholm</p>
        </div>
      </section>
      <section className="sektion stack16">
        <h2 className="sektionsrubrik">Dina uppgifter</h2>
        <div className="stack8">
          <p className="liten">{utkast.namn}</p>
          <p className="brod">{utkast.epost}</p>
        </div>
      </section>
      <div className="stack16">
        <div className="stack8">
          <p className="pris">1 200 kr</p>
          <p className="brod">Betalning sker på plats</p>
        </div>
        <button className="knapp" type="button" onClick={bekrafta}>Bekräfta bokning</button>
      </div>
      <Link className="lank" to="/bokning">Ändra bokning</Link>
    </main>
  )
}
