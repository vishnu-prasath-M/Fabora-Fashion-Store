import FaboraHeader from "@/components/FaboraHeader";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen">
      <FaboraHeader />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-sans mb-4">Our Story</p>
          <h1 className="editorial-heading text-4xl md:text-5xl lg:text-6xl mb-6">
            Redefining Modern Elegance
          </h1>
          <p className="text-lg text-muted-foreground font-sans leading-relaxed">
            Since 2020, MAISON has been at the forefront of contemporary fashion, 
            blending timeless design with premium craftsmanship to create pieces that transcend seasons.
          </p>
        </div>
      </section>

      {/* Image Banner */}
      <section className="px-6 md:px-12 max-w-[1400px] mx-auto mb-20">
        <div className="aspect-[21/9] rounded-2xl overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80" 
            alt="MAISON Store Interior"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Mission Section */}
      <section className="px-6 md:px-12 max-w-[1400px] mx-auto mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          <div>
            <h2 className="editorial-heading text-3xl md:text-4xl mb-6">Our Mission</h2>
            <p className="text-muted-foreground font-sans leading-relaxed mb-6">
              At MAISON, we believe that fashion should be both beautiful and responsible. 
              Our commitment to sustainable practices ensures that every piece we create 
              not only looks exceptional but also respects our planet.
            </p>
            <p className="text-muted-foreground font-sans leading-relaxed">
              We partner with skilled artisans and ethical manufacturers to bring you 
              collections that combine traditional craftsmanship with contemporary design. 
              Each garment tells a story of dedication, quality, and timeless elegance.
            </p>
          </div>
          <div className="bg-secondary rounded-2xl p-8 md:p-12">
            <h3 className="text-xs uppercase tracking-[0.2em] font-sans mb-8">Our Values</h3>
            <div className="space-y-6">
              {[
                { title: "Quality", desc: "Premium materials and meticulous attention to detail" },
                { title: "Sustainability", desc: "Eco-conscious practices in every step" },
                { title: "Craftsmanship", desc: "Honoring traditional techniques" },
                { title: "Innovation", desc: "Blending heritage with modern design" },
              ].map((value, i) => (
                <div key={i} className="flex gap-4">
                  <span className="text-xs text-muted-foreground font-sans">0{i + 1}</span>
                  <div>
                    <h4 className="font-sans font-medium mb-1">{value.title}</h4>
                    <p className="text-sm text-muted-foreground font-sans">{value.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 md:px-12 max-w-[1400px] mx-auto mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-border">
          {[
            { number: "5+", label: "Years of Excellence" },
            { number: "50K+", label: "Happy Customers" },
            { number: "200+", label: "Products" },
            { number: "15", label: "Artisan Partners" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="editorial-heading text-3xl md:text-4xl mb-2">{stat.number}</p>
              <p className="text-sm text-muted-foreground font-sans">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="px-6 md:px-12 max-w-[1400px] mx-auto mb-24">
        <div className="text-center mb-12">
          <h2 className="editorial-heading text-3xl md:text-4xl mb-4">The Team</h2>
          <p className="text-muted-foreground font-sans max-w-2xl mx-auto">
            Meet the passionate individuals behind MAISON who bring creativity and expertise to every collection.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: "Sarah Mitchell", role: "Creative Director", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80" },
            { name: "James Chen", role: "Head of Design", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
            { name: "Elena Rodriguez", role: "Sustainability Lead", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80" },
          ].map((member, i) => (
            <div key={i} className="text-center">
              <div className="aspect-[3/4] rounded-xl overflow-hidden mb-4 bg-secondary">
                <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <h4 className="font-sans font-medium">{member.name}</h4>
              <p className="text-sm text-muted-foreground font-sans">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 md:px-12 max-w-[1400px] mx-auto mb-24">
        <div className="bg-foreground text-primary-foreground rounded-2xl p-12 md:p-20 text-center">
          <h2 className="editorial-heading text-3xl md:text-4xl mb-6">Join Our Journey</h2>
          <p className="text-primary-foreground/70 font-sans mb-8 max-w-xl mx-auto">
            Discover collections that embody elegance, quality, and sustainable fashion. 
            Be part of the MAISON story.
          </p>
          <Link 
            to="/products" 
            className="inline-block px-8 py-3 bg-primary-foreground text-foreground text-sm uppercase tracking-[0.2em] font-sans rounded-full hover:bg-primary-foreground/90 transition-colors"
          >
            Explore Collections
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
