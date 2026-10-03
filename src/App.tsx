import { useState, useEffect } from 'react';
import { GameMode, UserStats, BiblicalResourceProduct, CartItem, CouponCode } from './types';
import { Navbar } from './components/Navbar';
import { DayOrderGame } from './components/DayOrderGame';
import { TriviaGame } from './components/TriviaGame';
import { VerseGame } from './components/VerseGame';
import { MemoryGame } from './components/MemoryGame';
import { WordSearchGame } from './components/WordSearchGame';
import { BibleReaderModal } from './components/BibleReaderModal';
import { BadgesModal } from './components/BadgesModal';
import { StoreView } from './components/store/StoreView';
import { ProductDetailModal } from './components/store/ProductDetailModal';
import { CartDrawer } from './components/store/CartDrawer';
import { CheckoutModal } from './components/store/CheckoutModal';
import { GoogleMerchantModal } from './components/store/GoogleMerchantModal';
import { ShopifyModal } from './components/store/ShopifyModal';
import { soundFx } from './utils/audio';
import { GOOGLE_MERCHANT_CONFIG } from './utils/googleMerchant';
import { BookOpen, Sparkles, ShoppingBag, Globe, ShieldCheck } from 'lucide-react';

const STATS_STORAGE_KEY = 'biblical_games_genesis1_stats';
const CART_STORAGE_KEY = 'biblical_resources_cart_v1';

