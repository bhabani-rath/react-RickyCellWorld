import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./pages/publicpage/Hero";
import Features from "./pages/publicpage/Features";
import Categories from "./pages/publicpage/Categories";
import FeaturedProducts from "./pages/publicpage/FeaturedProducts";
import CategoryListingPage from "./pages/publicpage/CategoryListingPage";
import ProductDetailPage from "./pages/publicpage/ProductDetailPage";

// Home page component
function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Categories />
      <FeaturedProducts />
    </>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-background-light font-display text-slate-900 antialiased overflow-x-hidden">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category" element={<CategoryListingPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
