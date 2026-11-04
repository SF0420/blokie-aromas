import { Link } from 'react-router-dom'
import { asset } from '../lib/format'

export function NotFound() {
  return (
    <div className="container-page max-w-xl pt-16 text-center">
      <img src={asset('logo-transparente.png')} alt="" className="mx-auto w-36" />
      <h1 className="heading-lg mt-4">¡Ups! No encontramos esta página</h1>
      <p className="mt-2 text-ink-soft">Puede que el producto ya no esté disponible.</p>
      <Link to="/" className="btn-primary mt-6">
        Volver al inicio
      </Link>
    </div>
  )
}
