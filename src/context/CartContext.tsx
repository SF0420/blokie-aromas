import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState, type ReactNode } from 'react'
import { getProduct, type Product } from '../data/products'
import type { CartLine } from '../lib/whatsapp'

const STORAGE_KEY = 'blokie-cart-v1'

type StoredItem = { id: string; quantity: number }

type Action =
  | { type: 'add'; id: string; quantity: number }
  | { type: 'set'; id: string; quantity: number }
  | { type: 'remove'; id: string }
  | { type: 'clear' }
  | { type: 'replace'; items: StoredItem[] }

function reducer(state: StoredItem[], action: Action): StoredItem[] {
  switch (action.type) {
    case 'add': {
      const existing = state.find((i) => i.id === action.id)
      if (existing) {
        return state.map((i) => (i.id === action.id ? { ...i, quantity: Math.min(99, i.quantity + action.quantity) } : i))
      }
      return [...state, { id: action.id, quantity: action.quantity }]
    }
    case 'set':
      if (action.quantity <= 0) return state.filter((i) => i.id !== action.id)
      return state.map((i) => (i.id === action.id ? { ...i, quantity: Math.min(99, action.quantity) } : i))
    case 'remove':
      return state.filter((i) => i.id !== action.id)
    case 'clear':
      return []
    case 'replace':
      return action.items
  }
}

function loadCart(): StoredItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as StoredItem[]
    // Ignora productos que ya no existan en el catálogo
    return Array.isArray(parsed) ? parsed.filter((i) => getProduct(i.id) && i.quantity > 0) : []
  } catch {
    return []
  }
}

interface CartContextValue {
  lines: CartLine[]
  count: number
  subtotal: number
  isOpen: boolean
  open: () => void
  close: () => void
  add: (product: Product, quantity?: number) => void
  setQuantity: (id: string, quantity: number) => void
  remove: (id: string) => void
  clear: () => void
  toast: string | null
  bump: number
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(reducer, undefined, loadCart)
  const [isOpen, setIsOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const [bump, setBump] = useState(0)
  const toastTimer = useRef<number | undefined>(undefined)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      /* almacenamiento no disponible: el carrito vive solo en memoria */
    }
  }, [items])

  // Sincroniza entre pestañas
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return
      dispatch({ type: 'replace', items: loadCart() })
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const lines = useMemo<CartLine[]>(
    () =>
      items.flatMap((i) => {
        const product = getProduct(i.id)
        return product ? [{ product, quantity: i.quantity }] : []
      }),
    [items],
  )

  const count = lines.reduce((n, l) => n + l.quantity, 0)
  const subtotal = lines.reduce((n, l) => n + l.quantity * l.product.price, 0)

  const add = useCallback((product: Product, quantity = 1) => {
    dispatch({ type: 'add', id: product.id, quantity })
    setBump((b) => b + 1)
    setToast(`${product.name} se agregó al carrito`)
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(null), 2600)
  }, [])

  const value: CartContextValue = {
    lines,
    count,
    subtotal,
    isOpen,
    open: useCallback(() => setIsOpen(true), []),
    close: useCallback(() => setIsOpen(false), []),
    add,
    setQuantity: useCallback((id: string, quantity: number) => dispatch({ type: 'set', id, quantity }), []),
    remove: useCallback((id: string) => dispatch({ type: 'remove', id }), []),
    clear: useCallback(() => dispatch({ type: 'clear' }), []),
    toast,
    bump,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart debe usarse dentro de <CartProvider>')
  return ctx
}
