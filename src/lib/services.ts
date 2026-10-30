import { IMG } from "./images";

export type Service = {
  slug: string;
  name: string;
  short: string;
  seoTitle: string;
  seoDescription: string;
  heroTitle: string;
  intro: string;
  image: string;
  imageAlt: string;
  gallery: { src: string; alt: string }[];
  applications: string[];
  benefits: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
  related: string[];
  whatsapp: string;
  group: "producto" | "servicio";
};

export const SERVICES: Service[] = [
  {
    slug: "ascensores-pasajeros",
    name: "Ascensores para pasajeros",
    short: "Cabinas modernas para edificios residenciales, corporativos y comerciales.",
    seoTitle: "Ascensores para pasajeros en Colombia | Ascensores Páez",
    seoDescription: "Ascensores para pasajeros en edificios residenciales, oficinas y comercio. Asesoría técnica, instalación y mantenimiento en Colombia.",
    heroTitle: "Ascensores para pasajeros pensados para cada edificio.",
    intro: "Acompañamos a constructoras, administraciones y propietarios en la selección, instalación y mantenimiento de ascensores para pasajeros, buscando una solución acorde con el uso, el espacio disponible y la normativa aplicable.",
    image: IMG.lobby,
    imageAlt: "Lobby con varias puertas de ascensor de pasajeros",
    gallery: [
      { src: IMG.cabina, alt: "Cabina de ascensor de pasajeros con puertas abiertas" },
      { src: IMG.pasillo, alt: "Pasillo con ascensores de pasajeros" },
    ],
    applications: ["Edificios residenciales y conjuntos", "Edificios de oficinas", "Centros comerciales y locales", "Hoteles e instituciones"],
    benefits: [
      { title: "Solución según el proyecto", text: "Evaluamos el uso del edificio y el espacio disponible antes de recomendar." },
      { title: "Acompañamiento técnico", text: "Te orientamos desde la etapa de proyecto hasta la puesta en marcha." },
      { title: "Seguridad como prioridad", text: "Trabajamos con atención a la normativa técnica aplicable." },
    ],
    faqs: [
      { q: "¿Pueden asesorarnos en un edificio que aún está en construcción?", a: "Sí. Podemos revisar el proyecto con el equipo de obra para orientar la solución más adecuada." },
      { q: "¿También hacen mantenimiento a ascensores existentes?", a: "Sí, ofrecemos mantenimiento preventivo y correctivo. Escríbenos con los datos de tu equipo." },
      { q: "¿Cómo solicito una cotización?", a: "Escríbenos por WhatsApp con la ubicación y el tipo de edificio, y te contactamos para revisar el proyecto." },
    ],
    related: ["modernizacion", "mantenimiento", "adecuacion-normativa"],
    whatsapp: "Hola, Ascensores Páez. Quiero información sobre ascensores para pasajeros.",
    group: "producto",
  },
  {
    slug: "ascensores-carga",
    name: "Ascensores de carga (Montacargas)",
    short: "Transporte vertical de mercancía para industria, bodegas y comercio.",
    seoTitle: "Montacargas y ascensores de carga en Colombia | Ascensores Páez",
    seoDescription: "Montacargas para bodegas, industria y comercio. Asesoría, instalación y mantenimiento de ascensores de carga en Colombia.",
    heroTitle: "Montacargas para mover mercancía con orden y seguridad.",
    intro: "Los montacargas facilitan el traslado de mercancía entre niveles en bodegas, plantas, locales y edificios comerciales. Te ayudamos a definir la solución según el tipo de carga y la operación de tu negocio.",
    image: IMG.montacargas,
    imageAlt: "Montacargas con puertas naranjas cargado con mercancía",
    gallery: [{ src: IMG.montacargas, alt: "Montacargas industrial en operación" }],
    applications: ["Bodegas y centros de distribución", "Plantas industriales", "Restaurantes y cocinas", "Locales comerciales de varios niveles"],
    benefits: [
      { title: "Según tu operación", text: "Revisamos el tipo de carga y la frecuencia de uso para orientar la solución." },
      { title: "Menos esfuerzo manual", text: "Traslado vertical de mercancía sin depender de escaleras." },
      { title: "Soporte técnico", text: "Instalación y mantenimiento por el mismo equipo." },
    ],
    faqs: [
      { q: "¿Qué información necesitan para orientar un montacargas?", a: "El tipo de carga, los niveles a comunicar y el espacio disponible. Con eso podemos revisar el proyecto contigo." },
      { q: "¿Hacen mantenimiento a montacargas existentes?", a: "Sí, ofrecemos mantenimiento preventivo y correctivo." },
    ],
    related: ["montacoches", "mantenimiento", "instalacion"],
    whatsapp: "Hola, Ascensores Páez. Quiero información sobre montacargas / ascensores de carga.",
    group: "producto",
  },
  {
    slug: "montacoches",
    name: "Montacoches (Elevacoches)",
    short: "Elevación de vehículos entre niveles de parqueadero y sótanos.",
    seoTitle: "Montacoches y elevacoches en Colombia | Ascensores Páez",
    seoDescription: "Montacoches para edificios y parqueaderos con sótanos. Asesoría técnica, instalación y mantenimiento de elevacoches en Colombia.",
    heroTitle: "Montacoches para aprovechar cada nivel de parqueadero.",
    intro: "Cuando el espacio no permite rampas, un montacoches comunica los niveles de parqueadero. Te orientamos sobre la solución adecuada para tu edificio o proyecto.",
    image: IMG.montacoches,
    imageAlt: "Montacoches en sótano con vehículo ingresando",
    gallery: [{ src: IMG.montacoches, alt: "Plataforma de montacoches en parqueadero subterráneo" }],
    applications: ["Edificios residenciales con sótanos", "Edificios corporativos", "Parqueaderos con espacio reducido", "Concesionarios y talleres"],
    benefits: [
      { title: "Optimiza el espacio", text: "Una alternativa cuando no hay lugar para rampas vehiculares." },
      { title: "Acompañamiento en obra", text: "Revisamos el proyecto con constructores y administradores." },
      { title: "Mantenimiento disponible", text: "Soporte técnico preventivo y correctivo." },
    ],
    faqs: [
      { q: "¿Un montacoches reemplaza la rampa?", a: "En muchos proyectos con espacio limitado es una alternativa. La viabilidad depende del diseño del edificio, que revisamos contigo." },
      { q: "¿Atienden montacoches ya instalados?", a: "Sí, ofrecemos mantenimiento preventivo y correctivo." },
    ],
    related: ["ascensores-carga", "puertas-vehiculares", "mantenimiento"],
    whatsapp: "Hola, Ascensores Páez. Quiero información sobre montacoches / elevacoches.",
    group: "producto",
  },
  {
    slug: "movilidad-reducida",
    name: "Ascensores para movilidad reducida",
    short: "Accesibilidad para personas con movilidad reducida y ascensores camilleros.",
    seoTitle: "Ascensores para movilidad reducida y camilleros | Ascensores Páez",
    seoDescription: "Ascensores para personas con movilidad reducida y camilleros en clínicas, viviendas y edificios. Asesoría e instalación en Colombia.",
    heroTitle: "Accesibilidad vertical para que nadie se quede abajo.",
    intro: "Servicios para personas con movilidad reducida, sillas de ruedas y traslado de pacientes en camilla. Te ayudamos a elegir según el espacio y el tipo de usuario.",
    image: IMG.camillero,
    imageAlt: "Ascensor camillero con paciente en silla de ruedas",
    gallery: [{ src: IMG.camillero, alt: "Paciente en silla de ruedas dentro de un ascensor" }],
    applications: ["Clínicas, hospitales e IPS", "Hogares geriátricos", "Viviendas y casas de varios niveles", "Edificios públicos y comerciales"],
    benefits: [
      { title: "Inclusión real", text: "Acceso autónomo y seguro entre niveles." },
      { title: "Uso hospitalario", text: "Opciones para traslado de pacientes en camilla." },
      { title: "Asesoría cercana", text: "Escuchamos las necesidades de los usuarios antes de recomendar." },
    ],
    faqs: [
      { q: "¿Tienen soluciones para casas?", a: "Sí. Revisamos el espacio disponible para orientarte sobre la opción adecuada." },
      { q: "¿Qué es un ascensor camillero?", a: "Es un ascensor con dimensiones que permiten trasladar a un paciente en camilla con su acompañante." },
    ],
    related: ["ascensores-pasajeros", "adecuacion-normativa", "mantenimiento"],
    whatsapp: "Hola, Ascensores Páez. Quiero información sobre ascensores para movilidad reducida / camilleros.",
    group: "producto",
  },
  {
    slug: "puertas-vehiculares",
    name: "Puertas automáticas vehiculares",
    short: "Automatización de accesos vehiculares para conjuntos, empresas y casas.",
    seoTitle: "Puertas automáticas vehiculares en Colombia | Ascensores Páez",
    seoDescription: "Automatización de puertas vehiculares corredizas y de acceso para conjuntos, empresas y viviendas. Instalación y mantenimiento a nivel nacional.",
    heroTitle: "Accesos vehiculares automáticos, prácticos y seguros.",
    intro: "Automatizamos puertas de acceso vehicular para que el ingreso y la salida sean más ágiles y controlados. Te orientamos según el tipo de puerta y el uso del acceso.",
    image: IMG.puerta,
    imageAlt: "Puerta corrediza vehicular automática",
    gallery: [{ src: IMG.puerta, alt: "Acceso vehicular con puerta automática" }],
    applications: ["Conjuntos residenciales", "Empresas y bodegas", "Viviendas", "Parqueaderos"],
    benefits: [
      { title: "Comodidad", text: "Apertura sin bajarse del vehículo." },
      { title: "Control del acceso", text: "Mayor orden en el ingreso y la salida." },
      { title: "Mantenimiento", text: "Soporte técnico para que el acceso siga funcionando." },
    ],
    faqs: [
      { q: "¿Pueden automatizar una puerta que ya tengo?", a: "Es posible en muchos casos. Envíanos fotos por WhatsApp para revisarla." },
      { q: "¿Hacen mantenimiento a puertas automáticas?", a: "Sí, ofrecemos mantenimiento preventivo y correctivo." },
    ],
    related: ["montacoches", "mantenimiento", "instalacion"],
    whatsapp: "Hola, Ascensores Páez. Quiero información sobre puertas automáticas vehiculares.",
    group: "producto",
  },
  {
    slug: "escaleras-electricas",
    name: "Escaleras eléctricas",
    short: "Flujo continuo de personas en espacios comerciales e institucionales.",
    seoTitle: "Escaleras eléctricas en Colombia | Ascensores Páez",
    seoDescription: "Escaleras eléctricas para centros comerciales, instituciones y edificios de alto tráfico. Asesoría, instalación y mantenimiento a nivel nacional.",
    heroTitle: "Escaleras eléctricas para espacios de alto tránsito.",
    intro: "Las escaleras eléctricas mueven un flujo continuo de personas entre niveles. Te acompañamos en la orientación técnica, la instalación y el mantenimiento.",
    image: IMG.escalera,
    imageAlt: "Escaleras eléctricas en un edificio comercial",
    gallery: [{ src: IMG.escalera, alt: "Escaleras eléctricas modernas" }],
    applications: ["Centros comerciales", "Estaciones y terminales", "Instituciones y universidades", "Grandes superficies"],
    benefits: [
      { title: "Flujo continuo", text: "Desplazamiento constante de personas entre niveles." },
      { title: "Imagen moderna", text: "Un espacio más cómodo para visitantes y clientes." },
      { title: "Soporte técnico", text: "Mantenimiento preventivo y correctivo." },
    ],
    faqs: [
      { q: "¿Atienden escaleras eléctricas ya instaladas?", a: "Sí, escríbenos con la información del equipo para revisar el mantenimiento." },
    ],
    related: ["ascensores-pasajeros", "mantenimiento", "modernizacion"],
    whatsapp: "Hola, Ascensores Páez. Quiero información sobre escaleras eléctricas.",
    group: "producto",
  },
  {
    slug: "instalacion",
    name: "Instalación",
    short: "Montaje de equipos de transporte vertical con acompañamiento técnico.",
    seoTitle: "Instalación de ascensores en Colombia | Ascensores Páez",
    seoDescription: "Instalación de ascensores, montacargas, montacoches y escaleras eléctricas con acompañamiento técnico en Colombia.",
    heroTitle: "Instalación con acompañamiento técnico de principio a fin.",
    intro: "Coordinamos la instalación de equipos de transporte vertical con el equipo de obra, desde la revisión del proyecto hasta la puesta en marcha.",
    image: IMG.cabina,
    imageAlt: "Ascensor recién instalado con puertas abiertas",
    gallery: [{ src: IMG.pasillo, alt: "Ascensores instalados en pasillo" }, { src: IMG.montacoches, alt: "Montacoches instalado" }],
    applications: ["Obras nuevas", "Ampliaciones de edificios", "Proyectos comerciales e industriales", "Viviendas"],
    benefits: [
      { title: "Coordinación con obra", text: "Trabajamos de la mano con constructores e interventores." },
      { title: "Un solo responsable", text: "El mismo equipo puede continuar con el mantenimiento." },
      { title: "Orientación normativa", text: "Te guiamos sobre la normativa aplicable." },
    ],
    faqs: [
      { q: "¿En qué momento de la obra debo contactarlos?", a: "Lo ideal es desde la etapa de diseño, para orientar los espacios necesarios." },
    ],
    related: ["ascensores-pasajeros", "mantenimiento", "adecuacion-normativa"],
    whatsapp: "Hola, Ascensores Páez. Quiero cotizar la instalación de un equipo.",
    group: "servicio",
  },
  {
    slug: "modernizacion",
    name: "Modernización",
    short: "Actualización de equipos existentes para mejorar su funcionamiento.",
    seoTitle: "Modernización de ascensores en Colombia | Ascensores Páez",
    seoDescription: "Modernización de ascensores y equipos de transporte vertical existentes. Diagnóstico y asesoría técnica en Colombia.",
    heroTitle: "Modernización para darle una nueva vida a tu ascensor.",
    intro: "Revisamos el estado de tu equipo y te orientamos sobre los componentes que conviene actualizar para mejorar su funcionamiento, su seguridad y su imagen.",
    image: IMG.pasillo,
    imageAlt: "Pasillo con ascensores modernizados",
    gallery: [{ src: IMG.cabina, alt: "Cabina de ascensor moderna" }],
    applications: ["Edificios con equipos antiguos", "Ascensores con fallas recurrentes", "Actualización estética de cabinas", "Adecuación a requisitos vigentes"],
    benefits: [
      { title: "Diagnóstico previo", text: "Revisamos el equipo antes de proponer." },
      { title: "Inversión enfocada", text: "Priorizamos lo que realmente necesita actualización." },
      { title: "Mejor experiencia", text: "Un equipo más confiable para los usuarios." },
    ],
    faqs: [
      { q: "¿Modernizar es más conveniente que cambiar el equipo?", a: "Depende del estado del equipo. Por eso empezamos con un diagnóstico." },
    ],
    related: ["mantenimiento", "adecuacion-normativa", "ascensores-pasajeros"],
    whatsapp: "Hola, Ascensores Páez. Quiero información sobre la modernización de mi ascensor.",
    group: "servicio",
  },
  {
    slug: "mantenimiento",
    name: "Mantenimiento preventivo y correctivo",
    short: "Soporte técnico para que tus equipos funcionen de forma continua.",
    seoTitle: "Mantenimiento de ascensores en Colombia | Ascensores Páez",
    seoDescription: "Mantenimiento preventivo y correctivo de ascensores, montacargas, montacoches, escaleras eléctricas y puertas vehiculares en Colombia.",
    heroTitle: "Mantenimiento que mantiene tu edificio en movimiento.",
    intro: "Un mantenimiento constante ayuda a prevenir fallas y a mantener la seguridad de los usuarios. Atendemos el mantenimiento preventivo y correctivo de equipos de transporte vertical y accesos automáticos.",
    image: IMG.pasillo,
    imageAlt: "Ascensores en servicio en un pasillo",
    gallery: [{ src: IMG.montacargas, alt: "Montacargas en servicio" }, { src: IMG.montacoches, alt: "Montacoches en servicio" }],
    applications: ["Conjuntos residenciales", "Edificios de oficinas", "Clínicas e instituciones", "Comercio e industria"],
    benefits: [
      { title: "Preventivo", text: "Revisiones periódicas para anticipar fallas." },
      { title: "Correctivo", text: "Atención cuando el equipo presenta una novedad." },
      { title: "Atención personalizada", text: "Un contacto directo con nuestro equipo técnico." },
    ],
    faqs: [
      { q: "¿Atienden equipos instalados por otras empresas?", a: "Escríbenos con la marca y el tipo de equipo para revisar el caso." },
      { q: "¿Qué incluye el mantenimiento preventivo?", a: "Revisiones periódicas del equipo. El alcance se define según el equipo y su uso." },
    ],
    related: ["modernizacion", "adecuacion-normativa", "ascensores-pasajeros"],
    whatsapp: "Hola, Ascensores Páez. Necesito información sobre mantenimiento de un equipo.",
    group: "servicio",
  },
  {
    slug: "adecuacion-normativa",
    name: "Adecuación a la normativa",
    short: "Orientación para ajustar tus equipos a la NTC 5926-1 y NTC 5926-3.",
    seoTitle: "Adecuación de ascensores a la NTC 5926 | Ascensores Páez",
    seoDescription: "Orientación y adecuación de ascensores a la normativa técnica NTC 5926-1 y NTC 5926-3 en Colombia.",
    heroTitle: "Adecuación a la NTC 5926-1 y NTC 5926-3.",
    intro: "Las normas técnicas NTC 5926-1 y NTC 5926-3 establecen requisitos para la revisión de equipos de transporte vertical. Te orientamos sobre los ajustes que tu equipo puede necesitar para cumplirlas.",
    image: IMG.cabina,
    imageAlt: "Ascensor con puertas abiertas en un edificio",
    gallery: [{ src: IMG.lobby, alt: "Lobby de edificio con ascensores" }],
    applications: ["Administraciones de propiedad horizontal", "Edificios comerciales", "Instituciones", "Industria"],
    benefits: [
      { title: "Orientación clara", text: "Te explicamos qué aplica a tu equipo." },
      { title: "Ajustes técnicos", text: "Realizamos las adecuaciones que se identifiquen." },
      { title: "Seguridad", text: "Más tranquilidad para administración y usuarios." },
    ],
    faqs: [
      { q: "¿Qué es la NTC 5926?", a: "Es la norma técnica colombiana que define requisitos de revisión para equipos de transporte vertical. Las partes 1 y 3 aplican a ascensores y otros equipos." },
      { q: "¿Pueden revisar qué le falta a mi equipo?", a: "Sí. Escríbenos y coordinamos una revisión." },
    ],
    related: ["mantenimiento", "modernizacion", "ascensores-pasajeros"],
    whatsapp: "Hola, Ascensores Páez. Necesito orientación sobre la adecuación a la NTC 5926.",
    group: "servicio",
  },
];

