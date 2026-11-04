import { ArrowLeft, CheckCircle2, ShoppingBag } from 'lucide-react'
import { useState, type FormEvent, type InputHTMLAttributes } from 'react'
import { Link } from 'react-router-dom'
import { FreeShippingBar, QuantityControl } from '../components/CartDrawer'
import { WhatsAppIcon } from '../components/icons'
import { paymentIcons } from '../components/paymentIcons'
import { paymentMethods, site, type PaymentMethodId } from '../config/site'
import { useCart } from '../context/CartContext'
import { asset, formatCOP } from '../lib/format'
import { orderLink, type CustomerInfo } from '../lib/whatsapp'

const emptyCustomer: CustomerInfo = { name: '', phone: '', city: '', address: '', notes: '' }
const CUSTOMER_KEY = 'blokie-customer-v1'

function loadCustomer(): CustomerInfo {
  try {
    const raw = localStorage.getItem(CUSTOMER_KEY)
    return raw ? { ...emptyCustomer, ...JSON.parse(raw), notes: '' } : emptyCustomer
  } catch {
    return emptyCustomer
  }
}

export function Checkout() {
  const { lines, subtotal, setQuantity, clear } = useCart()
  const [customer, setCustomer] = useState<CustomerInfo>(loadCustomer)
  const [paymentId, setPaymentId] = useState<PaymentMethodId>('nequi')
  const [sent, setSent] = useState<null | PaymentMethodId>(null)
  const [errors, setErrors] = useState<Partial<Record<keyof CustomerInfo, string>>>({})

  const payment = paymentMethods.find((m) => m.id === paymentId)!

  const update = (field: keyof CustomerInfo) => (e: { target: { value: string } }) => {
    setCustomer((c) => ({ ...c, [field]: e.target.value }))
    setErrors((er) => ({ ...er, [field]: undefined }))
  }

  const validate = () => {
    const er: typeof errors = {}
    if (customer.name.trim().length < 2) er.name = 'Escribe tu nombre'
    if (customer.phone.replace(/\D/g, '').length < 7) er.phone = 'Escribe un teléfono válido'
    if (!customer.city.trim()) er.city = 'Escribe tu ciudad'
    if (!customer.address.trim()) er.address = 'Escribe la dirección de entrega'
    setErrors(er)
    return Object.keys(er).length === 0
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) {
      document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
      return
    }
    try {
      localStorage.setItem(CUSTOMER_KEY, JSON.stringify({ ...customer, notes: '' }))
    } catch {
      /* sin almacenamiento */
    }
    window.open(orderLink(lines, customer, payment, subtotal), '_blank', 'noopener,noreferrer')
    setSent(paymentId)
  }

  if (sent) {
    const m = paymentMethods.find((p) => p.id === sent)!
    return (
      <div className="container-page max-w-2xl pt-10 text-center">
        <CheckCircle2 className="mx-auto size-16 text-sage-700" />
        <h1 className="heading-lg mt-4">¡Ya casi! Envía el mensaje en WhatsApp</h1>
        <p className="mt-3 text-ink-soft">
          Abrimos WhatsApp con tu pedido listo. Si no se abrió,{' '}
          <a href={orderLink(lines, customer, m, subtotal)} target="_blank" rel="noopener noreferrer" className="font-bold text-whatsapp-700 underline">
            toca aquí
          </a>
          .
        </p>
        <div className="mt-8 rounded-3xl bg-white p-6 text-left shadow-card">
          <p className="eyebrow">Cómo pagar · {m.name}</p>
          <p className="mt-2 text-lg font-extrabold">{m.details}</p>
          <p className="mt-1 text-ink-soft">{m.instructions}</p>
          <p className="mt-4 text-sm text-ink-soft">
            Total de productos: <strong className="text-ink">{formatCOP(subtotal)}</strong>. {site.shippingNote}
          </p>
        </div>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/catalogo"
            onClick={() => clear()}
            className="btn-primary"
          >
            Listo, vaciar carrito y seguir comprando
          </Link>
          <button type="button" onClick={() => setSent(null)} className="btn-secondary">
            Volver al pedido
          </button>
        </div>
      </div>
    )
  }

  if (lines.length === 0) {
    return (
      <div className="container-page max-w-xl pt-16 text-center">
        <img src={asset('logo-transparente.png')} alt="" className="mx-auto w-36" />
        <h1 className="heading-lg mt-4">Tu carrito está vacío</h1>
        <p className="mt-2 text-ink-soft">Agrega productos para hacer tu pedido.</p>
        <Link to="/catalogo" className="btn-primary mt-6">
          <ShoppingBag className="size-5" /> Ir al catálogo
        </Link>
      </div>
    )
  }

  const field = (name: keyof CustomerInfo, label: string, props: InputHTMLAttributes<HTMLInputElement> = {}) => (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-bold">
        {label}
      </label>
      <input
        id={name}
        name={name}
        value={customer[name]}
        onChange={update(name)}
        aria-invalid={!!errors[name]}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
        className={`input ${errors[name] ? '!border-rose-600' : ''}`}
        {...props}
      />
      {errors[name] && (
        <p id={`${name}-error`} className="mt-1 text-xs font-semibold text-rose-600">
          {errors[name]}
        </p>
      )}
    </div>
  )

  return (
    <div className="container-page pt-4 sm:pt-8">
      <Link to="/catalogo" className="inline-flex min-h-11 items-center gap-1 text-sm font-bold text-ink-soft hover:text-rose-600">
        <ArrowLeft className="size-4" /> Seguir comprando
      </Link>
      <h1 className="heading-lg mt-1">Finalizar pedido</h1>
      <p className="mt-1 text-ink-soft">Completa tus datos y enviaremos tu pedido por WhatsApp para confirmarlo.</p>

      <form onSubmit={onSubmit} noValidate className="mt-8 grid gap-8 lg:grid-cols-[1fr_24rem] lg:items-start">
        <div className="space-y-8">
          <fieldset className="rounded-[2rem] bg-white p-5 shadow-card sm:p-7">
            <legend className="sr-only">Datos de entrega</legend>
            <h2 className="text-lg font-extrabold">1. Datos de entrega</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {field('name', 'Nombre completo', { autoComplete: 'name', placeholder: 'Ej: María Pérez' })}
              {field('phone', 'Teléfono / WhatsApp', { autoComplete: 'tel', inputMode: 'tel', type: 'tel', placeholder: '300 000 0000' })}
              {field('city', 'Ciudad', { autoComplete: 'address-level2', placeholder: 'Ej: Medellín' })}
              {field('address', 'Dirección', { autoComplete: 'street-address', placeholder: 'Calle, número, barrio' })}
              <div className="sm:col-span-2">
                <label htmlFor="notes" className="mb-1.5 block text-sm font-bold">
                  Notas <span className="font-normal text-ink-soft">(opcional)</span>
                </label>
                <textarea
                  id="notes"
                  value={customer.notes}
                  onChange={update('notes')}
                  rows={3}
                  placeholder="¿Es un regalo? Escribe el mensaje para la tarjeta, colores, fecha de entrega…"
                  className="input resize-y"
                />
              </div>
            </div>
          </fieldset>

          <fieldset className="rounded-[2rem] bg-white p-5 shadow-card sm:p-7">
            <legend className="sr-only">Método de pago</legend>
            <h2 className="text-lg font-extrabold">2. Método de pago</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {paymentMethods.map((m) => {
                const Icon = paymentIcons[m.id]
                const checked = m.id === paymentId
                const disabled = !!m.comingSoon
                return (
                  <label
                    key={m.id}
                    className={`flex items-start gap-3 rounded-2xl border-2 p-4 transition ${
                      disabled
                        ? 'cursor-not-allowed border-dashed border-ink/10 opacity-55'
                        : checked
                          ? 'cursor-pointer border-rose-600 bg-rose-100/50'
                          : 'cursor-pointer border-ink/10 hover:border-rose'
                    }`}
                  >
                    <input type="radio" name="payment" value={m.id} checked={checked} disabled={disabled} onChange={() => setPaymentId(m.id)} className="sr-only" />
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl text-white" style={{ backgroundColor: m.color }}>
                      <Icon className={`size-5 ${m.id === 'bancolombia' ? 'text-ink' : ''}`} />
                    </span>
                    <span className="flex-1">
                      <span className="block font-extrabold">{m.name}</span>
                      <span className="block text-xs text-ink-soft">{disabled ? 'Próximamente' : m.short}</span>
                    </span>
                    <span className={`mt-1 grid size-5 shrink-0 place-items-center rounded-full border-2 ${disabled ? 'hidden' : checked ? 'border-rose-600' : 'border-ink/20'}`}>
                      {checked && <span className="size-2.5 rounded-full bg-rose-600" />}
                    </span>
                  </label>
                )
              })}
            </div>
            <p className="mt-4 rounded-2xl bg-cream-200 p-4 text-sm text-ink/80">{payment.instructions}</p>
          </fieldset>
        </div>

        <aside className="rounded-[2rem] bg-white p-5 shadow-card sm:p-7 lg:sticky lg:top-28">
          <h2 className="text-lg font-extrabold">Resumen</h2>
          <ul className="mt-4 divide-y divide-ink/10">
            {lines.map(({ product, quantity }) => (
              <li key={product.id} className="flex gap-3 py-3">
                <img src={asset(product.image)} alt="" className="size-14 shrink-0 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm leading-tight font-bold">{product.name}</p>
                  <div className="mt-1.5 flex items-center justify-between gap-2">
                    <QuantityControl value={quantity} onChange={(q) => setQuantity(product.id, q)} label={product.name} />
                    <span className="text-sm font-extrabold">{formatCOP(product.price * quantity)}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-3 border-t border-ink/10 pt-4">
            <FreeShippingBar subtotal={subtotal} />
            <div className="flex justify-between text-sm">
              <span className="text-ink-soft">Envío</span>
              <span className="font-bold">
                {site.freeShippingFrom > 0 && subtotal >= site.freeShippingFrom ? 'Gratis' : 'Por confirmar'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-bold">Total productos</span>
              <span className="text-2xl font-extrabold">{formatCOP(subtotal)}</span>
            </div>
            <button type="submit" className="btn-whatsapp w-full text-base">
              <WhatsAppIcon className="size-5" /> Enviar pedido por WhatsApp
            </button>
            <p className="text-center text-xs text-ink-soft">No se realiza ningún cobro en la página. Confirmamos disponibilidad y envío por WhatsApp.</p>
          </div>
        </aside>
      </form>
    </div>
  )
}
