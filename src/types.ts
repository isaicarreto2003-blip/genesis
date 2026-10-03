export type GameMode = 'order' | 'trivia' | 'verses' | 'memory' | 'wordsearch' | 'store' | 'merchant';

export interface CreationDay {
  id: number;
  dayNumber: number;
  dayLabel: string;
  title: string;
  shortDesc: string;
  verseRef: string;
  verseText: string;
  iconName: string;
  keyElements: string[];
  themeColor: string;
}

export interface TriviaQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  verseRef: string;
}

export interface VerseChallenge {
  id: number;
  reference: string;
  fullVerse: string;
  templateSegments: { text: string; isBlank?: boolean; blankIndex?: number }[];
  missingWords: { id: string; word: string }[];
  clue: string;
}

export interface MemoryCard {
  id: string;
  pairId: number;
  type: 'day' | 'creation';
  title: string;
  subtitle: string;
  iconName: string;
  color: string;
}

export interface WordSearchWord {
  word: string;
  clue: string;
  verseRef: string;
  found: boolean;
}

export interface UserStats {
  orderCompleted: boolean;
  orderBestScore: number;
  triviaBestScore: number;
  triviaCompleted: number;
  versesCompleted: number[];
  memoryBestMoves: number;
  wordsFoundCount: number;
  totalPoints: number;
}

// -------------------------------------------------------------
// Biblical Resources Store & Google Merchant Center Types
// -------------------------------------------------------------

export type ProductCategory = 
  | 'all'
  | 'guias'
  | 'ninos'
  | 'flashcards'
  | 'libros'
  | 'kits'
  | 'gratuitos';

export type ProductFormat = 'digital' | 'fisico' | 'hibrido';

export interface ProductReview {
  id: string;
  author: string;
  role: string; // e.g. "Maestra de Escuela Dominical", "Pastor", "Padre de Familia"
  rating: number;
  comment: string;
  date: string;
}

export interface BiblicalResourceProduct {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  fullDescription: string;
  price: number; // in USD
  originalPrice?: number;
  currency: string; // 'USD'
  category: ProductCategory;
  categoryLabel: string;
  format: ProductFormat;
  formatLabel: string;
  tags: string[];
  coverImage: string;
  images: string[];
  rating: number;
  reviewsCount: number;
  isBestSeller?: boolean;
  isNew?: boolean;
  isFree?: boolean;
  scriptureReference: string;
  features: string[];
  whatsIncluded: string[];
  specifications: { label: string; value: string }[];
  samplePreviewPages?: { title: string; excerpt: string }[];
  samplePdfUrl?: string;
  downloadUrl?: string; // Digital instant delivery link
  sku: string;
  gtin: string; // Global Trade Item Number for Google Merchant Center
  brand: string;
  inStock: boolean;
  stockQuantity: number;
  googleProductCategory: string; // e.g. "677" (Media > Books > Religious Books)
  weight?: string;
  shopifyVariantId?: string; // ID used for Shopify Cart permalinks
}

export interface CartItem {
  product: BiblicalResourceProduct;
  quantity: number;
}

export interface CouponCode {
  code: string;
  discountPercentage?: number;
  discountAmount?: number;
  description: string;
  minSpend?: number;
}

export interface OrderCheckoutData {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  address?: string;
  postalCode?: string;
  notes?: string;
  paymentMethod: 'card' | 'paypal' | 'transfer' | 'whatsapp' | 'shopify';
}

// -------------------------------------------------------------
// Shopify Store Integration Types
// -------------------------------------------------------------

export interface ShopifyConfig {
  shopDomain: string; // e.g. "recursos-biblicos-genesis.myshopify.com"
  storefrontAccessToken?: string;
  enableShopifyCheckout: boolean;
  defaultCurrency: string;
  collectionHandle: string;
}
