import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FaboraHeader from "@/components/FaboraHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Lock } from "lucide-react";

const inputClass = "w-full bg-transparent border-b border-border py-3 text-sm font-sans outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground";

const Checkout = () => {
  const { items: cart, totalItems, subtotal: totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    country: "India",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setShowLoginModal(true);
      setTimeout(() => {
        navigate("/login");
      }, 1500);
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        orderItems: cart.map(item => ({
          name: item.product.name,
          qty: item.quantity,
          image: item.product.image,
          price: item.product.price,
          product: item.product.id,
          size: item.size,
          color: item.color,
        })),
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          postalCode: formData.zipCode,
          country: formData.country,
        },
        totalPrice: totalPrice,
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        toast({
          title: "Order Placed!",
          description: "Your fashion pieces are on the way.",
        });
        clearCart();
        navigate("/profile");
      } else {
        const error = await response.json();
        toast({
          title: "Order failed",
          description: error.message || "Something went wrong.",
          variant: "destructive",
        });
      }
    } catch (error) {
        toast({
            title: "Network Error",
            description: "Could not connect to the server.",
            variant: "destructive",
        });
    } finally {
      setLoading(false);
    }
  };

  if (totalItems === 0) {
    useEffect(() => {
        navigate("/products");
    }, [navigate]);
    return null;
  }

  return (
    <div className="min-h-screen font-sans">
      <FaboraHeader />
      
      {/* Login Before Order Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white p-12 rounded-[2.5rem] shadow-2xl border border-border text-center max-w-sm mx-auto scale-in-center animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="w-8 h-8 text-foreground opacity-40" />
            </div>
            <h2 className="editorial-heading text-2xl mb-4">Login Before Order</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8">
              We need to know where to send your premium pieces. Redirecting to login...
            </p>
            <div className="flex justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-primary opacity-30" />
            </div>
          </div>
        </div>
      )}

      <div className="pt-32 px-6 md:px-12 pb-20 max-w-6xl mx-auto">
        <h1 className="editorial-heading text-4xl md:text-5xl mb-12">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left - Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handlePlaceOrder}>
                <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground mb-8">Shipping Address</h2>
                <div className="grid grid-cols-2 gap-x-8 gap-y-10">
                    <input 
                        type="text" 
                        name="firstName"
                        placeholder="First name" 
                        className={inputClass} 
                        onChange={handleInputChange}
                        required
                    />
                    <input 
                        type="text" 
                        name="lastName"
                        placeholder="Last name" 
                        className={inputClass} 
                        onChange={handleInputChange}
                        required
                    />
                    <input 
                        type="text" 
                        name="address"
                        placeholder="Address" 
                        className={inputClass + " col-span-2"} 
                        onChange={handleInputChange}
                        required
                    />
                    <input 
                        type="text" 
                        name="city"
                        placeholder="City" 
                        className={inputClass} 
                        onChange={handleInputChange}
                        required
                    />
                    <input 
                        type="text" 
                        name="zipCode"
                        placeholder="Zip code" 
                        className={inputClass} 
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground mb-8 mt-16">Payment — Card</h2>
                <div className="grid gap-10">
                    <input type="text" placeholder="Card number" className={inputClass} />
                    <div className="grid grid-cols-2 gap-8">
                        <input type="text" placeholder="MM / YY" className={inputClass} />
                        <input type="text" placeholder="CVC" className={inputClass} />
                    </div>
                </div>

                <Button 
                    type="submit" 
                    variant="editorial" 
                    size="lg" 
                    className="w-full mt-16 h-16 rounded-2xl text-xs uppercase tracking-widest"
                    disabled={loading}
                >
                    {loading ? <Loader2 className="animate-spin mr-2" /> : "Place Order"}
                </Button>
            </form>
          </div>

          {/* Right - Summary */}
          <div className="lg:col-span-5">
            <div className="bg-secondary/40 rounded-[2rem] p-8 md:p-10 border border-border sticky top-32">
                <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground mb-10">Order Summary</h2>
                <div className="space-y-8 mb-10 max-h-[40vh] overflow-y-auto pr-2 scrollbar-none">
                {cart.map((item, i) => (
                    <div key={i} className="flex gap-6">
                        <div className="w-16 aspect-[3/4] bg-white rounded-xl overflow-hidden shrink-0 shadow-sm">
                            <img src={item.product.image} alt={item.product.name} loading="lazy" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 py-1">
                            <h3 className="text-sm font-medium mb-1">{item.product.name}</h3>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{item.color} / {item.size} × {item.quantity}</p>
                        </div>
                        <p className="text-sm font-semibold py-1">₹{item.product.price * item.quantity}</p>
                    </div>
                ))}
                </div>
                
                <div className="border-t border-border pt-8 space-y-4">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium">₹{totalPrice}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Shipping</span>
                        <span className="text-emerald-600 font-medium tracking-wide">Complimentary</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t border-border pt-6 mt-6">
                        <span className="editorial-heading">Total</span>
                        <span>₹{totalPrice}</span>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
