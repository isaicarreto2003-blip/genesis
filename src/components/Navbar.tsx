import { 
  BookOpen, 
  Trophy, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  ShoppingBag, 
  Store, 
  Globe 
} from 'lucide-react';
import { GameMode } from '../types';
import { soundFx } from '../utils/audio';

interface NavbarProps {
  currentMode: GameMode;
  onSelectMode: (mode: GameMode) => void;
  onOpenBible: () => void;
  onOpenBadges: () => void;
  onOpenCart: () => void;
  onOpenMerchantHub: () => void;
  onOpenShopifyHub: () => void;
  points: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  cartItemCount: number;
}

export function Navbar({
  currentMode,
  onSelectMode,
  onOpenBible,
  onOpenBadges,
  onOpenCart,
  onOpenMerchantHub,
  onOpenShopifyHub,
  points,
  soundEnabled,
  onToggleSound,
  cartItemCount,
}: NavbarProps) {
  const gameNavItems: { mode: GameMode; label: string; icon: string }[] = [
    { mode: 'order', label: '7 Días', icon: '🌅' },
    { mode: 'trivia', label: 'Trivia', icon: '❓' },
    { mode: 'verses', label: 'Versículos', icon: '✍️' },
    { mode: 'memory', label: 'Memorama', icon: '🃏' },
    { mode: 'wordsearch', label: 'Sopa de Letras', icon: '🔍' },
  ];

  const handleModeChange = (mode: GameMode) => {
    soundFx.playClick();
    onSelectMode(mode);
  };

  return (
    <header className="sticky top-0 z-30 bg-amber-950/95 backdrop-blur-md border-b border-amber-800/40 text-amber-50 shadow-md">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2.5 flex flex-wrap items-center justify-between gap-2.5">
        {/* Brand & Chapter identifier */}
        <div 
          onClick={() => handleModeChange('order')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 text-stone-950 flex items-center justify-center font-serif font-bold text-lg shadow-inner group-hover:scale-105 transition-transform">
            ✝
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-base sm:text-lg font-bold tracking-tight text-amber-200 group-hover:text-amber-100 transition-colors">
                Génesis 1
              </span>
              <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-amber-900/80 text-amber-300 font-medium border border-amber-700/50">
                La Creación
              </span>
            </div>
            <p className="text-[10px] text-amber-200/70 hidden sm:block">
              Juegos Bíblicos & Recursos
            </p>
          </div>
        </div>

        {/* Navigation Switcher: Games & Store */}
        <div className="flex items-center gap-1.5">
          {/* Game Modes */}
          <nav className="flex items-center gap-1 bg-amber-900/60 p-1 rounded-xl border border-amber-800/50 overflow-x-auto max-w-[280px] sm:max-w-none">
            {gameNavItems.map((item) => {
              const isActive = currentMode === item.mode;
              return (
                <button
                  key={item.mode}
                  id={`nav-tab-${item.mode}`}
                  onClick={() => handleModeChange(item.mode)}
                  className={`px-2 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 whitespace-nowrap flex items-center gap-1 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-semibold shadow-sm'
                      : 'text-amber-200/80 hover:text-amber-100 hover:bg-amber-800/50'
                  }`}
                >
                  <span className="text-xs">{item.icon}</span>
                  <span className="hidden md:inline">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Store Tab Button */}
          <button
            id="nav-tab-store"
            onClick={() => handleModeChange('store')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 flex items-center gap-1.5 cursor-pointer shadow-sm ${
              currentMode === 'store'
                ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-stone-950 shadow-md ring-2 ring-amber-300/50'
                : 'bg-amber-900/90 text-amber-200 hover:bg-amber-800 border border-amber-700/60'
            }`}
          >
            <Store className="w-3.5 h-3.5 text-amber-950" />
            <span>Tienda</span>
            <span className="text-[10px] bg-amber-950/80 text-amber-200 px-1.5 py-0.2 rounded-full font-sans">
              8
            </span>
          </button>
        </div>

        {/* Action controls: Cart, Google Merchant, Badges, Sound */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Cart Floating Trigger */}
          <button
            id="btn-open-cart"
            onClick={() => {
              soundFx.playClick();
              onOpenCart();
            }}
            className="relative p-2 rounded-xl bg-amber-900/70 hover:bg-amber-800 text-amber-200 border border-amber-700/50 transition-colors cursor-pointer"
            title="Ver carrito de compras"
            aria-label="Carrito de compras"
          >
            <ShoppingBag className="w-4 h-4 text-amber-300" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white font-bold text-[10px] flex items-center justify-center animate-bounce">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Shopify Hub button */}
          <button
            onClick={() => {
              soundFx.playClick();
              onOpenShopifyHub();
            }}
            className="p-2 rounded-xl bg-emerald-950/70 hover:bg-emerald-900 text-emerald-200 border border-emerald-700/50 transition-colors cursor-pointer hidden md:flex items-center gap-1.5 text-xs"
            title="Integración Shopify Store"
          >
            <span className="w-2 h-2 rounded-full bg-[#95BF47]" />
            <span className="text-[11px] font-semibold text-emerald-100">Shopify</span>
          </button>

          {/* Google Merchant Hub button */}
          <button
            onClick={() => {
              soundFx.playClick();
              onOpenMerchantHub();
            }}
            className="p-2 rounded-xl bg-blue-900/60 hover:bg-blue-800 text-blue-200 border border-blue-700/50 transition-colors cursor-pointer hidden sm:flex items-center gap-1 text-xs"
            title="Google Merchant Center & Google Shopping Hub"
          >
            <Globe className="w-3.5 h-3.5 text-blue-300" />
            <span className="hidden lg:inline text-[11px] font-semibold">Google Merchant</span>
          </button>

          {/* Points Pill */}
          <button
            id="btn-open-badges"
            onClick={() => {
              soundFx.playClick();
              onOpenBadges();
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-900/60 border border-amber-700/40 text-amber-200 hover:bg-amber-800/60 text-xs font-semibold cursor-pointer transition-colors"
            title="Puntos y Logros"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{points}</span>
            <Trophy className="w-3 h-3 text-yellow-400" />
          </button>

          {/* Bible Reader Button */}
          <button
            id="btn-open-bible"
            onClick={() => {
              soundFx.playClick();
              onOpenBible();
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-800/80 hover:bg-amber-700 text-amber-100 text-xs font-medium border border-amber-600/50 cursor-pointer transition-colors shadow-sm"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden xl:inline">Texto</span>
          </button>

          {/* Audio toggle */}
          <button
            id="btn-toggle-sound"
            onClick={onToggleSound}
            className="p-1.5 rounded-xl text-amber-300 hover:text-amber-100 hover:bg-amber-800/60 cursor-pointer transition-colors"
            title={soundEnabled ? 'Silenciar sonidos' : 'Activar sonidos'}
            aria-label="Alternar sonido"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-amber-400/60" />}
          </button>
        </div>
      </div>
    </header>
  );
}
