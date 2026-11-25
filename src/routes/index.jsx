import { createFileRoute, Link } from '@tanstack/react-router'
import { WorkshopCard } from '../components/WorkshopCard'
import { Prisblock } from '../components/Prisblock'

export const Route = createFileRoute('/')({
  component: Start,
})

function Start() {
  return (
    <main className="sida start">
      <header className="stack8">
        <p className="liten">Fotoworkshop i Stockholm</p>
        <h1 className="sidtitel">Ta kontroll över din kamera</h1>
        <p className="brod">På ljusrums workshop för nybörjare övar du på bländare, slutartid och ISO i små grupper.</p>
      </header>
      <img
        className="bild bild-hero"
        src="/img/kamera.jpg"
        alt="Person som håller en systemkamera framför ansiktet med objektivet riktat mot betraktaren"
        width="1400" height="932"
      />
      <WorkshopCard />
      <Prisblock />
      <Link className="lank" to="/information">Läs mer om workshopen</Link>
    </main>
  )
}
