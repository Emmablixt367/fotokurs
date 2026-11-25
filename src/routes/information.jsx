import { createFileRoute, Link } from '@tanstack/react-router'
import { Prisblock } from '../components/Prisblock'

export const Route = createFileRoute('/information')({
  component: Information,
  head: () => ({ meta: [{ title: 'Information om workshopen · Ljusrum' }] }),
})

function Information() {
  return (
    <main className="sida info">
      <h1 className="sidtitel">Information om workshopen</h1>
      <img
        className="bild bild-info"
        src="/img/fotograf.jpg"
        alt="Fotograf i mörker som håller en kamera med långt objektiv"
        width="1100" height="1467"
      />
      <section className="sektion stack16">
        <div className="stack8">
          <h2 className="sektionsrubrik">Lär dig ta kontroll över din kamera!</h2>
          <p className="brod">Lämna autoläge bakom dig och lär dig grunderna i fotografi.</p>
        </div>
        <div className="stack8">
          <h3 className="liten">Det här får du lära dig</h3>
          <ul className="lista brod"><li>Bländare</li><li>Slutartid</li><li>ISO</li><li>Kompositioner</li></ul>
        </div>
        <div className="stack8">
          <h3 className="liten">Varför välja workshopen?</h3>
          <p className="brod">Små grupper · Max 10 deltagare<br />Erfarna handledare · personlig handledning<br />Praktiskt lärande · övningar inne och ute</p>
        </div>
        <div className="stack8">
          <h3 className="liten">Praktisk information</h3>
          <ul className="lista brod"><li>Inga förkunskaper krävs</li><li>Ta med egen systemkamera</li><li>Mobilkamera räcker inte</li></ul>
        </div>
        <div className="stack8">
          <h3 className="liten">När och var</h3>
          <p className="brod">14, 21 &amp; 28 november · 10.00-15.00<br />Ljusrums fotostudio · Stockholm</p>
        </div>
      </section>
      <Prisblock />
      <Link className="lank" to="/">Till startsida</Link>
    </main>
  )
}
