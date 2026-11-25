import { createRootRoute, HeadContent, Link, Outlet, ScrollRestoration, useRouterState } from '@tanstack/react-router'
import { Topplist } from '../components/Topplist'

export const Route = createRootRoute({
  component: Layout,
  head: () => ({ meta: [{ title: 'Ljusrum Fotoworkshop' }] }),
  notFoundComponent: () => (
    <div className="sida">
      <h1 className="sidtitel">Sidan finns inte</h1>
      <Link className="lank" to="/">Till startsida</Link>
    </div>
  ),
})

function Layout() {
  const sokvag = useRouterState({ select: (s) => s.location.pathname })
  const admin = sokvag.startsWith('/admin')
  return (
    <>
      <HeadContent />
      <ScrollRestoration />
      {!admin && <Topplist overlay={sokvag === '/'} />}
      <Outlet />
    </>
  )
}
