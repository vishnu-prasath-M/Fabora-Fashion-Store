import { useState } from "react";
import { Link } from "react-router-dom";
import { products } from "@/data/products";
import ProductCard from "./ProductCard";
import AddToCartModal from "./AddToCartModal";

const NewCollectionGrid = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProductName, setModalProductName] = useState("");
  const displayProducts = products.slice(0, 6);

  const handleAdded = (name: string) => {
    setModalProductName(name);
    setModalOpen(true);
  };

  return (
    <section className="px-4 md:px-10 py-16 md:py-24 max-w-[1400px] mx-auto">
      <div className="flex justify-between items-end mb-12">
        <div>
          <p className="editorial-subheading mb-3">Just Dropped</p>
          <h2 className="font-serif text-3xl md:text-5xl font-normal tracking-tight text-foreground">
            New Collection
          </h2>
        </div>
        <Link to="/products" className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors font-sans border-b border-muted-foreground/30 pb-1">
          View All
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
        {displayProducts.map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            featured={i === 1}
            onAddedToCart={handleAdded}
          />
        ))}
      </div>

      <AddToCartModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        productName={modalProductName}
      />
    </section>
  );
};

export default NewCollectionGrid;
