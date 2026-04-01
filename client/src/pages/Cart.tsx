import { Link } from "react-router-dom";
import FaboraHeader from "@/components/FaboraHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, X } from "lucide-react";
import { useEffect } from "react";

const Cart = () => {
  const { items, removeItem, updateQuantity, subtotal } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <FaboraHeader />
      <div className="pt-24 px-6 md:px-12 pb-20 max-w-4xl mx-auto">
        <h1 className="editorial-heading text-4xl md:text-5xl mb-12">Your Bag</h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground font-sans mb-6">Your bag is empty.</p>
            <Button variant="editorial" asChild>
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="border-t border-border">
              {items.map((item, i) => (
                <div key={i} className="flex gap-6 py-8 border-b border-border">
                  <Link to={`/product/${item.product.id}`} className="w-24 md:w-32 aspect-[3/4] bg-secondary shrink-0 overflow-hidden">
                    <img src={item.product.image} alt={item.product.name} loading="lazy" className="w-full h-full object-cover" />
                  </Link>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-sm font-sans mb-1">{item.product.name}</h3>
                          <p className="text-xs text-muted-foreground font-sans">
                            {item.color} / {item.size}
                          </p>
                        </div>
                        <button onClick={() => removeItem(i)} className="text-muted-foreground hover:text-foreground transition-colors">
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="flex items-center border border-border">
                        <button onClick={() => updateQuantity(i, item.quantity - 1)} className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                          <Minus size={12} />
                        </button>
                        <span className="px-4 text-xs font-sans">{item.quantity}</span>
                        <button onClick={() => updateQuantity(i, item.quantity + 1)} className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                          <Plus size={12} />
                        </button>
                      </div>
                      <p className="text-sm font-sans">${item.product.price * item.quantity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col items-end">
              <div className="w-full md:w-72">
                <div className="flex justify-between text-sm font-sans mb-2">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal}</span>
                </div>
                <div className="flex justify-between text-sm font-sans mb-6">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{subtotal > 200 ? "Complimentary" : "$15"}</span>
                </div>
                <div className="flex justify-between text-sm font-sans font-medium border-t border-border pt-4 mb-8">
                  <span>Total</span>
                  <span>${subtotal > 200 ? subtotal : subtotal + 15}</span>
                </div>
                <Button variant="editorial" size="lg" className="w-full" asChild>
                  <Link to="/checkout">Checkout</Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
