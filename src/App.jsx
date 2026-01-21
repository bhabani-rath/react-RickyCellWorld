import {
  Navbar,
  Footer,
  Hero,
  Features,
  Categories,
  FeaturedProducts,
} from "./components";

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
