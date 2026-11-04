import { CreditCard, Smartphone, Truck, Wallet } from 'lucide-react'
import type { PaymentMethodId } from '../config/site'

export const paymentIcons: Record<PaymentMethodId, typeof Wallet> = {
  nequi: Smartphone,
  daviplata: Wallet,
  bancolombia: CreditCard,
  contraentrega: Truck,
}
