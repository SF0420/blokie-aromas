// 🕯️🧼 Catálogo de productos. Precios en COP de ejemplo: ajústalos a tus precios reales.
// Las imágenes son referenciales; reemplaza los archivos en /public/images por fotos reales.

export type Category = 'velas' | 'jabones' | 'kits'

export interface Product {
  id: string
  name: string
  category: Category
  price: number
  aroma: string
  short: string
  description: string
  details: string[]
  image: string
  badge?: string
  featured?: boolean
}

export const categories: { id: Category; label: string; description: string }[] = [
  { id: 'velas', label: 'Velas', description: 'Ceras naturales y aromas que transforman tu espacio.' },
  { id: 'jabones', label: 'Jabones', description: 'Cuidado suave para tu piel, hechos a mano.' },
  { id: 'kits', label: 'Kits de regalo', description: 'Combinaciones listas para sorprender.' },
]

export const products: Product[] = [
  // ——— Velas ———
  {
    id: 'vela-vainilla-coco',
    name: 'Vela Vainilla & Coco',
    category: 'velas',
    price: 32000,
    aroma: 'Vainilla, coco',
    short: 'Cera de soya en vaso de vidrio reutilizable.',
    description:
      'Una vela cálida y cremosa que llena tu hogar de dulzura. Elaborada con cera de soya y mecha de algodón para una combustión limpia y pareja.',
    details: ['Cera de soya 100%', '180 g · ~35 horas', 'Mecha de algodón', 'Vaso reutilizable'],
    image: 'images/vela-soya.jpg',
    badge: 'Más vendida',
    featured: true,
  },
  {
    id: 'trio-velas-lavanda',
    name: 'Trío de Velas Lavanda',
    category: 'velas',
    price: 45000,
    aroma: 'Lavanda, eucalipto',
    short: 'Tres velas en frasco para relajarte.',
    description:
      'Tres velas en frasco de vidrio con aroma a lavanda y un toque de eucalipto. Perfectas para crear un ambiente de calma en tu habitación o baño.',
    details: ['3 frascos de 90 g', '~20 horas cada una', 'Cera de soya', 'Frascos reciclables'],
    image: 'images/velas-frasco.jpg',
    featured: true,
  },
  {
    id: 'vela-pilar-canela',
    name: 'Vela Pilar Canela & Naranja',
    category: 'velas',
    price: 28000,
    aroma: 'Canela, naranja',
    short: 'Pilar decorativo con aroma especiado.',
    description:
      'Una vela pilar con notas de canela y cáscara de naranja, ideal para decorar tu mesa y darle a tu hogar un aroma acogedor.',
    details: ['Cera de parafina vegetal', '7 × 10 cm', '~40 horas', 'Aroma especiado'],
    image: 'images/vela-pilar.jpg',
  },
  {
    id: 'vela-cera-abejas',
    name: 'Vela de Cera de Abejas',
    category: 'velas',
    price: 24000,
    aroma: 'Miel natural',
    short: 'Enrollada a mano con lámina de panal.',
    description:
      'Vela de cera de abejas enrollada a mano. Desprende un suave aroma natural a miel y una llama dorada y brillante.',
    details: ['Cera de abejas pura', '20 cm de alto', '~8 horas', 'Sin fragancias añadidas'],
    image: 'images/velas-cera.jpg',
    badge: 'Natural',
  },
  {
    id: 'set-tealight',
    name: 'Set x12 Velas Tealight',
    category: 'velas',
    price: 30000,
    aroma: 'Surtido de aromas',
    short: 'Doce mini velas de colores y aromas.',
    description:
      'Doce velas tipo tealight en colores pastel con aromas surtidos: frutos rojos, vainilla, lavanda y limón. Ideales para centros de mesa y difusores.',
    details: ['12 unidades', '~4 horas cada una', 'Colores surtidos', 'Base de aluminio reciclable'],
    image: 'images/vela-tealight.jpg',
    featured: true,
  },
  {
    id: 'kit-velas-frutos-rojos',
    name: 'Velas Frutos Rojos x4',
    category: 'velas',
    price: 52000,
    aroma: 'Frutos rojos',
    short: 'Cuatro velas en vaso para ambientar.',
    description:
      'Cuatro velas en vaso de vidrio con aroma frutal y dulce. Su luz cálida crea un ambiente especial para cenas y celebraciones.',
    details: ['4 vasos de 120 g', '~25 horas cada una', 'Cera de soya', 'Aroma frutal'],
    image: 'images/velas-varias.jpg',
  },

  // ——— Jabones ———
  {
    id: 'jabon-avena-miel',
    name: 'Jabón Avena & Miel',
    category: 'jabones',
    price: 14000,
    aroma: 'Avena, miel',
    short: 'Exfoliación suave para piel sensible.',
    description:
      'Jabón artesanal con avena coloidal y miel que limpia, exfolia suavemente e hidrata. Ideal para pieles sensibles.',
    details: ['100 g', 'Avena coloidal y miel', 'Sin parabenos', 'Apto para piel sensible'],
    image: 'images/jabon-artesanal.jpg',
    badge: 'Favorito',
    featured: true,
  },
  {
    id: 'duo-lavanda-verbena',
    name: 'Dúo Lavanda & Verbena',
    category: 'jabones',
    price: 24000,
    aroma: 'Lavanda, verbena',
    short: 'Dos jabones frescos y relajantes.',
    description:
      'Un dúo de jabones vegetales: verbena de limón para despertar los sentidos y lavanda para relajarte al final del día.',
    details: ['2 × 100 g', 'Aceites vegetales', 'Aroma herbal fresco', 'Empaque compostable'],
    image: 'images/jabon-lavanda-verbena.jpg',
    featured: true,
  },
  {
    id: 'jabon-oliva-laurel',
    name: 'Jabón Oliva & Laurel',
    category: 'jabones',
    price: 16000,
    aroma: 'Oliva, laurel',
    short: 'Nutritivo, de inspiración tradicional.',
    description:
      'Jabón con aceite de oliva y laurel, de inspiración tradicional. Nutre profundamente y es apto para rostro, cuerpo y cabello.',
    details: ['120 g', 'Aceite de oliva', 'Aceite de laurel', 'Rostro, cuerpo y cabello'],
    image: 'images/jabon-marsella.jpg',
  },
  {
    id: 'jabon-rosas',
    name: 'Jabón de Rosas',
    category: 'jabones',
    price: 13000,
    aroma: 'Rosa',
    short: 'Delicado aroma floral y color natural.',
    description:
      'Jabón con extracto de rosa y arcilla rosada que limpia con suavidad y deja un delicado aroma floral en tu piel.',
    details: ['100 g', 'Arcilla rosada', 'Extracto de rosa', 'Color natural'],
    image: 'images/jabon-nizza.jpg',
  },
  {
    id: 'jabon-eucalipto-menta',
    name: 'Jabón Eucalipto & Menta',
    category: 'jabones',
    price: 15000,
    aroma: 'Eucalipto, menta',
    short: 'Frescura herbal para la ducha.',
    description:
      'Jabón refrescante con aceites esenciales de eucalipto y menta. Perfecto para empezar el día con energía.',
    details: ['110 g', 'Aceites esenciales', 'Efecto refrescante', 'Hecho a mano'],
    image: 'images/jabon-pino.jpg',
  },

  // ——— Kits ———
  {
    id: 'kit-bienestar',
    name: 'Kit Bienestar',
    category: 'kits',
    price: 55000,
    aroma: 'Vainilla, lavanda',
    short: 'Vela + 2 jabones en caja de regalo.',
    description:
      'Nuestro kit para consentir: una vela Vainilla & Coco y el dúo de jabones Lavanda & Verbena, presentados en una caja de regalo con moño y tarjeta personalizada.',
    details: ['1 vela de 180 g', '2 jabones de 100 g', 'Caja de regalo con moño', 'Tarjeta con mensaje'],
    image: 'images/vela-soya.jpg',
    badge: 'Ideal para regalar',
    featured: true,
  },
  {
    id: 'kit-spa-casa',
    name: 'Kit Spa en Casa',
    category: 'kits',
    price: 68000,
    aroma: 'Surtido',
    short: 'Set de tealights + 3 jabones.',
    description:
      'Convierte tu baño en un spa: set de 12 velas tealight, jabón de avena, jabón de rosas y jabón de eucalipto.',
    details: ['12 velas tealight', '3 jabones artesanales', 'Caja kraft reciclable', 'Tarjeta con mensaje'],
    image: 'images/vela-tealight.jpg',
  },
]

export function getProduct(id: string) {
  return products.find((p) => p.id === id)
}
