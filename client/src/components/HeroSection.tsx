import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-main.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <img
        src={heroImage}
        alt="Fashion editorial hero"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-foreground/10" />
      <div className="relative h-full flex flex-col justify-end pb-24 md:pb-32 px-6 md:px-12">
        <div className="max-w-xl">
          <p className="editorial-subheading text-primary-foreground/80 mb-4">Spring / Summer 2026</p>
          <h1 className="editorial-heading text-5xl md:text-7xl lg:text-8xl text-primary-foreground mb-6">
            Redefine<br />Your Style
          </h1>
          <p className="text-sm md:text-base text-primary-foreground/70 mb-8 font-sans max-w-md leading-relaxed">
            Discover the new collection — where timeless elegance meets modern sensibility.
          </p>
          <Button variant="editorial" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-foreground" asChild>
            <Link to="/products">Shop Now</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
