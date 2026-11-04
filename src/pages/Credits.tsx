import { imageCredits } from '../data/credits'
import { asset } from '../lib/format'

export function Credits() {
  return (
    <div className="container-page max-w-3xl pt-8">
      <h1 className="heading-lg">Créditos de imágenes</h1>
      <p className="mt-2 text-ink-soft">
        Las fotografías de producto son imágenes referenciales de Wikimedia Commons, usadas bajo sus licencias libres.
      </p>
      <ul className="mt-8 space-y-3">
        {imageCredits.map((c) => (
          <li key={c.file} className="flex items-center gap-4 rounded-2xl bg-white p-3 shadow-card">
            <img src={asset(c.file)} alt="" className="size-14 shrink-0 rounded-xl object-cover" loading="lazy" />
            <div className="min-w-0 text-sm">
              <p className="font-bold">{c.author || 'Autor desconocido'}</p>
              <p className="text-ink-soft">
                {c.license} ·{' '}
                <a href={c.source} target="_blank" rel="noopener noreferrer" className="text-rose-600 underline">
                  Ver fuente
                </a>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
