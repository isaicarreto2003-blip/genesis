import { useState, useMemo } from 'react';
import { BiblicalResourceProduct, ProductCategory, ProductFormat } from '../../types';
import { BIBLICAL_PRODUCTS, STORE_TESTIMONIALS } from '../../data/biblicalProducts';
import { ProductCard } from './ProductCard';
import { 
  Search, 
  Tag, 
  Sparkles, 
  ShieldCheck, 
  Download, 
  BookOpen, 
  Star, 
  MessageCircle, 
  ExternalLink,
  ChevronDown,
  ShoppingBag,
  HelpCircle,
  Truck
} from 'lucide-react';
import { soundFx } from '../../utils/audio';

interface StoreViewProps {
  onAddToCart: (product: BiblicalResourceProduct) => void;
  onViewProductDetails: (product: BiblicalResourceProduct) => void;
  onOpenGoogleMerchantModal: () => void;
  onOpenShopifyModal: () => void;
}

export function StoreView({
  onAddToCart,
  onViewProductDetails,
  onOpenGoogleMerchantModal,
  onOpenShopifyModal,
}: StoreViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [selectedFormat, setSelectedFormat] = useState<'all' | ProductFormat>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const categories: { id: ProductCategory; label: string; icon: string }[] = [
    { id: 'all', label: 'Todos los Recursos', icon: '✨' },
    { id: 'guias', label: 'Guías de Estudio', icon: '📖' },
    { id: 'ninos', label: 'Escuela Dominical', icon: '🎨' },
    { id: 'flashcards', label: 'Flashcards', icon: '🃏' },
    { id: 'libros', label: 'Libros y Biblias', icon: '📚' },
    { id: 'kits', label: 'Kits para Maestros', icon: '📦' },
    { id: 'gratuitos', label: '100% Gratuitos', icon: '🎁' },
  ];

  const filteredProducts = useMemo(() => {
    return BIBLICAL_PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Format filter
      if (selectedFormat !== 'all' && product.format !== selectedFormat) {
        return false;
      }
      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = product.title.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesTags = product.tags.some(t => t.toLowerCase().includes(query));
        const matchesScripture = product.scriptureReference.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesTags && !matchesScripture) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
    });
  }, [selectedCategory, selectedFormat, searchQuery, sortBy]);

  const faqs = [
    {
      q: '¿Cómo recibo los recursos digitales después de la compra?',
      a: 'La entrega de los materiales en PDF y archivos imprimibles es inmediata. Al completar la orden en pantalla verás los botones de descarga directa y además recibirás un correo con tus enlaces permanentes sin fecha de caducidad.'
    },
    {
      q: '¿Puedo fotocopiar o imprimir los cuadernos para mi iglesia o aula?',
      a: '¡Sí, totalmente! Todos nuestros recursos pedagógicos incluyen una licencia congregacional que permite imprimirlos y distribuirlos libremente a los alumnos de tu escuela dominical, grupos de jóvenes o familia.'
    },
    {
      q: '¿Qué versión de la Biblia utilizan los materiales de Génesis 1?',
      a: 'Nuestros recursos se basan primariamente en la versión Reina-Valera 1960 (RVR1960) e incluyen notas comparativas de la Nueva Traducción Viviente (NTV) y referencias a los textos originales en hebreo bíblico.'
    },
    {
      q: '¿Cómo funciona la integración con Google Merchant Center y Google Shopping?',
      a: 'La tienda genera un feed XML RSS 2.0 automático que cumple al 100% con los estándares de Google Shopping (categoría 677 de Libros Religiosos, GTINs únicos y disponibilidad). Puedes vincularlo directamente con tu cuenta de Google mediante el panel dedicado.'
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Top Promotional Announcement Banner */}
      <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-stone-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-amber-700/40 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-amber-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Tienda Oficial de Recursos Bíblicos
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
              Génesis Capítulo 1
            </span>
          </div>

          <h1 className="font-serif font-bold text-2xl sm:text-4xl text-amber-100 leading-tight">
            Equipa tu Ministerio, Escuela Dominical y Familia con Recursos Bíblicos
          </h1>

          <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed">
            Guías exegéticas profundas, cuadernos de dinámicas para niños, flashcards ilustradas y materiales descargables fieles al relato de la Creación.
          </p>

          {/* Coupon Highlight Box */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-950/60 border border-amber-500/40 text-amber-200 text-xs">
              <Tag className="w-3.5 h-3.5 text-amber-400" />
              <span>Cupón 10% OFF:</span>
              <strong className="font-mono bg-amber-500 text-stone-950 px-1.5 py-0.5 rounded text-[11px] font-bold tracking-wider">
                GENESIS10
              </strong>
            </div>

            <button
              onClick={() => {
                soundFx.playClick();
                onOpenShopifyModal();
              }}
              className="px-3 py-1.5 rounded-xl bg-emerald-600/80 hover:bg-emerald-500 border border-emerald-400/40 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#95BF47]" />
              <span>Shopify Store Hub</span>
              <ExternalLink className="w-3 h-3 text-stone-200" />
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                onOpenGoogleMerchantModal();
              }}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-blue-300" />
              <span>Google Merchant Center Hub</span>
              <ExternalLink className="w-3 h-3 text-stone-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Search & Filters Control Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-amber-900/10 shadow-sm space-y-4">
        {/* Search & Sort inputs */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por versículo, tema, niños, guías..."
              className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-300 bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            {/* Format selector */}
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value as any)}
              className="px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white font-medium text-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
            >
              <option value="all">Todos los formatos</option>
              <option value="digital">📄 Solo Digital (PDF)</option>
              <option value="fisico">📦 Solo Físico</option>
            </select>

            {/* Sort selector */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white font-medium text-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
            >
              <option value="featured">Destacados y Populares</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
              <option value="rating">Mejor Valorados</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  soundFx.playClick();
                  setSelectedCategory(cat.id);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Products Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="font-serif font-bold text-lg text-stone-900">
              Catálogo de Recursos Bíblicos
            </h2>
            <span className="text-xs text-stone-500 font-semibold px-2 py-0.5 bg-stone-100 rounded-full">
              {filteredProducts.length} disponibles
            </span>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8 space-y-3">
            <BookOpen className="w-12 h-12 text-stone-300 mx-auto" />
            <h3 className="font-serif font-bold text-lg text-stone-800">
              No se encontraron recursos
            </h3>
            <p className="text-xs text-stone-500 max-w-md mx-auto">
              Intenta buscar con otros términos como "Génesis", "Niños", "Flashcards", o restablece los filtros.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedFormat('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-semibold cursor-pointer shadow-sm hover:bg-amber-700"
            >
              Restablecer Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onViewDetails={onViewProductDetails}
              />
            ))}
          </div>
        )}
      </div>

      {/* Value Propositions / Trust Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
        <div className="p-4 bg-white rounded-2xl border border-amber-900/10 shadow-xs flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700 shrink-0">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-xs sm:text-sm text-stone-900">
              Descarga Inmediata
            </h4>
            <p className="text-[11px] text-stone-500 mt-0.5 leading-relaxed">
              PDFs y materiales listos para imprimir en tu casa o iglesia al instante.
            </p>
          </div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-amber-900/10 shadow-xs flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700 shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-xs sm:text-sm text-stone-900">
              Fidelidad al Texto Bíblico
            </h4>
            <p className="text-[11px] text-stone-500 mt-0.5 leading-relaxed">
              Basados en Reina-Valera 1960 con rigor exegético y amor por la Palabra.
            </p>
          </div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-amber-900/10 shadow-xs flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-xs sm:text-sm text-stone-900">
              Garantía Cristiana
            </h4>
            <p className="text-[11px] text-stone-500 mt-0.5 leading-relaxed">
              Compromiso total de satisfacción o reposición para tu congregación.
            </p>
          </div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-amber-900/10 shadow-xs flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700 shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-xs sm:text-sm text-stone-900">
              Google Shopping Ready
            </h4>
            <p className="text-[11px] text-stone-500 mt-0.5 leading-relaxed">
              Catálogo sincronizado con Google Merchant Center para máxima visibilidad.
            </p>
          </div>
        </div>
      </div>

      {/* Customer Testimonials Section */}
      <div className="bg-amber-950/5 rounded-3xl p-6 sm:p-8 border border-amber-900/15 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-amber-800 text-xs font-bold uppercase tracking-wider">
            Testimonios Verificados
          </span>
          <h3 className="font-serif font-bold text-xl sm:text-2xl text-stone-900">
            Lo que dicen Pastores, Maestros y Padres de Familia
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {STORE_TESTIMONIALS.map((t) => (
            <div key={t.id} className="p-5 bg-white rounded-2xl border border-amber-900/10 shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <p className="font-serif italic text-xs text-stone-700 leading-relaxed">
                  «{t.comment}»
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 mt-3 border-t border-stone-100">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-9 h-9 rounded-full object-cover border border-amber-300"
                />
                <div>
                  <h5 className="font-bold text-xs text-stone-900">{t.name}</h5>
                  <p className="text-[10px] text-stone-500">{t.church} • {t.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle className="w-5 h-5 text-amber-600" />
          <h3 className="font-serif font-bold text-lg text-stone-900">
            Preguntas Frecuentes sobre la Tienda de Recursos Bíblicos
          </h3>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="border border-stone-200 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setActiveFaq(isOpen ? null : idx);
                  }}
                  className="w-full px-4 py-3.5 flex items-center justify-between text-left text-xs sm:text-sm font-bold text-stone-800 hover:bg-stone-50 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-stone-400 transition-transform duration-200 shrink-0 ml-2 ${
                      isOpen ? 'rotate-180 text-amber-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-stone-600 leading-relaxed border-t border-stone-100 pt-2 bg-stone-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
