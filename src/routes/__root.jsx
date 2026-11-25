import { createRootRoute, HeadContent, Link, Outlet, ScrollRestoration } from '@tanstack/react-router'

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
  return (
    <>
      <HeadContent />
      <ScrollRestoration />
      <Outlet />
    </>
  )
}
