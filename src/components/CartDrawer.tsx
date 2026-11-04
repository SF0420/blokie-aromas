import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { site } from '../config/site'
import { useCart } from '../context/CartContext'
import { asset, formatCOP } from '../lib/format'

export function FreeShippingBar({ subtotal }: { subtotal: number }) {
  if (site.freeShippingFrom <= 0) return null
  const missing = site.freeShippingFrom - subtotal
  const pct = Math.min(100, (subtotal / site.freeShippingFrom) * 100)
  return (
    <div className="rounded-2xl bg-sage-100 p-3 text-sm">
      <p className="font-semibold text-sage-700">
        {missing > 0 ? (
          <>
            Te faltan <strong>{formatCOP(missing)}</strong> para el envío gratis 🚚
          </>
        ) : (
          <>¡Tu pedido tiene envío gratis! 🎉</>
        )}
      </p>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white" role="presentation">
        <div className="h-full rounded-full bg-sage transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

export function QuantityControl({
  value,
  onChange,
  label,
  size = 'sm',
}: {
  value: number
  onChange: (v: number) => void
  label: string
  size?: 'sm' | 'lg'
}) {
  const btn = size === 'lg' ? 'size-11' : 'size-9'
  return (
    <div className="inline-flex items-center rounded-full border-2 border-ink/10 bg-white" role="group" aria-label={`Cantidad de ${label}`}>
      <button type="button" className={`${btn} grid place-items-center rounded-full hover:bg-rose-100`} onClick={() => onChange(value - 1)} aria-label="Disminuir cantidad">
        <Minus className="size-4" />
      </button>
      <span className={`min-w-8 text-center font-bold ${size === 'lg' ? 'text-lg' : 'text-sm'}`} aria-live="polite">
        {value}
      </span>
      <button type="button" className={`${btn} grid place-items-center rounded-full hover:bg-rose-100`} onClick={() => onChange(value + 1)} aria-label="Aumentar cantidad">
        <Plus className="size-4" />
      </button>
    </div>
  )
}

export function CartDrawer() {
  const { isOpen, close, lines, subtotal, setQuantity, remove, count } = useCart()
  const navigate = useNavigate()
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const prev = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    panelRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      prev?.focus()
    }
  }, [isOpen, close])

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? '' : 'pointer-events-none'}`} aria-hidden={!isOpen}>
      <div
        className={`absolute inset-0 bg-ink/40 backdrop-blur-[2px] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={close}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        tabIndex={-1}
        inert={!isOpen}
        className={`absolute inset-y-0 right-0 flex w-full flex-col bg-cream shadow-2xl outline-none transition-transform duration-300 ease-out sm:max-w-md sm:rounded-l-[2rem] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
          <h2 id="cart-title" className="flex items-center gap-2 text-lg font-extrabold">
            <ShoppingBag className="size-5 text-rose-600" /> Tu carrito
            {count > 0 && <span className="rounded-full bg-peach-100 px-2 py-0.5 text-xs text-rose-600">{count}</span>}
          </h2>
          <button type="button" onClick={close} className="grid size-11 place-items-center rounded-full hover:bg-white" aria-label="Cerrar carrito">
            <X className="size-5" />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <img src={asset('logo-transparente.png')} alt="" className="w-32 opacity-90" />
            <p className="text-lg font-bold">Tu carrito está vacío</p>
            <p className="text-sm text-ink-soft">Descubre nuestras velas y jabones hechos a mano.</p>
            <Link to="/catalogo" onClick={close} className="btn-primary">
              Ver catálogo
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-5 py-4">
              {lines.map(({ product, quantity }) => (
                <li key={product.id} className="flex gap-3 rounded-3xl bg-white p-3 shadow-card">
                  <Link to={`/producto/${product.id}`} onClick={close} className="shrink-0">
                    <img src={asset(product.image)} alt={product.name} className="size-20 rounded-2xl object-cover" loading="lazy" />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm leading-tight font-bold">{product.name}</p>
                      <button
                        type="button"
                        onClick={() => remove(product.id)}
                        className="-mt-1 -mr-1 grid size-9 shrink-0 place-items-center rounded-full text-ink-soft hover:bg-rose-100 hover:text-rose-600"
                        aria-label={`Quitar ${product.name}`}
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                    <p className="text-xs text-ink-soft">{product.aroma}</p>
                    <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                      <QuantityControl value={quantity} onChange={(q) => setQuantity(product.id, q)} label={product.name} />
                      <span className="text-sm font-extrabold">{formatCOP(product.price * quantity)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="space-y-3 border-t border-ink/10 bg-white px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <FreeShippingBar subtotal={subtotal} />
              <div className="flex items-center justify-between">
                <span className="font-semibold text-ink-soft">Subtotal</span>
                <span className="text-xl font-extrabold">{formatCOP(subtotal)}</span>
              </div>
              <button
                type="button"
                className="btn-primary w-full text-base"
                onClick={() => {
                  close()
                  navigate('/checkout')
                }}
              >
                Finalizar pedido
              </button>
              <button type="button" onClick={close} className="w-full py-2 text-sm font-bold text-ink-soft hover:text-ink">
                Seguir comprando
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
