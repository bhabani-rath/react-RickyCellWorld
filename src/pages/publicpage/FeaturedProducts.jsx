import ProductCard from "../../components/ui/ProductCard";

const products = [
  {
    name: "Samsung Galaxy S24 Ultra",
    variant: "512GB • Titanium Gray",
    price: "₹1,299.00",
    originalPrice: "₹1,499.00",
    inStock: true,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBaXG83oWsH9tC_NS5ykDjMBgY-kEjI7CCDoPAO3NaROkynK-bPKdruAzGO0FOrCqfHCUmGeBiWZAgB8iT3IzScTyJ0xRbTaQMv01O8T7Fe3H5IYr4eyvDjMHirAE_q_bvyibq9CfQWuARIKeMTxqLIyXmFOF84AzQxKRuvAjcX_hv0NE0yaY-JwR1lF7t7deAUKXvuZSJUqdfqaYtjSopNC3ozDCKW1iMmdAVUTncpk3Vjrv9y0ZfSxOib-EE6PL5nLtKNl51Kjo4",
  },
  {
    name: 'MacBook Air 15" M2',
    variant: "256GB • Midnight",
    price: "₹1,199.00",
    originalPrice: null,
    inStock: true,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAG1S9uOijjKJc65nHorduVtnfpiyCm48phiN4eOeTTpWEWPmwRvMc6tdplh313vtLi86Qxb1rFxDAkBJ6a0lY5224LsxxRiMHk9K-gyjUAttKRdvhE9QA6OIScCadxCLQ8akTmEwRK7yX2zmd0gu3f8Gnee2Zd0rVN4CVe6da8-om-YQQQ-grZBuzNvVB7qCyEopvfN0shiwXL8m-pawSJqlAJSkXROz7o5g_Yux4zLOpTCHH0YOJvhftxMuTv47_mEMC2JijUw9g",
  },
  {
    name: "Apple Watch Series 9",
    variant: "GPS • 45mm • Starlight",
    price: "₹399.00",
    originalPrice: null,
    inStock: false,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDpcbsib7oaCNocBzgstyXqRc1YRdftUej4jgOmn4Rl-0VAS5Lc7kelbXmbzsu3fz4psWjGKZzstainbDoPD63Tt-jTiSNqsToTqbHDdil0LfKRpTaSIoUGz4_02M2uf2SsK_npcByohX5cegsNFx0i9Eopr4lJBHIQaLoCqJid-xyN5IJZvtJ70lWhmokQBeTQzZtPqytZl2p6EJAg1-AwseC4aUOgPcVhCKsTroXUzMagq5fOV_s0d9YZ8Rj3vzxxLp73qboSZ9s",
  },
  {
    name: "Sony PlayStation 5",
    variant: "Slim Edition • Disc Version",
    price: "₹499.00",
    originalPrice: null,
    inStock: true,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuATs8SidaI_9v65kyH1owbJb4au9lfKpuGYON43sptHzUFQ2CRNzSqOKTwOHpgS14_L8swhH36AjIewhbusFMhgakl4B1YEwDRaGkR0GFVFOXykLfEaMaj31rHh9vi9MgdNdgO8ubHL6CZ5BKzRM2uQXEr3xG1sKm99icQkPak4HYHDtmajWPFIBKTl13KwOyKLnEFe6EwLlghFiXPuzlM3XP-UZkRJFQyl2FniXzPOLTynX6yb8YHzhH7sXPShwrxMXo1XpRfE0-0",
  },
];

function FeaturedProducts() {
  return (
    <section id="offers" className="py-16 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <div className="h-8 w-1.5 bg-primary rounded-full"></div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Featured In Store
          </h2>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;
