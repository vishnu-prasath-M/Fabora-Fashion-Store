import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag, Sparkles, Zap, Tag } from "lucide-react";

const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1920&q=80",
    offer: {
      label: "NEW SEASON",
      title: "SPRING COLLECTION",
      discount: "30% OFF",
      subtitle: "On all new arrivals",
      icon: ShoppingBag,
      color: "bg-emerald-700"
    }
  },
  {
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80",
    offer: {
      label: "FLASH SALE",
      title: "SUMMER ESSENTIALS",
      discount: "UP TO 50%",
      subtitle: "Limited time only",
      icon: Zap,
      color: "bg-orange-600"
    }
  },
  {
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1920&q=80",
    offer: {
      label: "EXCLUSIVE",
      title: "PREMIUM STYLE",
      discount: "BUY 2 GET 1",
      subtitle: "On selected items",
      icon: Tag,
      color: "bg-indigo-700"
    }
  },
  {
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1920&q=80",
    offer: {
      label: "TRENDING NOW",
      title: "WEEKEND SPECIAL",
      discount: "FREE SHIPPING",
      subtitle: "Orders over ₹999",
      icon: Sparkles,
      color: "bg-rose-600"
    }
  }
];

const HeroFullImage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[currentSlide];
  const OfferIcon = slide.offer.icon;

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Images with Crossfade */}
      {heroSlides.map((slideData, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slideData.image}
            alt={`Fashion slide ${index + 1}`}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </div>
      ))}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

      {/* Clean Offer Card - Top Right */}
      <div className="absolute top-24 right-4 md:right-12 z-20">
        <div className={`${slide.offer.color} text-white p-5 shadow-lg max-w-[220px] md:max-w-[260px] transition-all duration-500`}>
          {/* Icon Header */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-white/20 flex items-center justify-center">
              <OfferIcon size={16} className="text-white" />
            </div>
            <span className="text-[10px] md:text-xs font-sans uppercase tracking-[0.2em] text-white/90">
              {slide.offer.label}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-lg md:text-xl font-bold text-white mb-2 leading-tight">
            {slide.offer.title}
          </h3>

          {/* Discount Badge */}
          <div className="bg-white text-gray-900 px-4 py-2 mb-3 inline-block">
            <span className="text-lg md:text-xl font-bold">{slide.offer.discount}</span>
          </div>

          {/* Subtitle */}
          <p className="text-xs text-white/80 mb-4">
            {slide.offer.subtitle}
          </p>

          {/* CTA Button */}
          <Link
            to="/products"
            className="flex items-center justify-center gap-2 w-full bg-white text-gray-900 text-xs font-medium py-2.5 hover:bg-gray-100 transition-colors"
          >
            Shop Now <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative h-full flex flex-col justify-end pb-24 md:pb-32 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="max-w-lg">
          <p className="text-xs md:text-sm font-sans uppercase tracking-[0.3em] text-white/70 mb-4">
            FABORA FASHION
          </p>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-normal tracking-tight leading-[1.05] text-white mb-5">
            Redefine Your<br />Style & Attitude
          </h1>
          <p className="text-sm md:text-base font-sans text-white/70 max-w-md leading-relaxed mb-8">
            Curated fashion from top brands, made for trendsetters. Discover comfort and style effortlessly.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-white text-gray-900 text-xs font-sans uppercase tracking-[0.2em] px-8 py-4 rounded-full hover:bg-gray-100 transition-all hover:scale-105"
          >
            Explore Collection
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 right-6 md:right-12 flex gap-2 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white w-6" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroFullImage;
