import { BiblicalResourceProduct, CouponCode } from '../types';

export const BIBLICAL_PRODUCTS: BiblicalResourceProduct[] = [
  {
    id: 'res-guia-estudio-genesis-1',
    title: 'Génesis 1: Guía de Estudio Exegético y Teológico',
    subtitle: 'Manual inductivo de 72 páginas para líderes, pastores y maestros',
    description: 'Profundiza en el relato original de la Creación con análisis verso a verso en hebreo bíblico básico, notas históricas, preguntas para grupos y aplicaciones contemporáneas.',
    fullDescription: 'Esta guía de estudio exegético es una herramienta indispensable para maestros de seminario, pastores y líderes de grupos pequeños. Explora con rigor teológico y devocional cada uno de los 7 días de la Creación en Génesis 1:1 al 2:3. Contiene diagramas cronológicos, tablas comparativas de términos hebreos clave (Bara, Asah, Elohim), bosquejos listos para predicar y hojas de trabajo para discipulado.',
    price: 14.99,
    originalPrice: 24.99,
    currency: 'USD',
    category: 'guias',
    categoryLabel: 'Guías de Estudio',
    format: 'digital',
    formatLabel: 'Digital (PDF Imprimible)',
    tags: ['Génesis 1', 'Exégesis', 'Teología', 'Predicación', 'Liderazgo'],
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507842229440-20cf25b6a7a7?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviewsCount: 48,
    isBestSeller: true,
    scriptureReference: 'Génesis 1:1 - 2:3',
    features: [
      '72 páginas en formato PDF de alta resolución listo para imprimir',
      'Bosquejos homiléticos listos para sermones dominicales',
      'Glosario etimológico de palabras en hebreo antiguo',
      'Guía de discusión interactiva con preguntas para grupos pequeños',
      'Licencia de reproducción para toda tu congregación o aula local'
    ],
    whatsIncluded: [
      'PDF Principal: Guía de Estudio Génesis 1 (72 págs)',
      'PDF Anexo: Hojas de trabajo para estudiantes (14 págs)',
      'Presentación diapositivas en formato digital editable'
    ],
    specifications: [
      { label: 'Formato', value: 'PDF interactivo (A4 y Carta)' },
      { label: 'Páginas', value: '72 páginas' },
      { label: 'Idioma', value: 'Español (Reina-Valera 1960 y NTV)' },
      { label: 'Nivel', value: 'Intermedio - Avanzado' },
      { label: 'Entrega', value: 'Descarga digital inmediata + Enlace permanente' }
    ],
    samplePreviewPages: [
      {
        title: 'Sección 1: El Principio (Génesis 1:1-2)',
        excerpt: '«Bereshit bara Elohim...» El término bara implica una creación exclusiva de la deidad soberana. La tierra estaba sin orden y vacía (tohu vavohu), no por caos eterno, sino esperando la voz estructuradora del Creador.'
      },
      {
        title: 'Día Cuatro: Las Lumbreras Gobernantes',
        excerpt: 'El sol y la luna no son deidades adorables, sino siervos del Creador puestos para señalar tiempos, estaciones, días y años. El autor desmitifica la cosmología pagana circundante.'
      }
    ],
    samplePdfUrl: '#sample-guia-estudio',
    downloadUrl: '#download-guia-estudio-pdf',
    sku: 'REC-GEN1-GUIA-001',
    gtin: '0789012345601',
    brand: 'Editorial Creación Bíblica',
    inStock: true,
    stockQuantity: 999,
    googleProductCategory: '677'
  },
  {
    id: 'res-cuaderno-ninos-creacion',
    title: 'Mega Cuaderno de Actividades: Los 7 Días de la Creación',
    subtitle: '54 actividades dinámicas con colorear, laberintos, sopas y versículos para niños',
    description: 'Diseñado especialmente para escuelas bíblicas dominicales y educación en casa (homeschooling). Enseña la verdad de la Creación a través del juego constructivo y el arte.',
    fullDescription: 'El Cuaderno de Actividades "Los 7 Días de la Creación" cautivará la imaginación de niños de 4 a 11 años. Cada día de la creación cuenta con 7 actividades progresivas: conecta los puntos bíblicos, laberinto de la luz y tinieblas, colorea las aves y peces según su especie, y ejercicios de caligrafía con versículos bíblicos de memoria.',
    price: 9.99,
    originalPrice: 16.99,
    currency: 'USD',
    category: 'ninos',
    categoryLabel: 'Escuela Dominical & Niños',
    format: 'digital',
    formatLabel: 'Digital (PDF Imprimible)',
    tags: ['Niños', 'Escuela Dominical', 'Colorear', 'Génesis 1', 'Actividades'],
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 5.0,
    reviewsCount: 63,
    isBestSeller: true,
    scriptureReference: 'Génesis 1:1-31 & Salmos 139:14',
    features: [
      '54 páginas ilustradas a mano de alta calidad',
      'Actividades graduadas para edades de 4 a 11 años',
      'Versículos clave con tipografía punteada para practicar escritura',
      'Páginas de recortar y armar dioramas tridimensionales de la Creación',
      'Certificado de finalización a color para premiar al niño'
    ],
    whatsIncluded: [
      'Libro de actividades completo en PDF de alta calidad',
      'Plantillas para recortar y armar el móvil de los 7 días',
      'Diploma de mérito bíblico editable'
    ],
    specifications: [
      { label: 'Formato', value: 'PDF imprimible ilimitadas veces' },
      { label: 'Páginas', value: '54 páginas listas para fotocopiar' },
      { label: 'Edades', value: '4 a 11 años' },
      { label: 'Resolución', value: '300 DPI vectorial para impresión nítida' }
    ],
    samplePreviewPages: [
      {
        title: 'Día 3: El Gran Tapiz Verde',
        excerpt: '¡Ayuda al jardinero a clasificar los árboles que dan semilla! Laberinto del tallo y rompecabezas de versículos.'
      },
      {
        title: 'Día 5: Criaturas del Mar y Cielo',
        excerpt: 'Une los números del 1 al 50 para revelar la gran ballena creada en el quinto día según Génesis 1:21.'
      }
    ],
    samplePdfUrl: '#sample-cuaderno-ninos',
    downloadUrl: '#download-cuaderno-ninos-pdf',
    sku: 'REC-GEN1-NINOS-002',
    gtin: '0789012345602',
    brand: 'Editorial Creación Bíblica',
    inStock: true,
    stockQuantity: 999,
    googleProductCategory: '677'
  },
  {
    id: 'res-flashcards-creacion-set',
    title: 'Set de Flashcards Coleccionables: La Creación Día por Día',
    subtitle: '28 tarjetas visuales laminables con datos bíblicos, versículos y mnemotecnia',
    description: 'Tarjetas didácticas de doble cara con ilustraciones artísticas premium de cada día de la creación, versículos de memoria en RVR1960 y preguntas de autoevaluación.',
    fullDescription: 'Las Flashcards Bíblicas de la Creación están creadas para facilitar la memorización visual y activa tanto en familias cristianas como en clases dominicales. El anverso contiene una ilustración vibrante y el número del día; el reverso incluye el versículo clave, el significado teológico condensado y una pregunta de repaso con pista bíblica.',
    price: 11.50,
    originalPrice: 18.00,
    currency: 'USD',
    category: 'flashcards',
    categoryLabel: 'Tarjetas & Flashcards',
    format: 'digital',
    formatLabel: 'Digital (Listas para recortar)',
    tags: ['Flashcards', 'Memorización', 'Días de la Creación', 'Visuales'],
    coverImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    reviewsCount: 31,
    isNew: true,
    scriptureReference: 'Génesis 1:1 - Génesis 2:2',
    features: [
      '28 tarjetas en total (4 por cada día de la creación + tarjetas resumen)',
      'Diseño listo para imprimir en cartulina o papel opalina y laminar',
      'Mnemotecnia visual para recordar el orden de los 7 días sin esfuerzo',
      'Versículos en Reina-Valera 1960 y Nueva Traducción Viviente'
    ],
    whatsIncluded: [
      'Archivo PDF con marcas de corte exactas (4 tarjetas por hoja A4/Carta)',
      'Guía de 5 dinámicas y juegos en equipo usando las tarjetas'
    ],
    specifications: [
      { label: 'Cantidad', value: '28 tarjetas doble cara' },
      { label: 'Tamaño sugerido', value: '10 cm x 14 cm por tarjeta' },
      { label: 'Formato', value: 'PDF digital en color CMYK para imprenta' }
    ],
    samplePreviewPages: [
      {
        title: 'Tarjeta Día 1: La Luz',
        excerpt: 'Anverso: Ilustración de la luz irrumpiendo en las tinieblas. Reverso: «Sea la luz; y fue la luz» (Gn 1:3). Aplicación: Cristo como la luz verdadera (Jn 1:9).'
      }
    ],
    samplePdfUrl: '#sample-flashcards',
    downloadUrl: '#download-flashcards-pdf',
    sku: 'REC-GEN1-FLASH-003',
    gtin: '0789012345603',
    brand: 'Editorial Creación Bíblica',
    inStock: true,
    stockQuantity: 999,
    googleProductCategory: '677'
  },
  {
    id: 'res-kit-maestros-escuela-dominical',
    title: 'Kit Completo para Maestros de Escuela Dominical: Génesis 1',
    subtitle: 'Plan pedagógico de 4 lecciones completas con dinámicas, teatro, manualidades y visuales',
    description: 'Todo lo que un maestro o líder infantil necesita para enseñar el relato de la Creación durante un mes entero con excelencia, fidelidad bíblica y diversión.',
    fullDescription: 'El Kit de Escuela Dominical elimina horas de preparación semanal. Contiene 4 lecciones bíblicas redactadas con objetivos claros (Cognitivo, Afectivo y Conductual), guiones para títeres u obras cortas, lista de materiales accesibles, patrones de manualidades y diapositivas proyectables para pantalla grande.',
    price: 19.99,
    originalPrice: 35.00,
    currency: 'USD',
    category: 'kits',
    categoryLabel: 'Kits para Maestros',
    format: 'digital',
    formatLabel: 'Pack Digital Todo en Uno',
    tags: ['Maestros', 'Curriculum', 'Escuela Dominical', 'Clases', 'Manualidades'],
    coverImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviewsCount: 52,
    isBestSeller: true,
    scriptureReference: 'Génesis 1 y 2',
    features: [
      '4 planes de clase semanales de 60-90 minutos cada uno',
      '4 guiones teatrales interactivos con los niños',
      'Manual paso a paso de 8 manualidades bíblicas con materiales reciclables',
      'Archivos de imágenes HD para proyector o pantalla de iglesia',
      'Devocionales preparatorios para el maestro antes de cada clase'
    ],
    whatsIncluded: [
      'Manual del Maestro en PDF (96 páginas)',
      'Carpeta de recursos visuales HD para PowerPoint y Canva',
      'Guía de juegos de relevos y dinámicas grupales bíblicas'
    ],
    specifications: [
      { label: 'Duración', value: '4 semanas completas de enseñanza' },
      { label: 'Archivos', value: 'Pack digital ZIP con PDFs y recursos gráficos' },
      { label: 'Edades recomendadas', value: '5 a 12 años (adaptable)' }
    ],
    samplePreviewPages: [
      {
        title: 'Lección 1: Dios Habla y Todo Existe',
        excerpt: 'Objetivo: Que los niños reconozcan que la palabra de Dios tiene poder absoluto. Dinámica de apertura: El frasco de luz fosforescente.'
      }
    ],
    samplePdfUrl: '#sample-kit-maestros',
    downloadUrl: '#download-kit-maestros-zip',
    sku: 'REC-GEN1-KIT-004',
    gtin: '0789012345604',
    brand: 'Editorial Creación Bíblica',
    inStock: true,
    stockQuantity: 999,
    googleProductCategory: '677'
  },
  {
    id: 'res-biblia-estudio-cronologica-fisica',
    title: 'Biblia de Estudio Ilustrada: La Historia Sagrada Cronológica',
    subtitle: 'Edición física de lujo con mapas a color, cronologías y notas de Génesis al Apocalipsis',
    description: 'Ejemplar encuadernado en símil cuero con canto dorado, cinta marcadora y más de 350 ilustraciones y notas exegéticas profundas sobre los orígenes.',
    fullDescription: 'Una joya editorial para tu biblioteca personal. Esta biblia presenta el texto sagrado con una contextualización histórica inigualable. El libro de Génesis incluye reconstrucciones arqueológicas, mapas de la media luna fértil, gráficos genealógicos detallados y comentarios de teólogos hispanoamericanos reconocidos.',
    price: 49.99,
    originalPrice: 65.00,
    currency: 'USD',
    category: 'libros',
    categoryLabel: 'Devocionales & Libros',
    format: 'fisico',
    formatLabel: 'Físico (Envío a domicilio)',
    tags: ['Biblia Física', 'Estudio', 'Cronológica', 'Tapa Dura', 'Colección'],
    coverImage: 'https://images.unsplash.com/photo-1507842229440-20cf25b6a7a7?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1507842229440-20cf25b6a7a7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 5.0,
    reviewsCount: 89,
    isBestSeller: true,
    scriptureReference: 'Toda la Biblia (Énfasis Génesis 1-11)',
    features: [
      'Encuadernación de lujo en imitación piel marrón con grabados en relieve',
      'Papel biblia especial de alta opacidad que evita el traspaso de tinta',
      'Más de 400 notas de estudio al pie de página enfocadas en el texto original',
      'Sección especial de 48 páginas a todo color sobre la Creación y el Edén',
      'Envío internacional asegurado con código de seguimiento'
    ],
    whatsIncluded: [
      '1x Biblia Física encuadernada en caja rígida protectora',
      'Marcapáginas de tela cosido',
      'Acceso digital de cortesía a la biblioteca online de mapas bíblicos'
    ],
    specifications: [
      { label: 'Peso', value: '1.2 kg' },
      { label: 'Dimensiones', value: '16.5 x 24 x 4 cm' },
      { label: 'Texto', value: 'Tipografía Comfort Print 10.5 puntos' },
      { label: 'Traducción', value: 'Reina-Valera 1960 oficial' },
      { label: 'Tiempo de envío', value: '3 a 7 días hábiles' }
    ],
    samplePreviewPages: [
      {
        title: 'Estudio Especial: La Teología de Génesis 1:26-28',
        excerpt: 'La Imago Dei (Imagen de Dios) otorga dignidad infinita e intrínseca a cada ser humano desde la concepción, sin distinciones raciales ni sociales.'
      }
    ],
    sku: 'REC-GEN1-BIB-FIS-005',
    gtin: '0789012345605',
    brand: 'Editorial Creación Bíblica',
    inStock: true,
    stockQuantity: 45,
    googleProductCategory: '677',
    weight: '1.2 kg'
  },
  {
    id: 'res-devocional-30-dias-creador',
    title: 'Devocional: 30 Días Contemplando al Creador',
    subtitle: 'Lecturas diarias que conectan Génesis 1 con tu propósito y vida cotidiana',
    description: 'Un viaje de 30 días para pausar el ruido del mundo, meditar en la sabiduría del Creador y renovar tu fe a través de devocionales profundos y oraciones dirigidas.',
    fullDescription: '¿Cómo afecta hoy el hecho de que Dios creó el universo con Su palabra? Este libro devocional toma las verdades eternas de Génesis 1 y las aplica a tus luchas, tus anhelos y tu vocación diaria. Cada devocional consta de 3 páginas: el texto bíblico del día, la reflexión teológico-práctica y preguntas de introspección para tu diario espiritual.',
    price: 8.99,
    originalPrice: 14.00,
    currency: 'USD',
    category: 'libros',
    categoryLabel: 'Devocionales & Libros',
    format: 'digital',
    formatLabel: 'Digital (PDF + ePub para Kindle)',
    tags: ['Devocional', 'Oración', 'Vida Espiritual', 'Génesis 1', 'Reflexión'],
    coverImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    reviewsCount: 27,
    scriptureReference: 'Génesis 1 & Romanos 1:20',
    features: [
      '30 reflexiones devocionales con aplicación práctica',
      'Formatos incluidos: PDF para impresión y ePub para Kindle y iPad',
      'Guía de oración diaria con motivos específicos',
      'Espacio diseñado para apuntes y notas espirituales personales'
    ],
    whatsIncluded: [
      'Archivo PDF maquetado para lectura en dispositivos y computadoras',
      'Archivo ePub compatible con lectores de libros electrónicos'
    ],
    specifications: [
      { label: 'Formato', value: 'PDF + ePub libre de DRM' },
      { label: 'Páginas', value: '112 páginas' },
      { label: 'Autor', value: 'Pastor y Teólogo Dr. M. Armenteros' }
    ],
    samplePreviewPages: [
      {
        title: 'Día 7: El Descanso Sagrado en un Mundo Agotado',
        excerpt: 'Dios no descansó porque estuviera cansado, sino porque Su obra era completa y perfecta. El Shabat es una invitación a confiar en que Dios sostiene el mundo aun cuando nosotros nos detenemos.'
      }
    ],
    samplePdfUrl: '#sample-devocional',
    downloadUrl: '#download-devocional-pdf',
    sku: 'REC-GEN1-DEV-006',
    gtin: '0789012345606',
    brand: 'Editorial Creación Bíblica',
    inStock: true,
    stockQuantity: 999,
    googleProductCategory: '677'
  },
  {
    id: 'res-poster-infografia-creacion',
    title: 'Póster Infográfico Gigante: La Línea del Tiempo de la Creación',
    subtitle: 'Infografía en ultra alta definición para aulas, templos y hogares (A1 / A2 / A3)',
    description: 'Diagrama visual asombroso que explica la correspondencia armónica entre los días 1-3 (formación) y los días 4-6 (llenado) de la Creación de Génesis 1.',
    fullDescription: 'Este póster infográfico desglosa visualmente la estructura literaria de Génesis 1. Muestra claramente la simetría entre los primeros tres días donde Dios forma los reinos, y los siguientes tres días donde Dios los puebla con habitantes. Imprescindible para colgar en el salón de clases bíblico o en el rincón de estudio del hogar.',
    price: 6.99,
    originalPrice: 12.00,
    currency: 'USD',
    category: 'guias',
    categoryLabel: 'Guías de Estudio',
    format: 'digital',
    formatLabel: 'Archivo Digital HD Vectorial',
    tags: ['Infografía', 'Póster', 'Decoración Cristiana', 'Génesis 1'],
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.7,
    reviewsCount: 19,
    scriptureReference: 'Génesis 1:1 - Génesis 2:4',
    features: [
      'Resolución ultra nítida de 600 DPI lista para imprimir en gigantografía',
      'Medidas estándar: A1 (59x84cm), A2 (42x59cm) y Tabloide',
      'Esquema pedagógico de correspondencia Formación vs Llenado',
      'Gráficos de los astros, luminarias y ecosistemas según el texto bíblico'
    ],
    whatsIncluded: [
      '3 archivos PDF en alta definición (tamaños A1, A2 y Carta)',
      '1 archivo JPG en ultra-alta resolución (8000x5600 px)'
    ],
    specifications: [
      { label: 'Resolución', value: 'Vectorial / 600 DPI' },
      { label: 'Perfil de Color', value: 'CMYK listo para imprenta' }
    ],
    samplePreviewPages: [
      {
        title: 'Detalle de la Infografía: Días de Preparación vs Habitantes',
        excerpt: 'Día 1 Luz <-> Día 4 Sol, Luna y Estrellas. Día 2 Cielo y Mares <-> Día 5 Aves y Peces. Día 3 Tierra y Plantas <-> Día 6 Animales y el Hombre.'
      }
    ],
    samplePdfUrl: '#sample-poster',
    downloadUrl: '#download-poster-zip',
    sku: 'REC-GEN1-POST-007',
    gtin: '0789012345607',
    brand: 'Editorial Creación Bíblica',
    inStock: true,
    stockQuantity: 999,
    googleProductCategory: '677'
  },
  {
    id: 'res-guia-gratuita-mnemotecnia',
    title: 'Guía Rápida Gratuita: Cómo Memorizar los 7 Días de la Creación',
    subtitle: 'Método mnemotécnico cristiano con versículos ilustrados y canciones infantiles',
    description: 'Recurso 100% gratuito de bienvenida. Aprende y enseña a cualquier persona los 7 días de la Creación en menos de 10 minutos utilizando el método bíblico asociativo.',
    fullDescription: 'Ponemos a disposición de la comunidad cristiana este recurso gratuito sin costo alguno. Una guía práctica de 12 páginas con rimas mnemotécnicas, posiciones corporales para los más pequeños y un resumen teológico conciso de Génesis 1 para afianzar la fe en Dios como Creador y Sustentador de todo lo existente.',
    price: 0.00,
    originalPrice: 7.00,
    currency: 'USD',
    category: 'gratuitos',
    categoryLabel: 'Materiales Gratuitos',
    format: 'digital',
    formatLabel: 'Descarga Gratuita Inmediata',
    tags: ['Gratis', 'Mnemotecnia', 'Génesis 1', 'Memorización', 'Regalo'],
    coverImage: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 5.0,
    reviewsCount: 142,
    isFree: true,
    isNew: true,
    scriptureReference: 'Génesis 1:1 - Génesis 2:3',
    features: [
      '100% Gratuito sin necesidad de ingresar tarjeta bancaria',
      'Método de los 7 dedos para memorizar en 10 minutos',
      'Letra y partitura sencilla del himno tradicional de la Creación',
      'Fichas de bolsillo imprimibles'
    ],
    whatsIncluded: [
      'Documento PDF de 12 páginas listo para descargar',
      'Acceso al boletín de recursos bíblicos pedagógicos'
    ],
    specifications: [
      { label: 'Precio', value: 'GRATIS ($0.00)' },
      { label: 'Páginas', value: '12 páginas' },
      { label: 'Licencia', value: 'Libre distribución para iglesias y familias' }
    ],
    samplePreviewPages: [
      {
        title: 'Regla Mnemotécnica de los Dedos',
        excerpt: 'Dedo 1 (Índice hacia arriba): Hay un Dios que creó la Luz. Dedo 2 (Dos dedos en V): Divide aguas arriba y aguas abajo. Dedo 3 (Tres dedos): Tres cosas en la tierra: tierra seca, hierba verde y árboles frutales.'
      }
    ],
    samplePdfUrl: '#sample-guia-gratis',
    downloadUrl: '#download-guia-gratis-pdf',
    sku: 'REC-GEN1-FREE-008',
    gtin: '0789012345608',
    brand: 'Editorial Creación Bíblica',
    inStock: true,
    stockQuantity: 9999,
    googleProductCategory: '677'
  }
];

