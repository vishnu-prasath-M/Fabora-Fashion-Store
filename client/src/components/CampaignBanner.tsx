import { Link } from "react-router-dom";
import campaignImage from "@/assets/campaign-summer.jpg";

const CampaignBanner = () => {
  return (
    <section className="w-full">
      <Link to="/products" className="block relative group overflow-hidden">
        <img
          src={campaignImage}
          alt="New Season Drop Campaign"
          loading="lazy"
          width={1920}
          height={600}
          className="w-full h-[50vh] md:h-[60vh] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-xs uppercase tracking-[0.3em] text-primary-foreground/70 font-sans mb-4">
            Limited Edition
          </p>
          <h2 className="editorial-heading text-4xl md:text-7xl text-primary-foreground text-center">
            New Season Drop
          </h2>
          <p className="text-xs uppercase tracking-[0.2em] text-primary-foreground/60 font-sans mt-6">
            Shop the Collection →
          </p>
        </div>
      </Link>
    </section>
  );
};

export default CampaignBanner;
