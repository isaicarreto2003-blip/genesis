import { useState } from 'react';
import { BiblicalResourceProduct } from '../../types';
import { Star, ShoppingBag, Eye, Download, Sparkles, Check, BookOpen } from 'lucide-react';
import { soundFx } from '../../utils/audio';

interface ProductCardProps {
  product: BiblicalResourceProduct;
  onAddToCart: (product: BiblicalResourceProduct) => void;
  onViewDetails: (product: BiblicalResourceProduct) => void;
}

export function ProductCard({ product, onAddToCart, onViewDetails }: ProductCardProps) {
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundFx.playCorrect();
    onAddToCart(product);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1500);
  };

  const handleView = () => {
    soundFx.playClick();
    onViewDetails(product);
  };

  return (
    <div
      onClick={handleView}
      className="group relative flex flex-col bg-white rounded-2xl border border-amber-900/10 shadow-sm hover:shadow-xl hover:border-amber-500/40 transition-all duration-200 overflow-hidden cursor-pointer"
    >
      {/* Cover Image & Badges */}
      <div className="relative aspect-[4/3] w-full bg-stone-100 overflow-hidden">
        <img
          src={product.coverImage}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Gradient overlay on image */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-black/20" />

        {/* Floating Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 items-center">
          {product.isBestSeller && (
            <span className="px-2 py-0.5 rounded-full bg-amber-500 text-stone-950 text-[10px] font-bold tracking-wide shadow-sm flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" /> Más Vendido
            </span>
          )}
          {product.isFree && (
            <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold tracking-wide shadow-sm">
              GRATIS
            </span>
          )}
          {product.isNew && !product.isFree && (
            <span className="px-2 py-0.5 rounded-full bg-sky-600 text-white text-[10px] font-bold tracking-wide shadow-sm">
              Nuevo
            </span>
          )}
        </div>

        {/* Format Pill (Digital vs Físico) */}
        <div className="absolute top-2.5 right-2.5">
          <span className="px-2 py-0.5 rounded-md bg-stone-900/80 backdrop-blur-md text-amber-200 text-[10px] font-semibold border border-amber-500/30">
            {product.format === 'digital' ? '📄 PDF Digital' : product.format === 'fisico' ? '📦 Físico' : '✨ Híbrido'}
          </span>
        </div>

        {/* Scripture Connection Tag on bottom of image */}
        <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-white text-xs">
          <span className="font-serif font-bold text-amber-200 text-[11px] flex items-center gap-1 bg-stone-900/60 backdrop-blur-xs px-2 py-0.5 rounded">
            <BookOpen className="w-3 h-3 text-amber-400" />
            {product.scriptureReference}
          </span>
          <div className="flex items-center gap-1 bg-stone-900/60 backdrop-blur-xs px-1.5 py-0.5 rounded text-[11px]">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-stone-100">{product.rating.toFixed(1)}</span>
            <span className="text-stone-300 text-[10px]">({product.reviewsCount})</span>
          </div>
        </div>
      </div>

      {/* Body Content */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
            {product.categoryLabel}
          </span>
          <h3 className="font-serif font-bold text-stone-900 text-base leading-snug mt-0.5 line-clamp-2 group-hover:text-amber-800 transition-colors">
            {product.title}
          </h3>
          <p className="text-xs text-stone-600 line-clamp-2 mt-1.5 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Actions */}
        <div className="pt-4 mt-3 border-t border-stone-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              {product.isFree ? (
                <span className="text-base font-bold text-emerald-700 font-serif">
                  $0.00 USD
                </span>
              ) : (
                <>
                  <span className="text-base font-bold text-stone-900 font-serif">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-stone-500 font-medium">USD</span>
                </>
              )}
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-stone-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-700 font-medium block">
              {product.format === 'digital' ? '✓ Descarga instantánea' : '✓ Envío disponible'}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleView();
              }}
              className="p-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-stone-200 transition-colors cursor-pointer"
              title="Ver detalles completos"
              aria-label="Ver detalles"
            >
              <Eye className="w-4 h-4" />
            </button>

            {product.isFree ? (
              <button
                type="button"
                onClick={handleAddToCart}
                className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
              >
                {isAddedRecently ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>¡Listo!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>Descargar</span>
                  </>
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleAddToCart}
                className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer ${
                  isAddedRecently
                    ? 'bg-emerald-600 text-white'
                    : 'bg-amber-600 hover:bg-amber-700 text-white active:scale-95'
                }`}
              >
                {isAddedRecently ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Añadido</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Añadir</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
