import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import AddToCartModal from "./AddToCartModal";

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

const FeaturedProducts = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProductName, setModalProductName] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
        if (response.ok) {
          const data = await response.json();
          setProducts(data.slice(0, 4));
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  return (
    <section className="px-6 md:px-12 py-20 md:py-32 max-w-[1400px] mx-auto">
      <div className="flex justify-between items-end mb-16">
        <div>
          <p className="editorial-subheading mb-4">Curated</p>
          <h2 className="editorial-heading text-3xl md:text-5xl">Featured Pieces</h2>
        </div>
        <Link to="/products" className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors font-sans border-b border-muted-foreground/30 pb-1">
          View All
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <div key={product._id} onClick={() => handleProductClick(product._id)} className="cursor-pointer">
            <ProductCard
              product={{...product, id: product._id}}
              onAddedToCart={(name) => { setModalProductName(name); setModalOpen(true); }}
            />
          </div>
        ))}
      </div>

      <AddToCartModal open={modalOpen} onClose={() => setModalOpen(false)} productName={modalProductName} />
    </section>
  );
};

export default FeaturedProducts;
