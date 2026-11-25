// Enkel bokningsdata som sparas i webbläsaren (ingen server ännu).
export const MAX_PLATSER = 10
export const DATUM = ['14 november', '21 november', '28 november']
export const TID = '10.00-15.00'

const NYCKEL = 'fotokurs-bokningar'
const UTKAST = 'fotokurs-utkast'

// Exempelbokningar från designen
const EXEMPEL = [
  { id: 'L101', namn: 'Alma Lind', epost: 'Alma.Lind@hotmail.com', datum: '14 november', platser: 1 },
  { id: 'L102', namn: 'Robin Berg', epost: 'Robin.Berg@hotmail.com', datum: '14 november', platser: 1 },
  { id: 'L103', namn: 'Sam Ek', epost: 'Sam.Ek@hotmail.com', datum: '14 november', platser: 1 },
]

function las(storage, nyckel) {
  try { return JSON.parse(storage.getItem(nyckel)) } catch { return null }
}
function skriv(storage, nyckel, varde) {
  try { storage.setItem(nyckel, JSON.stringify(varde)) } catch { /* privat läge e.d. */ }
}

export function hamtaBokningar() {
  const sparade = las(localStorage, NYCKEL)
  return Array.isArray(sparade) && sparade.length ? sparade : EXEMPEL
}

export function bokadeplatser(datum, bokningar = hamtaBokningar()) {
  return bokningar.filter((b) => b.datum === datum).reduce((n, b) => n + b.platser, 0)
}

export function hittaBokning(id) {
  return hamtaBokningar().find((b) => b.id === id)
}

// Utkastet följer med från "Din bokning" till "Granska bokning".
export function hamtaUtkast() {
  return las(sessionStorage, UTKAST) ?? { datum: DATUM[0], namn: '', epost: '' }
}
export function sparaUtkast(utkast) {
  skriv(sessionStorage, UTKAST, utkast)
}

export function bekraftaBokning() {
  const utkast = hamtaUtkast()
  if (!utkast.namn) return null
  const bokningar = hamtaBokningar()
  const nr = Math.max(100, ...bokningar.map((b) => Number(b.id.slice(1)))) + 1
  const ny = { id: 'L' + nr, namn: utkast.namn, epost: utkast.epost, datum: utkast.datum, platser: 1 }
  skriv(localStorage, NYCKEL, [...bokningar, ny])
  sessionStorage.removeItem(UTKAST)
  return ny
}