export const AVAILABLE_COUPONS: CouponCode[] = [
  {
    code: 'GENESIS10',
    discountPercentage: 10,
    description: '10% de descuento en toda la tienda de recursos bíblicos'
  },
  {
    code: 'BENDICION',
    discountPercentage: 15,
    description: '15% de descuento en pedidos mayores a $20 USD',
    minSpend: 20
  },
  {
    code: 'PASTOR',
    discountAmount: 5,
    description: '$5 USD de descuento de apoyo a líderes y maestros',
    minSpend: 15
  }
];

export const STORE_TESTIMONIALS = [
  {
    id: 't-1',
    name: 'Pr. Carlos Mendoza',
    church: 'Iglesia Bíblica El Sembrador',
    city: 'Guatemala',
    comment: 'La Guía de Estudio Exegético de Génesis 1 me dio un soporte homilético formidable para una serie de 6 sermones. La fidelidad al texto y el enfoque en Cristo son insuperables.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 't-2',
    name: 'Ana Lucía Morales',
    church: 'Coordinadora de Escuela Dominical',
    city: 'Bogotá, Colombia',
    comment: 'El Mega Cuaderno de Actividades para niños y el set de Flashcards transformaron nuestras clases de los domingos. Los niños memorizaron los 7 días felices y con gran entusiasmo.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 't-3',
    name: 'David Gutiérrez',
    church: 'Líder de Jóvenes y Familia Homeschooler',
    city: 'Ciudad de México',
    comment: 'Descargar el material digital al instante y poder imprimirlo para mis hijos y el grupo de jóvenes es una bendición tremenda. Recomendado al 100%.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
  }
];
