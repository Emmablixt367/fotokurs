import './WorkshopCard.css'

// Faktarutan "Datum och tid / Plats" från startsidan i Figma.
export function WorkshopCard({
  date = '14, 21 & 28 november 2026',
  time = '10.00-15.00',
  place = 'Ljusrums fotostudio',
  area = 'Södermalm i Stockholm',
}) {
  return (
    <section className="workshop-card sektion fakta" aria-label="Datum, tid och plats">
      <div className="stack8">
        <h2 className="liten">Datum och tid</h2>
        <p className="brod">{date}<br />{time}</p>
      </div>
      <div className="stack8">
        <h2 className="liten">Plats</h2>
        <p className="brod">{place}<br />{area}</p>
      </div>
    </section>
  )
}
