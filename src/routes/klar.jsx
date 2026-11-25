import { createFileRoute, Link } from '@tanstack/react-router'
import { DATUM, TID } from '../bokningar'

export const Route = createFileRoute('/klar')({
  validateSearch: (s) => ({ datum: DATUM.includes(s.datum) ? s.datum : DATUM[0] }),
  component: Klar,
  head: () => ({ meta: [{ title: 'Din plats är bokad · Ljusrum' }] }),
})

function Klar() {
  const { datum } = Route.useSearch()
  return (
    <main className="sida smal">
      <div className="stack8">
        <h1 className="sidtitel">Din plats är nu bokad!</h1>
        <p className="brod">Tack för att du anmält dig till workshopen hos ljusrum. Vi ser fram emot att träffa dig och hjälpa dig utvecklas som fotograf.</p>
      </div>
      <div className="stack16">
        <section className="sektion stack8">
          <h2 className="sektionsrubrik">Din bokning</h2>
          <p className="brod">1 200 kr, Betalning på plats<br />Lördag {datum}, {TID}<br />Södermalm, Stockholm<br />Egen systemkamera</p>
        </section>
        <section className="sektion stack8">
          <h2 className="sektionsrubrik">Vad händer nu?</h2>
          <p className="brod">Du kommer nu att få en bekräftelse på mejl om all den information du behöver.</p>
        </section>
        <section className="sektion stack8">
          <h2 className="sektionsrubrik">Har du frågor?</h2>
          <p className="brod" style={{ fontSize: 18 }}>
            Mail: <a href="mailto:Ljusrum@hotmail.com" style={{ color: 'inherit' }}>Ljusrum@hotmail.com</a><br />
            Telefon: 076 - 261 72 43
          </p>
        </section>
      </div>
      <Link className="lank" to="/">Tillbaka till startsida</Link>
    </main>
  )
}
