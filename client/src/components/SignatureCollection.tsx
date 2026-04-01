import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import model1 from "@/assets/model-1.jpg";
import model2 from "@/assets/model-2.jpg";
import model3 from "@/assets/model-3.jpg";
import model4 from "@/assets/model-4.jpg";
import model5 from "@/assets/model-5.jpg";
import model7 from "@/assets/model-7.jpg";

const models = [
  { src: model1, alt: "Green streetwear" },
  { src: model2, alt: "Pink streetwear" },
  { src: model3, alt: "Leather jacket" },
  { src: model4, alt: "Blue casual", featured: true },
  { src: model5, alt: "Dark jacket" },
  { src: model7, alt: "Pink jumpsuit" },
];

const SignatureCollection = () => {
  return (
    <section className="py-16 md:py-24 overflow-hidden">
      {/* Title */}
      <div className="text-center mb-12 px-6">
        <h2 className="font-serif text-4xl md:text-6xl font-normal tracking-tight text-foreground">
          Signature Collection
        </h2>
        <p className="mt-4 text-sm md:text-base text-muted-foreground font-sans max-w-md mx-auto">
          Own your style with comfort and attitude — made for trendsetters.
        </p>
      </div>

      {/* Model cards spread */}
      <div className="relative flex items-end justify-center gap-3 md:gap-4 px-4 md:px-12 max-w-[1400px] mx-auto">
        {models.map((model, i) => {
          const isFeatured = model.featured;
          const isEdge = i === 0 || i === models.length - 1;

          return (
            <div
              key={i}
              className={`relative overflow-hidden flex-shrink-0 transition-all duration-500 ${
                isFeatured
                  ? "w-[160px] md:w-[220px] h-[380px] md:h-[480px] rounded-3xl shadow-lg z-10"
                  : isEdge
                  ? "w-[80px] md:w-[140px] h-[280px] md:h-[380px] rounded-2xl opacity-80"
                  : "w-[100px] md:w-[170px] h-[320px] md:h-[420px] rounded-2xl"
              }`}
            >
              <img
                src={model.src}
                alt={model.alt}
                loading="lazy"
                className="w-full h-full object-cover"
              />

              {/* "New" badge on featured */}
              {isFeatured && (
                <span className="absolute top-4 right-4 bg-foreground text-background text-[10px] uppercase tracking-[0.15em] font-sans px-3 py-1.5 rounded-full">
                  New
                </span>
              )}

              {/* Featured collection label on card before featured */}
              {i === 3 && (
                <div className="absolute bottom-4 left-3 right-3">
                  <span
                    className="absolute -left-1 top-0 text-background/80 text-[9px] font-sans uppercase tracking-[0.3em] font-semibold"
                    style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
                  >
                    Featured Collection
                  </span>
                </div>
              )}

              {/* Price tag on second-to-last */}
              {i === 0 && (
                <div className="absolute bottom-4 left-3">
                  <p className="text-[9px] font-sans text-background/70 uppercase tracking-wider">Start from</p>
                  <p className="text-sm font-sans font-bold text-[hsl(25,100%,55%)]">₹9,999</p>
                </div>
              )}
            </div>
          );
        })}

        {/* Orange floating CTA */}
        <Link
          to="/products"
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-20 w-16 h-16 md:w-20 md:h-20 rounded-full bg-[hsl(25,100%,55%)] flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-300"
        >
          <Plus size={28} className="text-white" strokeWidth={2.5} />
        </Link>
      </div>

      {/* Spacer for the floating button */}
      <div className="h-12" />
    </section>
  );
};

export default SignatureCollection;
