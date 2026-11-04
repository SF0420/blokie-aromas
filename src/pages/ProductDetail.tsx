import { ArrowLeft, Check, Share2, ShoppingBag } from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { QuantityControl } from '../components/CartDrawer'
import { WhatsAppIcon } from '../components/icons'
import { ProductCard } from '../components/ProductCard'
import { site } from '../config/site'
import { useCart } from '../context/CartContext'
import { categories, getProduct, products } from '../data/products'
import { asset, formatCOP } from '../lib/format'
import { askProductLink, shareProductLink } from '../lib/whatsapp'
import { NotFound } from './NotFound'

export function ProductDetail() {
  const { id = '' } = useParams()
  const product = getProduct(id)
  const { add } = useCart()
  const [qty, setQty] = useState(1)

  if (!product) return <NotFound />

  const category = categories.find((c) => c.id === product.category)
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  return (
    <div className="container-page pt-4 sm:pt-8">
      <nav aria-label="Ruta" className="flex items-center gap-2 text-sm text-ink-soft">
        <Link to="/catalogo" className="inline-flex min-h-11 items-center gap-1 font-bold hover:text-rose-600">
          <ArrowLeft className="size-4" /> Catálogo
        </Link>
        <span aria-hidden="true">/</span>
        <Link to={`/catalogo?categoria=${product.category}`} className="hover:text-rose-600">
          {category?.label}
        </Link>
      </nav>

      <div className="mt-2 grid gap-8 lg:grid-cols-2 lg:gap-14">
        <div className="relative">
          <div className="overflow-hidden rounded-[2rem] bg-white p-2.5 shadow-soft lg:sticky lg:top-28">
            <img src={asset(product.image)} alt={product.name} className="aspect-square w-full rounded-[1.6rem] object-cover" />
          </div>
          {product.badge && (
            <span className="absolute top-6 left-6 rounded-full bg-white px-4 py-1.5 text-xs font-extrabold text-rose-600 shadow-card">
              {product.badge}
            </span>
          )}
        </div>

        <div>
          <p className="text-xs font-extrabold tracking-wider text-sage-700 uppercase">{product.aroma}</p>
          <h1 className="heading-lg mt-1">{product.name}</h1>
          <p className="mt-3 text-3xl font-extrabold text-rose-600">{formatCOP(product.price)}</p>
          <p className="mt-5 text-ink-soft">{product.description}</p>

          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {product.details.map((d) => (
              <li key={d} className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold shadow-card">
                <Check className="size-4 shrink-0 text-sage-700" /> {d}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <QuantityControl value={qty} onChange={(v) => setQty(Math.max(1, Math.min(99, v)))} label={product.name} size="lg" />
            <button type="button" onClick={() => add(product, qty)} className="btn-primary flex-1 text-base">
              <ShoppingBag className="size-5" /> Agregar al carrito · {formatCOP(product.price * qty)}
            </button>
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <a href={askProductLink(product)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
              <WhatsAppIcon className="size-5" /> Preguntar por WhatsApp
            </a>
            <a href={shareProductLink(product)} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              <Share2 className="size-4" /> Compartir con un amigo
            </a>
          </div>

          <p className="mt-6 rounded-2xl bg-butter-100 p-4 text-sm text-ink/80">
            ✨ Producto artesanal: cada pieza es única y puede variar ligeramente en color y forma. {site.shippingNote}
          </p>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="text-2xl font-extrabold">También te puede gustar</h2>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
