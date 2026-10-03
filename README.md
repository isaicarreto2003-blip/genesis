# ✝ Juegos Bíblicos: Génesis 1 & Tienda de Recursos Bíblicos

Aplicación web completa e interactiva diseñada para la enseñanza bíblica de **Génesis Capítulo 1 (La Creación)** y tienda de recursos pedagógicos cristianos, optimizada para despliegue en **GitHub**, **Vercel** y sincronización con **Google Merchant Center** y **Google Shopping** para la cuenta `esdraspanamacarreto@gmail.com`.

---

## 🌟 Características Principales

### 1. 🎮 Módulo de Juegos Bíblicos (Génesis 1)
* **🌅 Ordena los 7 Días de la Creación**: Dinámica interactiva para ordenar cronológicamente los días del 1 al 7 con retroalimentación bíblica inmediata.
* **❓ Trivia Bíblica de la Creación**: Preguntas de opción múltiple con explicaciones teológicas y versículos de referencia.
* **✍️ Completa el Versículo**: Desafío de memoria bíblica para reconstruir los versículos clave de Génesis 1.
* **🃏 Memorama de la Creación**: Juego de parejas asociando el día con la obra creada.
* **🔍 Sopa de Letras Bíblica**: Encuentra palabras clave del hebreo y español (Luz, Firmamento, Lumbreras, Hombre, etc.).
* **📖 Lector Bíblico de Génesis 1 Completo**: Texto íntegro en versión Reina-Valera 1960.
* **🏆 Sistema de Puntos y Logros**: Guardado local persistente de progreso.

### 2. 🛍️ Módulo de Venta de Recursos Bíblicos
* **Catálogo de Recursos de Génesis 1**:
  * Guías de Estudio Exegético y Teológico para pastores y maestros.
  * Mega Cuadernos de Actividades infantiles para Escuela Dominical (PDF imprimible).
  * Sets de Flashcards coleccionables ilustradas para memorización.
  * Kits pedagógicos completos de 4 semanas para educadores.
  * Biblias de Estudio Cronológico ilustradas (edición física).
  * Devocionales de 30 días con el Creador.
  * Materiales de bienvenida 100% gratuitos.
* **Carrito de Compras (Slide-over Cart)** con cálculo automático de subtotales, envíos y descuentos.
* **Sistema de Cupones de Descuento**:
  * `GENESIS10`: 10% de descuento en toda la tienda.
  * `BENDICION`: 15% de descuento en pedidos mayores a $20 USD.
  * `PASTOR`: $5 USD de apoyo a líderes y maestros.
* **Pasarela de Pago Simulada & WhatsApp Directo**:
  * Checkout con opciones de tarjeta, transferencia y PayPal.
  * Generación de orden y descargas inmediatas de archivos digitales.
  * Botón de pedido directo por WhatsApp con mensaje preformateado.

### 3. 🌐 Google Merchant Center & Google Shopping Hub
* **Cuenta designada**: `esdraspanamacarreto@gmail.com`
* **Feed XML Oficial (RSS 2.0)**: Cumple al 100% con los estándares de Google (`g:id`, `g:title`, `g:price`, `g:brand`, `g:gtin`, `g:google_product_category: 677`, `g:availability`).
* **Ruta pública del Feed**: `/google-merchant-feed.xml`
* **Etiqueta de Verificación de Dominio**: Inyectada en `index.html`.
* **Datos Estructurados Schema.org (JSON-LD)** en cada producto para aparecer con estrellas y precios en Google.

---

## 🚀 Tecnologías Utilizadas

* **React 19** + **TypeScript**
* **Vite 8**
* **Tailwind CSS 4**
* **Lucide React** (Iconografía)
* **Canvas Confetti** (Efectos visuales de victoria)
* **Web Audio API** (Efectos de sonido interactivos)

---

## 💻 Instalación y Ejecución Local

1. **Clonar el repositorio**:
```bash
git clone https://github.com/TU-USUARIO/juegos-biblicos-genesis.git
cd juegos-biblicos-genesis
```

2. **Instalar dependencias**:
```bash
npm install
```

3. **Iniciar el servidor de desarrollo**:
```bash
npm run dev
```
Abre tu navegador en `http://localhost:3000`.

4. **Compilar para producción**:
```bash
npm run build
```

---

## 🐙 Guía para Subir a GitHub

Sigue estos pasos en tu terminal para publicar el proyecto en tu cuenta de GitHub:

