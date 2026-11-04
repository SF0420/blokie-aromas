// ⚙️ Configuración del negocio: edita aquí tus datos reales.

export const site = {
  name: 'Blokie Aromas',
  tagline: 'Aromas que te inspiran',
  subtitle: 'Velas y jabones artesanales',
  /** Número de WhatsApp en formato internacional, solo dígitos (57 = Colombia). */
  whatsappNumber: '573013038919',
  whatsappGreeting: '¡Hola! 👋 Quiero hacer un pedido 🕯️🧼',
  city: 'Colombia',
  instagram: 'https://www.instagram.com/bbokie.aromas/',
  /** Desde este valor (COP) el envío es gratis. Pon 0 para desactivar. */
  freeShippingFrom: 120000,
  shippingNote: 'El costo de envío se confirma por WhatsApp según tu ciudad.',
}

export type PaymentMethodId = 'nequi' | 'daviplata' | 'bancolombia' | 'contraentrega'

export interface PaymentMethod {
  id: PaymentMethodId
  name: string
  short: string
  /** Datos que verá el cliente para pagar. */
  details: string
  instructions: string
  color: string
  /** true = se muestra como "Próximamente" y no se puede elegir. */
  comingSoon?: boolean
}

export const paymentMethods: PaymentMethod[] = [
  {
    id: 'nequi',
    name: 'Nequi',
    short: 'Pago inmediato desde tu celular',
    details: 'Nequi: 301 303 8919',
    instructions: 'Transfiere el total a nuestro Nequi y envía el comprobante por WhatsApp.',
    color: '#da0081',
  },
  {
    id: 'daviplata',
    name: 'Daviplata',
    short: 'Transfiere fácil y sin costo',
    details: 'Daviplata: 300 000 0000',
    instructions: 'Transfiere el total a nuestro Daviplata y envía el comprobante por WhatsApp.',
    color: '#ed1c27',
    comingSoon: true,
  },
  {
    id: 'bancolombia',
    name: 'Transferencia Bancolombia',
    short: 'Cuenta de ahorros',
    details: 'Bancolombia Ahorros: 000-000000-00 · A nombre de Blokie Aromas',
    instructions: 'Haz la transferencia y comparte el comprobante por WhatsApp para despachar tu pedido.',
    color: '#fdda24',
    comingSoon: true,
  },
  {
    id: 'contraentrega',
    name: 'Efectivo contraentrega',
    short: 'Paga cuando recibas tu pedido',
    details: 'Disponible en ciudades seleccionadas',
    instructions: 'Pagas en efectivo al recibir. Te confirmamos la disponibilidad por WhatsApp.',
    color: '#4f7d65',
  },
]

export const availablePaymentMethods = paymentMethods.filter((m) => !m.comingSoon)
