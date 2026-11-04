import { Search, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard'
import { categories, products, type Category } from '../data/products'

type Sort = 'destacados' | 'precio-asc' | 'precio-desc' | 'nombre'

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')

export function Catalog() {
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<Sort>('destacados')

  const active = (params.get('categoria') as Category | null) ?? null
  const activeCategory = categories.find((c) => c.id === active)

  const filtered = useMemo(() => {
    const q = normalize(query.trim())
    const list = products.filter(
      (p) =>
        (!activeCategory || p.category === activeCategory.id) &&
        (!q || normalize(`${p.name} ${p.aroma} ${p.short}`).includes(q)),
    )
    const sorted = [...list]
    if (sort === 'precio-asc') sorted.sort((a, b) => a.price - b.price)
    if (sort === 'precio-desc') sorted.sort((a, b) => b.price - a.price)
    if (sort === 'nombre') sorted.sort((a, b) => a.name.localeCompare(b.name, 'es'))
    if (sort === 'destacados') sorted.sort((a, b) => Number(!!b.featured) - Number(!!a.featured))
    return sorted
  }, [activeCategory, query, sort])

  const setCategory = (id: Category | null) => {
    if (id) setParams({ categoria: id })
    else setParams({})
  }

  const chips: { id: Category | null; label: string }[] = [{ id: null, label: 'Todos' }, ...categories.map((c) => ({ id: c.id, label: c.label }))]

  return (
    <div className="container-page pt-6 pb-4 sm:pt-10">
      <header className="text-center">
        <p className="eyebrow">Catálogo</p>
        <h1 className="heading-lg mt-2">{activeCategory ? activeCategory.label : 'Velas y jabones artesanales'}</h1>
        <p className="mx-auto mt-2 max-w-xl text-ink-soft">
          {activeCategory ? activeCategory.description : 'Elaborados a mano con ingredientes de calidad y aromas que te inspiran.'}
        </p>
      </header>

      <div className="sticky top-16 z-20 -mx-4 mt-8 bg-cream/95 px-4 py-3 backdrop-blur-md sm:mx-0 sm:rounded-3xl sm:px-0 md:top-20">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0" role="tablist" aria-label="Filtrar por categoría">
            {chips.map((c) => {
              const selected = (c.id ?? null) === (activeCategory?.id ?? null)
              return (
                <button
                  key={c.label}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setCategory(c.id)}
                  className={`min-h-11 shrink-0 rounded-full px-5 text-sm font-bold transition ${
                    selected ? 'bg-rose-600 text-white shadow-card' : 'bg-white text-ink-soft hover:text-ink'
                  }`}
                >
                  {c.label}
                </button>
              )
            })}
          </div>
          <div className="flex gap-2">
            <label className="relative flex-1 lg:w-72">
              <span className="sr-only">Buscar por nombre o aroma</span>
              <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ink-soft" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar aroma…"
                className="input appearance-none !rounded-full pl-10"
              />
            </label>
            <label>
              <span className="sr-only">Ordenar</span>
              <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="input !w-auto !rounded-full pr-8 font-semibold sm:text-sm">
                <option value="destacados">Destacados</option>
                <option value="precio-asc">Menor precio</option>
                <option value="precio-desc">Mayor precio</option>
                <option value="nombre">Nombre A–Z</option>
              </select>
            </label>
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm text-ink-soft" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? 'producto' : 'productos'}
      </p>

      {filtered.length > 0 ? (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-3xl bg-white p-10 text-center shadow-card">
          <p className="text-lg font-bold">No encontramos productos con “{query}”</p>
          <p className="mt-1 text-sm text-ink-soft">Prueba con otro aroma o revisa todas las categorías.</p>
          <button
            type="button"
            onClick={() => {
              setQuery('')
              setCategory(null)
            }}
            className="btn-secondary mt-5"
          >
            <X className="size-4" /> Limpiar filtros
          </button>
        </div>
      )}
    </div>
  )
}
