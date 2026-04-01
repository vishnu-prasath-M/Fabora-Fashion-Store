import { Link } from "react-router-dom";
import { products } from "@/data/products";
import ProductCard from "./ProductCard";
import { useState } from "react";
import AddToCartModal from "./AddToCartModal";

const FeaturedProducts = () => {
  const featured = products.slice(0, 4);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProductName, setModalProductName] = useState("");

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
        {featured.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddedToCart={(name) => { setModalProductName(name); setModalOpen(true); }}
          />
        ))}
      </div>

      <AddToCartModal open={modalOpen} onClose={() => setModalOpen(false)} productName={modalProductName} />
    </section>
  );
};

export default FeaturedProducts;
