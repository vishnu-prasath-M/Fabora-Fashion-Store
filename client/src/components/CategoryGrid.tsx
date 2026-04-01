import { useState } from "react";
import { Link } from "react-router-dom";
import catShoes from "@/assets/cat-shoes.png";
import catBrush from "@/assets/cat-brush.png";
import catBag from "@/assets/cat-bag.png";
import catTshirt from "@/assets/cat-tshirt.png";

const categories = [
  { id: 1, name: "SHOES", image: catShoes, path: "/products?category=shoes" },
  { id: 2, name: "BRASH", image: catBrush, path: "/products?category=accessories" },
  { id: 3, name: "BAG", image: catBag, path: "/products?category=bags" },
  { id: 4, name: "T-SHIRT", image: catTshirt, path: "/products?category=clothing" },
];

const CategoryGrid = () => {
  const [activeTab, setActiveTab] = useState("ALL");

  const tabs = ["ALL", "WOMAN", "CHILDREN"];

  return (
    <section className="px-6 md:px-12 py-20 bg-white">
      {/* Header with Title and Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
          Shop by Category
        </h2>
        
        <div className="flex gap-3">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3 rounded-full text-[10px] font-bold tracking-[0.2em] transition-all duration-300 uppercase ${
                activeTab === tab
                  ? "bg-black text-white"
                  : "bg-white text-gray-900 border border-gray-200 hover:border-gray-400"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={category.path}
            className="group relative block aspect-[4/3.2] rounded-[2.5rem] overflow-hidden bg-[#f9f9f9] border border-gray-100/50 transition-all duration-500 hover:shadow-xl hover:shadow-black/5"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Pill Label */}
            <div className="absolute bottom-6 left-6">
              <div className="bg-white px-6 py-2.5 rounded-full shadow-lg shadow-black/5 flex items-center justify-center min-w-[100px]">
                <span className="text-[11px] font-black tracking-[0.15em] text-black">
                  {category.name}
                </span>
              </div>
            </div>
            
            {/* Soft overlay on hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
