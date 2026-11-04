import { Award, Globe2, HeartHandshake, Lightbulb, Leaf, Smile, Sparkles, Star, Target, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Bubbles } from '../components/icons'
import { site } from '../config/site'
import { asset } from '../lib/format'

const missionKeys = [
  { icon: Award, title: 'Calidad del producto', text: 'Elaborar velas y jabones con materias primas de excelente calidad, garantizando su durabilidad, seguridad y eficacia.' },
  { icon: Smile, title: 'Experiencia del cliente', text: 'Crear experiencias memorables a través de aromas, diseños y presentaciones que transmitan bienestar y tranquilidad.' },
  { icon: Lightbulb, title: 'Innovación', text: 'Desarrollar constantemente nuevos diseños, fragancias y colecciones que respondan a las tendencias y necesidades del mercado.' },
  { icon: Leaf, title: 'Sostenibilidad', text: 'Implementar prácticas responsables utilizando materiales ecológicos, envases reciclables y procesos que reduzcan el impacto ambiental.' },
  { icon: HeartHandshake, title: 'Bienestar comunitario', text: 'Generar un impacto positivo promoviendo el consumo responsable, apoyando la producción artesanal y fortaleciendo el desarrollo de la comunidad.' },
]

const visionKeys = [
  { icon: TrendingUp, title: 'Liderazgo en el mercado', text: 'Ser una marca líder y reconocida por la excelencia de nuestros productos artesanales.' },
  { icon: Globe2, title: 'Reconocimiento nacional e internacional', text: 'Expandir nuestra presencia a diferentes regiones y mercados internacionales.' },
  { icon: Sparkles, title: 'Innovación constante', text: 'Desarrollar continuamente nuevos productos, aromas, diseños y técnicas de elaboración.' },
  { icon: Star, title: 'Calidad insuperable', text: 'Mantener altos estándares de calidad en cada vela y jabón elaborado.' },
  { icon: Leaf, title: 'Compromiso con la sostenibilidad', text: 'Promover el uso de materiales ecológicos y procesos responsables que contribuyan a la protección del medio ambiente.' },
]

function KeyGrid({ items, tint }: { items: typeof missionKeys; tint: string }) {
  return (
    <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((k) => (
        <li key={k.title} className="rounded-3xl bg-white p-6 shadow-card">
          <span className={`grid size-12 place-items-center rounded-2xl ${tint}`}>
            <k.icon className="size-6" />
          </span>
          <h3 className="mt-4 font-extrabold">{k.title}</h3>
          <p className="mt-1 text-sm text-ink-soft">{k.text}</p>
        </li>
      ))}
    </ul>
  )
}

export function About() {
  return (
    <>
      <section className="container-page grid items-center gap-10 pt-8 lg:grid-cols-[1.2fr_1fr] lg:pt-14">
        <div>
          <p className="eyebrow">Nosotros</p>
          <h1 className="heading-xl mt-2">
            Somos <span className="font-script text-rose-600">{site.name}</span>
          </h1>
          <p className="mt-5 text-lg text-ink-soft">
            Nuestro emprendimiento está enfocado en la elaboración y comercialización de velas y jabones artesanales,
            elaborados con ingredientes de alta calidad, fragancias agradables y diseños innovadores. Nuestro propósito
            es ofrecer productos que contribuyan al bienestar, la relajación y la decoración de los hogares,
            convirtiéndose también en una alternativa especial para regalar en diferentes ocasiones.
          </p>
          <p className="mt-4 text-ink-soft">
            A través de este proyecto buscamos adquirir experiencia en el mundo del emprendimiento, fortalecer nuestras
            habilidades en la elaboración de productos artesanales y desarrollar conocimientos relacionados con la
            administración y comercialización de un negocio. Asimismo, pretendemos identificar nuevas oportunidades
            dentro del mercado de productos artesanales, naturales y decorativos.
          </p>
        </div>
        <div className="relative mx-auto w-full max-w-sm">
          <Bubbles className="animate-float absolute -top-8 right-0 w-24 sm:-right-6" />
          <img src={asset('logo.png')} alt={`Logo de ${site.name}`} className="w-full rounded-[2.5rem] bg-white p-4 shadow-soft" />
        </div>
      </section>

      <section className="container-page mt-16">
        <div className="flex flex-col gap-5 rounded-[2.5rem] bg-butter-100 p-6 sm:flex-row sm:items-start sm:p-10">
          <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-butter text-ink">
            <Target className="size-7" />
          </span>
          <div>
            <h2 className="text-2xl font-extrabold">Objetivo general</h2>
            <p className="mt-2 text-ink/80">
              Desarrollar un emprendimiento de velas y jabones artesanales que ofrezca productos de alta calidad,
              innovadores y sostenibles, satisfaciendo las necesidades y gustos de los clientes mediante experiencias de
              bienestar, relajación y cuidado personal, mientras aprendemos y adquirimos experiencia en el desarrollo de
              un negocio que fortalezca su crecimiento y promueva el cuidado del medio ambiente.
            </p>
          </div>
        </div>
      </section>

      <section className="container-page mt-20">
        <div className="max-w-3xl">
          <p className="eyebrow">Misión</p>
          <h2 className="heading-lg mt-2">Lo que hacemos cada día</h2>
          <p className="mt-4 text-lg text-ink-soft">
            Satisfacer las necesidades y expectativas de nuestros clientes ofreciendo velas y jabones artesanales de la
            más alta calidad. Nos dedicamos a crear experiencias únicas de bienestar, relajación y cuidado personal
            mediante productos innovadores, elaborados con responsabilidad, compromiso y respeto por el medio ambiente.
          </p>
        </div>
        <KeyGrid items={missionKeys} tint="bg-peach-100 text-rose-600" />
      </section>

      <section className="container-page mt-20">
        <div className="max-w-3xl">
          <p className="eyebrow !text-sage-700">Visión</p>
          <h2 className="heading-lg mt-2">Hacia dónde vamos</h2>
          <p className="mt-4 text-lg text-ink-soft">
            Convertirnos en una marca reconocida y confiable en el mercado nacional e internacional de velas y jabones
            artesanales, destacándonos por nuestra innovación, calidad, creatividad y compromiso con la sostenibilidad.
            Aspiramos a ser un referente en la creación de productos que inspiren bienestar, relajación y cuidado
            personal, generando experiencias memorables para nuestros clientes y contribuyendo al cuidado del medio
            ambiente.
          </p>
        </div>
        <KeyGrid items={visionKeys} tint="bg-sage-100 text-sage-700" />
      </section>

      <section className="container-page mt-20 text-center">
        <Link to="/catalogo" className="btn-primary text-base">
          Descubre nuestros productos
        </Link>
      </section>
    </>
  )
}
