import { ArrowRight, Gift, Hand, Leaf as LeafIcon, MessageCircle, PackageCheck, Recycle, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Bubbles, Leaf, WhatsAppIcon } from '../components/icons'
import { ProductCard } from '../components/ProductCard'
import { PaymentMethodsGrid, SectionHeading } from '../components/sections'
import { availablePaymentMethods, site } from '../config/site'
import { categories, products } from '../data/products'
import { team } from '../data/team'
import { asset } from '../lib/format'
import { chatLink } from '../lib/whatsapp'

const values = [
  { icon: Hand, title: 'Hecho a mano', text: 'Cada pieza se elabora en pequeños lotes.' },
  { icon: LeafIcon, title: 'Ingredientes de calidad', text: 'Ceras y aceites seleccionados.' },
  { icon: Recycle, title: 'Sostenible', text: 'Envases reciclables y reutilizables.' },
  { icon: Gift, title: 'Para regalar', text: 'Empaques con moño y tarjeta.' },
]

const categoryImages: Record<string, string> = {
  velas: 'images/velas-frasco.jpg',
  jabones: 'images/jabon-lavanda-verbena.jpg',
  kits: 'images/vela-tealight.jpg',
}

const categoryBg: Record<string, string> = {
  velas: 'bg-butter-100',
  jabones: 'bg-bubble-100',
  kits: 'bg-rose-100',
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-40 -right-40 size-[32rem] rounded-full bg-peach/50 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -left-32 size-80 rounded-full bg-butter/40 blur-3xl" />
      <Bubbles className="animate-float pointer-events-none absolute top-10 left-[46%] hidden w-24 opacity-80 lg:block" />

      <div className="container-page relative grid items-center gap-12 pt-8 pb-16 md:pt-12 lg:grid-cols-2 lg:gap-8 lg:pt-16 lg:pb-24">
        <div className="text-center lg:text-left">
          <p className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-extrabold text-sage-700 shadow-card">
            <LeafIcon className="size-3.5" /> Velas y jabones artesanales
          </p>
          <h1 className="heading-xl mt-5">
            Aromas que <span className="font-script font-bold text-rose-600">te inspiran</span>
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-base text-ink-soft sm:text-lg lg:mx-0">
            Creamos velas y jabones hechos a mano con ingredientes de alta calidad, fragancias agradables y diseños
            únicos para tu bienestar, tu hogar y los regalos más especiales.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <Link to="/catalogo" className="btn-primary text-base">
              <ShoppingBag className="size-5" /> Ver catálogo
            </Link>
            <a href={chatLink()} target="_blank" rel="noopener noreferrer" className="btn-secondary text-base">
              <WhatsAppIcon className="size-5 text-whatsapp" /> Escríbenos
            </a>
          </div>
        </div>

        {/* Abanico de fotos (inspirado en "Hero Section with Cards" de 21st.dev) */}
        <div className="relative mx-auto h-[22rem] w-full max-w-md sm:h-[26rem] lg:max-w-none">
          <Leaf className="absolute bottom-6 -left-2 w-12 -rotate-12 sm:w-16" />
          <Leaf className="absolute -right-1 bottom-10 w-12 scale-x-[-1] rotate-12 sm:w-16" />
          <figure className="absolute top-8 left-[4%] w-[44%] -rotate-[9deg] rounded-[1.75rem] bg-white p-2 shadow-soft transition-transform duration-500 hover:-rotate-[4deg] sm:left-[8%]">
            <img src={asset('images/jabon-artesanal.jpg')} alt="Jabón artesanal de avena" className="aspect-[3/4] w-full rounded-[1.4rem] object-cover" />
          </figure>
          <figure className="absolute top-8 right-[4%] w-[44%] rotate-[9deg] rounded-[1.75rem] bg-white p-2 shadow-soft transition-transform duration-500 hover:rotate-[4deg] sm:right-[8%]">
            <img src={asset('images/velas-frasco.jpg')} alt="Velas en frasco encendidas" className="aspect-[3/4] w-full rounded-[1.4rem] object-cover" />
          </figure>
          <figure className="absolute top-0 left-1/2 z-10 w-[48%] -translate-x-1/2 rounded-[1.75rem] bg-white p-2 shadow-soft">
            <img src={asset('images/vela-soya.jpg')} alt="Vela de soya en vaso" className="aspect-[3/4] w-full rounded-[1.4rem] object-cover" />
          </figure>
          <img
            src={asset('logo-transparente.png')}
            alt=""
            className="animate-float absolute bottom-0 left-1/2 z-20 w-32 -translate-x-1/2 sm:w-40 lg:drop-shadow-lg"
          />
        </div>
      </div>
    </section>
  )
}

