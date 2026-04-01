import { ArrowUpRight, Headphones, RotateCcw, ShieldCheck, Truck, Users, Award } from "lucide-react";
import bento1 from "@/assets/bento-1.jpg";
import bento2 from "@/assets/bento-2.jpg";
import bento3 from "@/assets/bento-3.jpg";
import categoryMen from "@/assets/category-men.jpg";
import categoryWomen from "@/assets/category-women.jpg";
import categoryKids from "@/assets/category-kids.jpg";

const LookbookGrid = () => {
  return (
    <section className="px-6 md:px-12 py-20 md:py-32">
      <div className="max-w-4xl xl:max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif tracking-normal md:tracking-wide mb-4 text-foreground">Embrace Comfort & Style</h2>
          <p className="text-sm md:text-base text-muted-foreground font-sans max-w-xl mx-auto">
            Designed to move with you — effortless, modern, and made for everyday life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px] md:auto-rows-[300px]">
          
          {/* Box 1: Returns */}
          <div className="bg-[#0D1216] text-white rounded-[2rem] p-8 flex flex-col justify-center items-center text-center">
            <div className="flex gap-2 mb-8">
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                <RotateCcw size={20} className="text-white/80" />
              </div>
              <div className="w-12 h-12 rounded-full bg-[#FA5924] flex items-center justify-center">
                <ShieldCheck size={20} className="text-white" />
              </div>
            </div>
            <h3 className="text-lg font-medium mb-3 font-sans">100 Days Returns</h3>
            <p className="text-xs text-white/50 font-sans max-w-[200px] leading-relaxed">
              Enjoy peace of mind with our easy 100-day return policy
            </p>
          </div>

          {/* Box 2: New Collection */}
          <div className="rounded-[2rem] overflow-hidden relative group">
            <img src={categoryWomen} alt="New Collection" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/10 transition-opacity" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <span className="text-white font-sans text-xl drop-shadow-md">New Collection</span>
              <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform">
                <ArrowUpRight size={18} className="text-black" />
              </button>
            </div>
          </div>

          {/* Box 3: Trendy Collection (Spans 2 rows) */}
          <div className="md:row-span-2 rounded-[2rem] overflow-hidden relative group order-last md:order-none">
            <img src={bento2} alt="Trendy Collection" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute top-8 left-6 right-6 flex justify-between items-start">
              <span className="text-white font-sans text-xl max-w-[100px] leading-tight drop-shadow-md">Trendy Collection</span>
              <div className="flex gap-1.5 pt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
              </div>
            </div>
            <div className="absolute bottom-6 left-6 right-6 flex justify-center">
              <button className="w-full py-4 bg-white text-black font-sans text-[15px] rounded-full font-medium hover:bg-gray-100 transition-colors">
                Add To Card +
              </button>
            </div>
          </div>

          {/* Box 4: Active Users */}
          <div className="bg-[#E7D6CA] rounded-[2rem] p-8 flex flex-col justify-center items-center text-center">
            <p className="text-sm font-sans text-gray-800 mb-2 font-medium">Active Users</p>
            <h3 className="text-[3.5rem] font-sans tracking-tight mb-8 leading-none">120K</h3>
            <div className="flex -space-x-4">
              <div className="w-12 h-12 rounded-full border-[3px] border-[#E7D6CA] overflow-hidden z-10 relative">
                <img src={bento1} alt="User" className="w-full h-full object-cover" />
              </div>
              <div className="w-12 h-12 rounded-full border-[3px] border-[#E7D6CA] overflow-hidden z-20 relative">
                <img src={categoryMen} alt="User" className="w-full h-full object-cover" />
              </div>
              <div className="w-12 h-12 rounded-full border-[3px] border-[#E7D6CA] overflow-hidden z-30 relative">
                <img src={bento3} alt="User" className="w-full h-full object-cover" />
              </div>
              <div className="w-12 h-12 rounded-full bg-[#FA5924] border-[3px] border-[#E7D6CA] flex items-center justify-center text-white text-sm font-medium z-40 relative">
                +
              </div>
            </div>
          </div>

          {/* Box 5: Customer Services (Spans 2 cols) */}
          <div className="md:col-span-2 bg-[#FDEAE0] rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
            <div className="max-w-[220px] h-full flex flex-col justify-between z-10 w-full mb-6 md:mb-0">
              <h3 className="text-[1.7rem] md:text-3xl font-sans mb-8 md:mb-0 leading-[1.15] text-foreground">24/07 Customer Services</h3>
              <p className="text-[13px] text-gray-500 font-sans leading-relaxed">
                Enjoy peace of mind with our easy 100-day return policy
              </p>
            </div>
            
            <div className="relative w-full md:w-[220px] h-[160px] md:h-[180px] z-10 shrink-0">
               {/* Headset bubble */}
               <div className="absolute right-[50%] md:right-20 bottom-0 md:bottom-2 w-[5.5rem] h-[5.5rem] md:w-[6.5rem] md:h-[6.5rem] rounded-full bg-white border-[6px] md:border-[8px] border-[#FDEAE0] flex items-center justify-center shadow-sm z-20 translate-x-[20%] md:translate-x-0">
                  <Headphones size={32} className="text-[#FA5924]" />
               </div>
               {/* Truck bubble */}
               <div className="absolute right-[25%] md:right-0 bottom-[-10px] md:bottom-[-10px] w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#FA5924] border-[6px] md:border-[8px] border-[#FDEAE0] flex items-center justify-center shadow-sm z-30 translate-x-[50%] md:translate-x-0">
                  <Truck size={20} className="text-white" />
               </div>
               {/* Portrait bubble */}
               <div className="absolute right-[10%] md:right-4 top-2 md:top-2 w-[4.5rem] h-[4.5rem] md:w-[5.5rem] md:h-[5.5rem] rounded-full bg-gray-300 border-[6px] md:border-[8px] border-[#FDEAE0] overflow-hidden shadow-sm z-10 translate-x-[10%] md:translate-x-0">
                  <img src={categoryKids} alt="Representative" className="w-full h-full object-cover" />
               </div>
            </div>
          </div>

          {/* Box 6: Life Time Warranty */}
          <div className="bg-[#F0F1F3] rounded-[2rem] p-8 flex flex-col justify-center items-center text-center">
            <div className="text-[#FA5924] mb-8">
              <Award size={48} strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-medium mb-3 font-sans">Life Time Warranty</h3>
            <p className="text-[13px] text-gray-500 font-sans leading-relaxed">
              Enjoy complete peace of mind with our lifetime warranty
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LookbookGrid;
