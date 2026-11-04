import { site, type PaymentMethod } from '../config/site'
import type { Product } from '../data/products'
import { formatCOP } from './format'

export interface CartLine {
  product: Product
  quantity: number
}

export interface CustomerInfo {
  name: string
  phone: string
  city: string
  address: string
  notes: string
}

/** Link para chatear con el negocio con un mensaje prellenado. */
export function chatLink(message: string = site.whatsappGreeting) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`
}

/** URL pública de un producto (HashRouter). */
export function productUrl(product: Product) {
  return `${window.location.origin}${import.meta.env.BASE_URL}#/producto/${product.id}`
}

/** Link para compartir un producto con cualquier contacto de WhatsApp. */
export function shareProductLink(product: Product) {
  const text = `Mira esta ${product.category === 'jabones' ? 'belleza' : 'maravilla'} de ${site.name} 🐥✨\n${product.name} — ${formatCOP(product.price)}\n${productUrl(product)}`
  return `https://wa.me/?text=${encodeURIComponent(text)}`
}

/** Link para preguntar por un producto puntual. */
export function askProductLink(product: Product) {
  return chatLink(`¡Hola ${site.name}! 🐥 Me interesa: ${product.name} (${formatCOP(product.price)}). ¿Está disponible?`)
}

export function buildOrderMessage(lines: CartLine[], customer: CustomerInfo, payment: PaymentMethod, subtotal: number) {
  const items = lines
    .map((l) => `• ${l.quantity} × ${l.product.name} — ${formatCOP(l.product.price * l.quantity)}`)
    .join('\n')

  const shipping =
    site.freeShippingFrom > 0 && subtotal >= site.freeShippingFrom ? 'Envío: ¡GRATIS! 🎉' : `Envío: por confirmar según ciudad`

  const parts = [
    `¡Hola ${site.name}! 🐥 Quiero hacer este pedido:`,
    '',
    items,
    '',
    `Subtotal: ${formatCOP(subtotal)}`,
    shipping,
    '',
    `👤 Nombre: ${customer.name}`,
    `📱 Teléfono: ${customer.phone}`,
    `📍 Ciudad: ${customer.city}`,
    `🏠 Dirección: ${customer.address}`,
    `💳 Método de pago: ${payment.name}`,
  ]
  if (customer.notes.trim()) parts.push(`📝 Notas: ${customer.notes.trim()}`)
  return parts.join('\n')
}

export function orderLink(lines: CartLine[], customer: CustomerInfo, payment: PaymentMethod, subtotal: number) {
  return chatLink(buildOrderMessage(lines, customer, payment, subtotal))
}
