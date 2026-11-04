import { InstagramIcon, WhatsAppIcon } from './icons'
import { formatPhone, team } from '../data/team'

export function TeamSection() {
  return (
    <section id="equipo" className="container-page mt-20 scroll-mt-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">Nuestro equipo</p>
        <h2 className="heading-lg mt-2">Las manos detrás de cada aroma</h2>
        <p className="mt-3 text-ink-soft sm:text-lg">
          Somos cuatro emprendedores que diseñan, elaboran y cuidan cada vela y jabón de Blokie Aromas.
        </p>
      </div>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {team.map((m) => (
          <li key={m.name} className="flex flex-col rounded-[2rem] bg-white p-6 shadow-card">
            <div className="flex items-center gap-4 xl:flex-col xl:items-start">
              <span className={`grid size-16 shrink-0 place-items-center rounded-full text-xl font-extrabold ${m.tint}`} aria-hidden="true">
                {m.initials}
              </span>
              <div>
                <h3 className="text-lg leading-tight font-extrabold">{m.name}</h3>
                <p className="mt-0.5 text-sm font-bold text-rose-600">{m.role}</p>
              </div>
            </div>

            <ul className="mt-4 space-y-1.5 text-sm text-ink-soft">
              {m.tasks.map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-sage" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-col gap-2 pt-5 text-sm">
              <a
                href={`https://wa.me/${m.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-cream-200 px-4 font-semibold text-ink hover:bg-sage-100"
                aria-label={`WhatsApp de ${m.name}: ${formatPhone(m.whatsapp)}`}
              >
                <WhatsAppIcon className="size-4 text-whatsapp-700" /> {formatPhone(m.whatsapp)}
              </a>
              <a
                href={`https://www.instagram.com/${m.instagram}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-cream-200 px-4 font-semibold text-ink hover:bg-rose-100"
                aria-label={`Instagram de ${m.name}: @${m.instagram}`}
              >
                <InstagramIcon className="size-4 text-rose-600" /> @{m.instagram}
              </a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
