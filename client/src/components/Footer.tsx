import { Link } from "react-router-dom";
import mylogo from "@/assets/mylogo.png";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-6 transition-opacity hover:opacity-80">
              <img src={mylogo} alt="Fabora Logo" className="h-6 md:h-8 w-auto object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
            </Link>
            <p className="text-sm text-primary-foreground/60 leading-relaxed font-sans">
              Redefining modern elegance through timeless design and premium craftsmanship.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] mb-6 font-sans">Shop</h4>
            <div className="flex flex-col gap-3">
              {["Men", "Women", "Kids", "New Arrivals", "Accessories"].map((item) => (
                <Link key={item} to="/products" className="text-sm text-primary-foreground/50 hover:text-primary-foreground transition-colors font-sans">
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] mb-6 font-sans">Company</h4>
            <div className="flex flex-col gap-3">
              {[
                { label: "About", to: "/about" },
                { label: "Contact", to: "/contact" },
                { label: "Press", to: "#" },
                { label: "Sustainability", to: "#" },
              ].map((item) => (
                <Link 
                  key={item.label} 
                  to={item.to} 
                  className="text-sm text-primary-foreground/50 hover:text-primary-foreground transition-colors cursor-pointer font-sans"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] mb-6 font-sans">Newsletter</h4>
            <p className="text-sm text-primary-foreground/50 mb-4 font-sans">
              Be the first to know about new collections and exclusive offers.
            </p>
            <div className="flex border-b border-primary-foreground/30">
              <input
                type="email"
                placeholder="Your email"
                className="bg-transparent text-sm flex-1 outline-none py-2 text-primary-foreground placeholder:text-primary-foreground/30 font-sans"
              />
              <button className="text-xs uppercase tracking-[0.2em] text-primary-foreground/70 hover:text-primary-foreground transition-colors font-sans">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-primary-foreground/40 font-sans">© 2026 MAISON. All rights reserved.</p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <span key={item} className="text-xs text-primary-foreground/40 hover:text-primary-foreground/70 cursor-pointer transition-colors font-sans">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