function HowToBuy() {
  const steps = [
    { icon: ShoppingBag, title: 'Elige tus favoritos', text: 'Agrega velas, jabones o kits a tu carrito. Se guarda aunque cierres la página.' },
    { icon: MessageCircle, title: 'Envía tu pedido', text: 'Completa tus datos y te llevamos a WhatsApp con el pedido listo para enviar.' },
    { icon: PackageCheck, title: 'Paga y recibe', text: `Paga con ${new Intl.ListFormat('es', { type: 'disjunction' }).format(availablePaymentMethods.map((m) => m.name.toLowerCase().startsWith('efectivo') ? 'efectivo contraentrega' : m.name))} y recibe en casa.` },
  ]
  return (
    <section className="container-page mt-20">
      <SectionHeading eyebrow="Así de fácil" title="¿Cómo comprar?" />
      <ol className="mt-10 grid gap-4 md:grid-cols-3">
        {steps.map((s, i) => (
          <li key={s.title} className="relative rounded-3xl bg-white p-6 shadow-card">
            <span className="absolute top-5 right-6 font-script text-5xl font-bold text-peach">{i + 1}</span>
            <span className="grid size-12 place-items-center rounded-2xl bg-sage-100 text-sage-700">
              <s.icon className="size-6" />
            </span>
            <h3 className="mt-4 text-lg font-extrabold">{s.title}</h3>
            <p className="mt-1 text-sm text-ink-soft">{s.text}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

export function Home() {
  const featured = products.filter((p) => p.featured).slice(0, 4)

  return (
    <>
      <Hero />

      {/* Valores */}
      <section className="container-page">
        <ul className="grid grid-cols-2 gap-3 rounded-[2rem] bg-white p-4 shadow-card sm:p-6 lg:grid-cols-4">
          {values.map((v) => (
            <li key={v.title} className="flex flex-col items-center gap-2 p-2 text-center sm:flex-row sm:text-left">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-peach-100 text-rose-600">
                <v.icon className="size-5" />
              </span>
              <div>
                <p className="text-sm font-extrabold">{v.title}</p>
                <p className="hidden text-xs text-ink-soft sm:block">{v.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Categorías */}
      <section className="container-page mt-20">
        <SectionHeading eyebrow="Nuestro catálogo" title="Encuentra tu aroma ideal">
          Velas que transforman tu espacio y jabones que cuidan tu piel.
        </SectionHeading>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <Link
              key={c.id}
              to={`/catalogo?categoria=${c.id}`}
              className={`group relative flex min-h-56 overflow-hidden rounded-[2rem] ${categoryBg[c.id]} p-6 shadow-card transition hover:shadow-soft sm:min-h-64 ${c.id === 'kits' ? 'sm:col-span-2 lg:col-span-1' : ''}`}
            >
              <div className="relative z-10 flex max-w-[55%] flex-col">
                <h3 className="text-2xl font-extrabold">{c.label}</h3>
                <p className="mt-1 text-sm text-ink-soft">{c.description}</p>
                <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-bold text-rose-600">
                  Ver todo <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
              <img
                src={asset(categoryImages[c.id])}
                alt=""
                loading="lazy"
                className="absolute top-1/2 -right-6 h-[85%] w-1/2 -translate-y-1/2 rotate-6 rounded-[1.5rem] border-4 border-white object-cover shadow-soft transition-transform duration-500 group-hover:rotate-3"
              />
            </Link>
          ))}
        </div>
      </section>

      {/* Destacados */}
      <section className="container-page mt-20">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Favoritos" title="Los más queridos" align="left" />
          <Link to="/catalogo" className="btn-secondary shrink-0">
            Ver todo el catálogo <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Sobre nosotros */}
      <section className="container-page mt-20">
        <div className="relative grid items-center gap-8 overflow-hidden rounded-[2.5rem] bg-sage-100 p-6 sm:p-10 lg:grid-cols-[1fr_1.2fr] lg:p-14">
          <Bubbles className="pointer-events-none absolute -top-4 -right-4 w-28 opacity-70" />
          <img src={asset('logo.png')} alt={`Logo de ${site.name}`} className="mx-auto w-56 rounded-[2rem] bg-white p-3 shadow-soft sm:w-72" loading="lazy" />
          <div>
            <p className="eyebrow !text-sage-700">Quiénes somos</p>
            <h2 className="heading-lg mt-2">Bienestar y relajación hechos a mano</h2>
            <p className="mt-4 text-ink-soft">
              Somos un emprendimiento dedicado a la elaboración y comercialización de velas y jabones artesanales.
              Nuestro propósito es ofrecer productos que contribuyan al bienestar, la relajación y la decoración de los
              hogares, convirtiéndose también en una alternativa especial para regalar en diferentes ocasiones.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-white p-4">
                <p className="font-extrabold text-rose-600">Misión</p>
                <p className="mt-1 text-sm text-ink-soft">Crear experiencias únicas de bienestar con velas y jabones de la más alta calidad.</p>
              </div>
              <div className="rounded-2xl bg-white p-4">
                <p className="font-extrabold text-rose-600">Visión</p>
                <p className="mt-1 text-sm text-ink-soft">Ser una marca reconocida a nivel nacional e internacional por innovación y sostenibilidad.</p>
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link to="/nosotros" className="btn-primary">
                Conoce al equipo <ArrowRight className="size-4" />
              </Link>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2" aria-hidden="true">
                  {team.map((m) => (
                    <span key={m.name} className={`grid size-10 place-items-center rounded-full border-2 border-sage-100 text-xs font-extrabold ${m.tint}`}>
                      {m.initials}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-ink-soft">Hecho por {team.length} emprendedores</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HowToBuy />

      {/* Métodos de pago */}
      <section className="container-page mt-20">
        <SectionHeading eyebrow="Pagos seguros" title="Métodos de pago">
          Elige el que prefieras al finalizar tu pedido. Confirmamos todo por WhatsApp.
        </SectionHeading>
        <div className="mt-10">
          <PaymentMethodsGrid />
        </div>
      </section>

      {/* CTA WhatsApp */}
      <section className="container-page mt-20">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-peach px-6 py-12 text-center sm:px-12">
          <Bubbles className="pointer-events-none absolute -bottom-6 -left-4 w-32 opacity-80" />
          <Bubbles className="pointer-events-none absolute -top-6 -right-4 w-24 opacity-80" />
          <h2 className="heading-lg relative">¿Buscas un regalo especial?</h2>
          <p className="relative mx-auto mt-3 max-w-xl text-ink/80">
            Armamos kits personalizados para cumpleaños, aniversarios, baby showers y fechas especiales. ¡Cuéntanos qué
            necesitas!
          </p>
          <a
            href={chatLink('¡Hola! 👋 Quiero armar un regalo 🎁')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp relative mt-6 text-base"
          >
            <WhatsAppIcon className="size-5" /> Hablemos por WhatsApp
          </a>
        </div>
      </section>
    </>
  )
}
