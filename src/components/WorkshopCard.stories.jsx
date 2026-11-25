import { WorkshopCard } from './WorkshopCard'

export default {
  title: 'Komponenter/Workshopkort',
  component: WorkshopCard,
  args: {
    date: '14, 21 & 28 november 2026',
    time: '10.00-15.00',
    place: 'Ljusrums fotostudio',
    area: 'Södermalm i Stockholm',
  },
  argTypes: {
    date: { control: 'text', name: 'Datum' },
    time: { control: 'text', name: 'Tid' },
    place: { control: 'text', name: 'Plats' },
    area: { control: 'text', name: 'Område' },
  },
}

export const Standard = {}
export const LangText = {
  name: 'Lång text i smal vy',
  args: { place: 'Ljusrums fotostudio och ateljé för analog och digital fotografi' },
  decorators: [(Story) => <div style={{ maxWidth: '20rem' }}><Story /></div>],
}
