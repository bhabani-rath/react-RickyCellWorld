# 📱 Ricky Cell World (Frontend Prototype)

A modern, high-performance e-commerce storefront for a multi-location electronics retailer in Odisha, India. Built with **React 19** and **TailwindCSS 4**, featuring a completely custom design system and mobile-first architecture.

![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1-06B6D4?logo=tailwindcss)
![Status](https://img.shields.io/badge/Status-Frontend_Prototype-yellow)

---

## 📖 Project Overview

This repository contains the **frontend user interface** for the Ricky Cell World digital platform. It is currently a **functional prototype** populated with mock data, ready for API integration.

- **Core Philosophy**: "Frontend First" prototype with mock data.
- **Rendering**: Client-Side Rendering (CSR) via React 19.
- **Routing**: Client-side routing via React Router DOM 7.
- **Styling**: Utility-first CSS via TailwindCSS 4.
- **State Management**: React Context API for global UI state (Store Selection).

---

## ✨ Key Features

- **Store-Specific Browsing**: Context-aware product availability based on selected store location (Nirakarpur, Mandarabasta, etc.).
- **Dynamic Mega Menu**: Visual category navigation with 4-column layout and hover effects.
- **Advanced Filtering Engine**: Category, Brand, Price, Availability, and Rating filters.
- **WhatsApp-First Commerce**: Direct "Enquire" buttons generate pre-filled WhatsApp messages.
- **Modern UI/UX**: Glassmorphism effects, smooth micro-interactions, and mobile-responsive drawer navigation.

---

## 🛠️ Technology Stack

| Category    | Technology   | Version | Details                                              |
| ----------- | ------------ | ------- | ---------------------------------------------------- |
| **Core**    | React        | 19.2    | Leveraging React Compiler for automatic optimization |
| **Build**   | Vite         | 7.2     | Fast HMR and optimized production builds             |
| **Styling** | TailwindCSS  | 4.1     | Utility-first CSS with `@theme` configuration        |
| **Routing** | React Router | 7.13    | Client-side routing with nested routes               |
| **Linting** | ESLint       | 9.39    | Flat config with React Hooks & Refresh plugins       |

---

## 🏗️ System Architecture

### 1. Directory Structure

The project follows a "feature-based" grouping within a standard React scaffolding.

```
src/
├── components/          # UI Building Blocks
│   ├── layout/          # Structural components (Navbar, Footer, Modals)
│   ├── ui/              # Reusable atoms (Buttons, Cards, Inputs)
│   └── plans/           # Architectural documentation & future plans
├── pages/               # Route Views
│   ├── publicpage/      # Customer-facing pages (Hero, ProductDetail)
│   └── Inventory/       # (Planned) Admin panel views
├── context/             # Global Logic
│   └── StoreContext.jsx # Provider for store selection state
├── data/                # Mock Database
│   └── products.js      # Centralized static data file
├── hooks/               # (Empty) Custom React hooks placeholder
├── services/            # (Empty) API service layer placeholder
├── utils/               # (Empty) Helper functions placeholder
├── App.jsx              # Main Layout & Route Definitions
└── main.jsx             # Entry Point (DOM hydration)
```

### 2. Component Architecture

#### Layout Layer (`components/layout/`)

- **`Navbar.jsx`**: Top-level navigation. Manages scroll state and store selector display.
- **`MegaMenu.jsx`**: Desktop category navigation (Portal/Overlay) with a 4-column grid.
- **`StoreSelectorModal.jsx`**: Forces/allows users to set their physical store context. Persists to `localStorage`.

#### UI Primitives (`components/ui/`)

- **`ProductCard.jsx`**: Displays product summary, dynamic badges, and calculates discount percentages. Features a "WhatsApp" action button.
- **`FilterSidebar.jsx`**: Controlled component for the Listing Page. Manages active filter states (categories, brands, price).

#### Page Views (`pages/publicpage/`)

- **`Hero.jsx`**: Marketing carousel with auto-rotating slides.
- **`CategoryListingPage.jsx`**: Smart Container. Filters the `products` list based on URL params and sidebar state. Uses `useMemo` for performance.
- **`ProductDetailPage.jsx`**: Smart Container. Fetches product by ID. Manages local gallery state and specs display.

### 3. Data Model (`src/data/products.js`)

Centralized mock database acting as the schema definition.

- **Product Entity**:
  ```javascript
  {
    id: Number,
    name: String,
    price: Number,
    category: String,
    brand: String,
    inStock: Boolean,
    gallery: Array,
    specs: Object
  }
  ```
- **Store Entity**:
  ```javascript
  {
    id: "nirakarpur", // Slug
    name: "Nirakarpur",
    isFlagship: true,
    address: String
  }
  ```

### 4. State Management

- **Global (`StoreContext`)**: Managing the "Selected Store" preference.
  - **Why**: Store selection affects inventory and pricing globally.
  - **Persistence**: Lazy initialization from `localStorage`.
- **Local**: Forms, filters, and UI toggles (modals) are managed locally to prevent global re-renders.

### 5. Styling & Design System

- **TailwindCSS 4.1**: Configured via `@theme` in `index.css`.
- **Design Tokens**:
  - Colors: Primary Blue (`#0066cc`), WhatsApp Green (`#25d366`).
  - Font: "Manrope" (Google Fonts).
  - Animations: Custom `fadeIn`, `slideUp` keyframes.

---

## 🚀 Getting Started

### 1. Prerequisites

- Node.js 18.0+
- npm

### 2. Installation & Run

```bash
git clone https://github.com/your-username/react-rickycellworld.git
cd react-rickycellworld
npm install
npm run dev
```

---

## 🔮 Roadmap & Scalability

1.  **Backend Integration**:
    - Replace `data/products.js` with `services/productService.js` connecting to a REST API.
    - Implement React Query or SWR for data fetching.
2.  **Inventory Admin Panel**:
    - Implement the planned `inventory-ui-ux-implementation-plan.md` for store managers.
3.  **Performance Checkpoints**:
    - Implement Lazy Loading (`React.lazy`) for route splitting.
    - Virtualize product lists if catalog exceeds 100 items.

---

## 📄 License

Proprietary software developed for **Ricky Cell World**.