export default function App() {
  const [currentMode, setCurrentMode] = useState<GameMode>('order');
  const [isBibleOpen, setIsBibleOpen] = useState(false);
  const [isBadgesOpen, setIsBadgesOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Store & E-commerce States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isGoogleMerchantOpen, setIsGoogleMerchantOpen] = useState(false);
  const [isShopifyOpen, setIsShopifyOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<BiblicalResourceProduct | null>(null);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<CouponCode | null>(null);

  // Cart state persisted in localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  // User Stats loaded from local storage
  const [stats, setStats] = useState<UserStats>(() => {
    try {
      const stored = localStorage.getItem(STATS_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    return {
      orderCompleted: false,
      orderBestScore: 0,
      triviaBestScore: 0,
      triviaCompleted: 0,
      versesCompleted: [],
      memoryBestMoves: 0,
      wordsFoundCount: 0,
      totalPoints: 0,
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(stats));
    } catch {
      // ignore
    }
  }, [stats]);

  const handleToggleSound = () => {
    const nextVal = !soundEnabled;
    setSoundEnabled(nextVal);
    soundFx.enabled = nextVal;
    if (nextVal) {
      soundFx.playClick();
    }
  };

  // Game completion callbacks
  const handleOrderGameComplete = (pointsEarned: number) => {
    setStats((prev) => ({
      ...prev,
      orderCompleted: true,
      totalPoints: prev.totalPoints + pointsEarned,
      orderBestScore: Math.max(prev.orderBestScore, pointsEarned),
    }));
  };

  const handleTriviaGameComplete = (pointsEarned: number) => {
    setStats((prev) => ({
      ...prev,
      triviaCompleted: prev.triviaCompleted + 1,
      triviaBestScore: Math.max(prev.triviaBestScore, pointsEarned),
      totalPoints: prev.totalPoints + pointsEarned,
    }));
  };

  const handleVerseGameComplete = (pointsEarned: number) => {
    setStats((prev) => ({
      ...prev,
      totalPoints: prev.totalPoints + pointsEarned,
      versesCompleted: [...prev.versesCompleted, Date.now()],
    }));
  };

  const handleMemoryGameComplete = (pointsEarned: number) => {
    setStats((prev) => ({
      ...prev,
      memoryBestMoves: prev.memoryBestMoves === 0 ? 1 : prev.memoryBestMoves + 1,
      totalPoints: prev.totalPoints + pointsEarned,
    }));
  };

  const handleWordSearchGameComplete = (pointsEarned: number) => {
    setStats((prev) => ({
      ...prev,
      wordsFoundCount: 8,
      totalPoints: prev.totalPoints + pointsEarned,
    }));
  };

  const handleResetStats = () => {
    const emptyStats: UserStats = {
      orderCompleted: false,
      orderBestScore: 0,
      triviaBestScore: 0,
      triviaCompleted: 0,
      versesCompleted: [],
      memoryBestMoves: 0,
      wordsFoundCount: 0,
      totalPoints: 0,
    };
    setStats(emptyStats);
    localStorage.removeItem(STATS_STORAGE_KEY);
    setIsBadgesOpen(false);
  };

  // E-Commerce Store Handlers
  const handleAddToCart = (product: BiblicalResourceProduct) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleBuyNow = (product: BiblicalResourceProduct) => {
    handleAddToCart(product);
    setIsProductDetailOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleUpdateQuantity = (productId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOpenProductDetails = (product: BiblicalResourceProduct) => {
    setSelectedProduct(product);
    setIsProductDetailOpen(true);
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderCompleted = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/40 text-stone-900 selection:bg-amber-200">
      {/* Top Navbar */}
      <Navbar
        currentMode={currentMode}
        onSelectMode={setCurrentMode}
        onOpenBible={() => setIsBibleOpen(true)}
        onOpenBadges={() => setIsBadgesOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenMerchantHub={() => setIsGoogleMerchantOpen(true)}
        onOpenShopifyHub={() => setIsShopifyOpen(true)}
        points={stats.totalPoints}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        cartItemCount={totalCartCount}
      />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-5">
        {/* Biblical Games Mode */}
        {currentMode === 'order' && (
          <DayOrderGame onGameComplete={handleOrderGameComplete} />
        )}
        {currentMode === 'trivia' && (
          <TriviaGame onGameComplete={handleTriviaGameComplete} />
        )}
        {currentMode === 'verses' && (
          <VerseGame onGameComplete={handleVerseGameComplete} />
        )}
        {currentMode === 'memory' && (
          <MemoryGame onGameComplete={handleMemoryGameComplete} />
        )}
        {currentMode === 'wordsearch' && (
          <WordSearchGame onGameComplete={handleWordSearchGameComplete} />
        )}

        {/* Biblical Resources Store Mode */}
        {currentMode === 'store' && (
          <StoreView
            onAddToCart={handleAddToCart}
            onViewProductDetails={handleOpenProductDetails}
            onOpenGoogleMerchantModal={() => setIsGoogleMerchantOpen(true)}
            onOpenShopifyModal={() => setIsShopifyOpen(true)}
          />
        )}
      </main>

      {/* Scripture Quote Banner */}
      <div className="bg-amber-900/10 border-t border-amber-800/20 py-4 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="font-serif italic text-xs sm:text-sm text-stone-700 leading-relaxed">
            «En el principio creó Dios los cielos y la tierra. Y vio Dios todo lo que había hecho, y he aquí que era bueno en gran manera.»
          </p>
          <span className="text-[11px] font-bold text-amber-900 uppercase tracking-widest mt-1 inline-block">
            Génesis 1:1, 31 (RVR1960)
          </span>
        </div>
      </div>

      {/* Comprehensive Footer */}
      <footer className="bg-stone-900 text-stone-400 py-8 px-4 border-t border-stone-800 text-xs">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          {/* Col 1: Identity */}
          <div className="space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-2 text-stone-100 font-serif font-bold text-sm">
              <span className="text-amber-400 font-serif">✝</span>
              <span>Juegos Bíblicos & Tienda: Génesis 1</span>
            </div>
            <p className="text-[11px] text-stone-400 leading-relaxed max-w-sm">
              Plataforma interactiva cristiana con juegos educativos de la Creación y catálogo de recursos bíblicos pedagógicos para pastores, maestros y familias.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-2">
            <h4 className="font-serif font-bold text-stone-200 text-xs uppercase tracking-wider">
              Navegación Rápida
            </h4>
            <ul className="space-y-1 text-[11px]">
              <li>
                <button
                  onClick={() => setCurrentMode('store')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  🛍️ Tienda de Recursos Bíblicos
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentMode('order')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  🌅 Juego de los 7 Días de la Creación
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsBibleOpen(true)}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  📖 Leer Génesis Capítulo 1 Completo
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsBadgesOpen(true)}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  🏆 Logros y Puntos
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Google Merchant & Shopping Vinculación */}
          <div className="space-y-2">
            <h4 className="font-serif font-bold text-stone-200 text-xs uppercase tracking-wider flex items-center justify-center md:justify-start gap-1.5">
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>Google Merchant & Shopping</span>
            </h4>
            <p className="text-[11px] text-stone-400 leading-relaxed">
              Catálogo sincronizado para: <strong className="text-stone-300 font-mono">{GOOGLE_MERCHANT_CONFIG.accountEmail}</strong>
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1">
              <button
                onClick={() => setIsGoogleMerchantOpen(true)}
                className="px-2.5 py-1 rounded-lg bg-blue-900/60 hover:bg-blue-800 text-blue-200 text-[11px] font-semibold border border-blue-700/50 cursor-pointer transition-colors"
              >
                Google Merchant
              </button>
              <button
                onClick={() => setIsShopifyOpen(true)}
                className="px-2.5 py-1 rounded-lg bg-emerald-900/70 hover:bg-emerald-800 text-emerald-200 text-[11px] font-semibold border border-emerald-700/50 cursor-pointer transition-colors"
              >
                Shopify Hub
              </button>
              <a
                href="/google-merchant-feed.xml"
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-[11px] font-mono border border-stone-700 cursor-pointer transition-colors"
              >
                Feed XML
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto pt-6 mt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-stone-400">
          <p>© {new Date().getFullYear()} Editorial Creación Bíblica. Todos los derechos reservados.</p>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Listo para GitHub & Vercel • Google Merchant Compliant</span>
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <BibleReaderModal
        isOpen={isBibleOpen}
        onClose={() => setIsBibleOpen(false)}
      />

      <BadgesModal
        isOpen={isBadgesOpen}
        onClose={() => setIsBadgesOpen(false)}
        stats={stats}
        onResetStats={handleResetStats}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isProductDetailOpen}
        onClose={() => setIsProductDetailOpen(false)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onProceedCheckout={handleProceedCheckout}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={setAppliedCoupon}
        onOpenShopifyHub={() => setIsShopifyOpen(true)}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        appliedCoupon={appliedCoupon}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* Google Merchant Center & Shopping Hub */}
      <GoogleMerchantModal
        isOpen={isGoogleMerchantOpen}
        onClose={() => setIsGoogleMerchantOpen(false)}
      />

      {/* Shopify Integration Modal */}
      <ShopifyModal
        isOpen={isShopifyOpen}
        onClose={() => setIsShopifyOpen(false)}
      />
    </div>
  );
}
