export default { title: 'Stilguide' }

const colors = {
  Sidbakgrund: '--color-page',
  Text: '--color-text',
  Sektion: '--color-section',
  'Grå 200': '--color-grey-200',
  Knapp: '--color-button',
  'Länk / accent': '--color-accent',
  Inmatningsfält: '--color-input',
}

export const Farger = {
  name: 'Färger',
  render: () => (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {Object.entries(colors).map(([label, token]) => (
        <li key={token} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <span aria-hidden="true" style={{
            width: '2rem', height: '2rem', background: 'var(' + token + ')',
            border: '1px solid var(--color-text)', borderRadius: '50%',
          }} />
          <span>{label} <code>{token}</code></span>
        </li>
      ))}
    </ul>
  ),
}

export const Textroller = {
  render: () => (
    <div className="stack16">
      <h1 className="sidtitel">Sidtitel – Playfair Display 700</h1>
      <h2 className="sektionsrubrik">Sektionsrubrik – Playfair Display 600</h2>
      <h3 className="liten">Liten rubrik – Playfair Display 600</h3>
      <p className="brod">Brödtext – Source Sans 3. Berättar vad deltagaren behöver veta om workshopen.</p>
      <p className="pris">1 200 kr</p>
      <a className="lank" href="#">Länk</a>
      <button className="knapp" type="button" style={{ maxWidth: 360 }}>Knapp</button>
    </div>
  ),
}
