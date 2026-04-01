import { ArrowUpRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import orangeModel from "@/assets/bold-orange-model.jpg";
import greenModel from "@/assets/bold-green-model.jpg";
import yellowModel from "@/assets/bold-yellow-model.jpg";
import blueModel from "@/assets/bold-blue-model.jpg";
import sunglassesModel from "@/assets/bold-sunglasses-model.jpg";
import clownModel from "@/assets/bold-clown-model.jpg";
import tealModel from "@/assets/bold-teal-model.jpg";
import bento1 from "@/assets/bento-1.jpg";
import categoryMen from "@/assets/category-men.jpg";
import bento3 from "@/assets/bento-3.jpg";

const BoldFashionGrid = () => {
  return (
    <section className="py-16 md:py-24 px-4 md:px-10 max-w-[1400px] mx-auto overflow-hidden">
      {/* Top row: Play button + Title + Avatar stack */}
      <div className="flex items-start justify-between mb-8 md:mb-12">
        {/* Rotating play button */}
        <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
          <div className="absolute inset-0 animate-spin-slow">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <defs>
                <path
                  id="circlePath"
                  d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                />
              </defs>
              <text className="fill-foreground text-[9px] font-sans uppercase tracking-[0.35em]">
                <textPath href="#circlePath">
                  LEARN ABOUT US THROUGH VIDEO •
                </textPath>
              </text>
            </svg>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-foreground flex items-center justify-center">
              <Play size={14} className="text-background ml-0.5" fill="currentColor" />
            </div>
          </div>
        </div>

        {/* Center Title */}
        <div className="flex-1 text-center px-4">
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
            Elevate Your Style With
            <br />
            Bold Fashion
          </h2>
        </div>

        {/* Avatar stack */}
        <div className="flex -space-x-3 flex-shrink-0">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-[3px] border-background overflow-hidden z-10">
            <img src={bento1} alt="User" className="w-full h-full object-cover" />
          </div>
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-[3px] border-background overflow-hidden z-20">
            <img src={categoryMen} alt="User" className="w-full h-full object-cover" />
          </div>
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-foreground border-[3px] border-background flex items-center justify-center z-30 text-background text-xs font-sans font-medium">
            +
          </div>
        </div>
      </div>

      {/* 5-Column Staggered Grid */}
      <div className="flex flex-col md:flex-row gap-3 md:gap-4 justify-center mt-8 md:mt-12 h-auto md:h-[600px] w-full">
        {/* Column 1: Orange & Clown */}
        <div className="flex flex-col gap-3 md:gap-4 w-full md:w-[20%] h-full">
          <div className="rounded-[1.5rem] overflow-hidden relative group h-[300px] md:h-[60%] w-full" style={{ borderTopRightRadius: '3rem' }}>
            <img src={orangeModel} alt="Orange streetwear" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="rounded-[1.5rem] overflow-hidden relative group h-[200px] md:h-[40%] w-full">
            <img src={clownModel} alt="Colorful fashion" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
        </div>

        {/* Column 2: Green */}
        <div className="flex flex-col gap-3 md:gap-4 w-full md:w-[20%] h-full md:pt-12 md:pb-6">
          <div className="rounded-[1.5rem] overflow-hidden relative group h-[400px] md:h-full w-full" style={{ borderTopRightRadius: '3rem' }}>
            <img src={greenModel} alt="Green trench coat" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
        </div>

        {/* Column 3: Yellow & Button */}
        <div className="flex flex-col gap-3 md:gap-4 w-full md:w-[20%] h-full justify-center items-center">
          <div className="flex items-center justify-center mb-1">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-[hsl(25,100%,55%)]">
              <circle cx="14" cy="14" r="5" fill="currentColor" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                <line
                  key={angle}
                  x1="14"
                  y1="14"
                  x2={14 + 10 * Math.cos((angle * Math.PI) / 180)}
                  y2={14 + 10 * Math.sin((angle * Math.PI) / 180)}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ))}
            </svg>
          </div>
          <div className="rounded-[1.5rem] overflow-hidden relative group w-full h-[300px] md:h-[50%]">
            <img src={yellowModel} alt="Yellow hat fashion" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="mt-2 text-center w-full flex justify-center">
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 bg-foreground text-background font-sans font-medium text-sm md:text-base px-6 py-3.5 rounded-full hover:bg-foreground/90 transition-colors w-[90%]"
            >
              Explore Collections
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>

        {/* Column 4: Blue */}
        <div className="flex flex-col gap-3 md:gap-4 w-full md:w-[20%] h-full md:pt-8 md:pb-10">
          <div className="rounded-[1.5rem] overflow-hidden relative group h-[400px] md:h-full w-full" style={{ borderTopLeftRadius: '3rem' }}>
            <img src={blueModel} alt="Blue futuristic outfit" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
        </div>

        {/* Column 5: Sunglasses & Teal */}
        <div className="flex flex-col gap-3 md:gap-4 w-full md:w-[20%] h-full md:-mt-8">
          <div className="rounded-[1.5rem] overflow-hidden relative group h-[300px] md:h-[55%] w-full" style={{ borderTopLeftRadius: '3rem' }}>
            <img src={sunglassesModel} alt="Sunglasses fashion" className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="rounded-[1.5rem] overflow-hidden relative group h-[200px] md:h-[45%] w-full">
            <img src={tealModel} alt="Teal jacket fashion" className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
          </div>
        </div>
      </div>

    </section>
  );
};

export default BoldFashionGrid;