// Consolidated master service reuses the approved existing equipment content.
const elevatorTypes = SERVICES.filter((s) => ["ascensores-pasajeros", "ascensores-carga", "montacoches", "movilidad-reducida"].includes(s.slug));
export const MASTER_SERVICES: Service[] = [
  {
    slug: "ascensores", name: "Ascensores",
    short: "Diseño, instalación, mantenimiento y modernización de sistemas de transporte vertical (Pasajeros, Carga, Montacoches y Movilidad Reducida).",
    seoTitle: "Ascensores | Ascensores Páez S.A.S.",
    seoDescription: "Diseño, instalación, mantenimiento y modernización de ascensores para pasajeros, carga, montacoches y movilidad reducida a nivel nacional en Colombia.",
    heroTitle: "Ascensores",
    intro: "Diseño, instalación, mantenimiento y modernización de sistemas de transporte vertical (Pasajeros, Carga, Montacoches y Movilidad Reducida).",
    image: IMG.lobby, imageAlt: "Lobby con ascensores",
    gallery: elevatorTypes.map((s) => ({ src: s.image, alt: s.imageAlt })),
    applications: elevatorTypes.map((s) => s.name),
    benefits: elevatorTypes.flatMap((s) => s.benefits).slice(0, 3),
    faqs: elevatorTypes.flatMap((s) => s.faqs).slice(0, 3),
    related: ["mantenimiento", "modernizacion", "adecuacion-normativa"],
    whatsapp: "Hola, Ascensores Páez. Quiero cotizar y recibir asesoría sobre ascensores.", group: "producto",
  },
  ...SERVICES.filter((s) => ["puertas-vehiculares", "escaleras-electricas"].includes(s.slug)).map((s) => ({
    ...s,
    name: s.slug === "puertas-vehiculares" ? "Puertas Automáticas Vehiculares" : "Escaleras Eléctricas",
    short: s.slug === "puertas-vehiculares"
      ? "Automatización, reparación y mantenimiento preventivo de accesos vehiculares de alta disponibilidad para conjuntos residenciales, viviendas, parqueaderos y empresas."
      : "Mantenimiento preventivo, correctivo y soporte técnico especializado para escaleras mecánicas comerciales e institucionales.",
  })),
];

