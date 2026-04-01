import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import FaboraHeader from "@/components/FaboraHeader";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ProductSkeleton from "@/components/ProductSkeleton";
import AddToCartModal from "@/components/AddToCartModal";
import { ShoppingBag, ChevronRight, Search, Loader2 } from "lucide-react";
import Shopbann from "@/assets/sale-rack2.png";
import { useQuery } from "@tanstack/react-query";

const sizeOptions = ["XS", "S", "M", "L", "XL"];
const colorOptions = [
  { name: "Black", hex: "#1a1a1a" },
  { name: "Cream", hex: "#F5F0E8" },
  { name: "Navy", hex: "#1B2A4A" },
  { name: "Camel", hex: "#C4943A" },
];
const categories = ["All", "Men", "Women", "Kids", "Accessories"];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = searchParams.get("category") || "All";
  const filterType = searchParams.get("filter") || "";
  const searchQuery = searchParams.get("search") || "";
  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProductName, setModalProductName] = useState("");
  const [localSearch, setLocalSearch] = useState(searchQuery);

  // Fetch products from database
  const { data: dbProducts, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      // Map _id to id for frontend compatibility
      return data.map((p: any) => ({ ...p, id: p._id }));
    },
  });

  const productList = dbProducts || [];

  // Update category when URL params change
  useEffect(() => {
    const catFromUrl = searchParams.get("category") || "All";
    const searchFromUrl = searchParams.get("search") || "";
    setSelectedCategory(catFromUrl);
    setLocalSearch(searchFromUrl);
  }, [searchParams]);

  // Review counts for rating simulation
  const reviewCounts: Record<string, number> = {
    "1": 17, "2": 9, "3": 32, "4": 24, "5": 11, "6": 19,
    "7": 28, "8": 22, "9": 35, "10": 15, "11": 42, "12": 18,
    "13": 25, "14": 38, "15": 20, "16": 30, "17": 45, "18": 33,
    "19": 27, "20": 21, "21": 36, "22": 19, "23": 31, "24": 24,
    "25": 29, "26": 23, "27": 16, "28": 34, "29": 26, "30": 22,
    "31": 40, "32": 14, "33": 37, "34": 28, "35": 19, "36": 32,
    "37": 20, "38": 43, "39": 25, "40": 30, "41": 18, "42": 35,
    "43": 22, "44": 38, "45": 27, "46": 24,
  };

  const getProductRating = (productId: string) => {
    return reviewCounts[productId] || 12;
  };

  let filtered = productList.filter((p) => {
    if (selectedCategory !== "All" && p.category !== selectedCategory) return false;
    if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesName = p.name.toLowerCase().includes(query);
      const matchesBrand = p.brand.toLowerCase().includes(query);
      const matchesCategory = p.category.toLowerCase().includes(query);
      if (!matchesName && !matchesBrand && !matchesCategory) return false;
    }
    return true;
  });

  // Best Seller filter: low price (under $200) + high rating (high review count)
  if (filterType === "bestseller") {
    filtered = filtered
      .filter((p) => p.price < 200)
      .sort((a, b) => getProductRating(b.id) - getProductRating(a.id));
  }

  return (
    <div className="min-h-screen">
      <FaboraHeader />
      
      {/* Collection Banner */}
      <div className="pt-24 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="bg-[#f5f5f5] rounded-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row items-center">
            {/* Left - Realistic Image */}
            <div className="w-full md:w-1/2 h-48 md:h-64 relative overflow-hidden">
              <img 
                src={Shopbann} 
                alt="Wink Collection - Clothes on hangers"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#f5f5f5]/20" />
            </div>
            
            {/* Right - Content */}
            <div className="w-full md:w-1/2 p-8 md:p-12">
              <span className="text-xs text-gray-500 tracking-wide">- Collections</span>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mt-2 leading-tight">
                Explore The Various Collection<br />of Wink Collection
              </h2>
              <p className="text-sm text-gray-500 mt-3 leading-relaxed">
                Don't miss out to shopping collection from us!<br />
                you'll not be let down.
              </p>
            </div>
          </div>
        </div>
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mt-6 text-sm">
          <Link to="/" className="text-gray-500 hover:text-gray-900 transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900 font-medium">Wink Collection</span>
        </div>
        
        {/* Collection Title */}
        <h2 className="text-xl font-semibold text-gray-900 mt-2 mb-8">Wink Collection</h2>
      </div>
      
      <div className="pt-8 pb-20 px-6 md:px-12 max-w-[1400px] mx-auto">
        {/* Search Bar and Title Row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="editorial-heading text-4xl md:text-6xl text-left">All Products</h1>
            <p className="text-sm text-muted-foreground font-sans mt-2">{filtered.length} pieces</p>
          </div>
          
          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="text"
              placeholder="Search products..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const newParams = new URLSearchParams(searchParams);
                  if (localSearch.trim()) {
                    newParams.set("search", localSearch.trim());
                  } else {
                    newParams.delete("search");
                  }
                  setSearchParams(newParams);
                }
              }}
              className="w-full pl-10 pr-4 py-2.5 bg-secondary rounded-full text-sm font-sans outline-none focus:ring-1 focus:ring-foreground transition-all"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-12 items-start">
          <aside className="w-full md:w-56 shrink-0 sticky top-24 self-start">
            <div className="mb-10">
              <h4 className="text-xs uppercase tracking-[0.2em] font-sans mb-4">Category</h4>
              <div className="flex flex-col gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-sm font-sans text-left transition-colors ${
                      selectedCategory === cat ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-10">
              <h4 className="text-xs uppercase tracking-[0.2em] font-sans mb-4">Price Range</h4>
              <input
                type="range"
                min={0}
                max={600}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                className="w-full accent-foreground"
              />
              <div className="flex justify-between text-xs text-muted-foreground font-sans mt-2">
                <span>$0</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>

            <div className="mb-10">
              <h4 className="text-xs uppercase tracking-[0.2em] font-sans mb-4">Size</h4>
              <div className="flex flex-wrap gap-2">
                {sizeOptions.map((size) => (
                  <button
                    key={size}
                    className="w-9 h-9 border border-border text-xs font-sans text-muted-foreground hover:border-foreground hover:text-foreground transition-colors rounded-lg"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] font-sans mb-4">Color</h4>
              <div className="flex gap-3">
                {colorOptions.map((color) => (
                  <button
                    key={color.name}
                    title={color.name}
                    className="w-6 h-6 rounded-full border border-border hover:ring-1 hover:ring-foreground hover:ring-offset-2 transition-all"
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
            </div>
          </aside>

          {isError ? (
            <div className="flex-1 flex flex-col items-center justify-center py-20">
              <ShoppingBag size={48} strokeWidth={1} className="text-muted-foreground/40 mb-6" />
              <p className="text-lg font-serif mb-2">Database is not started</p>
              <p className="text-sm text-muted-foreground font-sans">
                Please start the server to view products.
              </p>
            </div>
          ) : isLoading ? (
            <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {[...Array(8)].map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center py-20">
              <ShoppingBag size={48} strokeWidth={1} className="text-muted-foreground/40 mb-6" />
              <p className="text-lg font-serif mb-2">No products available</p>
              <p className="text-sm text-muted-foreground font-sans">
                No products found in this category. Try adjusting your filters.
              </p>
            </div>
          ) : (
            <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {filtered.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddedToCart={(name) => { setModalProductName(name); setModalOpen(true); }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
      <AddToCartModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        productName={modalProductName}
      />
    </div>
  );
};

export default Products;
