import { RotateCcw, Headphones, Shield, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import comfortImg1 from "@/assets/comfort-collection-1.jpg";
import comfortImg2 from "@/assets/comfort-collection-2.jpg";

const EmbraceComfortStyle = () => {
  return (
    <section className="px-4 md:px-12 py-16 md:py-24 max-w-[1400px] mx-auto">
      {/* Title */}
      <div className="text-center mb-12">
        <h2 className="font-serif text-3xl md:text-5xl font-normal tracking-tight text-foreground">
          Embrace Comfort & Style
        </h2>
        <p className="mt-4 text-sm md:text-base text-muted-foreground font-sans max-w-lg mx-auto">
          Designed to move with you — effortless, modern, and made for everyday life.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[160px] md:auto-rows-[180px]">

        {/* 100 Days Returns - dark card */}
        <div className="bg-foreground text-background rounded-2xl p-5 md:p-6 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-background/10 flex items-center justify-center">
              <RotateCcw size={14} className="text-background" />
            </div>
            <div className="w-8 h-8 rounded-full bg-background/10 flex items-center justify-center">
              <Shield size={14} className="text-background" />
            </div>
          </div>
          <h3 className="font-serif text-lg md:text-xl font-semibold">100 Days Returns</h3>
          <p className="text-xs text-background/60 font-sans mt-1 leading-relaxed">
            Enjoy peace of mind with our easy 100-day return policy
          </p>
        </div>

        {/* New Collection image card */}
        <div className="rounded-2xl overflow-hidden relative group">
          <img
            src={comfortImg1}
            alt="New Collection"
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute bottom-3 left-3">
            <p className="text-xs font-sans text-white/90 font-medium">New Collection</p>
          </div>
          <button className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <ShoppingBag size={12} className="text-white" />
          </button>
        </div>

        {/* Trendy Collection tall image card */}
        <div className="row-span-2 rounded-2xl overflow-hidden relative group">
          <img
            src={comfortImg2}
            alt="Trendy Collection"
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4">
            <p className="text-[10px] font-sans text-white/80 italic">Trendy</p>
            <p className="text-sm font-serif text-white font-semibold">Collection</p>
          </div>
          <Link
            to="/products"
            className="absolute bottom-4 left-4 right-4 bg-foreground text-background text-xs font-sans uppercase tracking-[0.15em] py-3 rounded-full text-center hover:bg-foreground/90 transition-colors"
          >
            Add To Cart +
          </Link>
        </div>

        {/* Active Users stat card */}
        <div className="bg-[hsl(25,60%,93%)] rounded-2xl p-5 md:p-6 flex flex-col justify-center items-center text-center">
          <p className="text-xs font-sans text-muted-foreground uppercase tracking-wider mb-1">Active Users</p>
          <p className="font-serif text-3xl md:text-4xl font-bold text-foreground">120K</p>
          <div className="flex -space-x-2 mt-3">
            <div className="w-7 h-7 rounded-full bg-muted border-2 border-[hsl(25,60%,93%)]" />
            <div className="w-7 h-7 rounded-full bg-secondary border-2 border-[hsl(25,60%,93%)]" />
            <div className="w-7 h-7 rounded-full bg-accent border-2 border-[hsl(25,60%,93%)]" />
            <div className="w-7 h-7 rounded-full bg-[hsl(25,100%,55%)] border-2 border-[hsl(25,60%,93%)] flex items-center justify-center text-[8px] text-white font-sans">+</div>
          </div>
        </div>

        {/* 24/07 Customer Services - wide card */}
        <div className="col-span-2 bg-[hsl(25,60%,93%)] rounded-2xl p-5 md:p-6 flex items-center gap-4">
          <div className="flex-1">
            <h3 className="font-serif text-xl md:text-2xl font-semibold text-foreground">
              24/07 Customer Services
            </h3>
            <p className="text-xs text-muted-foreground font-sans mt-2 leading-relaxed">
              Enjoy peace of mind with our easy 100-day return policy
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="w-10 h-10 rounded-full bg-[hsl(25,100%,55%)] flex items-center justify-center">
              <Headphones size={16} className="text-white" />
            </div>
            <div className="w-10 h-10 rounded-full bg-[hsl(25,100%,55%)] flex items-center justify-center">
              <Shield size={16} className="text-white" />
            </div>
          </div>
        </div>

        {/* Life Time Warranty card */}
        <div className="bg-background border border-border rounded-2xl p-5 md:p-6 flex flex-col justify-center items-center text-center">
          <div className="w-10 h-10 rounded-full bg-[hsl(25,60%,93%)] flex items-center justify-center mb-3">
            <Shield size={16} className="text-[hsl(25,100%,55%)]" />
          </div>
          <h3 className="font-serif text-sm md:text-base font-semibold text-foreground">Life Time Warranty</h3>
          <p className="text-[10px] text-muted-foreground font-sans mt-1 leading-relaxed">
            Enjoy complete peace of mind with our lifetime warranty
          </p>
        </div>
      </div>
    </section>
  );
};

export default EmbraceComfortStyle;
