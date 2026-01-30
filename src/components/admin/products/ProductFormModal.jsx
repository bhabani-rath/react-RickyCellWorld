import { useState, useEffect } from "react";
import { useProducts } from "../../../context/ProductContext";

// Category-specific spec field configurations
const CATEGORY_SPECS = {
  mobiles: {
    title: "📱 Mobile Specifications",
    fields: [
      { key: "processor", label: "Processor / Chipset", placeholder: "e.g., Snapdragon 8 Gen 3" },
      { key: "display", label: "Display", placeholder: "e.g., 6.7\" AMOLED 120Hz" },
      { key: "camera", label: "Camera", placeholder: "e.g., 200MP + 12MP + 50MP" },
      { key: "storage", label: "Storage", placeholder: "e.g., 256GB" },
      { key: "ram", label: "RAM", placeholder: "e.g., 12GB" },
      { key: "battery", label: "Battery", placeholder: "e.g., 5000mAh, 65W Fast Charging" },
      { key: "os", label: "Operating System", placeholder: "e.g., Android 14, One UI 6" },
      { key: "antutuScore", label: "AnTuTu Score", placeholder: "e.g., 1500000", type: "number" },
      { key: "performance", label: "Performance Tier", type: "select", options: ["flagship", "high", "mid", "budget"] },
    ],
  },
  laptops: {
    title: "💻 Laptop Specifications",
    fields: [
      { key: "processor", label: "Processor", placeholder: "e.g., Intel Core i7-13700H" },
      { key: "display", label: "Display", placeholder: "e.g., 15.6\" FHD IPS 144Hz" },
      { key: "graphics", label: "Graphics Card", placeholder: "e.g., NVIDIA RTX 4060" },
      { key: "storage", label: "Storage", placeholder: "e.g., 512GB NVMe SSD" },
      { key: "ram", label: "RAM", placeholder: "e.g., 16GB DDR5" },
      { key: "battery", label: "Battery Life", placeholder: "e.g., Up to 10 hours" },
      { key: "os", label: "Operating System", placeholder: "e.g., Windows 11 Home" },
      { key: "weight", label: "Weight", placeholder: "e.g., 1.8 kg" },
    ],
  },
  wearables: {
    title: "⌚ Wearable Specifications",
    fields: [
      { key: "display", label: "Display", placeholder: "e.g., 1.9\" AMOLED Always-On" },
      { key: "battery", label: "Battery Life", placeholder: "e.g., Up to 18 hours" },
      { key: "sensors", label: "Sensors", placeholder: "e.g., Heart rate, SpO2, ECG" },
      { key: "waterResistance", label: "Water Resistance", placeholder: "e.g., 5ATM / IP68" },
      { key: "connectivity", label: "Connectivity", placeholder: "e.g., GPS, Bluetooth 5.3, LTE" },
      { key: "compatibility", label: "Compatibility", placeholder: "e.g., iOS, Android" },
      { key: "strapSize", label: "Strap Size", placeholder: "e.g., S/M/L, 42mm" },
    ],
  },
  audio: {
    title: "🎧 Audio Specifications",
    fields: [
      { key: "driver", label: "Driver Size", placeholder: "e.g., 40mm Custom" },
      { key: "frequency", label: "Frequency Response", placeholder: "e.g., 20Hz - 20kHz" },
      { key: "battery", label: "Battery Life", placeholder: "e.g., Up to 30 hours" },
      { key: "connectivity", label: "Connectivity", placeholder: "e.g., Bluetooth 5.2, 3.5mm" },
      { key: "anc", label: "Noise Cancellation", placeholder: "e.g., Active Noise Cancellation" },
      { key: "weight", label: "Weight", placeholder: "e.g., 250g" },
      { key: "microphone", label: "Microphone", placeholder: "e.g., Dual beamforming mics" },
    ],
  },
  tvs: {
    title: "📺 TV Specifications",
    fields: [
      { key: "screenSize", label: "Screen Size", placeholder: "e.g., 55 inches" },
      { key: "display", label: "Display Technology", placeholder: "e.g., QLED, 4K UHD" },
      { key: "refreshRate", label: "Refresh Rate", placeholder: "e.g., 120Hz" },
      { key: "hdr", label: "HDR Support", placeholder: "e.g., HDR10+, Dolby Vision" },
      { key: "smartTV", label: "Smart TV Platform", placeholder: "e.g., Tizen, Google TV" },
      { key: "speakers", label: "Speakers", placeholder: "e.g., 20W, Dolby Atmos" },
      { key: "ports", label: "Ports", placeholder: "e.g., 3x HDMI 2.1, 2x USB" },
    ],
  },
  fridges: {
    title: "🧊 Refrigerator Specifications",
    fields: [
      { key: "capacity", label: "Capacity", placeholder: "e.g., 650 Liters" },
      { key: "type", label: "Type", placeholder: "e.g., Side by Side, Double Door" },
      { key: "energyRating", label: "Energy Rating", placeholder: "e.g., 5 Star" },
      { key: "compressor", label: "Compressor", placeholder: "e.g., Inverter Linear" },
      { key: "cooling", label: "Cooling Technology", placeholder: "e.g., Multi Air Flow" },
      { key: "features", label: "Special Features", placeholder: "e.g., Ice Maker, Water Dispenser" },
    ],
  },
  acs: {
    title: "❄️ Air Conditioner Specifications",
    fields: [
      { key: "capacity", label: "Capacity", placeholder: "e.g., 1.5 Ton" },
      { key: "type", label: "Type", placeholder: "e.g., Split, Window" },
      { key: "energyRating", label: "Energy Rating", placeholder: "e.g., 5 Star" },
      { key: "compressor", label: "Compressor", placeholder: "e.g., Inverter" },
      { key: "cooling", label: "Cooling Capacity", placeholder: "e.g., 5200W" },
      { key: "features", label: "Features", placeholder: "e.g., PM 2.5 Filter, WiFi Control" },
    ],
  },
  accessories: {
    title: "🔌 Accessory Specifications",
    fields: [
      { key: "compatibility", label: "Compatibility", placeholder: "e.g., iPhone 15, USB-C devices" },
      { key: "material", label: "Material", placeholder: "e.g., Silicone, Leather" },
      { key: "color", label: "Color Options", placeholder: "e.g., Black, White, Blue" },
      { key: "features", label: "Features", placeholder: "e.g., MagSafe compatible" },
    ],
  },
  gaming: {
    title: "🎮 Gaming Specifications",
    fields: [
      { key: "processor", label: "Processor / APU", placeholder: "e.g., AMD Ryzen 5 7600X" },
      { key: "graphics", label: "Graphics", placeholder: "e.g., RDNA 3, 8K capable" },
      { key: "storage", label: "Storage", placeholder: "e.g., 1TB NVMe SSD" },
      { key: "ram", label: "RAM / Memory", placeholder: "e.g., 16GB GDDR6" },
      { key: "resolution", label: "Resolution Support", placeholder: "e.g., 4K @ 120fps" },
      { key: "features", label: "Features", placeholder: "e.g., Ray Tracing, VRR" },
    ],
  },
};

