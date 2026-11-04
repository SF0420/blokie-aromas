# Blokie Aromas 🐥🕯️🧼

Tienda web de **velas y jabones artesanales**: catálogo, carrito persistente y pedidos por WhatsApp.

- **Stack:** Vite + React + TypeScript + Tailwind CSS v4
- **Pedidos:** el carrito arma el mensaje y abre WhatsApp con el pedido listo (sin pasarela ni cobros en la página).
- **Pagos mostrados:** Nequi, Daviplata, transferencia Bancolombia y contraentrega.
- **Hosting:** GitHub Pages (despliegue automático con GitHub Actions).

## Desarrollo

```bash
pnpm install
pnpm dev        # http://localhost:5173/blokie-aromas/
pnpm build      # genera /dist
pnpm preview    # sirve /dist localmente
```

## Qué editar

| Qué | Dónde |
| --- | --- |
| Número de WhatsApp, correo, Instagram, envío gratis | `src/config/site.ts` |
| Datos de Nequi / Daviplata / cuenta bancaria | `src/config/site.ts` → `paymentMethods` |
| Productos, precios, descripciones | `src/data/products.ts` |
| Fotos de productos | `public/images/` (mismo nombre de archivo, o cambia `image` en `products.ts`) |
| Colores y tipografías | `src/index.css` → bloque `@theme` |
| Logo | `public/logo.png` y `public/logo-transparente.png` |

> Las fotos actuales son **referenciales** (Wikimedia Commons, licencias libres; ver `/#/creditos`).
> Cuando subas tus fotos reales, actualiza o vacía `src/data/credits.ts`.

## Estructura

```
src/
  config/site.ts        datos del negocio y métodos de pago
  data/products.ts      catálogo
  context/CartContext   carrito (se guarda en localStorage)
  lib/whatsapp.ts       links de chat, compartir y pedido
  components/           Header, CartDrawer, ProductCard, Layout…
  pages/                Home, Catalog, ProductDetail, Checkout, About, Credits
```

## Despliegue en GitHub Pages

1. Sube el repo a GitHub con el nombre `blokie-aromas` (si usas otro nombre, cambia `base` en `vite.config.ts`).
2. En el repo: **Settings → Pages → Source: GitHub Actions**.
3. Cada `push` a `main` publica en `https://<usuario>.github.io/blokie-aromas/`.

Las rutas usan `HashRouter` (`/#/catalogo`) para que recargar cualquier página funcione en GitHub Pages.
