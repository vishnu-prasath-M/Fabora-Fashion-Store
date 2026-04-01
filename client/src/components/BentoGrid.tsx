import bento1 from "@/assets/bento-1.jpg";
import bento2 from "@/assets/bento-2.jpg";
import bento3 from "@/assets/bento-3.jpg";

const BentoGrid = () => {
  return (
    <section className="px-6 md:px-12 py-20 md:py-32">
      <p className="editorial-subheading text-center mb-4">Editorial</p>
      <h2 className="editorial-heading text-3xl md:text-5xl text-center mb-16">The Edit</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[280px]">
        {/* Large image */}
        <div className="md:col-span-2 md:row-span-2 overflow-hidden group">
          <img src={bento1} alt="Editorial look" loading="lazy" width={800} height={800} className="w-full h-full object-cover image-zoom" />
        </div>

        {/* Promo card */}
        <div className="bg-secondary flex flex-col justify-center items-center p-8 text-center">
          <p className="editorial-subheading mb-3">Limited Time</p>
          <h3 className="editorial-heading text-3xl md:text-4xl mb-2">Flat 30% Off</h3>
          <p className="text-sm text-muted-foreground font-sans">On select essentials</p>
        </div>

        {/* Accessories image */}
        <div className="overflow-hidden group">
          <img src={bento2} alt="Accessories" loading="lazy" width={800} height={600} className="w-full h-full object-cover image-zoom" />
        </div>

        {/* Text block */}
        <div className="bg-accent flex flex-col justify-center p-8">
          <p className="editorial-subheading mb-3">Craftsmanship</p>
          <h3 className="editorial-heading text-2xl mb-3">Made to Last</h3>
          <p className="text-sm text-muted-foreground font-sans leading-relaxed">
            Every piece is designed with intention, crafted from the finest materials.
          </p>
        </div>

        {/* Detail image */}
        <div className="overflow-hidden group">
          <img src={bento3} alt="Detail shot" loading="lazy" width={600} height={800} className="w-full h-full object-cover image-zoom" />
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
