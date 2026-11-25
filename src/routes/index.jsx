import { createFileRoute, Link } from '@tanstack/react-router'
import { WorkshopCard } from '../components/WorkshopCard'
import { Prisblock } from '../components/Prisblock'

export const Route = createFileRoute('/')({
  component: Start,
})

function Start() {
  return (
    <>
      {/* Startbild över hela första skärmen. Etikett, rubrik och ingress syns direkt på bilden. */}
      <section className="hero">
        <img
          className="hero-bild"
          src="/img/kamera.jpg"
          alt="Person som håller en systemkamera framför ansiktet med objektivet riktat mot betraktaren"
          width="1400" height="932"
        />
        <div className="hero-text">
          <p className="hero-etikett">Fotoworkshop i Stockholm</p>
          <h1 className="hero-rubrik">Ta kontroll över din kamera</h1>
          <p className="hero-ingress">På ljusrums workshop för nybörjare övar du på bländare, slutartid och ISO i små grupper.</p>
        </div>
      </section>

      {/* Datum, plats och pris i en kolumn till vänster */}
      <main className="sida start">
        <WorkshopCard />
        <Prisblock />
        <Link className="lank" to="/information">Läs mer om workshopen</Link>
      </main>
    </>
  )
}
