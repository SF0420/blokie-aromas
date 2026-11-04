import { Plus, Share2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import type { Product } from '../data/products'
import { asset, formatCOP } from '../lib/format'
import { shareProductLink } from '../lib/whatsapp'

const categoryTint: Record<Product['category'], string> = {
  velas: 'bg-butter-100',
  jabones: 'bg-bubble-100',
  kits: 'bg-rose-100',
}

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart()

  return (
    <article className="group relative flex flex-col rounded-[1.4rem] bg-white p-1.5 shadow-card sm:rounded-[1.75rem] sm:p-2.5 transition-shadow duration-300 hover:shadow-soft">
      <div className={`relative overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem] ${categoryTint[product.category]}`}>
        <Link to={`/producto/${product.id}`} aria-label={`Ver ${product.name}`}>
          <img
            src={asset(product.image)}
            alt={product.name}
            loading="lazy"
            className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        {product.badge && (
          <span className="absolute top-2 left-2 rounded-full bg-white/95 px-2.5 py-1 text-[10px] sm:top-3 sm:left-3 sm:px-3 sm:text-[11px] font-extrabold text-rose-600 shadow-sm">
            {product.badge}
          </span>
        )}
        <a
          href={shareProductLink(product)}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-2 right-2 grid size-10 place-items-center rounded-full bg-white/95 text-whatsapp-700 shadow-sm transition hover:bg-whatsapp hover:text-white"
          aria-label={`Compartir ${product.name} por WhatsApp`}
          title="Compartir por WhatsApp"
        >
          <Share2 className="size-4" />
        </a>
      </div>

      <div className="flex flex-1 flex-col px-1.5 pt-2.5 pb-1 sm:px-2 sm:pt-3">
        <p className="line-clamp-1 text-[10px] font-bold tracking-wider text-sage-700 uppercase sm:text-[11px]">{product.aroma}</p>
        <h3 className="mt-0.5 text-sm leading-snug font-extrabold sm:text-base">
          <Link to={`/producto/${product.id}`} className="hover:text-rose-600">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 line-clamp-2 hidden text-sm text-ink-soft sm:block">{product.short}</p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <span className="text-base font-extrabold sm:text-lg">{formatCOP(product.price)}</span>
          <button
            type="button"
            onClick={() => add(product)}
            className="inline-flex size-11 shrink-0 items-center justify-center gap-1.5 rounded-full bg-peach-100 text-sm font-bold sm:size-auto sm:min-h-11 sm:px-4 text-rose-600 transition hover:bg-rose-600 hover:text-white active:scale-95"
            aria-label={`Agregar ${product.name} al carrito`}
          >
            <Plus className="size-5 sm:size-4" /> <span className="hidden sm:inline">Agregar</span>
          </button>
        </div>
      </div>
    </article>
  )
}
