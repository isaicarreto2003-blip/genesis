import { useState } from 'react';
import { 
  GOOGLE_MERCHANT_CONFIG, 
  generateGoogleMerchantXml, 
  downloadMerchantFeedXml 
} from '../../utils/googleMerchant';
import { BIBLICAL_PRODUCTS } from '../../data/biblicalProducts';
import { 
  X, 
  CheckCircle, 
  Copy, 
  Download, 
  ExternalLink, 
  ShoppingBag, 
  Mail, 
  ShieldCheck, 
  FileCode, 
  Sparkles,
  ArrowRight,
  Globe
} from 'lucide-react';
import { soundFx } from '../../utils/audio';

interface GoogleMerchantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GoogleMerchantModal({ isOpen, onClose }: GoogleMerchantModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'steps' | 'xml'>('overview');
  const [copiedFeed, setCopiedFeed] = useState(false);
  const [copiedTag, setCopiedTag] = useState(false);

  if (!isOpen) return null;

  const currentDomain = typeof window !== 'undefined' ? window.location.origin : GOOGLE_MERCHANT_CONFIG.storeDomain;
  const feedUrl = `${currentDomain}/google-merchant-feed.xml`;
  const xmlContent = generateGoogleMerchantXml(BIBLICAL_PRODUCTS, currentDomain);

  const handleCopyFeed = () => {
    soundFx.playClick();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(feedUrl);
      setCopiedFeed(true);
      setTimeout(() => setCopiedFeed(false), 2500);
    }
  };

  const handleCopyTag = () => {
    soundFx.playClick();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(GOOGLE_MERCHANT_CONFIG.verificationMetaTag);
      setCopiedTag(true);
      setTimeout(() => setCopiedTag(false), 2500);
    }
  };

  const handleDownloadFeed = () => {
    soundFx.playCorrect();
    downloadMerchantFeedXml(BIBLICAL_PRODUCTS);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/75 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-amber-900/20 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-blue-900 via-indigo-950 to-stone-900 text-white flex items-center justify-between border-b border-indigo-950">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white text-blue-600 flex items-center justify-center font-bold shadow-md">
              <ShoppingBag className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-base sm:text-lg text-white">
                  Google Merchant Center & Google Shopping
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-[10px] font-bold">
                  Listo para Sincronizar
                </span>
              </div>
              <p className="text-xs text-blue-200">
                Vinculación de catálogo y cuenta de Google para ventas y fichas comerciales
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 bg-stone-100 border-b border-stone-200 flex items-center gap-3 text-xs font-semibold">
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('overview');
            }}
            className={`py-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'overview'
                ? 'border-blue-600 text-blue-700 font-bold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Panel de Vinculación</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('steps');
            }}
            className={`py-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'steps'
                ? 'border-blue-600 text-blue-700 font-bold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Guía Paso a Paso</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('xml');
            }}
            className={`py-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'xml'
                ? 'border-blue-600 text-blue-700 font-bold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>Feed XML Oficial (RSS 2.0)</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-5">
              {/* Connected Google Account card */}
              <div className="p-4 bg-blue-50/70 rounded-2xl border border-blue-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                    G
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-blue-900 uppercase tracking-wider block">
                      Cuenta de Google Designada
                    </span>
                    <span className="font-semibold text-stone-900 text-sm flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-blue-600" />
                      {GOOGLE_MERCHANT_CONFIG.accountEmail}
                    </span>
                  </div>
                </div>

                <a
                  href={GOOGLE_MERCHANT_CONFIG.merchantCenterUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <span>Abrir Google Merchant</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Feed URL Card */}
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-emerald-600" />
                    <span>URL del Feed de Productos para Google Merchant:</span>
                  </span>
                  <span className="text-[11px] text-stone-500 font-mono">
                    {BIBLICAL_PRODUCTS.length} productos incluidos
                  </span>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value={feedUrl}
                    className="flex-1 px-3 py-2 text-xs font-mono bg-white border border-stone-300 rounded-xl text-stone-800"
                  />
                  <button
                    onClick={handleCopyFeed}
                    className="px-3 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedFeed ? '¡Copiado!' : 'Copiar URL'}</span>
                  </button>
                  <button
                    onClick={handleDownloadFeed}
                    className="px-3 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Descargar archivo XML"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Descargar XML</span>
                  </button>
                </div>
                <p className="text-[11px] text-stone-500">
                  Usa esta URL en Google Merchant Center en la sección <strong>Productos &gt; Fuentes de datos (Feeds)</strong> con actualización programada automática.
                </p>
              </div>

              {/* Site Verification Meta Tag */}
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    <span>Etiqueta de Verificación HTML (Reclamar Sitio Web):</span>
                  </span>
                  <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Ya inyectada en index.html
                  </span>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value={GOOGLE_MERCHANT_CONFIG.verificationMetaTag}
                    className="flex-1 px-3 py-2 text-xs font-mono bg-white border border-stone-300 rounded-xl text-stone-800"
                  />
                  <button
                    onClick={handleCopyTag}
                    className="px-3 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedTag ? '¡Copiado!' : 'Copiar Tag'}</span>
                  </button>
                </div>
              </div>

              {/* Status Checklist Summary */}
              <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200 space-y-2">
                <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wide">
                  Requisitos de Google Shopping Cumplidos en esta App:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-emerald-900">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Moneda estándar USD y precios transparentes</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Identificadores GTIN-13 y MPN válidos</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Categoría oficial de Google: 677 (Libros Religiosos)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Disponibilidad en stock e imágenes en alta resolución</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: STEP BY STEP GUIDE */}
          {activeTab === 'steps' && (
            <div className="space-y-4 text-xs text-stone-700">
              <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50 flex gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  1
                </span>
                <div className="space-y-1">
                  <h4 className="font-bold text-stone-900 text-sm">
                    Inicia sesión en Google Merchant Center
                  </h4>
                  <p className="text-stone-600 leading-relaxed">
                    Ingresa a <a href="https://merchants.google.com" target="_blank" rel="noreferrer" className="text-blue-600 underline font-semibold">merchants.google.com</a> utilizando tu cuenta <strong>{GOOGLE_MERCHANT_CONFIG.accountEmail}</strong>. Si es tu primera vez, completa los datos básicos de tu empresa o ministerio.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50 flex gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  2
                </span>
                <div className="space-y-1">
                  <h4 className="font-bold text-stone-900 text-sm">
                    Verificar y Reclamar tu Dominio Web
                  </h4>
                  <p className="text-stone-600 leading-relaxed">
                    En Google Merchant Center ve a <em>Configuración &gt; Información de la empresa &gt; Sitio web</em>. Introduce la URL de tu app (desplegada en Vercel o tu dominio personalizado) y selecciona la opción <strong>«Agregar una etiqueta HTML»</strong>. La etiqueta ya se encuentra insertada en el código fuente de la app. Presiona «Verificar y reclamar».
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50 flex gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  3
                </span>
                <div className="space-y-1">
                  <h4 className="font-bold text-stone-900 text-sm">
                    Añadir la Fuente de Productos (Feed XML)
                  </h4>
                  <p className="text-stone-600 leading-relaxed">
                    Dirígete a <em>Productos &gt; Fuentes de datos (Feeds)</em> y haz clic en «Agregar fuente de datos principal».
                    Elige el país de destino y el idioma Español. En el método de carga selecciona <strong>«Recuperación programada (Scheduled fetch)»</strong> y pega la URL de tu feed:
                    <code className="block bg-stone-200 text-stone-900 p-1.5 rounded my-1 font-mono text-[11px]">{feedUrl}</code>
                    Configura la actualización diaria a la hora que prefieras. Google descargará tus 8 productos automáticamente.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50 flex gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  4
                </span>
                <div className="space-y-1">
                  <h4 className="font-bold text-stone-900 text-sm">
                    Activar Fichas Gratuitas y Campañas en Google Shopping
                  </h4>
                  <p className="text-stone-600 leading-relaxed">
                    Habilita el programa de <strong>«Fichas de producto gratuitas»</strong> en Merchant Center para que tus recursos bíblicos aparezcan de forma gratuita en la pestaña "Shopping" del buscador de Google. Opcionalmente, vincula tu cuenta de <em>Google Ads</em> para promocionarlos con anuncios patrocinados.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: LIVE XML PREVIEW */}
          {activeTab === 'xml' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-600 font-semibold">
                  Previsualización del Feed RSS 2.0 generado dinámicamente:
                </span>
                <button
                  onClick={handleDownloadFeed}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-1.5 transition-colors cursor-pointer text-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Descargar XML Completo</span>
                </button>
              </div>

              <div className="p-4 bg-stone-900 text-emerald-400 rounded-2xl font-mono text-[11px] leading-relaxed overflow-x-auto max-h-96 border border-stone-800">
                <pre>{xmlContent}</pre>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <div className="text-[11px] text-stone-500">
            Soporte Google Merchant para: <strong className="text-stone-700">{GOOGLE_MERCHANT_CONFIG.accountEmail}</strong>
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
