import { BiblicalResourceProduct } from '../types';
import { BIBLICAL_PRODUCTS } from '../data/biblicalProducts';

export const GOOGLE_MERCHANT_CONFIG = {
  accountEmail: 'esdraspanamacarreto@gmail.com',
  storeName: 'Tienda de Recursos Bíblicos Génesis 1',
  storeDomain: typeof window !== 'undefined' ? window.location.origin : 'https://juegos-biblicos-genesis.vercel.app',
  currency: 'USD',
  googleProductCategoryDefault: '677', // Media > Books > Religious Books
  merchantCenterUrl: 'https://merchants.google.com/',
  googleShoppingUrl: 'https://shopping.google.com/',
  verificationMetaTag: '<meta name="google-site-verification" content="google-merchant-genesis1-esdraspanamacarreto-verify" />',
};

/**
 * Generates an official Google Merchant Center compliant XML RSS 2.0 Feed
 * Specification: https://support.google.com/merchants/answer/7052112
 */
export function generateGoogleMerchantXml(products: BiblicalResourceProduct[] = BIBLICAL_PRODUCTS, baseUrl?: string): string {
  const domain = baseUrl || GOOGLE_MERCHANT_CONFIG.storeDomain;
  const now = new Date().toUTCString();

  const escapeXml = (unsafe: string) => {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  };

  const itemsXml = products.map((product) => {
    const productUrl = `${domain}/?product=${product.id}#tienda`;
    const imageUrl = product.coverImage;
    const priceFormatted = `${product.price.toFixed(2)} USD`;
    const availability = product.inStock ? 'in_stock' : 'out_of_stock';

    return `    <item>
      <g:id>${escapeXml(product.id)}</g:id>
      <g:title>${escapeXml(product.title)}</g:title>
      <g:description>${escapeXml(product.description)}</g:description>
      <g:link>${escapeXml(productUrl)}</g:link>
      <g:image_link>${escapeXml(imageUrl)}</g:image_link>
      <g:condition>new</g:condition>
      <g:availability>${availability}</g:availability>
      <g:price>${priceFormatted}</g:price>
      <g:brand>${escapeXml(product.brand)}</g:brand>
      <g:gtin>${escapeXml(product.gtin)}</g:gtin>
      <g:mpn>${escapeXml(product.sku)}</g:mpn>
      <g:identifier_exists>yes</g:identifier_exists>
      <g:google_product_category>${product.googleProductCategory || '677'}</g:google_product_category>
      <g:product_type>${escapeXml(`Recursos Bíblicos > ${product.categoryLabel}`)}</g:product_type>
      <g:shipping>
        <g:country>US</g:country>
        <g:service>${product.format === 'digital' ? 'Descarga Digital Inmediata' : 'Envío Estándar Internacional'}</g:service>
        <g:price>${product.format === 'digital' ? '0.00 USD' : '4.99 USD'}</g:price>
      </g:shipping>
    </item>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>${escapeXml(GOOGLE_MERCHANT_CONFIG.storeName)}</title>
    <link>${escapeXml(domain)}</link>
    <description>Catálogo oficial de recursos bíblicos pedagógicos, guías de estudio, flashcards y libros de Génesis 1 sincronizado con Google Merchant Center y Google Shopping para ${GOOGLE_MERCHANT_CONFIG.accountEmail}</description>
    <lastBuildDate>${now}</lastBuildDate>
${itemsXml}
  </channel>
</rss>`;
}

/**
 * Triggers browser download for the Google Merchant Center XML feed file
 */
export function downloadMerchantFeedXml(products: BiblicalResourceProduct[] = BIBLICAL_PRODUCTS) {
  const xmlContent = generateGoogleMerchantXml(products);
  const blob = new Blob([xmlContent], { type: 'application/xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'google-merchant-feed.xml';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

/**
 * Generates Schema.org Product structured data for rich snippets in Google Search & Shopping
 */
export function generateProductJsonLd(product: BiblicalResourceProduct, baseUrl?: string) {
  const domain = baseUrl || (typeof window !== 'undefined' ? window.location.origin : 'https://juegos-biblicos-genesis.vercel.app');
  return {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.title,
    image: [product.coverImage, ...product.images],
    description: product.description,
    sku: product.sku,
    gtin13: product.gtin,
    brand: {
      '@type': 'Brand',
      name: product.brand
    },
    category: product.categoryLabel,
    offers: {
      '@type': 'Offer',
      url: `${domain}/?product=${product.id}#tienda`,
      priceCurrency: 'USD',
      price: product.price.toFixed(2),
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: GOOGLE_MERCHANT_CONFIG.storeName
      }
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating.toString(),
      reviewCount: product.reviewsCount.toString()
    }
  };
}
