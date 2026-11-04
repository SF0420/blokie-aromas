import type { ReactNode } from 'react'
import { paymentMethods } from '../config/site'
import { paymentIcons } from './paymentIcons'

export function SectionHeading({
  eyebrow,
  title,
  children,
  align = 'center',
}: {
  eyebrow?: string
  title: ReactNode
  children?: ReactNode
  align?: 'center' | 'left'
}) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="heading-lg mt-2">{title}</h2>
      {children && <p className="mt-3 text-base text-ink-soft sm:text-lg">{children}</p>}
    </div>
  )
}

export function PaymentMethodsGrid() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {paymentMethods.map((m) => {
        const Icon = paymentIcons[m.id]
        return (
          <li key={m.id} className="flex items-start gap-4 rounded-3xl bg-white p-5 shadow-card">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl text-white" style={{ backgroundColor: m.color }}>
              <Icon className={`size-6 ${m.id === 'bancolombia' ? 'text-ink' : ''}`} />
            </span>
            <div>
              <h3 className="font-extrabold">{m.name}</h3>
              <p className="text-sm text-ink-soft">{m.short}</p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
