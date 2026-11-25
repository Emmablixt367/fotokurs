import { useRef, useState } from 'react'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { DATUM, MAX_PLATSER, TID, bokadeplatser, hamtaUtkast, sparaUtkast } from '../bokningar'

export const Route = createFileRoute('/bokning')({
  component: Bokning,
  head: () => ({ meta: [{ title: 'Din bokning · Ljusrum' }] }),
})

const EPOST = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function Bokning() {
  const navigate = useNavigate()
  const [utkast, setUtkast] = useState(hamtaUtkast)
  const [fel, setFel] = useState({})
  const lista = useRef(null)
  const namnRef = useRef(null)
  const epostRef = useRef(null)

  const lediga = DATUM.filter((d) => bokadeplatser(d) < MAX_PLATSER)

  function valj(datum) {
    setUtkast((u) => ({ ...u, datum }))
    requestAnimationFrame(() => lista.current?.querySelector('[aria-checked="true"]')?.focus())
  }

  function piltangent(e) {
    if (!['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(e.key)) return
    e.preventDefault()
    const steg = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : -1
    const i = lediga.indexOf(utkast.datum)
    valj(lediga[(i + steg + lediga.length) % lediga.length])
  }

  function skicka(e) {
    e.preventDefault()
    const namn = utkast.namn.trim()
    const epost = utkast.epost.trim()
    const nyaFel = {
      namn: namn ? '' : 'Fyll i ditt namn.',
      epost: EPOST.test(epost) ? '' : 'Fyll i en giltig e-postadress.',
    }
    setFel(nyaFel)
    if (nyaFel.namn) return namnRef.current.focus()
    if (nyaFel.epost) return epostRef.current.focus()
    sparaUtkast({ ...utkast, namn, epost })
    navigate({ to: '/granska' })
  }

  const andra = (falt) => (e) => setUtkast((u) => ({ ...u, [falt]: e.target.value }))

  return (
    <main>
      <form className="sida smal" onSubmit={skicka} noValidate>
        <h1 className="sidtitel">Din bokning</h1>

        <fieldset className="stack8">
          <legend className="sektionsrubrik">Välj datum</legend>
          <p className="brod">{TID}</p>
          <div className="datumlista" role="radiogroup" aria-label="Välj datum" ref={lista} onKeyDown={piltangent}>
            {DATUM.map((d) => {
              const fullt = !lediga.includes(d)
              const vald = utkast.datum === d
              return (
                <button
                  key={d} type="button" className="datum" role="radio"
                  aria-checked={vald} disabled={fullt} tabIndex={vald ? 0 : -1}
                  onClick={() => valj(d)}
                >
                  <span className="radio" />
                  <span className="txt">{d}{fullt && ' (fullt)'}</span>
                </button>
              )
            })}
          </div>
        </fieldset>

        <section className="stack16">
          <div className="stack8">
            <h2 className="sektionsrubrik">Dina uppgifter</h2>
            <p className="brod">Valt tillfälle · {utkast.datum}, {TID}</p>
          </div>
          <div className="faltgrupp">
            <div className="falt">
              <label className="brod" htmlFor="namn">Namn</label>
              <input id="namn" ref={namnRef} autoComplete="name" required value={utkast.namn}
                onChange={andra('namn')} aria-invalid={!!fel.namn} aria-describedby="namn-fel" />
              <p className="fel" id="namn-fel" role="alert">{fel.namn}</p>
            </div>
            <div className="falt">
              <label className="brod" htmlFor="epost">E-post</label>
              <input id="epost" ref={epostRef} type="email" autoComplete="email" required value={utkast.epost}
                onChange={andra('epost')} aria-invalid={!!fel.epost} aria-describedby="epost-fel" />
              <p className="fel" id="epost-fel" role="alert">{fel.epost}</p>
            </div>
          </div>
        </section>

        <button className="knapp" type="submit">Granska bokning</button>
        <Link className="lank" to="/information">Tillbaka till läs mer om workshopen</Link>
      </form>
    </main>
  )
}
