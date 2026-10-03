import { useState } from 'react';
import { BiblicalResourceProduct } from '../../types';
import { 
  X, 
  Star, 
  ShoppingBag, 
  Download, 
  Check, 
  BookOpen, 
  ShieldCheck, 
  FileText, 
  Truck, 
  Sparkles,
  Share2,
  ExternalLink
} from 'lucide-react';
import { soundFx } from '../../utils/audio';

interface ProductDetailModalProps {
  product: BiblicalResourceProduct | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: BiblicalResourceProduct) => void;
  onBuyNow: (product: BiblicalResourceProduct) => void;
}

export function ProductDetailModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onBuyNow,
}: ProductDetailModalProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'info' | 'samples' | 'specs'>('info');
  const [copiedLink, setCopiedLink] = useState(false);
  const [isSampleDownloaded, setIsSampleDownloaded] = useState(false);

  if (!isOpen || !product) return null;

  const currentImage = product.images[selectedImageIndex] || product.coverImage;

  const handleShare = () => {
    soundFx.playClick();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleDownloadSample = () => {
    soundFx.playCorrect();
    setIsSampleDownloaded(true);
    // Create simulated file download
    const sampleContent = `MUESTRA DE RECURSO BÍBLICO\n\nTítulo: ${product.title}\nReferencia Bíblica: ${product.scriptureReference}\nEditorial: ${product.brand}\n\nDescripción:\n${product.description}\n\nContenido de Ejemplo:\n${product.samplePreviewPages?.map(p => `--- ${p.title} ---\n${p.excerpt}`).join('\n\n') || 'Muestra de estudio bíblico.'}\n\nPara adquirir el recurso completo visita nuestra Tienda de Recursos Bíblicos Génesis 1.`;
    const blob = new Blob([sampleContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Muestra_${product.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setTimeout(() => setIsSampleDownloaded(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-amber-900/20 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-stone-900 text-stone-100 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs uppercase tracking-wider text-amber-300 font-semibold">
              {product.categoryLabel}
            </span>
            <span className="text-stone-500">•</span>
            <span className="text-xs text-stone-400 font-mono">
              SKU: {product.sku}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer text-xs flex items-center gap-1"
              title="Copiar enlace"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">{copiedLink ? '¡Copiado!' : 'Compartir'}</span>
            </button>
            <button
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left Column: Visual Gallery */}
            <div className="md:col-span-5 flex flex-col gap-3">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shadow-inner">
                <img
                  src={currentImage}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  {product.isBestSeller && (
                    <span className="px-2.5 py-1 rounded-full bg-amber-500 text-stone-950 text-xs font-bold shadow-md flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Más Vendido
                    </span>
                  )}
                  {product.isFree && (
                    <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-md">
                      GRATIS
                    </span>
                  )}
                </div>
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        soundFx.playClick();
                        setSelectedImageIndex(idx);
                      }}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                        selectedImageIndex === idx ? 'border-amber-600 shadow-md scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Vista ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Scripture & Author card */}
              <div className="p-3.5 bg-amber-50/80 rounded-2xl border border-amber-800/15 text-xs text-stone-800 space-y-1.5">
                <div className="flex items-center gap-1.5 font-serif font-bold text-amber-900">
                  <BookOpen className="w-4 h-4 text-amber-600" />
                  <span>Conexión Bíblica Principal:</span>
                </div>
                <p className="font-semibold text-stone-900 pl-5">
                  {product.scriptureReference}
                </p>
                <div className="pt-2 border-t border-amber-900/10 flex items-center justify-between text-[11px] text-stone-500">
                  <span>Editorial: {product.brand}</span>
                  <span>GTIN/EAN: {product.gtin}</span>
                </div>
              </div>

              {/* Google Shopping Verified Badge */}
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 text-[11px] text-stone-600 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-stone-800 block">Sincronizado con Google Shopping</span>
                  <span>Compatible con Google Merchant Center (Categoría {product.googleProductCategory})</span>
                </div>
              </div>
            </div>

            {/* Right Column: Information, Pricing & Tabs */}
            <div className="md:col-span-7 flex flex-col justify-between">
              <div>
                {/* Title & Subtitle */}
                <h2 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 leading-tight">
                  {product.title}
                </h2>
                <p className="text-sm sm:text-base text-amber-900/80 font-medium mt-1">
                  {product.subtitle}
                </p>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-stone-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-stone-800">
                    {product.rating.toFixed(1)} / 5.0
                  </span>
                  <span className="text-xs text-stone-500">
                    ({product.reviewsCount} reseñas verificadas)
                  </span>
                </div>

                {/* Pricing Box */}
                <div className="my-5 p-4 bg-stone-50 rounded-2xl border border-stone-200/80 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="flex items-baseline gap-2">
                      {product.isFree ? (
                        <span className="text-3xl font-extrabold text-emerald-700 font-serif">
                          GRATIS ($0.00)
                        </span>
                      ) : (
                        <>
                          <span className="text-3xl font-extrabold text-stone-900 font-serif">
                            ${product.price.toFixed(2)}
                          </span>
                          <span className="text-sm font-semibold text-stone-600">USD</span>
                        </>
                      )}
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="text-base text-stone-400 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-emerald-700 font-medium flex items-center gap-1 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                      {product.format === 'digital'
                        ? 'Acceso y descarga inmediata tras confirmar'
                        : 'Disponible con entrega y guía de rastreo'}
                    </span>
                  </div>

                  <span className="px-3 py-1 rounded-xl bg-amber-100 text-amber-900 font-semibold text-xs border border-amber-200">
                    {product.formatLabel}
                  </span>
                </div>

                {/* Content Tabs */}
                <div className="border-b border-stone-200 flex items-center gap-4 text-xs font-semibold">
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      setActiveTab('info');
                    }}
                    className={`pb-2.5 transition-colors cursor-pointer border-b-2 ${
                      activeTab === 'info'
                        ? 'border-amber-600 text-amber-900 font-bold'
                        : 'border-transparent text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    Descripción y Beneficios
                  </button>
                  {product.samplePreviewPages && product.samplePreviewPages.length > 0 && (
                    <button
                      onClick={() => {
                        soundFx.playClick();
                        setActiveTab('samples');
                      }}
                      className={`pb-2.5 transition-colors cursor-pointer border-b-2 flex items-center gap-1 ${
                        activeTab === 'samples'
                          ? 'border-amber-600 text-amber-900 font-bold'
                          : 'border-transparent text-stone-500 hover:text-stone-800'
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Muestra del Contenido</span>
                    </button>
                  )}
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      setActiveTab('specs');
                    }}
                    className={`pb-2.5 transition-colors cursor-pointer border-b-2 ${
                      activeTab === 'specs'
                        ? 'border-amber-600 text-amber-900 font-bold'
                        : 'border-transparent text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    Especificaciones Técnicas
                  </button>
                </div>

                {/* Tab 1: Info & Features */}
                {activeTab === 'info' && (
                  <div className="py-4 space-y-4 text-xs text-stone-700 leading-relaxed">
                    <p className="text-sm text-stone-800">
                      {product.fullDescription}
                    </p>

                    <div className="space-y-2 pt-2">
                      <h4 className="font-bold text-stone-900 uppercase tracking-wider text-[11px]">
                        Lo que incluye este recurso:
                      </h4>
                      <ul className="space-y-1.5">
                        {product.whatsIncluded.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2 pt-2">
                      <h4 className="font-bold text-stone-900 uppercase tracking-wider text-[11px]">
                        Características destacadas:
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {product.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 text-stone-600">
                            <span className="text-amber-600 font-bold">•</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Tab 2: Sample Excerpts */}
                {activeTab === 'samples' && product.samplePreviewPages && (
                  <div className="py-4 space-y-3">
                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
                      <span>Vista previa de lectura autorizada para estudio preliminar</span>
                      <button
                        onClick={handleDownloadSample}
                        className="px-2.5 py-1 rounded-lg bg-amber-700 hover:bg-amber-800 text-white font-semibold text-[11px] flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
                      >
                        <Download className="w-3 h-3" />
                        <span>{isSampleDownloaded ? '¡Descargado!' : 'Descargar Muestra TXT/PDF'}</span>
                      </button>
                    </div>

                    {product.samplePreviewPages.map((sample, idx) => (
                      <div key={idx} className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                        <h4 className="font-serif font-bold text-amber-950 text-sm mb-1">
                          {sample.title}
                        </h4>
                        <p className="text-xs text-stone-700 italic leading-relaxed font-serif">
                          «{sample.excerpt}»
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tab 3: Specs & Metadata */}
                {activeTab === 'specs' && (
                  <div className="py-4 space-y-3 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {product.specifications.map((spec, idx) => (
                        <div key={idx} className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex flex-col">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                            {spec.label}
                          </span>
                          <span className="font-semibold text-stone-800 mt-0.5">
                            {spec.value}
                          </span>
                        </div>
                      ))}
                      <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex flex-col">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                          Identificador Universal GTIN-13
                        </span>
                        <span className="font-mono font-semibold text-stone-800 mt-0.5">
                          {product.gtin}
                        </span>
                      </div>
                      <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex flex-col">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                          Categoría Google Merchant
                        </span>
                        <span className="font-semibold text-stone-800 mt-0.5">
                          {product.googleProductCategory} (Libros Religiosos)
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Sticky Action Bar */}
              <div className="pt-6 mt-6 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      onAddToCart(product);
                    }}
                    className="px-5 py-3 rounded-2xl border-2 border-stone-900 hover:bg-stone-100 text-stone-900 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 text-amber-700" />
                    <span>Añadir al Carrito</span>
                  </button>

                  <button
                    onClick={() => {
                      soundFx.playCorrect();
                      onBuyNow(product);
                    }}
                    className="px-6 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-600/30 transition-all cursor-pointer active:scale-95"
                  >
                    {product.isFree ? (
                      <>
                        <Download className="w-4 h-4" />
                        <span>Descargar Ahora Gratis</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-amber-200" />
                        <span>Comprar Ahora (${product.price.toFixed(2)})</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="text-[11px] text-stone-500 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Garantía de Satisfacción Cristiana</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
