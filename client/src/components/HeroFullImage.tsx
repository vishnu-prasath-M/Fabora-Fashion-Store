import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import heroModel from "@/assets/hero-model.jpg";

const HeroFullImage = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      <img
        src={heroModel}
        alt="Fashion model in trendy outfit"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover object-top"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-foreground/40 via-foreground/10 to-transparent" />

      <div className="relative h-full flex flex-col justify-end pb-24 md:pb-32 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="max-w-lg">
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-normal tracking-tight leading-[1.05] text-white mb-5">
            Redefine Your<br />Style & Attitude
          </h1>
          <p className="text-sm md:text-base font-sans text-white/70 max-w-md leading-relaxed mb-8">
            Curated fashion from top brands, made for trendsetters. Discover comfort and style effortlessly.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white text-xs font-sans uppercase tracking-[0.2em] px-6 py-3 rounded-full hover:bg-white/20 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </div>

      {/* Frosted widget */}
      <div className="absolute bottom-20 right-6 md:right-12 w-56 md:w-64 bg-white/15 backdrop-blur-xl rounded-2xl p-5 border border-white/20">
        <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-white/60 mb-2">
          Trending Styles
        </p>
        <h3 className="font-serif text-base md:text-lg font-semibold text-white mb-1">
          OFFER OF THE WEEK
        </h3>
        <p className="text-xs font-sans text-white/60 leading-relaxed">
          Get extra discounts on select styles.
        </p>
      </div>

      {/* Orange CTA */}
      <Link
        to="/products"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-[hsl(25,90%,55%)] flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-20"
      >
        <Plus size={24} className="text-white" />
      </Link>
    </section>
  );
};

export default HeroFullImage;
