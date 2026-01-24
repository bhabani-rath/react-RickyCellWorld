import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./pages/publicpage/Hero";
import Features from "./pages/publicpage/Features";
import Categories from "./pages/publicpage/Categories";
import FeaturedProducts from "./pages/publicpage/FeaturedProducts";

function App() {
  return (
    <div className="min-h-screen bg-background-light font-display text-slate-900 antialiased overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <Categories />
      <FeaturedProducts />
      <Footer />
    </div>
  );
}

export default App;
