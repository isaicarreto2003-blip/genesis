import { useState } from 'react';
import { CartItem, CouponCode } from '../../types';
import { AVAILABLE_COUPONS } from '../../data/biblicalProducts';
import { buildShopifyCheckoutUrl, getShopifyConfig } from '../../utils/shopify';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Tag, 
  ArrowRight, 
  MessageCircle, 
  ShieldCheck, 
  Check, 
  Sparkles,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { soundFx } from '../../utils/audio';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, newQty: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onProceedCheckout: () => void;
  appliedCoupon: CouponCode | null;
  onApplyCoupon: (coupon: CouponCode | null) => void;
  onOpenShopifyHub?: () => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedCheckout,
  appliedCoupon,
  onApplyCoupon,
  onOpenShopifyHub,
}: CartDrawerProps) {
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  if (!isOpen) return null;

  const shopifyConfig = getShopifyConfig();

  // Calculate pricing
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercentage) {
      discount = (subtotal * appliedCoupon.discountPercentage) / 100;
    } else if (appliedCoupon.discountAmount) {
      discount = Math.min(subtotal, appliedCoupon.discountAmount);
    }
  }

  const hasPhysicalItems = items.some(i => i.product.format === 'fisico');
  const shippingCost = hasPhysicalItems ? 4.99 : 0.0;
  const total = Math.max(0, subtotal - discount + shippingCost);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');

    const clean = couponInput.trim().toUpperCase();
    if (!clean) return;

    const found = AVAILABLE_COUPONS.find(c => c.code === clean);
    if (!found) {
      soundFx.playWrong();
      setCouponError('Cupón inválido. Prueba con GENESIS10');
      return;
    }

    if (found.minSpend && subtotal < found.minSpend) {
      soundFx.playWrong();
      setCouponError(`Este cupón requiere un pedido mínimo de $${found.minSpend} USD`);
      return;
    }

    soundFx.playCorrect();
    onApplyCoupon(found);
    setCouponSuccess(`¡Cupón ${found.code} aplicado con éxito!`);
  };

  const handleRemoveCoupon = () => {
    soundFx.playClick();
    onApplyCoupon(null);
    setCouponSuccess('');
    setCouponError('');
  };

  // WhatsApp order link generation
  const handleWhatsAppOrder = () => {
    soundFx.playClick();
    const itemListText = items
      .map(i => `• ${i.quantity}x ${i.product.title} ($${(i.product.price * i.quantity).toFixed(2)} USD)`)
      .join('\n');

    const couponText = appliedCoupon ? `\nCupón Aplicado: ${appliedCoupon.code} (-$${discount.toFixed(2)} USD)` : '';
    const shippingText = hasPhysicalItems ? `\nEnvío Físico: $${shippingCost.toFixed(2)} USD` : '\nEntrega: Digital Inmediata';

    const message = `¡Hola! Bendiciones. Deseo realizar un pedido de Recursos Bíblicos de Génesis 1:\n\n${itemListText}${couponText}${shippingText}\n\n*TOTAL A PAGAR: $${total.toFixed(2)} USD*\n\n¿Cuáles son las instrucciones para completar mi pago y recibir mis recursos? Gracias.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  // Shopify Checkout redirect
  const handleShopifyCheckout = () => {
    soundFx.playVictory();
    const shopifyUrl = buildShopifyCheckoutUrl(items, shopifyConfig);
    window.open(shopifyUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-stone-950/60 backdrop-blur-xs transition-opacity">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-amber-900/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cart Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 bg-stone-900 text-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-stone-950 flex items-center justify-center font-bold">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-amber-200">
                Tu Carrito de Recursos
              </h3>
              <p className="text-[11px] text-stone-400">
                {items.length === 0 ? 'Vacío' : `${items.length} ${items.length === 1 ? 'producto' : 'productos'}`}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
            aria-label="Cerrar carrito"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Drawer Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          {items.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
                <ShoppingBag className="w-8 h-8 opacity-60" />
              </div>
              <h4 className="font-serif font-bold text-lg text-stone-800">
                Tu carrito está vacío
              </h4>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Explora nuestras guías exegéticas, cuadernos de actividades de Génesis 1, flashcards bíblicas y materiales gratuitos.
              </p>
              <button
                onClick={() => {
                  soundFx.playClick();
                  onClose();
                }}
                className="mt-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold cursor-pointer shadow-sm"
              >
                Explorar Catálogo
              </button>
            </div>
          ) : (
            <>
              {items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="p-3 bg-stone-50 rounded-2xl border border-stone-200 flex gap-3 relative group"
                >
                  <img
                    src={product.coverImage}
                    alt={product.title}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 border border-stone-300"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-serif font-bold text-xs sm:text-sm text-stone-900 truncate">
                          {product.title}
                        </h4>
                        <button
                          onClick={() => {
                            soundFx.playClick();
                            onRemoveItem(product.id);
                          }}
                          className="text-stone-400 hover:text-red-600 p-1 transition-colors cursor-pointer"
                          title="Eliminar producto"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[10px] text-amber-800 font-semibold block">
                        {product.formatLabel}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-stone-200/60">
                      <div className="flex items-center border border-stone-300 rounded-lg bg-white overflow-hidden">
                        <button
                          onClick={() => {
                            soundFx.playClick();
                            onUpdateQuantity(product.id, quantity - 1);
                          }}
                          className="px-2 py-0.5 hover:bg-stone-100 text-stone-600 cursor-pointer"
                          title="Restar 1"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-stone-800">
                          {quantity}
                        </span>
                        <button
                          onClick={() => {
                            soundFx.playClick();
                            onUpdateQuantity(product.id, quantity + 1);
                          }}
                          className="px-2 py-0.5 hover:bg-stone-100 text-stone-600 cursor-pointer"
                          title="Sumar 1"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-serif font-bold text-xs sm:text-sm text-stone-900">
                          ${(product.price * quantity).toFixed(2)} USD
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-end pt-1">
                <button
                  onClick={() => {
                    soundFx.playClick();
                    onClearCart();
                  }}
                  className="text-[11px] text-stone-500 hover:text-red-600 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Vaciar carrito</span>
                </button>
              </div>
            </>
          )}
        </div>

        {/* Cart Drawer Footer with Coupon & Checkout */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50 space-y-3.5">
            {/* Promo Code Input */}
            <div>
              {appliedCoupon ? (
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-300 flex items-center justify-between text-xs text-emerald-900">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-emerald-600" />
                    <div>
                      <span className="font-bold">Cupón {appliedCoupon.code}</span>
                      <span className="text-[11px] text-emerald-700 block">
                        {appliedCoupon.description}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleRemoveCoupon}
                    className="p-1 rounded text-emerald-700 hover:text-red-600 hover:bg-emerald-100 cursor-pointer"
                    title="Quitar cupón"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Cupón (ej. GENESIS10)"
                      className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 uppercase font-mono"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-100 text-xs font-semibold cursor-pointer transition-colors"
                  >
                    Aplicar
                  </button>
                </form>
              )}

              {couponError && (
                <p className="text-[11px] text-red-600 flex items-center gap-1 mt-1 pl-1">
                  <AlertCircle className="w-3 h-3" /> {couponError}
                </p>
              )}
              {couponSuccess && (
                <p className="text-[11px] text-emerald-700 flex items-center gap-1 mt-1 pl-1">
                  <Check className="w-3 h-3" /> {couponSuccess}
                </p>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1 text-xs text-stone-600 pt-1 border-t border-stone-200">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold text-stone-900">${subtotal.toFixed(2)} USD</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Descuento aplicado:</span>
                  <span>-${discount.toFixed(2)} USD</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Entrega / Envío:</span>
                <span className="font-semibold text-stone-900">
                  {hasPhysicalItems ? `$${shippingCost.toFixed(2)} USD` : 'GRATIS (Digital)'}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-stone-900 pt-1.5 border-t border-stone-200">
                <span>Total a Pagar:</span>
                <span className="font-serif text-lg text-amber-900">${total.toFixed(2)} USD</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              {/* Primary Direct Checkout */}
              <button
                onClick={() => {
                  soundFx.playCorrect();
                  onProceedCheckout();
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-600/30 transition-all cursor-pointer active:scale-98"
              >
                <span>Proceder al Pago Seguro</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Shopify Checkout Button */}
              {shopifyConfig.enableShopifyCheckout && (
                <button
                  onClick={handleShopifyCheckout}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#008060] hover:bg-[#004C3F] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer active:scale-98"
                  title={`Pagar en Shopify Checkout (${shopifyConfig.shopDomain})`}
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-[#95BF47]" />
                  <span>Pagar con Shopify Checkout</span>
                  <ExternalLink className="w-3 h-3 text-white/70" />
                </button>
              )}

              {/* WhatsApp Checkout Button */}
              <button
                onClick={handleWhatsAppOrder}
                className="w-full py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Pedir o Consultar por WhatsApp</span>
              </button>
            </div>

            {/* Footer with Shopify Hub quick link & security */}
            <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>Pago 100% protegido</span>
              </span>

              {onOpenShopifyHub && (
                <button
                  onClick={() => {
                    soundFx.playClick();
                    onOpenShopifyHub();
                  }}
                  className="text-emerald-700 hover:underline font-semibold cursor-pointer"
                >
                  Configurar Shopify
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
