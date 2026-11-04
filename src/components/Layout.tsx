import { CheckCircle2 } from 'lucide-react'
import { useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { paymentMethods, site } from '../config/site'
import { useCart } from '../context/CartContext'
import { asset } from '../lib/format'
import { chatLink } from '../lib/whatsapp'
import { CartDrawer } from './CartDrawer'
import { Header } from './Header'
import { InstagramIcon, WhatsAppIcon } from './icons'

const YEAR = new Date().getFullYear()

function ScrollToTop() {
  const { pathname, search } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname, search])
  return null
}

function Toast() {
  const { toast, open } = useCart()
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-24 z-50 flex justify-center px-4 sm:bottom-8" aria-live="polite">
      {toast && (
        <div className="animate-slide-up pointer-events-auto flex max-w-md items-center gap-3 rounded-full bg-ink py-2 pr-2 pl-4 text-sm text-white shadow-soft">
          <CheckCircle2 className="size-5 shrink-0 text-sage" />
          <span className="line-clamp-1">{toast}</span>
          <button type="button" onClick={open} className="shrink-0 rounded-full bg-white/15 px-3 py-1.5 font-bold hover:bg-white/25">
            Ver carrito
          </button>
        </div>
      )}
    </div>
  )
}

function WhatsAppFloat() {
  const { pathname } = useLocation()
  if (pathname === '/checkout') return null
  return (
    <a
      href={chatLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 flex items-center gap-2 rounded-full bg-whatsapp p-3.5 text-white shadow-soft transition hover:bg-whatsapp-700 sm:right-6 sm:bottom-6"
      aria-label="Escríbenos por WhatsApp"
    >
      <WhatsAppIcon className="size-7" />
      <span className="hidden pr-1 text-sm font-bold lg:inline">¿Te ayudamos?</span>
    </a>
  )
}

function Footer() {
  return (
    <footer className="mt-20 bg-peach-100/70">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <img src={asset('logo-transparente.png')} alt={site.name} className="w-28" loading="lazy" />
          <p className="mt-3 font-script text-2xl text-rose-600">{site.tagline}</p>
          <p className="mt-1 text-sm text-ink-soft">Velas y jabones artesanales hechos con amor en {site.city}.</p>
        </div>
        <div>
          <h3 className="font-extrabold">Tienda</h3>
          <ul className="mt-3 space-y-2 text-sm text-ink-soft">
            <li><Link className="hover:text-rose-600" to="/catalogo?categoria=velas">Velas</Link></li>
            <li><Link className="hover:text-rose-600" to="/catalogo?categoria=jabones">Jabones</Link></li>
            <li><Link className="hover:text-rose-600" to="/catalogo?categoria=kits">Kits de regalo</Link></li>
            <li><Link className="hover:text-rose-600" to="/nosotros">Nosotros</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-extrabold">Métodos de pago</h3>
          <ul className="mt-3 space-y-2 text-sm text-ink-soft">
            {paymentMethods.map((m) => (
              <li key={m.id}>{m.name}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-extrabold">Contacto</h3>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            <a href={chatLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-ink-soft hover:text-whatsapp-700">
              <WhatsAppIcon className="size-4" /> WhatsApp
            </a>
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-ink-soft hover:text-rose-600">
              <InstagramIcon className="size-4" /> Instagram
            </a>
            <a href={`mailto:${site.email}`} className="text-ink-soft hover:text-rose-600">{site.email}</a>
          </div>
        </div>
      </div>
      <div className="border-t border-ink/10">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>© {YEAR} {site.name}. Hecho a mano con 💛</p>
          <Link to="/creditos" className="hover:text-rose-600">Créditos de imágenes</Link>
        </div>
      </div>
    </footer>
  )
}

export function Layout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2">
        Saltar al contenido
      </a>
      <ScrollToTop />
      <Header />
      <main id="contenido" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <WhatsAppFloat />
      <Toast />
    </div>
  )
}