```bash
# 1. Inicializar el repositorio Git local
git init

# 2. Agregar todos los archivos preparados
git add .

# 3. Crear el primer commit
git commit -m "feat: juegos bíblicos génesis 1 y módulo de recursos con google merchant center"

# 4. Asignar la rama principal como 'main'
git branch -M main

# 5. Conectar con tu repositorio remoto de GitHub
# (Crea primero un repositorio vacío en https://github.com/new)
git remote add origin https://github.com/TU-USUARIO/juegos-biblicos-genesis.git

# 6. Subir el código a GitHub
git push -u origin main
```

El archivo `.gitignore` ya viene configurado para ignorar `node_modules`, `dist/`, `.env` y carpetas de caché.

---

## ⚡ Despliegue en Vercel

Este proyecto ya cuenta con el archivo `vercel.json` configurado para manejar el enrutamiento SPA y servir el feed XML con los encabezados adecuados.

### Método 1: Conexión Automática con GitHub (Recomendado)
1. Ve a [vercel.com](https://vercel.com) e inicia sesión con tu cuenta de GitHub.
2. Haz clic en **"Add New..." > "Project"**.
3. Selecciona tu repositorio `juegos-biblicos-genesis`.
4. Vercel detectará automáticamente que es un proyecto **Vite**:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Haz clic en **"Deploy"**. En 30 segundos tu app estará en vivo con un dominio `.vercel.app` y certificado SSL HTTPS gratuito.

### Método 2: Despliegue mediante la CLI de Vercel
```bash
# Instalar Vercel CLI globalmente
npm i -g vercel

# Desplegar a producción
vercel --prod
```

---

## 🛒 Vinculación con Google Merchant Center y Google Shopping

Para vincular la tienda con tu cuenta de Google (`esdraspanamacarreto@gmail.com`):

### Paso 1: Acceder a Google Merchant Center
Ingresa a [https://merchants.google.com/](https://merchants.google.com/) con tu correo `esdraspanamacarreto@gmail.com`.

### Paso 2: Reclamar y Verificar tu Sitio Web
1. En Google Merchant Center ve a **Configuración (⚙️) > Información de la empresa > Sitio web**.
2. Escribe la URL de tu aplicación en Vercel (por ejemplo `https://tu-app.vercel.app`).
3. Elige el método de verificación **«Agregar una etiqueta HTML»**.
4. La etiqueta de verificación ya está incluida en el `<head>` de `index.html`:
   ```html
   <meta name="google-site-verification" content="google-merchant-genesis1-esdraspanamacarreto-verify" />
   ```
5. Haz clic en **"Verificar sitio web"** y luego en **"Reclamar sitio web"**.

### Paso 3: Añadir la Fuente de Productos (Feed XML)
1. En el menú lateral, dirígete a **Productos > Feeds (Fuentes de datos)**.
2. Haz clic en el botón azul `+` (Agregar feed principal).
3. Selecciona el país de destino (ej. Guatemala, México, Estados Unidos, etc.) y el idioma (Español).
4. En método de entrada, selecciona **«Recuperación programada» (Scheduled Fetch)**.
5. Asigna el nombre al feed: `Recursos Bíblicos Génesis 1`.
6. En la URL del archivo introduce:
   ```
   https://tu-app.vercel.app/google-merchant-feed.xml
   ```
7. Define la frecuencia de recuperación (ej. Diario a las 02:00 AM).
8. Haz clic en **Crear feed**. Google descargará y procesará automáticamente los 8 recursos bíblicos con sus códigos GTIN, precios en USD y fotos.

### Paso 4: Activar Fichas Gratuitas de Google Shopping
1. En Google Merchant Center, activa el programa **«Fichas de producto gratuitas»**.
2. Con esto tus libros y guías aparecerán sin costo en la pestaña de **Google Shopping** para las personas que busquen recursos de la Creación o Génesis 1.
3. (Opcional) Si deseas crear anuncios de pago, vincula tu cuenta de **Google Ads** desde *Configuración > Cuentas vinculadas*.

---

## 🛍️ Integración con Tienda Shopify

La aplicación incluye soporte completo para funcionar de forma integrada con **Shopify**:

### 1. Exportación de Catálogo en CSV Oficial de Shopify
Puedes descargar el archivo CSV oficial que cumple al 100% con las especificaciones de Shopify (`Handle, Title, Body (HTML), Vendor, Type, Tags, Variant SKU, Variant Price, Variant Barcode, Image Src, Google Shopping / Google Product Category, etc.`):
1. En la aplicación abre el botón **"Shopify"** en la barra superior o en el banner de la tienda.
2. Ve a la pestaña **"Exportar CSV Oficial"** y haz clic en **"Descargar CSV para Shopify"**.
3. En tu panel de administración de Shopify ve a **Productos > Importar**.
4. Sube el archivo `shopify_recursos_biblicos_genesis1.csv` y haz clic en **Importar productos**.
5. Los 8 recursos bíblicos se crearán con sus precios en USD, portadas en HD, variantes e inventarios listos para vender.

### 2. Shopify Checkout (Headless & Cart Permalinks)
* Puedes configurar el dominio de tu tienda (ej. `tu-tienda.myshopify.com` o tu dominio personalizado) en el panel de configuración de Shopify en la app.
* Al habilitar el checkout de Shopify, los clientes pueden hacer clic en **"Pagar con Shopify Checkout"** directamente desde el carrito o en el formulario de pago, transfiriendo los artículos seleccionados a la pasarela oficial de Shopify (Shop Pay, tarjetas, Apple Pay, etc.).

### 3. Sincronización Shopify ↔ Google Merchant Center
Si conectas tu tienda con Shopify:
1. En tu panel de Shopify, ve a **Apps > Shopify App Store** e instala la app oficial gratuita **Google & YouTube**.
2. Conecta tu cuenta de Google: `esdraspanamacarreto@gmail.com`.
3. Shopify vinculará automáticamente tus productos con Google Merchant Center y Google Shopping sin necesidad de configurar feeds adicionales.

### 4. Buy Button & Embeds para Sitios Web
* En la pestaña **"Buy Button Embed"** del panel Shopify puedes generar fragmentos HTML y JavaScript del SDK oficial de Shopify para incrustar cualquiera de los recursos en blogs cristianos, webs de iglesias o plantillas externas.

---

## 📁 Estructura del Proyecto

```
├── public/
│   ├── google-merchant-feed.xml  # Feed XML oficial para Google Merchant Center
│   ├── robots.txt                # Reglas para rastreadores de motores de búsqueda
│   └── sitemap.xml               # Mapa del sitio web para indexación SEO
├── src/
│   ├── components/
│   │   ├── store/                # Módulo de Comercio de Recursos Bíblicos
│   │   │   ├── CartDrawer.tsx           # Carrito de compras lateral con cupones
│   │   │   ├── CheckoutModal.tsx        # Pasarela y descargas instantáneas
│   │   │   ├── GoogleMerchantModal.tsx  # Centro de control Google Shopping
│   │   │   ├── ProductCard.tsx          # Tarjeta visual de producto
│   │   │   ├── ProductDetailModal.tsx   # Ficha técnica y muestras de lectura
│   │   │   └── StoreView.tsx            # Vista principal de la tienda y catálogo
│   │   ├── BadgesModal.tsx       # Modal de logros y trofeos
│   │   ├── BibleReaderModal.tsx  # Lector del texto bíblico de Génesis 1
│   │   ├── DayOrderGame.tsx      # Juego: Ordena los 7 Días de la Creación
│   │   ├── MemoryGame.tsx        # Juego: Memorama bíblico
│   │   ├── Navbar.tsx            # Barra de navegación principal
│   │   ├── TriviaGame.tsx        # Juego: Trivia de la Creación
│   │   ├── VerseGame.tsx         # Juego: Completa el versículo bíblico
│   │   └── WordSearchGame.tsx    # Juego: Sopa de letras
│   ├── data/
│   │   └── biblicalProducts.ts   # Catálogo de recursos, cupones y testimonios
│   ├── utils/
│   │   ├── audio.ts              # Sintetizador de efectos sonoros Web Audio
│   │   └── googleMerchant.ts     # Generador de feed y esquemas JSON-LD
│   ├── App.tsx                   # Componente raíz con integración de módulos
│   ├── types.ts                  # Definiciones e interfaces TypeScript
│   └── main.tsx                  # Punto de entrada de React
├── vercel.json                   # Configuración para despliegue en Vercel
├── metadata.json                 # Metadatos de la aplicación
├── package.json                  # Dependencias y scripts
└── README.md                     # Documentación oficial
```

---

## 📄 Licencia

Desarrollado para la edificación del pueblo de Dios, iglesias locales, educadores bíblicos y familias. Distribución libre bajo licencia MIT.