export const getService = (slug: string) => MASTER_SERVICES.find((s) => s.slug === slug) ?? SERVICES.find((s) => s.slug === slug);

export const ELEVATOR_BLOCKS = [
  { id: "pasajeros", slug: "ascensores-pasajeros", title: "Ascensores para Pasajeros", image: IMG.lobby, imageAlt: "Lobby con ascensores para pasajeros", text: "Instalación, mantenimiento y modernización de ascensores de pasajeros. Garantizamos el confort, la seguridad y el flujo eficiente de usuarios en edificios residenciales, corporativos y comerciales, adaptando la tecnología a las necesidades de tu estructura.", whatsapp: "Hola, quiero cotizar un ascensor para pasajeros" },
  { id: "carga", slug: "ascensores-carga", title: "Ascensores de Carga (Montacargas)", image: IMG.montacargas, imageAlt: "Montacargas industrial con mercancía", text: "Sistemas robustos de transporte vertical para mercancías pesadas. Diseñados para soportar altas exigencias logísticas en industrias, bodegas y centros comerciales, asegurando un traslado rápido, seguro y con la máxima resistencia mecánica.", whatsapp: "Hola, quiero cotizar un ascensor de carga (montacargas)" },
  { id: "montacoches", slug: "montacoches", title: "Montacoches (Elevacoches)", image: IMG.montacoches, imageAlt: "Montacoches en un parqueadero subterráneo", text: "Optimización de espacio y elevación vehicular entre niveles de parqueaderos y sótanos. Ofrecemos soluciones de alta ingeniería estructural para mover vehículos de forma segura, silenciosa y eficiente en proyectos con espacio limitado.", whatsapp: "Hola, quiero cotizar un montacoches (elevacoches)" },
  { id: "movilidad-reducida", slug: "movilidad-reducida", title: "Ascensores para Movilidad Reducida y Camilleros", image: IMG.camillero, imageAlt: "Persona en silla de ruedas acompañada dentro de un ascensor", text: "Accesibilidad total y soluciones de movilidad médica. Desarrollamos e intervenimos equipos diseñados bajo estrictos parámetros de suavidad, dimensiones reglamentarias y seguridad para clínicas, hospitales, IPS y espacios públicos o residenciales.", whatsapp: "Hola, quiero cotizar un ascensor para movilidad reducida y camilleros" },
] as const;

export function elevatorAnchor(slug: string): string | undefined {
  return ELEVATOR_BLOCKS.find((block) => block.slug === slug)?.id;
}

export const CURRENT_SERVICE_SLUGS = ["ascensores", "puertas-vehiculares", "escaleras-electricas", "instalacion", "modernizacion", "mantenimiento", "adecuacion-normativa"];
