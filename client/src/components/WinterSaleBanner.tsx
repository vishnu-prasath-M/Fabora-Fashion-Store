import { Link } from "react-router-dom";
import saleRack from "@/assets/sale-rack2.png";

const WinterSaleBanner = () => {
  return (
    <section className="px-4 md:px-10 py-12 md:py-20 max-w-[1400px] mx-auto">
      <div className="relative bg-secondary/50 rounded-2xl overflow-hidden">
        {/* Subtle diamond pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 20px,
              hsl(var(--foreground)) 20px,
              hsl(var(--foreground)) 21px
            ), repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 20px,
              hsl(var(--foreground)) 20px,
              hsl(var(--foreground)) 21px
            )`,
          }}
        />

        <div className="relative flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-12 md:py-16 gap-8">
          {/* Left text */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="font-serif text-3xl md:text-5xl font-normal tracking-tight text-foreground italic mb-4">
              Winter Super Sales
            </h2>
            <p className="font-sans text-sm md:text-base text-muted-foreground max-w-md leading-relaxed mb-8">
              Stay warm in style — discover cozy essentials and trendy winter fits at unbeatable prices.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-[hsl(25,90%,55%)] text-white text-xs font-sans uppercase tracking-[0.15em] px-6 py-3 rounded-full hover:bg-[hsl(25,90%,48%)] transition-colors"
            >
              See More
            </Link>
          </div>

          {/* Right image */}
          <div className="flex-shrink-0 w-64 md:w-80 h-48 md:h-64">
            <img
              src={saleRack}
              alt="Winter collection clothes on rack"
              loading="lazy"
              width={960}
              height={640}
              className="w-full h-full object-cover object-bottom rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WinterSaleBanner;
