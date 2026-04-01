import { useState } from "react";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import carouselCenter from "@/assets/carousel-center.jpg";
import carousel1 from "@/assets/carousel-1.jpg";
import carousel2 from "@/assets/carousel-2.jpg";
import carousel3 from "@/assets/carousel-3.jpg";
import carousel4 from "@/assets/carousel-4.jpg";
import carousel5 from "@/assets/carousel-5.jpg";

const panels = [
  { img: carousel1, alt: "Streetwear look" },
  { img: carousel2, alt: "Bold pink look" },
  { img: carousel3, alt: "Classic leather" },
  { img: carouselCenter, alt: "Featured style", center: true },
  { img: carousel4, alt: "Urban chains" },
  { img: carousel5, alt: "Silver metallic" },
  { img: carousel1, alt: "Teal hoodie" },
];

const getDimensions = (index: number) => {
  switch (index) {
    case 3:
      return "w-[240px] md:w-[380px] h-[400px] md:h-[550px] z-20";
    case 2:
    case 4:
      return "w-[100px] md:w-[150px] h-[320px] md:h-[460px] z-10";
    case 1:
    case 5:
      return "w-[90px] md:w-[130px] h-[260px] md:h-[380px] z-[5]";
    case 0:
    case 6:
      return "w-[80px] md:w-[110px] h-[200px] md:h-[300px] z-0";
    default:
      return "";
  }
};

const ProductLooksCarousel = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-24">
      <div className="text-center mb-12 px-6">
        <h2 className="font-serif text-3xl md:text-[2.75rem] font-normal tracking-tight text-foreground mb-4">
          Signature Collection
        </h2>
        <p className="text-sm md:text-base font-sans text-muted-foreground max-w-md mx-auto leading-relaxed">
          Own your style with comfort and attitude<br/>— made for trendsetters.
        </p>
      </div>

      {/* Carousel */}
      <div className="flex items-center justify-center gap-2 md:gap-4 px-4 max-w-[1400px] mx-auto pb-12">
        {panels.map((panel, index) => {
          const isCenter = index === 3;
          return (
            <div
              key={index}
              className={`relative transition-all duration-500 shrink-0 ${getDimensions(index)}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                transform: hoveredIndex === index && !isCenter ? "scale(1.03)" : "scale(1)",
              }}
            >
              <div className="w-full h-full rounded-2xl md:rounded-[1.25rem] overflow-hidden relative shadow-sm">
                <img
                  src={panel.img}
                  alt={panel.alt}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />

                {/* Center panel overlays (Inside image bounds) */}
                {isCenter && (
                  <>
                    <div className="absolute inset-0 bg-black/5" />
                    {/* NEW badge */}
                    <div className="absolute top-5 left-5">
                      <span className="bg-white text-gray-800 text-[13px] font-sans font-medium px-5 py-2 rounded-full shadow-sm">
                        New
                      </span>
                    </div>

                    {/* Vertical text */}
                    <div className="absolute top-6 right-5 flex flex-col items-center">
                      <span
                        className="text-gray-800 text-[12px] md:text-sm font-sans tracking-wider font-semibold flex items-center gap-1.5"
                        style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
                      >
                        Featured <span className="text-[#FA5924]">Collection</span>
                      </span>
                    </div>

                    {/* Bottom info */}
                    <div className="absolute bottom-8 right-6 text-right">
                      <p className="text-gray-700 font-sans text-xs font-medium mb-1 drop-shadow-sm">Start from</p>
                      <p className="text-[#FA5924] font-sans text-sm md:text-base font-bold drop-shadow-sm">120.25 USD</p>
                    </div>
                  </>
                )}
              </div>

              {/* Center panel overlay (Outside image bounds - Button) */}
              {isCenter && (
                <Link
                  to="/products"
                  className="absolute -bottom-7 left-1/2 -translate-x-1/2 w-[3.5rem] h-[3.5rem] md:w-20 md:h-20 rounded-full bg-[#FA5924] border-[5px] md:border-[6px] border-white text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform z-30"
                >
                  <Plus size={32} strokeWidth={2.5} />
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProductLooksCarousel;
