import { Routes, Route, Navigate } from "react-router-dom";
import { StoreProvider } from "./context/StoreContext";
import { ProductProvider } from "./context/ProductContext";
import { InventoryProvider } from "./context/InventoryContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// Public Page Components
import Hero from "./pages/publicpage/Hero";
import BankOffersBar from "./pages/publicpage/BankOffersBar";
import Categories from "./pages/publicpage/Categories";
import FeaturedProducts from "./pages/publicpage/FeaturedProducts";
import BrandShowcase from "./pages/publicpage/BrandShowcase";
import TrustBadges from "./pages/publicpage/TrustBadges";
import CategoryListingPage from "./pages/publicpage/CategoryListingPage";
import ProductDetailPage from "./pages/publicpage/ProductDetailPage";
import LoginPage from "./pages/auth/LoginPage";

// Admin Components
import AdminLayout from "./components/admin/AdminLayout";
import DashboardPage from "./pages/admin/DashboardPage";
import ProductsPage from "./pages/admin/ProductsPage";
import InventoryOverviewPage from "./pages/Inventory/InventoryOverviewPage";
import StockTransferPage from "./pages/Inventory/StockTransferPage";

// Home page component - VijaysSales Style
function HomePage() {
  return (
    <>
      <Hero />
      <BankOffersBar />
      <Categories />
      <FeaturedProducts />
      <BrandShowcase />
      <TrustBadges />
    </>
  );
}

// Public layout wrapper
function PublicLayout({ children }) {
  return (
    <div className="min-h-screen bg-background-light font-display text-slate-900 antialiased overflow-x-hidden">
      <StoreProvider>
        <Navbar />
        {children}
      </StoreProvider>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <InventoryProvider>
      <ProductProvider>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <PublicLayout>
                <HomePage />
              </PublicLayout>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/category"
            element={
              <PublicLayout>
                <CategoryListingPage />
              </PublicLayout>
            }
          />
          <Route
            path="/product/:id"
            element={
              <PublicLayout>
                <ProductDetailPage />
              </PublicLayout>
            }
          />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="inventory" element={<InventoryOverviewPage />} />
            <Route path="inventory/transfer" element={<StockTransferPage />} />
          </Route>
        </Routes>
      </ProductProvider>
    </InventoryProvider>
  );
}

export default App;
