import { useState, useEffect } from 'react';
import { 
  getShopifyConfig, 
  saveShopifyConfig, 
  downloadShopifyCsv, 
  generateShopifyEmbedCode, 
  buildShopifyCheckoutUrl 
} from '../../utils/shopify';
import { BIBLICAL_PRODUCTS } from '../../data/biblicalProducts';
import { ShopifyConfig } from '../../types';
import { 
  X, 
  ShoppingBag, 
  Download, 
  Copy, 
  Check, 
  ExternalLink, 
  Settings, 
  FileSpreadsheet, 
  Code, 
  Globe, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2,
  Layers,
  HelpCircle
} from 'lucide-react';
import { soundFx } from '../../utils/audio';

interface ShopifyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShopifyModal({ isOpen, onClose }: ShopifyModalProps) {
  const [activeTab, setActiveTab] = useState<'config' | 'csv' | 'google' | 'embed'>('config');
  const [config, setConfig] = useState<ShopifyConfig>(getShopifyConfig());
  const [isSaved, setIsSaved] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(BIBLICAL_PRODUCTS[0].id);

  useEffect(() => {
    if (isOpen) {
      setConfig(getShopifyConfig());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playCorrect();
    saveShopifyConfig(config);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleDownloadCsv = () => {
    soundFx.playVictory();
    downloadShopifyCsv(BIBLICAL_PRODUCTS);
  };

  const selectedProduct = BIBLICAL_PRODUCTS.find(p => p.id === selectedProductId) || BIBLICAL_PRODUCTS[0];
  const embedCode = generateShopifyEmbedCode(selectedProduct, config);

  const handleCopyCode = () => {
    soundFx.playClick();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(embedCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2500);
    }
  };

  const testShopifyUrl = buildShopifyCheckoutUrl([], config);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/75 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-emerald-900/20 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-900 via-teal-950 to-stone-900 text-white flex items-center justify-between border-b border-emerald-950">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#95BF47] text-stone-950 flex items-center justify-center font-bold shadow-md">
              <ShoppingBag className="w-5 h-5 text-stone-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-base sm:text-lg text-white">
                  Integración con Shopify Store
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-400/20 border border-emerald-400 text-emerald-300 text-[10px] font-bold">
                  Shopify Ready
                </span>
              </div>
              <p className="text-xs text-emerald-200/90">
                Conecta tu tienda con Shopify, exporta catálogo en CSV y sincroniza con Google Shopping
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 bg-stone-100 border-b border-stone-200 flex items-center gap-2 sm:gap-4 text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('config');
            }}
            className={`py-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'config'
                ? 'border-emerald-600 text-emerald-800 font-bold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Configuración Tienda</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('csv');
            }}
            className={`py-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'csv'
                ? 'border-emerald-600 text-emerald-800 font-bold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Exportar CSV Oficial</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('google');
            }}
            className={`py-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'google'
                ? 'border-emerald-600 text-emerald-800 font-bold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Shopify + Google Shopping</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('embed');
            }}
            className={`py-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'embed'
                ? 'border-emerald-600 text-emerald-800 font-bold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>Buy Button Embed</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: CONFIGURATION */}
          {activeTab === 'config' && (
            <form onSubmit={handleSaveConfig} className="space-y-5">
              <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200/80 flex items-start gap-3">
                <div className="p-2 bg-emerald-600 text-white rounded-xl shrink-0">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-emerald-950">
                    Modo Híbrido: Aplicación Web + Shopify Checkout
                  </h4>
                  <p className="text-xs text-emerald-900/80 mt-0.5 leading-relaxed">
                    Puedes conectar esta aplicación directamente a tu tienda Shopify existente para que tus clientes paguen a través de la pasarela segura de Shopify, o procesar los pedidos directamente desde el carrito.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Dominio de tu Tienda Shopify *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={config.shopDomain}
                      onChange={(e) => setConfig({ ...config, shopDomain: e.target.value })}
                      placeholder="tu-tienda.myshopify.com o tu-dominio.com"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-300 font-mono bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <span className="text-[11px] text-stone-500 mt-1 block">
                    Introduce el subdominio <code>*.myshopify.com</code> o el dominio personalizado de tu tienda en Shopify.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Shopify Storefront Access Token (Opcional)
                  </label>
                  <input
                    type="password"
                    value={config.storefrontAccessToken || ''}
                    onChange={(e) => setConfig({ ...config, storefrontAccessToken: e.target.value })}
                    placeholder="shpat_xxxxxxxxxxxxxxxxxxxxxxxx"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-300 font-mono bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <span className="text-[11px] text-stone-500 mt-1 block">
                    Generado en <em>Shopify Admin &gt; Configuración &gt; Apps y canales de venta &gt; Desarrollar apps</em>.
                  </span>
                </div>

                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-xs text-stone-900 block">
                      Habilitar botón directo de «Pagar en Shopify Checkout»
                    </span>
                    <span className="text-[11px] text-stone-500">
                      Muestra la opción de pago automático a través de Shopify Cart Permalink en el carrito.
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.enableShopifyCheckout}
                    onChange={(e) => setConfig({ ...config, enableShopifyCheckout: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded cursor-pointer"
                  />
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                <a
                  href={testShopifyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-emerald-700 hover:text-emerald-900 font-semibold flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Probar enlace de tienda: {config.shopDomain}</span>
                </a>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition-colors shadow-md"
                >
                  {isSaved ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>¡Guardado con Éxito!</span>
                    </>
                  ) : (
                    <span>Guardar Cambios</span>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: SHOPIFY PRODUCT CSV EXPORT */}
          {activeTab === 'csv' && (
            <div className="space-y-5">
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-serif font-bold text-sm text-stone-900 flex items-center gap-2">
                    <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                    <span>Catálogo de Recursos Listo para Importar a Shopify</span>
                  </h4>
                  <p className="text-xs text-stone-600 mt-1 max-w-lg leading-relaxed">
                    Descarga el archivo CSV oficial que contiene los <strong>8 recursos bíblicos de Génesis 1</strong> estructurados con precios en USD, descripciones completas en HTML, variantes, fotos en HD, SKUs, códigos de barras GTIN-13 y categorías de Google Shopping.
                  </p>
                </div>

                <button
                  onClick={handleDownloadCsv}
                  className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-700/20 shrink-0 active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>Descargar CSV para Shopify</span>
                </button>
              </div>

              {/* Instructions Steps */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                  Cómo subir los productos a tu Shopify en 3 minutos:
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3.5 bg-white rounded-2xl border border-stone-200 flex flex-col justify-between">
                    <div>
                      <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs mb-2">
                        1
                      </span>
                      <h5 className="font-bold text-xs text-stone-900">Descarga el archivo</h5>
                      <p className="text-[11px] text-stone-600 mt-1">
                        Haz clic en el botón superior para obtener <code>shopify_recursos_biblicos_genesis1.csv</code>.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 bg-white rounded-2xl border border-stone-200 flex flex-col justify-between">
                    <div>
                      <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs mb-2">
                        2
                      </span>
                      <h5 className="font-bold text-xs text-stone-900">Importar en Shopify</h5>
                      <p className="text-[11px] text-stone-600 mt-1">
                        Ve a tu panel de Shopify en <strong>Productos &gt; Importar</strong> y arrastra el archivo CSV.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 bg-white rounded-2xl border border-stone-200 flex flex-col justify-between">
                    <div>
                      <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs mb-2">
                        3
                      </span>
                      <h5 className="font-bold text-xs text-stone-900">¡Productos Activos!</h5>
                      <p className="text-[11px] text-stone-600 mt-1">
                        Shopify creará las fichas con fotos, inventarios y variantes listos para vender.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SHOPIFY + GOOGLE SHOPPING INTEGRATION */}
          {activeTab === 'google' && (
            <div className="space-y-4 text-xs text-stone-700">
              <div className="p-4 bg-blue-50/70 rounded-2xl border border-blue-200 space-y-1">
                <span className="font-bold text-blue-900 text-sm block">
                  Sincronización Automática: Shopify ↔ Google Merchant Center
                </span>
                <p className="text-blue-800/80 leading-relaxed">
                  Al conectar Shopify con la aplicación oficial <strong>«Google &amp; YouTube»</strong> utilizando tu cuenta <strong>esdraspanamacarreto@gmail.com</strong>, cualquier producto agregado o vendido en Shopify se sincronizará automáticamente con Google Merchant Center y Google Shopping.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50 flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    1
                  </span>
                  <div className="space-y-1">
                    <h5 className="font-bold text-stone-900 text-xs sm:text-sm">
                      Instalar la App «Google &amp; YouTube» en Shopify
                    </h5>
                    <p className="text-stone-600">
                      Desde tu panel de Shopify, ve a la <em>Shopify App Store</em> y agrega el canal de ventas oficial gratuito <strong>«Google &amp; YouTube»</strong>.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50 flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    2
                  </span>
                  <div className="space-y-1">
                    <h5 className="font-bold text-stone-900 text-xs sm:text-sm">
                      Conectar la cuenta esdraspanamacarreto@gmail.com
                    </h5>
                    <p className="text-stone-600">
                      Inicia sesión con tu cuenta de Google designada. La app detectará automáticamente tu cuenta de <strong>Google Merchant Center</strong>.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50 flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    3
                  </span>
                  <div className="space-y-1">
                    <h5 className="font-bold text-stone-900 text-xs sm:text-sm">
                      Sincronización en Tiempo Real
                    </h5>
                    <p className="text-stone-600">
                      Tus recursos bíblicos (como la Guía de Génesis 1 y los Cuadernos de Actividades) aparecerán de inmediato en la pestaña de Shopping de Google con precios actualizados y estado de inventario.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: BUY BUTTON EMBED */}
          {activeTab === 'embed' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Selecciona el Recurso para Generar el Botón de Compra:
                </label>
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                >
                  {BIBLICAL_PRODUCTS.map((prod) => (
                    <option key={prod.id} value={prod.id}>
                      {prod.title} (${prod.price.toFixed(2)} USD)
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-stone-700">
                    Snippet HTML/JS para Incrustar en cualquier Web o Blog:
                  </span>
                  <button
                    onClick={handleCopyCode}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedCode ? '¡Código Copiado!' : 'Copiar Código'}</span>
                  </button>
                </div>

                <pre className="p-4 bg-stone-900 text-emerald-400 rounded-2xl font-mono text-[11px] leading-relaxed overflow-x-auto max-h-64 border border-stone-800">
                  {embedCode}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <div className="text-[11px] text-stone-500">
            Tienda activa: <strong className="text-stone-700 font-mono">{config.shopDomain}</strong>
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs cursor-pointer transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
