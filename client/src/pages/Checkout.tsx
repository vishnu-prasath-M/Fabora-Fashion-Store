import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FaboraHeader from "@/components/FaboraHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Lock, MapPin } from "lucide-react";

const inputClass = "w-full bg-transparent border-b border-border py-3 text-sm font-sans outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground";

// Payment option logos as SVG components
const GPayLogo = () => (
  <svg viewBox="0 0 48 48" className="w-6 h-6">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59L2.56 13.22C.92 16.46 0 20.12 0 24s.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
  </svg>
);

const AmazonPayLogo = () => (
  <svg viewBox="0 0 100 30" className="w-16 h-6">
    <path fill="#FF9900" d="M62.9 22.3c-5.4 4-13.3 6.1-20.1 6.1-9.5 0-18.1-3.5-24.6-9.3-.5-.5-.1-1.2.6-.8 7 4.1 15.7 6.5 24.7 6.5 6.1 0 12.7-1.2 18.8-3.7.9-.4 1.7.6.8 1.2h-.2z"/>
    <path fill="#FF9900" d="M64.9 19.7c-.7-.9-4.5-.4-6.2-.2-.5.1-.6-.4-.1-.7 3-2.1 8-.5 8.6.3.6.8-.2 6.3-3 8.9-.4.4-.9.2-.7-.3.7-1.7 2.2-5.6 1.5-6.5l-.1-.5z"/>
    <path fill="#221F1F" d="M58.2 3.5V1.2c0-.3.2-.5.5-.5h10.8c.3 0 .5.2.5.5v2c0 .3-.3.7-.7 1.2l-4.8 6.9c1.8 0 3.7.2 5.4 1.1.3.2.4.5.4.8v2.5c0 .3-.3.6-.7.4-3-1.6-7-1.7-10.3.1-.3.2-.7-.1-.7-.4v-2.4c0-.3 0-.8.3-1.2l5.6-8h-4.9c-.3 0-.5-.2-.5-.5zM21.7 17.8h-3.2c-.3-.1-.5-.3-.5-.5V1.3c0-.3.3-.5.6-.5h3c.3 0 .5.2.5.5v1.5c0 .3.5.4.7.1 1-1.3 2.5-2 4.7-2 1.4 0 2.9.5 3.8 1.6.2.3.6.3.7-.1.8-1.3 2.5-1.6 4.6-1.6 1.8 0 3.7.7 4.9 2.2 1.1 1.5 1 3.5 1 5.2v8.6c0 .3-.3.5-.6.5h-3.2c-.3-.1-.5-.3-.5-.6V7.4c0-.7.1-2.3-.1-2.6-.2-1-1-1.3-1.8-1.3-.8 0-1.7.5-2 1.4-.2.7-.2 1.4-.2 2.1v7.8c0 .3-.3.5-.6.5h-3.2c-.3-.1-.5-.3-.5-.6V7.2c0-1.6.3-3.9-1.5-3.9-1.8 0-1.8 2.1-1.8 3.9v7.6c0 .3-.3.5-.5.5zM77.2.3c4.9 0 7.5 4.2 7.5 9.5 0 5.1-2.9 9.2-7.5 9.2-4.8 0-7.4-4.2-7.4-9.4 0-5.2 2.6-9.3 7.4-9.3zm0 3.4c-2.4 0-2.6 3.3-2.6 5.4 0 2.1 0 6.5 2.6 6.5 2.6 0 2.7-3.6 2.7-5.7 0-1.4-.1-3.1-.4-4.4-.3-1.4-1-2.1-2.3-1.8zM90.5 17.8h-3.2c-.3-.1-.5-.3-.5-.5V1.3c0-.3.2-.5.5-.6h3c.3 0 .5.2.5.5v1.3c0 .3.5.5.7.1 1.1-1.3 2.6-2 4.4-2 1.7 0 3.2.6 4.3 2.3.2.2.5.2.6-.1.9-1.4 2.7-2.2 4.6-2.2 1.6 0 3.2.5 4.2 1.7 1.3 1.6 1.1 3.8 1.1 6v7.5c-.1.3-.4.5-.7.5h-3.2c-.3-.1-.5-.3-.5-.6V7.4c0-.7.1-2.3-.1-2.9-.2-.9-.9-1.3-1.7-1.3-.7 0-1.6.5-1.9 1.3-.4 1-.4 2.1-.4 3v7.6c-.1.3-.4.5-.7.5h-3.2c-.3-.1-.5-.3-.5-.6V7.2c0-1.8.3-4.5-2-4.5-2.4 0-2.3 2.8-2.3 4.5v7.6c-.1.3-.4.5-.6.5z"/>
  </svg>
);

