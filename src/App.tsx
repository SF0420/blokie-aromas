import { HashRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { CartProvider } from './context/CartContext'
import { About } from './pages/About'
import { Catalog } from './pages/Catalog'
import { Checkout } from './pages/Checkout'
import { Credits } from './pages/Credits'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { ProductDetail } from './pages/ProductDetail'

// HashRouter: las URLs quedan como /#/catalogo para que GitHub Pages no devuelva 404 al recargar.
export default function App() {
  return (
    <HashRouter>
      <CartProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="catalogo" element={<Catalog />} />
            <Route path="producto/:id" element={<ProductDetail />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="nosotros" element={<About />} />
            <Route path="creditos" element={<Credits />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </CartProvider>
    </HashRouter>
  )
}
