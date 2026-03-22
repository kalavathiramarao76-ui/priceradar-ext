# PriceHawk — AI Price Tracker & Analyzer

![Version](https://img.shields.io/badge/version-1.0.0-06B6D4)
![License](https://img.shields.io/badge/license-ISC-green)
![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-4285F4?logo=googlechrome&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)

> Track prices, compare products, detect dynamic pricing, and set smart alerts across Amazon, eBay, Walmart, Best Buy, and Shopify stores.

---

## Features

- :chart_with_downwards_trend: **Price Analysis** — Historical price tracking with trend detection and best-time-to-buy insights
- :balance_scale: **Product Comparison** — Side-by-side price comparison across multiple retailers
- :zap: **Dynamic Pricing Detection** — Identifies real-time price fluctuations and surge pricing patterns
- :bell: **Alert Strategies** — Smart notifications with customizable thresholds and timing strategies
- :package: **Amazon Integration** — Automatic price extraction from Amazon product pages
- :shopping_cart: **eBay Integration** — Track auction and buy-it-now prices on eBay
- :department_store: **Walmart Integration** — Monitor Walmart prices including rollbacks and clearance
- :computer: **Best Buy Integration** — Track electronics pricing and deal alerts
- :convenience_store: **Shopify Integration** — Works with any Shopify-powered online store
- :large_blue_diamond: **Cyan/Teal Theme** — Clean, data-focused UI with cyan and teal accents

---

## Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** | UI framework |
| **TypeScript** | Type-safe development |
| **Tailwind CSS** | Utility-first styling |
| **Vite** | Build tool & dev server |
| **Firebase** | Authentication, alerts & price history storage |
| **Chrome Extensions API** | Browser integration & price extraction |

---

## Installation

### From Source

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/priceradar-ext.git
   cd priceradar-ext
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the extension**
   ```bash
   npm run build
   ```

4. **Load into Chrome**
   - Open `chrome://extensions/`
   - Enable **Developer mode** (top right)
   - Click **Load unpacked**
   - Select the `dist/` folder

### Development Mode

```bash
npm run dev
```
Starts the Vite development server.

---

## Usage

### Tracking a Product
1. Navigate to a product page on any supported retailer (Amazon, eBay, Walmart, Best Buy, or Shopify)
2. Click the **PriceHawk** icon in the toolbar
3. The extension automatically extracts the current price and product details
4. Click **Track** to start monitoring price changes

### Price Analysis
1. Open the side panel to view **price history charts**
2. See trend indicators: rising, falling, stable, or volatile
3. View **best-time-to-buy** recommendations based on historical patterns

### Product Comparison
1. Track the same product across multiple retailers
2. Open the **Compare** tab in the side panel
3. View a side-by-side price breakdown with shipping costs included

### Dynamic Pricing Detection
1. PriceHawk monitors prices at regular intervals
2. When **surge pricing** or unusual fluctuations are detected, you receive a notification
3. View pricing patterns in the **Dynamic Pricing** dashboard

### Setting Alerts
1. Open a tracked product and click **Set Alert**
2. Configure your strategy:
   - **Target Price** — Alert when price drops below a threshold
   - **Percentage Drop** — Alert on percentage-based discounts
   - **Historical Low** — Alert when price approaches all-time low
3. Receive Chrome notifications when conditions are met

---

## Architecture

```
priceradar-ext/
├── src/
│   ├── popup/              # Extension popup with quick price view
│   ├── sidepanel/          # Full price tracking dashboard
│   ├── background.ts       # Service worker for price monitoring
│   ├── content/            # Content scripts for retailer extraction
│   ├── shared/             # Shared utilities, types, constants
│   ├── components/         # Reusable React components
│   └── utils/              # Price parsing & comparison helpers
├── public/
│   └── icons/              # Extension icons (16, 48, 128px + SVGs)
├── dist/                   # Built extension output
├── vite.config.ts          # Vite build configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── manifest.json           # Chrome extension manifest
```

---

## Screenshots

<p align="center">
  <img src="public/icons/icon128.png" alt="PriceHawk Icon" width="128" height="128" />
</p>

| Icon Size | Path |
|---|---|
| 16x16 | `public/icons/icon16.png` / `public/icons/icon16.svg` |
| 48x48 | `public/icons/icon48.png` / `public/icons/icon48.svg` |
| 128x128 | `public/icons/icon128.png` / `public/icons/icon128.svg` |

---

## License

ISC
