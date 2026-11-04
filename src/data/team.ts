// 👥 Equipo de Blokie Aromas.
// Sus contactos son personales: se muestran en "Nosotros", no como canal de atención de la tienda.

export interface TeamMember {
  name: string
  role: string
  initials: string
  /** Solo dígitos, formato internacional (57 = Colombia). */
  whatsapp: string
  instagram: string
  tasks: string[]
  tint: string
}

export const team: TeamMember[] = [
  {
    name: 'Simón Flórez Ramírez',
    role: 'CEO y director comercial',
    initials: 'SF',
    whatsapp: '573013038919',
    instagram: 'sfr21882',
    tasks: [
      'Liderazgo y dirección del emprendimiento',
      'Diseño y administración de la página web',
      'Gestión de ventas y atención al cliente',
      'Supervisión general de la marca',
    ],
    tint: 'bg-peach text-ink',
  },
  {
    name: 'María José Velásquez',
    role: 'Directora de diseño y producción',
    initials: 'MJ',
    whatsapp: '573106626550',
    instagram: 'thinkaboutmajov__',
    tasks: [
      'Diseño de productos',
      'Elaboración de velas y jabones',
      'Supervisión de la calidad y presentación de los productos',
      'Desarrollo de propuestas visuales',
    ],
    tint: 'bg-rose text-ink',
  },
  {
    name: 'Sara Ospina Sánchez',
    role: 'Directora de creatividad y producción',
    initials: 'SO',
    whatsapp: '573225100772',
    instagram: '09__sos',
    tasks: [
      'Desarrollo de ideas creativas',
      'Participación en el diseño de nuevos productos',
      'Elaboración de velas y jabones',
      'Apoyo en la innovación y presentación de la marca',
    ],
    tint: 'bg-sage text-ink',
  },
  {
    name: 'Kevin Alejandro Bermúdez',
    role: 'Director de marketing y producción',
    initials: 'KB',
    whatsapp: '573193152587',
    instagram: 'kevin_bflz',
    tasks: ['Estrategias de marketing y publicidad', 'Manejo de redes sociales', 'Creación de contenido promocional'],
    tint: 'bg-butter text-ink',
  },
]

/** Muestra el número como +57 301 303 8919 */
export function formatPhone(digits: string) {
  const m = digits.match(/^(\d{2})(\d{3})(\d{3})(\d{4})$/)
  return m ? `+${m[1]} ${m[2]} ${m[3]} ${m[4]}` : `+${digits}`
}
