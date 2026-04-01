import { Truck, Award, Percent } from "lucide-react";
import { Link } from "react-router-dom";
import bentoModel from "@/assets/bento-model.jpg";

const HeroBentoGrid = () => {
  return (
    <section className="px-4 md:px-10 py-8 md:py-12 max-w-[1400px] mx-auto">
      <div className="text-center mb-10">
        <h2 className="font-serif text-3xl md:text-5xl font-normal tracking-tight text-foreground mb-3">
          Embrace Comfort & Style
        </h2>
        <p className="text-sm md:text-base font-sans text-muted-foreground max-w-md mx-auto">
          Designed to move with you — effortless, modern, and made for everyday life.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[140px] md:auto-rows-[160px]">
        {/* 1. Black Box - Free Delivery */}
        <div className="bg-foreground text-background rounded-2xl p-5 md:p-6 flex flex-col justify-between row-span-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-background/20 flex items-center justify-center">
              <Truck size={16} className="text-background" />
            </div>
            <div className="w-6 h-6 rounded-full bg-[hsl(25,90%,55%)] flex items-center justify-center">
              <span className="text-background text-[10px]">✓</span>
            </div>
          </div>
          <div>
            <h3 className="font-serif text-base md:text-lg font-semibold">FREE DELIVERY</h3>
            <p className="text-xs text-background/60 font-sans mt-0.5">Express delivery on fashion orders.</p>
          </div>
        </div>

        {/* 2. Image - New Collection */}
        <div className="rounded-2xl overflow-hidden relative group">
          <img
            src={bentoModel}
            alt="New Collection"
            width={640}
            height={800}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute bottom-3 left-3 right-3">
            <span className="text-xs font-sans text-background/80 bg-foreground/40 backdrop-blur-sm px-3 py-1 rounded-full">
              New Collection
            </span>
          </div>
        </div>

        {/* 3. Central Featured Style - spans 2 rows */}
        <div className="rounded-2xl overflow-hidden relative row-span-2 bg-[hsl(200,30%,85%)]">
          <img
            src={bentoModel}
            alt="Featured Style"
            width={640}
            height={800}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-background text-foreground text-xs font-sans font-medium px-3 py-1.5 rounded-full">
              Trendy Collection
            </span>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <Link
              to="/products"
              className="bg-foreground text-background text-xs font-sans uppercase tracking-widest px-5 py-2.5 rounded-full inline-block hover:bg-foreground/80 transition-colors"
            >
              Browse Collection +
            </Link>
          </div>
        </div>

        {/* 4. Active Shoppers */}
        <div className="bg-secondary rounded-2xl p-5 md:p-6 flex flex-col justify-between row-span-1">
          <span className="text-xs font-sans text-muted-foreground uppercase tracking-wider">Active Shoppers</span>
          <div>
            <span className="font-serif text-3xl md:text-4xl font-semibold text-foreground">120K</span>
            <div className="flex -space-x-2 mt-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full bg-accent border-2 border-background flex items-center justify-center"
                >
                  <span className="text-[9px] font-sans text-muted-foreground">👤</span>
                </div>
              ))}
              <div className="w-7 h-7 rounded-full bg-[hsl(25,90%,55%)] border-2 border-background flex items-center justify-center">
                <span className="text-[9px] font-sans text-background">+</span>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Offer Alert - Peach Box */}
        <div className="bg-[hsl(25,60%,92%)] rounded-2xl p-5 md:p-6 flex flex-col justify-between row-span-1">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-[hsl(25,90%,55%)] flex items-center justify-center">
              <Percent size={18} className="text-background" />
            </div>
          </div>
          <div>
            <h3 className="font-serif text-sm md:text-base font-semibold text-foreground">OFFER ALERT 24/7</h3>
            <p className="text-xs text-muted-foreground font-sans mt-0.5">Stay updated with flash sales and price drops.</p>
          </div>
        </div>

        {/* 6. Offer of the Week - Medal */}
        <div className="bg-accent rounded-2xl p-5 md:p-6 flex flex-col justify-between row-span-1 relative overflow-hidden">
          <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-[hsl(25,90%,55%)]/20 flex items-center justify-center">
            <Award size={20} className="text-[hsl(25,90%,55%)]" />
          </div>
          <div className="mt-auto">
            <h3 className="font-serif text-sm md:text-base font-semibold text-foreground">OFFER OF THE WEEK</h3>
            <p className="text-xs text-muted-foreground font-sans mt-0.5">Get extra discounts on select styles.</p>
          </div>
        </div>

        {/* 7. Lifetime Warranty */}
        <div className="bg-secondary rounded-2xl p-5 md:p-6 flex flex-col items-center justify-center text-center row-span-1">
          <div className="w-10 h-10 rounded-full bg-[hsl(25,90%,55%)]/20 flex items-center justify-center mb-2">
            <Award size={20} className="text-[hsl(25,90%,55%)]" />
          </div>
          <h3 className="font-serif text-sm font-semibold text-foreground">Life Time Warranty</h3>
          <p className="text-[10px] text-muted-foreground font-sans mt-0.5">Enjoy complete peace of mind.</p>
        </div>
      </div>
    </section>
  );
};

export default HeroBentoGrid;
