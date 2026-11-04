import { Menu, ShoppingBag, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { site } from '../config/site'
import { useCart } from '../context/CartContext'
import { asset } from '../lib/format'

const nav = [
  { to: '/', label: 'Inicio' },
  { to: '/catalogo', label: 'Catálogo' },
  { to: '/catalogo?categoria=velas', label: 'Velas' },
  { to: '/catalogo?categoria=jabones', label: 'Jabones' },
  { to: '/nosotros', label: 'Nosotros' },
]

export function Header() {
  const { count, open, bump } = useCart()
  const [menuOpenAt, setMenuOpenAt] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  // El menú se cierra solo al navegar: queda abierto únicamente en la ruta donde se abrió
  const menuOpen = menuOpenAt === location.key
  const setMenuOpen = (open: boolean) => setMenuOpenAt(open ? location.key : null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  const isActive = (to: string) => {
    const [path, query] = to.split('?')
    if (query) return location.pathname === path && location.search === `?${query}`
    if (path === '/catalogo') return location.pathname === path && !location.search
    return location.pathname === path
  }

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled ? 'bg-cream/90 shadow-[0_1px_0_rgb(74_53_57/0.08)] backdrop-blur-md' : 'bg-cream'
        }`}
      >
        <div className="container-page flex h-16 items-center justify-between gap-4 md:h-20">
          <Link to="/" className="flex items-center gap-2" aria-label={`${site.name}, ir al inicio`}>
            <img src={asset('logo-transparente.png')} alt="" className="h-11 w-auto md:h-14" width={60} height={56} />
            <span className="font-script text-2xl leading-none font-bold text-rose-600 md:text-3xl">{site.name}</span>
          </Link>

          <nav aria-label="Principal" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                      isActive(item.to) ? 'bg-peach-100 text-rose-600' : 'text-ink-soft hover:bg-white hover:text-ink'
                    }`}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={open}
              className="relative grid size-11 place-items-center rounded-full bg-white text-ink shadow-card transition hover:bg-rose-100"
              aria-label={`Abrir carrito, ${count} ${count === 1 ? 'producto' : 'productos'}`}
            >
              <ShoppingBag className="size-5" />
              {count > 0 && (
                <span
                  key={bump}
                  className="animate-pop absolute -top-1 -right-1 grid min-w-5 place-items-center rounded-full bg-rose-600 px-1 text-[11px] leading-5 font-extrabold text-white"
                >
                  {count}
                </span>
              )}
            </button>
            <button
              type="button"
              className="grid size-11 place-items-center rounded-full text-ink md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fuera del <header>: su backdrop-blur crearía un contenedor para los elementos fixed */}
      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Menú móvil"
          className="animate-slide-up fixed inset-x-0 top-16 bottom-0 z-30 overflow-y-auto overscroll-contain bg-cream px-4 pt-4 pb-10 md:hidden"
        >
          <ul className="flex flex-col gap-2">
            {nav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={`flex min-h-14 items-center rounded-2xl px-5 text-lg font-bold ${
                    isActive(item.to) ? 'bg-peach-100 text-rose-600' : 'bg-white text-ink'
                  }`}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-center font-script text-2xl text-rose-600">{site.tagline}</p>
        </nav>
      )}
    </>
  )
}
