import { BiblicalResourceProduct, CartItem, ShopifyConfig } from '../types';
import { BIBLICAL_PRODUCTS } from '../data/biblicalProducts';

export const SHOPIFY_STORAGE_KEY = 'biblical_resources_shopify_config';

export const DEFAULT_SHOPIFY_CONFIG: ShopifyConfig = {
  shopDomain: 'recursos-biblicos-genesis.myshopify.com',
  storefrontAccessToken: 'shpat_genesis1_recursos_demo_token',
  enableShopifyCheckout: true,
  defaultCurrency: 'USD',
  collectionHandle: 'recursos-genesis-1'
};

export function getShopifyConfig(): ShopifyConfig {
  try {
    const stored = localStorage.getItem(SHOPIFY_STORAGE_KEY);
    if (stored) {
      return { ...DEFAULT_SHOPIFY_CONFIG, ...JSON.parse(stored) };
    }
  } catch {
    // ignore
  }
  return DEFAULT_SHOPIFY_CONFIG;
}

export function saveShopifyConfig(config: ShopifyConfig): void {
  try {
    localStorage.setItem(SHOPIFY_STORAGE_KEY, JSON.stringify(config));
  } catch {
    // ignore
  }
}

/**
 * Generates an official Shopify Products CSV format
 * Specification: https://help.shopify.com/en/manual/products/import-export-products/using-csv
 */
