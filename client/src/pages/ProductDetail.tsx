import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import FaboraHeader from "@/components/FaboraHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import AddToCartModal from "@/components/AddToCartModal";
import { Minus, Plus, Star, Heart } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { ShoppingBag, Loader2 } from "lucide-react";

const getProductReviews = (productId: string) => {
  const allReviews = [
    { name: "Sarah J.", rating: 5, comment: "Absolutely love the quality and fit. Will definitely buy more from this brand." },
    { name: "Michael T.", rating: 4, comment: "Great material, but the sizing was slightly larger than expected." },
    { name: "Emily R.", rating: 5, comment: "One of the best purchases I've made this year. So elegant!" },
    { name: "David L.", rating: 5, comment: "Premium feel and fast shipping. Highly recommend." },
    { name: "Sophia K.", rating: 4, comment: "Very stylish, wears well throughout the day." },
    { name: "Oliver P.", rating: 5, comment: "Looks even better in person. The craftsmanship is superb." },
    { name: "Isabella M.", rating: 5, comment: "Perfect for any occasion. Feels incredibly luxurious." },
    { name: "James B.", rating: 4, comment: "Good everyday piece. Fits nicely." },
    { name: "Mia W.", rating: 5, comment: "Stunning design and very comfortable. I get compliments all the time!" },
  ];
  
  const idNum = parseInt(productId) || 0;
  const startIndex = (idNum * 2) % allReviews.length;
  const reviewsCount = 2 + (idNum % 2);
  
  const reviews = [];
  for(let i=0; i<reviewsCount; i++) {
    reviews.push(allReviews[(startIndex + i) % allReviews.length]);
  }
  return reviews;
};

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [openSection, setOpenSection] = useState<string | null>("details");
  const [modalOpen, setModalOpen] = useState(false);
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  // Fetch product from database
  const { data: product, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await fetch(`/api/products/${id}`);
      if (!response.ok) throw new Error("Product not found");
      const data = await response.json();
      // Map _id to id for frontend compatibility
      return { ...data, id: data._id };
    },
    enabled: !!id,
  });

  // Fetch all products for related section
  const { data: allProducts } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch("/api/products");
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      return data.map((p: any) => ({ ...p, id: p._id }));
    },
  });

  // Scroll to top when product changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);
  
  const relatedProducts = (allProducts || [])
    .filter(p => p.id !== id && p.category === product?.category)
    .slice(0, 4);
    
  if (relatedProducts.length < 4) {
    const more = (allProducts || [])
      .filter(p => (!product || p.id !== product.id) && !relatedProducts.find(rp => rp.id === p.id));
    relatedProducts.push(...more.slice(0, 4 - relatedProducts.length));
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-20 text-muted-foreground animate-pulse">
        <Loader2 className="w-10 h-10 animate-spin mb-4 opacity-20" />
        <p className="text-sm font-sans tracking-widest uppercase">Loading Product</p>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-24 px-6 md:px-12">
        <FaboraHeader />
        <p className="font-sans text-muted-foreground mb-4">Product not found.</p>
        <Link to="/products">
          <Button variant="outline">Back to Products</Button>
        </Link>
      </div>
    );
  }

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleAddToCart = () => {
    addItem({
      product,
      size: selectedSize || product.sizes[0],
      color: product.colors[selectedColor].name,
      quantity,
    });
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen">
      <FaboraHeader />
      <div className="pt-24 px-6 md:px-12 pb-20">
        <div className="flex gap-2 text-xs text-muted-foreground font-sans mb-8">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-foreground transition-colors">Products</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          <div>
            <div className="aspect-[3/4] bg-secondary overflow-hidden mb-4 rounded-2xl">
              <img 
                src={product.image} 
                alt={product.name} 
                width={900} 
                height={1200} 
                className={`w-full h-full object-cover transition-all duration-500 ${
                  product.colors[selectedColor]?.name === "Black" ? "brightness-[0.35] grayscale-[0.3]" : ""
                }`}
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.colors.map((color, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedColor(i)}
                  className={`aspect-square bg-secondary overflow-hidden border-2 rounded-xl transition-colors ${
                    selectedColor === i ? "border-foreground" : "border-transparent"
                  }`}
                >
                  <img 
                    src={product.image} 
                    alt={color.name} 
                    loading="lazy" 
                    className={`w-full h-full object-cover transition-all duration-300 ${
                      color.name === "Black" ? "brightness-[0.35] grayscale-[0.3]" : ""
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="md:pt-8">
            <p className="editorial-subheading mb-2">{product.brand}</p>
            <div className="flex items-start justify-between gap-4 mb-4">
              <h1 className="editorial-heading text-3xl md:text-4xl">{product.name}</h1>
              <button
                onClick={() => product && toggleWishlist(product)}
                className="p-2 rounded-full border border-border hover:border-foreground transition-colors shrink-0"
                aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart
                  size={20}
                  className={isInWishlist(product.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"}
                />
              </button>
            </div>
            <p className="text-lg font-sans mb-8">₹{product.price}</p>
            <p className="text-sm text-muted-foreground font-sans leading-relaxed mb-10">{product.description}</p>

            <div className="mb-8">
              <h4 className="text-xs uppercase tracking-[0.2em] font-sans mb-3">Size</h4>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[44px] h-11 px-3 border text-xs font-sans uppercase tracking-wider transition-colors ${
                      selectedSize === size
                        ? "border-foreground bg-foreground text-background"
                        : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-xs uppercase tracking-[0.2em] font-sans mb-3">
                Color — {product.colors[selectedColor].name}
              </h4>
              <div className="flex gap-3">
                {product.colors.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(i)}
                    className={`w-8 h-8 rounded-full border transition-all ${
                      selectedColor === i ? "ring-1 ring-foreground ring-offset-2" : "border-border"
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
            </div>

            <div className="mb-10">
              <h4 className="text-xs uppercase tracking-[0.2em] font-sans mb-3">Quantity</h4>
              <div className="flex items-center border border-border w-fit">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 text-muted-foreground hover:text-foreground transition-colors">
                  <Minus size={14} />
                </button>
                <span className="px-6 text-sm font-sans">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-3 text-muted-foreground hover:text-foreground transition-colors">
                  <Plus size={14} />
                </button>
              </div>
            </div>

            <Button variant="editorial" size="lg" className="w-full mb-4" onClick={handleAddToCart}>
              Add to Cart
            </Button>

            <div className="mt-12 border-t border-border">
              {[
                { key: "details", title: "Product Details", content: product.description },
                { key: "delivery", title: "Delivery & Returns", content: "Free standard shipping on orders over $200. Express delivery available. Free returns within 30 days of delivery." },
                { key: "reviews", title: "Reviews", content: "No reviews yet. Be the first to share your experience." },
              ].map((section) => (
                <div key={section.key} className="border-b border-border">
                  <button
                    onClick={() => toggleSection(section.key)}
                    className="w-full flex justify-between items-center py-5 text-left"
                  >
                    <span className="text-xs uppercase tracking-[0.2em] font-sans">{section.title}</span>
                    <Plus size={14} className={`transition-transform duration-300 ${openSection === section.key ? "rotate-45" : ""}`} />
                  </button>
                  {openSection === section.key && (
                    <p className="text-sm text-muted-foreground font-sans leading-relaxed pb-5">
                      {section.content}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ratings & Reviews */}
        <div className="mt-24 md:mt-32 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
            <h2 className="editorial-heading text-2xl md:text-3xl">Ratings & Reviews</h2>
            <div className="flex items-center gap-3">
              <div className="flex text-foreground">
                <Star className="fill-current w-4 h-4 md:w-5 md:h-5" />
                <Star className="fill-current w-4 h-4 md:w-5 md:h-5" />
                <Star className="fill-current w-4 h-4 md:w-5 md:h-5" />
                <Star className="fill-current w-4 h-4 md:w-5 md:h-5" />
                <Star className="fill-current w-4 h-4 md:w-5 md:h-5 opacity-50" />
              </div>
              <span className="text-base md:text-lg font-sans font-medium">4.8</span>
              <span className="text-xs md:text-sm text-muted-foreground font-sans">(124 Reviews)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {getProductReviews(product.id).map((review, idx) => (
              <div key={idx} className="border-t border-border pt-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-sans font-medium text-foreground">{review.name}</span>
                  <div className="flex text-foreground gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? "fill-current" : "opacity-30"}`} />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                  "{review.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Product Description & Reviews Section */}
        <div className="mt-24 md:mt-32 max-w-4xl mx-auto">
          {/* Product Description */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6">Product Description</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software. Today it's seen all around the web; on templates, websites, and stock designs. Use our generator to get your own, or read on for the authoritative history of lorem ipsum.
            </p>
          </div>

          {/* Reviews */}
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">Reviews</h2>
            <p className="text-sm text-gray-500 mb-6">32 reviews for this product</p>
            
            {/* 5 Stars */}
            <div className="flex items-center gap-1 mb-8">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            {/* Review Card */}
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  BK
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-gray-900">Belal K.</h4>
                    <span className="text-xs text-gray-500">August 17, 2024</span>
                  </div>
                  <h5 className="text-sm font-medium text-gray-800 mb-2">Amazing Service!</h5>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software.
                  </p>
                </div>
              </div>
            </div>

            {/* See All Reviews Button */}
            <button className="w-full py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              See all reviews
            </button>
          </div>
        </div>

        {/* You Might Also Like */}
        <div className="mt-24 md:mt-32 border-t border-border pt-20">
          <div className="flex items-center justify-between mb-10">
            <h2 className="editorial-heading text-2xl md:text-3xl">You Might Also Like</h2>
            <Link to="/products" className="text-xs uppercase tracking-[0.2em] font-sans hover:text-muted-foreground transition-colors">
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
      <AddToCartModal open={modalOpen} onClose={() => setModalOpen(false)} productName={product.name} />
    </div>
  );
};

export default ProductDetail;
