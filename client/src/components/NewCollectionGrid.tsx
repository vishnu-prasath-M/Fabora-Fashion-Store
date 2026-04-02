import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  altImage?: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  description: string;
  brand: string;
}

const fallbackProducts = [
  {
    _id: "1",
    name: "Urban Explorer Backpack",
    price: 899,
    category: "Bags",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64a62?w=800&q=80",
    description: "Modern rolltop backpack designed for city movement, secure storage, and minimalist style. Weather-resistant fabric with padded laptop compartment.",
    brand: "FABORA"
  },
  {
    _id: "2", 
    name: "Utility Tote Backpack",
    price: 749,
    category: "Bags",
    image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80",
    description: "A versatile carry solution that combines spacious design with lightweight comfort for daily essentials. Multiple compartments for organization.",
    brand: "FABORA"
  },
  {
    _id: "3",
    name: "Signature Carry Tote", 
    price: 649,
    category: "Bags",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80",
    description: "A refined everyday tote built with durable materials and a clean modern silhouette. Perfect for work or weekend adventures.",
    brand: "FABORA"
  }
];

const NewCollectionGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
        if (response.ok) {
          const data = await response.json();
          const bags = data.filter((p: Product) => p.category === "Bags").slice(0, 3);
          if (bags.length >= 3) {
            setProducts(bags);
          } else {
            setProducts(fallbackProducts);
          }
        } else {
          setProducts(fallbackProducts);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProducts(fallbackProducts);
      }
    };
    fetchProducts();
  }, []);

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  const handleExploreClick = (e: React.MouseEvent, search: string) => {
    e.stopPropagation();
    navigate(`/products?search=${search}`);
  };

  const displayProducts = products.length >= 3 ? products : fallbackProducts;
  const leftProduct = displayProducts[0];
  const centerProduct = displayProducts[1];
  const rightProduct = displayProducts[2];

  return (
    <section className="px-4 md:px-10 py-16 md:py-24 max-w-[1400px] mx-auto">
      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        
        {/* Left Column - Large Image Card with Text Below */}
        <div className="flex flex-col gap-4">
          <div 
            onClick={() => handleProductClick(leftProduct._id)}
            className="group cursor-pointer relative aspect-[4/5] rounded-3xl overflow-hidden bg-[#e8e8e8]"
          >
            <img
              src={leftProduct.image}
              alt={leftProduct.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Modern Rolltop Backpack</h3>
              <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">A sleek everyday backpack designed for city movement, secure storage, and minimalist style.</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-900">Explore Collection</span>
            <button 
              onClick={(e) => handleExploreClick(e, "backpack")}
              className="w-12 h-12 rounded-full bg-[#F5C518] flex items-center justify-center hover:bg-[#E5B50E] transition-all duration-300 shadow-md"
            >
              <ArrowUpRight className="w-5 h-5 text-gray-900" />
            </button>
          </div>
        </div>

        {/* Center Column - Text Above Image */}
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Utility Tote Backpack</h3>
              <p className="text-sm text-gray-500 leading-relaxed">A versatile carry solution that combines spacious design with lightweight comfort for daily essentials.</p>
            </div>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-900">Explore Collection</span>
            <button 
              onClick={(e) => handleExploreClick(e, "backpack")}
              className="w-12 h-12 rounded-full bg-[#F5C518] flex items-center justify-center hover:bg-[#E5B50E] transition-all duration-300 shadow-md"
            >
              <ArrowUpRight className="w-5 h-5 text-gray-900" />
            </button>
          </div>
          <div 
            onClick={() => handleProductClick(centerProduct._id)}
            className="group cursor-pointer relative aspect-[4/5] rounded-3xl overflow-hidden bg-[#e8e8e8]"
          >
            <img
              src={centerProduct.image}
              alt={centerProduct.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Right Column - Large Image Card with Text Below */}
        <div className="flex flex-col gap-4">
          <div 
            onClick={() => handleProductClick(rightProduct._id)}
            className="group cursor-pointer relative aspect-[4/5] rounded-3xl overflow-hidden bg-[#e8e8e8]"
          >
            <img
              src={rightProduct.image}
              alt={rightProduct.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Signature Carry Tote</h3>
              <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">A refined everyday tote built with durable materials and a clean modern silhouette.</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-900">Explore Collection</span>
            <button 
              onClick={(e) => handleExploreClick(e, "bags")}
              className="w-12 h-12 rounded-full bg-[#F5C518] flex items-center justify-center hover:bg-[#E5B50E] transition-all duration-300 shadow-md"
            >
              <ArrowUpRight className="w-5 h-5 text-gray-900" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default NewCollectionGrid;
