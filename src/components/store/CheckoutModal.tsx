import { useState } from 'react';
import { CartItem, CouponCode, OrderCheckoutData } from '../../types';
import { buildShopifyCheckoutUrl, getShopifyConfig } from '../../utils/shopify';
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  CreditCard, 
  Download, 
  FileCheck, 
  Lock, 
  Sparkles, 
  ArrowLeft,
  Building,
  Printer,
  ShoppingBag,
  ExternalLink
} from 'lucide-react';
import { soundFx } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  appliedCoupon: CouponCode | null;
  onOrderCompleted: () => void;
}

export function CheckoutModal({
  isOpen,
  onClose,
  items,
  appliedCoupon,
  onOrderCompleted,
}: CheckoutModalProps) {
  const [step, setStep] = useState<'info' | 'payment' | 'success'>('info');
  const [formData, setFormData] = useState<OrderCheckoutData>({
    fullName: '',
    email: '',
    phone: '',
    country: 'Guatemala',
    city: 'Ciudad de Guatemala',
    address: '',
    postalCode: '',
    notes: '',
    paymentMethod: 'card'
  });

  const [orderNumber, setOrderNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercentage) {
      discount = (subtotal * appliedCoupon.discountPercentage) / 100;
    } else if (appliedCoupon.discountAmount) {
      discount = Math.min(subtotal, appliedCoupon.discountAmount);
    }
  }

  const hasPhysical = items.some(i => i.product.format === 'fisico');
  const shippingCost = hasPhysical ? 4.99 : 0.0;
  const total = Math.max(0, subtotal - discount + shippingCost);

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playClick();
    if (!formData.fullName.trim() || !formData.email.trim()) {
      alert('Por favor completa tu nombre y correo electrónico.');
      return;
    }
    setStep('payment');
  };

  const handleProcessPayment = () => {
    soundFx.playClick();
    setIsProcessing(true);

    if (formData.paymentMethod === 'shopify') {
      const config = getShopifyConfig();
      const shopifyUrl = buildShopifyCheckoutUrl(items, config);
      setTimeout(() => {
        setIsProcessing(false);
        window.open(shopifyUrl, '_blank');
        const randomOrder = `ORD-SHOPIFY-${Math.floor(100000 + Math.random() * 900000)}`;
        setOrderNumber(randomOrder);
        setStep('success');
        soundFx.playVictory();
        try {
          confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        } catch {
          // ignore
        }
        onOrderCompleted();
      }, 1000);
      return;
    }

    setTimeout(() => {
      setIsProcessing(false);
      const randomOrder = `ORD-GEN1-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderNumber(randomOrder);
      setStep('success');
      soundFx.playVictory();

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }

      onOrderCompleted();
    }, 1200);
  };

  const handleDownloadResource = (item: CartItem) => {
    soundFx.playCorrect();
    const content = `======================================================
RECURSO BÍBLICO ADQUIRIDO - EDITORIAL CREACIÓN BÍBLICA
======================================================
Número de Orden: ${orderNumber}
Fecha: ${new Date().toLocaleDateString()}
Cliente: ${formData.fullName} (${formData.email})

Producto: ${item.product.title}
Referencia Bíblica: ${item.product.scriptureReference}
Categoría: ${item.product.categoryLabel}
Identificador GTIN: ${item.product.gtin}

------------------------------------------------------
CONTENIDO Y GUÍA DE ESTUDIO DE GÉNESIS 1
------------------------------------------------------
«En el principio creó Dios los cielos y la tierra. Y la tierra
estaba desordenada y vacía, y las tinieblas estaban sobre la
faz del abismo, y el Espíritu de Dios se movía sobre la faz
de las aguas.» (Génesis 1:1-2)

Puntos Clave del Recurso:
${item.product.features.map(f => `- ${f}`).join('\n')}

¡Que este material bendiga grandemente tu vida, familia,
iglesia y ministerio!
======================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${item.product.sku}_Recurso_Genesis1.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/75 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-amber-900/20 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-stone-900 text-stone-100 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-400" />
            <span className="font-serif font-bold text-amber-200 text-base">
              {step === 'success' ? '¡Pedido Confirmado con Éxito!' : 'Finalizar Pedido Seguro'}
            </span>
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
            aria-label="Cerrar ventana"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps Breadcrumbs (if not success) */}
        {step !== 'success' && (
          <div className="px-6 py-3 bg-amber-50/70 border-b border-amber-900/10 flex items-center justify-between text-xs font-semibold">
            <div className={`flex items-center gap-2 ${step === 'info' ? 'text-amber-900 font-bold' : 'text-stone-500'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step === 'info' ? 'bg-amber-600 text-white' : 'bg-stone-200 text-stone-700'}`}>1</span>
              <span>Datos del Comprador</span>
            </div>
            <span className="text-stone-300">───</span>
            <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-amber-900 font-bold' : 'text-stone-500'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step === 'payment' ? 'bg-amber-600 text-white' : 'bg-stone-200 text-stone-700'}`}>2</span>
              <span>Confirmación y Pago</span>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* STEP 1: INFO FORM */}
          {step === 'info' && (
            <form onSubmit={handleInfoSubmit} className="space-y-4">
              <div>
                <h3 className="font-serif font-bold text-lg text-stone-900">
                  Información de Entrega y Facturación
                </h3>
                <p className="text-xs text-stone-600 mt-0.5">
                  Los recursos digitales se enviarán a tu correo electrónico al instante.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Pastor Juan Pérez / Maestra María"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="tu-correo@ejemplo.com"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+502 1234 5678"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    País
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="Guatemala, México, Colombia, etc."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {hasPhysical && (
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Dirección de Envío para Recursos Físicos *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Calle, número, colonia o referencias para entrega"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                )}

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Notas adicionales (Opcional - Iglesia o Ministerio)
                  </label>
                  <input
                    type="text"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Ej. Nombre de la congregación o petición de oración"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Order mini review */}
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 text-xs flex items-center justify-between">
                <div>
                  <span className="font-semibold text-stone-800">
                    {items.length} {items.length === 1 ? 'recurso' : 'recursos'} en el pedido
                  </span>
                  <span className="text-stone-500 block text-[11px]">
                    Subtotal: ${subtotal.toFixed(2)} USD {discount > 0 && `• Descuento: -$${discount.toFixed(2)} USD`}
                  </span>
                </div>
                <span className="font-serif font-bold text-base text-amber-900">
                  Total: ${total.toFixed(2)} USD
                </span>
              </div>

              <div className="flex justify-end pt-3">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm cursor-pointer transition-colors shadow-md flex items-center gap-2"
                >
                  <span>Continuar al Pago</span>
                  <span>→</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: PAYMENT METHOD & REVIEW */}
          {step === 'payment' && (
            <div className="space-y-5">
              <div>
                <button
                  type="button"
                  onClick={() => setStep('info')}
                  className="text-xs text-stone-500 hover:text-stone-900 flex items-center gap-1 cursor-pointer mb-2"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Volver a datos de comprador</span>
                </button>
                <h3 className="font-serif font-bold text-lg text-stone-900">
                  Elige tu Método de Pago Seguro
                </h3>
                <p className="text-xs text-stone-600">
                  Transacción protegida con cifrado SSL de 256 bits y respaldo cristiano.
                </p>
              </div>

              {/* Payment Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <label
                  className={`p-3 rounded-2xl border-2 cursor-pointer flex flex-col justify-between transition-all ${
                    formData.paymentMethod === 'card'
                      ? 'border-amber-600 bg-amber-50/50 shadow-sm'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={formData.paymentMethod === 'card'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                    className="sr-only"
                  />
                  <div className="flex items-center justify-between">
                    <CreditCard className="w-5 h-5 text-amber-700" />
                    <span className="text-[10px] uppercase font-bold text-stone-400">Inmediato</span>
                  </div>
                  <div className="mt-3">
                    <span className="font-bold text-xs text-stone-900 block">Tarjeta</span>
                    <span className="text-[10px] text-stone-500">Visa, MasterCard, Amex</span>
                  </div>
                </label>

                <label
                  className={`p-3 rounded-2xl border-2 cursor-pointer flex flex-col justify-between transition-all ${
                    formData.paymentMethod === 'paypal'
                      ? 'border-amber-600 bg-amber-50/50 shadow-sm'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={formData.paymentMethod === 'paypal'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'paypal' })}
                    className="sr-only"
                  />
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-800 text-sm">PayPal</span>
                    <span className="text-[10px] uppercase font-bold text-stone-400">Global</span>
                  </div>
                  <div className="mt-3">
                    <span className="font-bold text-xs text-stone-900 block">PayPal</span>
                    <span className="text-[10px] text-stone-500">Protección al comprador</span>
                  </div>
                </label>

                <label
                  className={`p-3 rounded-2xl border-2 cursor-pointer flex flex-col justify-between transition-all ${
                    formData.paymentMethod === 'shopify'
                      ? 'border-emerald-600 bg-emerald-50/50 shadow-sm'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={formData.paymentMethod === 'shopify'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'shopify' })}
                    className="sr-only"
                  />
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#008060] text-sm">Shopify</span>
                    <span className="text-[10px] uppercase font-bold text-emerald-600">Oficial</span>
                  </div>
                  <div className="mt-3">
                    <span className="font-bold text-xs text-stone-900 block">Shopify Checkout</span>
                    <span className="text-[10px] text-stone-500">Shop Pay & Pasarela</span>
                  </div>
                </label>

                <label
                  className={`p-3 rounded-2xl border-2 cursor-pointer flex flex-col justify-between transition-all ${
                    formData.paymentMethod === 'transfer'
                      ? 'border-amber-600 bg-amber-50/50 shadow-sm'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={formData.paymentMethod === 'transfer'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'transfer' })}
                    className="sr-only"
                  />
                  <div className="flex items-center justify-between">
                    <Building className="w-5 h-5 text-amber-700" />
                    <span className="text-[10px] uppercase font-bold text-stone-400">Bancario</span>
                  </div>
                  <div className="mt-3">
                    <span className="font-bold text-xs text-stone-900 block">Transferencia</span>
                    <span className="text-[10px] text-stone-500">Bancos locales y Zelle</span>
                  </div>
                </label>
              </div>

              {/* Simulated Card Fields if card chosen */}
              {formData.paymentMethod === 'card' && (
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-800">Detalles de Tarjeta (Modo Seguro Demo)</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded">
                      Cifrado 256-bit
                    </span>
                  </div>
                  <input
                    type="text"
                    defaultValue="4532 •••• •••• 8821"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white font-mono"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      defaultValue="12/28"
                      placeholder="MM/AA"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white font-mono"
                    />
                    <input
                      type="text"
                      defaultValue="731"
                      placeholder="CVC"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white font-mono"
                    />
                  </div>
                </div>
              )}

              {/* Shopify Payment Panel */}
              {formData.paymentMethod === 'shopify' && (
                <div className="p-4 bg-emerald-50/80 rounded-2xl border border-emerald-300 space-y-2 text-xs text-emerald-950">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-emerald-700" />
                    <span className="font-bold text-sm">Pasarela Oficial de Shopify</span>
                  </div>
                  <p className="text-[11px] text-emerald-900/90 leading-relaxed">
                    Al confirmar, se abrirá el checkout seguro de tu tienda en <strong>{getShopifyConfig().shopDomain}</strong> para procesar el pago con Shop Pay, tarjetas o métodos locales de Shopify.
                  </p>
                </div>
              )}

              {/* Order Final Summary */}
              <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-900/15 space-y-2 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Comprador:</span>
                  <span className="font-semibold text-stone-900">{formData.fullName} ({formData.email})</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Productos ({items.length}):</span>
                  <span>${subtotal.toFixed(2)} USD</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Cupón aplicado ({appliedCoupon?.code}):</span>
                    <span>-${discount.toFixed(2)} USD</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-600">
                  <span>Envío:</span>
                  <span>{hasPhysical ? `$${shippingCost.toFixed(2)} USD` : 'Digital $0.00'}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-amber-950 pt-2 border-t border-amber-900/15">
                  <span>Total Final:</span>
                  <span className="font-serif text-lg">${total.toFixed(2)} USD</span>
                </div>
              </div>

              {/* Confirm Pay Button */}
              <button
                type="button"
                disabled={isProcessing}
                onClick={handleProcessPayment}
                className="w-full py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:bg-stone-400 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-600/30 transition-all cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Procesando pago seguro...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Confirmar y Pagar ${total.toFixed(2)} USD</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* STEP 3: SUCCESS & DOWNLOADS */}
          {step === 'success' && (
            <div className="text-center py-4 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold font-mono">
                  {orderNumber}
                </span>
                <h3 className="font-serif font-bold text-2xl text-stone-900 mt-2">
                  ¡Gracias por tu compra, {formData.fullName}!
                </h3>
                <p className="text-xs text-stone-600 max-w-md mx-auto mt-1">
                  Hemos enviado la confirmación y los accesos permanentes a <strong className="text-stone-800">{formData.email}</strong>.
                </p>
              </div>

              {/* Digital Downloads Box */}
              <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 text-left space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif font-bold text-sm text-stone-900 flex items-center gap-1.5">
                    <Download className="w-4 h-4 text-amber-600" />
                    <span>Descargas Digitales Inmediatas:</span>
                  </h4>
                  <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Activas Ahora
                  </span>
                </div>

                <div className="space-y-2">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="p-3 bg-white rounded-xl border border-stone-200 flex items-center justify-between gap-3 shadow-xs"
                    >
                      <div className="min-w-0">
                        <h5 className="font-serif font-bold text-xs text-stone-900 truncate">
                          {item.product.title}
                        </h5>
                        <span className="text-[11px] text-stone-500 block">
                          Formato: {item.product.formatLabel} • Ref: {item.product.scriptureReference}
                        </span>
                      </div>

                      <button
                        onClick={() => handleDownloadResource(item)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-xs"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Descargar</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions & Print */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={handlePrintReceipt}
                  className="px-4 py-2 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Imprimir Recibo</span>
                </button>

                <button
                  onClick={() => {
                    soundFx.playClick();
                    onClose();
                  }}
                  className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold cursor-pointer transition-colors shadow-sm"
                >
                  Seguir Explorando Recursos
                </button>
              </div>

              <div className="text-[11px] text-stone-500 italic">
                «Que Jehová te bendiga y te guarde; Jehová haga resplandecer su rostro sobre ti» — Números 6:24-25
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
