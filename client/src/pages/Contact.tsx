import { useState } from "react";
import FaboraHeader from "@/components/FaboraHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen">
      <FaboraHeader />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-sans mb-4">Get in Touch</p>
          <h1 className="editorial-heading text-4xl md:text-5xl lg:text-6xl mb-6">
            Contact Us
          </h1>
          <p className="text-lg text-muted-foreground font-sans leading-relaxed">
            We would love to hear from you. Whether you have a question about our products, 
            need assistance with an order, or just want to say hello.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="px-6 md:px-12 max-w-[1400px] mx-auto mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: MapPin, title: "Visit Us", lines: ["123 Fashion Avenue,Fabora", "Madurai, MU 10001"] },
            { icon: Phone, title: "Call Us", lines: ["+91 8925699005", "Mon-Fri, 9am-6pm EST"] },
            { icon: Mail, title: "Email Us", lines: ["fabora@gmail.com", "support@Fabora.com"] },
            { icon: Clock, title: "Working Hours", lines: ["Monday - Friday: 9am - 6pm", "Saturday: 10am - 4pm"] },
          ].map((item, i) => (
            <div key={i} className="bg-secondary rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-foreground/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <item.icon size={20} className="text-foreground" />
              </div>
              <h3 className="font-sans font-medium mb-2">{item.title}</h3>
              {item.lines.map((line, j) => (
                <p key={j} className="text-sm text-muted-foreground font-sans">{line}</p>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="px-6 md:px-12 max-w-[1400px] mx-auto mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-secondary rounded-2xl p-8 md:p-12">
            <h2 className="editorial-heading text-2xl md:text-3xl mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] font-sans mb-2 block">Your Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm font-sans outline-none focus:border-foreground transition-colors"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] font-sans mb-2 block">Your Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm font-sans outline-none focus:border-foreground transition-colors"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.2em] font-sans mb-2 block">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm font-sans outline-none focus:border-foreground transition-colors"
                  placeholder="How can we help?"
                  required
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.2em] font-sans mb-2 block">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm font-sans outline-none focus:border-foreground transition-colors resize-none"
                  placeholder="Tell us more about your inquiry..."
                  required
                />
              </div>
              <Button variant="editorial" size="lg" className="w-full" type="submit">
                <Send size={16} className="mr-2" />
                Send Message
              </Button>
            </form>
          </div>

          {/* Map Placeholder */}
          <div className="rounded-2xl overflow-hidden bg-secondary h-full min-h-[400px] relative">
            <img 
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80" 
              alt="Store Location"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center">
              <div className="bg-background rounded-xl p-6 text-center shadow-lg">
                <MapPin size={32} className="mx-auto mb-3 text-foreground" />
                <h3 className="font-sans font-medium mb-1">Fabora Fashion Store</h3>
                <p className="text-sm text-muted-foreground font-sans">123 Fashion Avenue, Madurai</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 md:px-12 max-w-[1400px] mx-auto mb-24">
        <div className="text-center mb-12">
          <h2 className="editorial-heading text-3xl md:text-4xl mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground font-sans max-w-2xl mx-auto">
            Find quick answers to common questions about our products and services.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            { q: "How long does shipping take?", a: "Standard shipping takes 5-7 business days. Express shipping is available for 2-3 business days delivery." },
            { q: "What is your return policy?", a: "We offer free returns within 30 days of delivery. Items must be unworn with original tags attached." },
            { q: "Do you ship internationally?", a: "Yes, we ship to over 50 countries worldwide. International shipping rates apply." },
            { q: "How can I track my order?", a: "Once your order ships, you will receive an email with a tracking number to monitor your delivery." },
          ].map((faq, i) => (
            <div key={i} className="bg-secondary rounded-xl p-6">
              <h4 className="font-sans font-medium mb-2">{faq.q}</h4>
              <p className="text-sm text-muted-foreground font-sans">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