const Checkout = () => {
  const { items: cart, totalItems, subtotal: totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("cod");
  
  // Get saved address from localStorage
  const savedAddress = user ? JSON.parse(localStorage.getItem(`address_${user._id}`) || "null") : null;
  const [formData, setFormData] = useState({
    firstName: savedAddress?.firstName || "",
    lastName: savedAddress?.lastName || "",
    address: savedAddress?.address || "",
    city: savedAddress?.city || "",
    zipCode: savedAddress?.zipCode || "",
    country: savedAddress?.country || "India",
  });

  useEffect(() => {
    if (user && savedAddress) {
      setFormData(savedAddress);
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const saveAddress = () => {
    if (user) {
      localStorage.setItem(`address_${user._id}`, JSON.stringify(formData));
    }
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
      // Save address to localStorage for future orders
      saveAddress();

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
        paymentMethod: selectedPayment,
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

  const hasSavedAddress = savedAddress && savedAddress.address && savedAddress.city;

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
                {/* Address Section */}
                <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground mb-8">Shipping Address</h2>
                
                {/* Show saved address if available and not editing */}
                {hasSavedAddress && !showAddressForm ? (
                  <div className="bg-secondary/40 rounded-2xl p-6 border border-border mb-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-foreground/10 rounded-full flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-foreground" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{savedAddress.firstName} {savedAddress.lastName}</p>
                        <p className="text-sm text-muted-foreground mt-1">{savedAddress.address}</p>
                        <p className="text-sm text-muted-foreground">{savedAddress.city}, {savedAddress.zipCode}</p>
                        <p className="text-sm text-muted-foreground">{savedAddress.country}</p>
                      </div>
                      <Button 
                        type="button"
                        variant="outline" 
                        size="sm"
                        onClick={() => setShowAddressForm(true)}
                        className="text-xs"
                      >
                        Change Address
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-10">
                        <input 
                            type="text" 
                            name="firstName"
                            placeholder="First name" 
                            className={inputClass} 
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                        />
                        <input 
                            type="text" 
                            name="lastName"
                            placeholder="Last name" 
                            className={inputClass} 
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                        />
                        <input 
                            type="text" 
                            name="address"
                            placeholder="Address" 
                            className={inputClass + " col-span-2"} 
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                        />
                        <input 
                            type="text" 
                            name="city"
                            placeholder="City" 
                            className={inputClass} 
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                        />
                        <input 
                            type="text" 
                            name="zipCode"
                            placeholder="Zip code" 
                            className={inputClass} 
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    {hasSavedAddress && (
                      <Button 
                        type="button"
                        variant="ghost" 
                        size="sm"
                        onClick={() => setShowAddressForm(false)}
                        className="mt-4 text-xs"
                      >
                        Cancel
                      </Button>
                    )}
                  </>
                )}

                {/* Payment Options */}
                <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground mb-8 mt-16">Payment Method</h2>
                
                <div className="space-y-4">
                  {/* Cash on Delivery */}
                  <label className="flex items-center gap-4 p-4 rounded-xl border border-border cursor-pointer hover:border-foreground/50 transition-colors">
                    <input 
                      type="radio" 
                      name="payment" 
                      value="cod" 
                      checked={selectedPayment === "cod"}
                      onChange={(e) => setSelectedPayment(e.target.value)}
                      className="w-4 h-4 accent-foreground"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm">Cash on Delivery</p>
                      <p className="text-xs text-muted-foreground">Pay when you receive your order</p>
                    </div>
                    <div className="w-10 h-6 bg-emerald-100 rounded flex items-center justify-center">
                      <span className="text-[10px] font-bold text-emerald-700">COD</span>
                    </div>
                  </label>

                  {/* GPay - Not Available */}
                  <label className="flex items-center gap-4 p-4 rounded-xl border border-border/50 cursor-not-allowed opacity-50">
                    <input 
                      type="radio" 
                      name="payment" 
                      value="gpay" 
                      disabled
                      className="w-4 h-4"
                    />
                    <GPayLogo />
                    <div className="flex-1">
                      <p className="font-medium text-sm">Pay using GPay</p>
                      <p className="text-xs text-muted-foreground">Currently not available</p>
                    </div>
                  </label>

                  {/* Amazon Pay - Not Available */}
                  <label className="flex items-center gap-4 p-4 rounded-xl border border-border/50 cursor-not-allowed opacity-50">
                    <input 
                      type="radio" 
                      name="payment" 
                      value="amazonpay" 
                      disabled
                      className="w-4 h-4"
                    />
                    <AmazonPayLogo />
                    <div className="flex-1">
                      <p className="font-medium text-sm">Pay using Amazon Pay</p>
                      <p className="text-xs text-muted-foreground">Currently not available</p>
                    </div>
                  </label>
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
