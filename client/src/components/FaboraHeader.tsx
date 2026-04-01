import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, ShoppingBag, User } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { products } from "@/data/products";
import mylogo from "@/assets/mylogo.png";

const FaboraHeader = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const { totalItems } = useCart();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Explore Collections", to: "/products" },
    { label: "Best Seller", to: "/products?filter=bestseller" },
    { label: "Men", to: "/products?category=Men" },
    { label: "Women", to: "/products?category=Women" },
  ];

  const isLinkActive = (to: string) => {
    if (to === "/products") {
      return location.pathname === "/products" && !location.search;
    }
    return location.pathname + location.search === to;
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      // Find product matching the search query
      const query = searchQuery.toLowerCase().trim();
      const matchedProduct = products.find(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );

      if (matchedProduct) {
        // Navigate to product detail page
        navigate(`/product/${matchedProduct.id}`);
      } else {
        // Navigate to products page with search query
        navigate(`/products?search=${encodeURIComponent(query)}`);
      }
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const showBg = (scrolled || !isHome) && location.pathname !== "/login";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        showBg
          ? "bg-background/95 backdrop-blur-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="flex items-center justify-between px-6 md:px-10 py-4 max-w-[1400px] mx-auto">
        {/* Logo */}
        <Link
          to="/"
          className={`flex items-center transition-opacity hover:opacity-80`}
        >
          <img 
            src={mylogo} 
            alt="Fabora Logo" 
            className="h-6 md:h-8 w-auto object-contain transition-all duration-500"
            style={{ filter: showBg ? 'none' : 'brightness(0) invert(1)' }}
          />
        </Link>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const isActive = isLinkActive(link.to);
            return (
              <Link
                key={link.label}
                to={link.to}
                className={`text-sm font-sans transition-colors duration-300 tracking-wide relative ${
                  showBg
                    ? isActive
                      ? "text-foreground font-medium"
                      : "text-foreground/70 hover:text-foreground"
                    : isActive
                      ? "text-white font-medium"
                      : "text-white/70 hover:text-white"
                } ${isActive ? "after:content-[''] after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[2px] after:bg-current" : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right: Search + Cart + Profile */}
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            {searchOpen ? (
              <div className={`flex items-center rounded-full px-4 py-2 gap-2 ${showBg ? "bg-secondary" : "bg-white/15 backdrop-blur-sm"}`}>
                <Search size={16} className={showBg ? "text-muted-foreground" : "text-white/60"} />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search Products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearch}
                  className={`bg-transparent text-sm font-sans outline-none w-44 ${
                    showBg
                      ? "text-foreground placeholder:text-muted-foreground"
                      : "text-white placeholder:text-white/50"
                  }`}
                  onBlur={() => {
                    setTimeout(() => {
                      setSearchOpen(false);
                      setSearchQuery("");
                    }, 200);
                  }}
                />
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className={`flex items-center rounded-full px-4 py-2 gap-2 transition-colors ${
                  showBg
                    ? "bg-secondary hover:bg-accent"
                    : "bg-white/15 backdrop-blur-sm hover:bg-white/25"
                }`}
              >
                <Search size={16} className={showBg ? "text-muted-foreground" : "text-white/60"} />
                <span className={`text-sm font-sans ${showBg ? "text-muted-foreground" : "text-white/60"}`}>
                  Search Products...
                </span>
              </button>
            )}
          </div>

          <Link
            to="/cart"
            className={`relative transition-colors p-2 ${
              showBg ? "text-foreground/70 hover:text-foreground" : "text-white/70 hover:text-white"
            }`}
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-foreground text-background text-[10px] font-sans font-semibold flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </Link>

          <Link
            to={user ? "/profile" : "/login"}
            className={`transition-colors p-2 ${
              showBg ? "text-foreground/70 hover:text-foreground" : "text-white/70 hover:text-white"
            }`}
            title={user ? "Profile" : "Login"}
          >
            <User size={20} strokeWidth={1.5} />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default FaboraHeader;