export function generateShopifyProductsCsv(products: BiblicalResourceProduct[] = BIBLICAL_PRODUCTS): string {
  const escapeCsv = (val: string | number | boolean | undefined) => {
    if (val === undefined || val === null) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const headers = [
    'Handle',
    'Title',
    'Body (HTML)',
    'Vendor',
    'Standardized Product Type',
    'Custom Product Type',
    'Tags',
    'Published',
    'Option1 Name',
    'Option1 Value',
    'Option2 Name',
    'Option2 Value',
    'Option3 Name',
    'Option3 Value',
    'Variant SKU',
    'Variant Grams',
    'Variant Inventory Tracker',
    'Variant Inventory Qty',
    'Variant Inventory Policy',
    'Variant Fulfillment Service',
    'Variant Price',
    'Variant Compare At Price',
    'Variant Requires Shipping',
    'Variant Taxable',
    'Variant Barcode',
    'Image Src',
    'Image Position',
    'Image Alt Text',
    'Gift Card',
    'SEO Title',
    'SEO Description',
    'Google Shopping / Google Product Category',
    'Google Shopping / Gender',
    'Google Shopping / Age Group',
    'Google Shopping / MPN',
    'Google Shopping / Condition',
    'Google Shopping / Custom Product',
    'Google Shopping / Custom Label 0',
    'Status'
  ];

  const rows = products.map((p) => {
    const handle = p.id;
    const title = p.title;
    const bodyHtml = `<h3>${p.subtitle}</h3><p>${p.fullDescription}</p><h4>Características:</h4><ul>${p.features.map(f => `<li>${f}</li>`).join('')}</ul><p><strong>Referencia Bíblica:</strong> ${p.scriptureReference}</p>`;
    const vendor = p.brand;
    const productType = p.categoryLabel;
    const tags = ['Génesis 1', 'Creación', p.categoryLabel, p.format === 'digital' ? 'Digital' : 'Físico', ...p.tags].join(', ');
    const published = 'TRUE';
    const opt1Name = 'Title';
    const opt1Val = 'Default Title';
    const sku = p.sku;
    const grams = p.format === 'fisico' ? 1200 : 0;
    const tracker = 'shopify';
    const qty = p.stockQuantity;
    const policy = 'deny';
    const fulfillment = 'manual';
    const price = p.price.toFixed(2);
    const comparePrice = p.originalPrice ? p.originalPrice.toFixed(2) : '';
    const requiresShipping = p.format === 'fisico' ? 'TRUE' : 'FALSE';
    const taxable = 'TRUE';
    const barcode = p.gtin;
    const imageSrc = p.coverImage;
    const imagePos = 1;
    const imageAlt = p.title;
    const giftCard = 'FALSE';
    const seoTitle = `${p.title} | Recursos Bíblicos Génesis 1`;
    const seoDesc = p.description.slice(0, 160);
    const googleCategory = p.googleProductCategory || '677';
    const mpn = p.sku;
    const condition = 'new';
    const customProduct = 'FALSE';
    const customLabel0 = 'Génesis 1 Creación';
    const status = 'active';

    return [
      escapeCsv(handle),
      escapeCsv(title),
      escapeCsv(bodyHtml),
      escapeCsv(vendor),
      escapeCsv('Media > Books > Print Books'),
      escapeCsv(productType),
      escapeCsv(tags),
      escapeCsv(published),
      escapeCsv(opt1Name),
      escapeCsv(opt1Val),
      escapeCsv(''),
      escapeCsv(''),
      escapeCsv(''),
      escapeCsv(''),
      escapeCsv(sku),
      escapeCsv(grams),
      escapeCsv(tracker),
      escapeCsv(qty),
      escapeCsv(policy),
      escapeCsv(fulfillment),
      escapeCsv(price),
      escapeCsv(comparePrice),
      escapeCsv(requiresShipping),
      escapeCsv(taxable),
      escapeCsv(barcode),
      escapeCsv(imageSrc),
      escapeCsv(imagePos),
      escapeCsv(imageAlt),
      escapeCsv(giftCard),
      escapeCsv(seoTitle),
      escapeCsv(seoDesc),
      escapeCsv(googleCategory),
      escapeCsv('unisex'),
      escapeCsv('all'),
      escapeCsv(mpn),
      escapeCsv(condition),
      escapeCsv(customProduct),
      escapeCsv(customLabel0),
      escapeCsv(status)
    ].join(',');
  });

  return [headers.join(','), ...rows].join('\n');
}

/**
 * Triggers browser download for the Shopify Products CSV
 */
export function downloadShopifyCsv(products: BiblicalResourceProduct[] = BIBLICAL_PRODUCTS): void {
  const csvContent = generateShopifyProductsCsv(products);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'shopify_recursos_biblicos_genesis1.csv';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

/**
 * Builds a Shopify Cart Permalink or Checkout URL
 * Format: https://{shop}.myshopify.com/cart/{variant_id}:{quantity}?note=...
 */
export function buildShopifyCheckoutUrl(
  items: CartItem[],
  config: ShopifyConfig = getShopifyConfig()
): string {
  const cleanDomain = config.shopDomain.replace(/^https?:\/\//, '').replace(/\/$/, '');
  
  // If no items, link to store catalog
  if (items.length === 0) {
    return `https://${cleanDomain}/collections/${config.collectionHandle || 'all'}`;
  }

  // Generate cart query parameters
  // Uses Shopify standard Cart Permalink schema
  const cartQuery = items.map((item, idx) => {
    // If variant ID exists, use it; otherwise fallback to SKU or handle
    const id = item.product.shopifyVariantId || item.product.sku;
    return `${encodeURIComponent(id)}:${item.quantity}`;
  }).join(',');

  const note = encodeURIComponent('Pedido de Recursos Bíblicos Génesis 1');
  return `https://${cleanDomain}/cart/${cartQuery}?note=${note}&ref=juegos-biblicos`;
}

/**
 * Generates ready-to-use HTML/JS Embed Code for Shopify Buy Button
 */
export function generateShopifyEmbedCode(
  product: BiblicalResourceProduct,
  config: ShopifyConfig = getShopifyConfig()
): string {
  const cleanDomain = config.shopDomain.replace(/^https?:\/\//, '').replace(/\/$/, '');
  return `<!-- Shopify Buy Button Embed para: ${product.title} -->
<div id="product-component-${product.id}"></div>
<script type="text/javascript">
  (function () {
    var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
    if (window.ShopifyBuy && window.ShopifyBuy.UI) {
      ShopifyBuyInit();
    } else {
      var script = document.createElement('script');
      script.async = true;
      script.src = scriptURL;
      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
      script.onload = ShopifyBuyInit;
    }
    function ShopifyBuyInit() {
      var client = ShopifyBuy.buildClient({
        domain: '${cleanDomain}',
        storefrontAccessToken: '${config.storefrontAccessToken || 'TU_STOREFRONT_ACCESS_TOKEN'}',
      });
      ShopifyBuy.UI.onReady(client).then(function (ui) {
        ui.createComponent('product', {
          id: '${product.sku}',
          node: document.getElementById('product-component-${product.id}'),
          moneyFormat: '%24%7B%7Bamount%7D%7D%20USD',
          options: {
            product: {
              styles: {
                button: {
                  'background-color': '#d97706',
                  ':hover': { 'background-color': '#b45309' },
                  'border-radius': '12px',
                  'font-weight': 'bold'
                }
              }
            }
          }
        });
      });
    }
  })();
</script>`;
}
