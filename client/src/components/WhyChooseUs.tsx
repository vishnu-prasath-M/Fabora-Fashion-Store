const features = [
  {
    title: "Premium Quality",
    description: "Crafted from the finest materials sourced from the world's best mills.",
  },
  {
    title: "Easy Returns",
    description: "Free returns within 30 days. No questions asked.",
  },
  {
    title: "Fast Delivery",
    description: "Complimentary express shipping on all orders over $200.",
  },
  {
    title: "Sustainable",
    description: "Committed to ethical production and eco-conscious packaging.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="px-6 md:px-12 py-20 md:py-32 bg-secondary">
      <p className="editorial-subheading text-center mb-4">Why Fabora</p>
      <h2 className="editorial-heading text-3xl md:text-5xl text-center mb-16">The Fabora Difference</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-5xl mx-auto">
        {features.map((feature) => (
          <div key={feature.title} className="text-center">
            <div className="w-px h-8 bg-foreground/20 mx-auto mb-6" />
            <h3 className="text-xs uppercase tracking-[0.2em] font-sans mb-3">{feature.title}</h3>
            <p className="text-sm text-muted-foreground font-sans leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
