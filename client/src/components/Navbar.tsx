import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, ShoppingBag, User } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { totalItems } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navBg = scrolled || !isHome
    ? "bg-background/95 backdrop-blur-sm border-b border-border"
    : "bg-transparent";

  const links = [
    { label: "Explore Collections", to: "/products" },
    { label: "Best Seller", to: "/products?filter=bestseller" },
    { label: "Men", to: "/products?category=Men" },
    { label: "Women", to: "/products?category=Women" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}>
      <nav className="flex items-center justify-between px-6 md:px-12 py-4">
        <Link to="/" className="flex items-center transition-opacity hover:opacity-80">
          <img src={logo} alt="Fabora Logo" className="h-5 md:h-7 w-auto object-contain" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-xs uppercase tracking-[0.2em] text-foreground/70 hover:text-foreground transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-5">
          <div className="relative">
            {searchOpen ? (
              <input
                autoFocus
                type="text"
                placeholder="Search"
                className="bg-transparent border-b border-foreground/30 text-foreground text-xs tracking-widest uppercase outline-none pb-1 w-40 font-sans placeholder:text-muted-foreground"
                onBlur={() => setSearchOpen(false)}
              />
            ) : (
              <button onClick={() => setSearchOpen(true)} className="text-foreground/70 hover:text-foreground transition-colors">
                <Search size={18} strokeWidth={1.5} />
              </button>
            )}
          </div>
          <Link to="/cart" className="relative text-foreground/70 hover:text-foreground transition-colors">
            <ShoppingBag size={18} strokeWidth={1.5} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-foreground text-background text-[10px] font-sans flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
          <Link to="/login" className="text-foreground/70 hover:text-foreground transition-colors">
            <User size={18} strokeWidth={1.5} />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