// Default specs for categories not defined above
const DEFAULT_SPECS = {
  title: "📋 Product Specifications",
  fields: [
    { key: "dimensions", label: "Dimensions", placeholder: "e.g., 10 x 5 x 2 cm" },
    { key: "weight", label: "Weight", placeholder: "e.g., 200g" },
    { key: "material", label: "Material", placeholder: "e.g., Aluminum, Plastic" },
    { key: "color", label: "Color", placeholder: "e.g., Black, Silver" },
    { key: "features", label: "Key Features", placeholder: "List main features" },
  ],
};

function ProductFormModal({ isOpen, product, onClose }) {
  const { addProduct, updateProduct, categories, brands } = useProducts();

  const [formData, setFormData] = useState({
    name: "",
    subtitle: "",
    brand: "",
    category: "mobiles",
    price: "",
    originalPrice: "",
    image: "",
    description: "",
    inStock: true,
    // Specs will be stored as flat object
    specs: {},
    // Additional details
    warranty: "",
    boxContents: "",
    highlights: "",
  });
  const [error, setError] = useState("");

  // Get spec config for current category
  const currentSpecs = CATEGORY_SPECS[formData.category] || DEFAULT_SPECS;

  // Populate form when editing
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        subtitle: product.subtitle || "",
        brand: product.brand || "",
        category: product.category || "mobiles",
        price: product.price?.toString() || "",
        originalPrice: product.originalPrice?.toString() || "",
        image: product.image || "",
        description: product.description || "",
        inStock: product.inStock !== false,
        specs: product.specs || {},
        warranty: product.warranty || "",
        boxContents: product.boxContents || "",
        highlights: product.highlights || "",
      });
    } else {
      setFormData({
        name: "",
        subtitle: "",
        brand: "",
        category: "mobiles",
        price: "",
        originalPrice: "",
        image: "",
        description: "",
        inStock: true,
        specs: {},
        warranty: "",
        boxContents: "",
        highlights: "",
      });
    }
    setError("");
  }, [product, isOpen]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.name.trim()) {
      setError("Product name is required");
      return;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      setError("Valid price is required");
      return;
    }
    if (!formData.image.trim()) {
      setError("Image URL is required");
      return;
    }

    // Clean up specs - remove empty values
    const cleanSpecs = {};
    Object.entries(formData.specs).forEach(([key, value]) => {
      if (value && value.toString().trim()) {
        cleanSpecs[key] = key === "antutuScore" ? parseInt(value, 10) : value.toString().trim();
      }
    });

    const productData = {
      name: formData.name.trim(),
      subtitle: formData.subtitle.trim(),
      brand: formData.brand.trim(),
      category: formData.category,
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
      image: formData.image.trim(),
      description: formData.description.trim(),
      inStock: formData.inStock,
      specs: Object.keys(cleanSpecs).length > 0 ? cleanSpecs : null,
      warranty: formData.warranty.trim() || null,
      boxContents: formData.boxContents.trim() || null,
      highlights: formData.highlights.trim() || null,
    };

    if (product) {
      updateProduct(product.id, productData);
    } else {
      addProduct(productData);
    }

    onClose();
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSpecChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      specs: { ...prev.specs, [key]: value },
    }));
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-lg font-bold text-slate-900">
            {product ? "Edit Product" : "Add New Product"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined text-slate-500">close</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* ═══════════ LEFT COLUMN - Basic Info ═══════════ */}
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg text-primary">info</span>
                Basic Information
              </h3>

              {/* Name */}
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1.5 block">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="e.g., Apple iPhone 15 Pro"
                  className="w-full px-4 py-3 bg-slate-50 border-0 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:bg-white transition-all"
                />
              </div>

              {/* Subtitle */}
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1.5 block">
                  Subtitle / Variant
                </label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => handleChange("subtitle", e.target.value)}
                  placeholder="e.g., 256GB, Natural Titanium"
                  className="w-full px-4 py-3 bg-slate-50 border-0 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:bg-white transition-all"
                />
              </div>

              {/* Brand & Category */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1.5 block">
                    Brand
                  </label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => handleChange("brand", e.target.value)}
                    placeholder="e.g., Apple"
                    list="brand-list"
                    className="w-full px-4 py-3 bg-slate-50 border-0 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:bg-white transition-all"
                  />
                  <datalist id="brand-list">
                    {brands.map((brand) => (
                      <option key={brand} value={brand} />
                    ))}
                  </datalist>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1.5 block">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleChange("category", e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border-0 rounded-xl text-sm focus:ring-2 focus:ring-primary"
                  >
                    {categories.map((cat) => (
                      <option key={cat.slug} value={cat.slug}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price & Original Price */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1.5 block">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleChange("price", e.target.value)}
                    placeholder="e.g., 79999"
                    min="0"
                    className="w-full px-4 py-3 bg-slate-50 border-0 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1.5 block">
                    Original Price (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => handleChange("originalPrice", e.target.value)}
                    placeholder="e.g., 89999"
                    min="0"
                    className="w-full px-4 py-3 bg-slate-50 border-0 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1.5 block">
                  Image URL *
                </label>
                <div className="flex gap-3">
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => handleChange("image", e.target.value)}
                    placeholder="https://example.com/product-image.jpg"
                    className="flex-1 px-4 py-3 bg-slate-50 border-0 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:bg-white transition-all"
                  />
                  {formData.image && (
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-12 h-12 rounded-lg object-cover bg-slate-100 shrink-0"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1.5 block">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Product description..."
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-50 border-0 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:bg-white transition-all resize-none"
                />
              </div>

              {/* Highlights */}
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1.5 block">
                  Key Highlights
                </label>
                <textarea
                  value={formData.highlights}
                  onChange={(e) => handleChange("highlights", e.target.value)}
                  placeholder="One highlight per line, e.g.:&#10;• 48MP Camera&#10;• 5G Ready&#10;• Fast Charging"
                  rows={20}
                  className="w-full px-4 py-3 bg-slate-50 border-0 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:bg-white transition-all resize-none"
                />
              </div>
            </div>

            {/* ═══════════ RIGHT COLUMN - Category Specs ═══════════ */}
            <div className="space-y-4">
              {/* Dynamic Category Specs */}
              <h3 className="font-semibold text-slate-900">
                {currentSpecs.title}
              </h3>

              <div className="p-4 bg-slate-50 rounded-xl space-y-4">
                {currentSpecs.fields.map((field) => (
                  <div key={field.key}>
                    <label className="text-sm font-medium text-slate-700 mb-1.5 block">
                      {field.label}
                    </label>
                    {field.type === "select" ? (
                      <select
                        value={formData.specs[field.key] || ""}
                        onChange={(e) => handleSpecChange(field.key, e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Select {field.label}</option>
                        {field.options?.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt === "flagship" ? "🚀 Flagship" :
                             opt === "high" ? "⚡ High-End" :
                             opt === "mid" ? "💪 Mid-Range" :
                             opt === "budget" ? "💰 Budget" : opt}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type || "text"}
                        value={formData.specs[field.key] || ""}
                        onChange={(e) => handleSpecChange(field.key, e.target.value)}
                        placeholder={field.placeholder}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary transition-all"
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Additional Details Section */}
              <h3 className="font-semibold text-slate-900 flex items-center gap-2 pt-2">
                <span className="material-symbols-outlined text-lg text-primary">package_2</span>
                Additional Details
              </h3>

              {/* Warranty */}
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1.5 block">
                  Warranty
                </label>
                <input
                  type="text"
                  value={formData.warranty}
                  onChange={(e) => handleChange("warranty", e.target.value)}
                  placeholder="e.g., 1 Year Manufacturer Warranty"
                  className="w-full px-4 py-3 bg-slate-50 border-0 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:bg-white transition-all"
                />
              </div>

              {/* Box Contents */}
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1.5 block">
                  Box Contents
                </label>
                <textarea
                  value={formData.boxContents}
                  onChange={(e) => handleChange("boxContents", e.target.value)}
                  placeholder="e.g., Phone, USB-C Cable, Documentation"
                  rows={2}
                  className="w-full px-4 py-3 bg-slate-50 border-0 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:bg-white transition-all resize-none"
                />
              </div>

              {/* In Stock Toggle */}
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div>
                  <p className="font-medium text-slate-900">In Stock</p>
                  <p className="text-sm text-slate-500">Show product as available</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleChange("inStock", !formData.inStock)}
                  className={`w-12 h-7 rounded-full transition-colors ${
                    formData.inStock ? "bg-green-500" : "bg-slate-300"
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                      formData.inStock ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-sm text-red-700">
              <span className="material-symbols-outlined text-lg">error</span>
              {error}
            </div>
          )}

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-6 mt-6 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">
                {product ? "save" : "add"}
              </span>
              {product ? "Save Changes" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductFormModal;
