import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useWishlist } from '@/contexts/WishlistContext';
import FaboraHeader from '@/components/FaboraHeader';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Package, MapPin, Heart, LogOut, ChevronRight, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('orders');
    const { items: wishlistItems, removeFromWishlist } = useWishlist();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchOrders = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/orders/my-orders`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user, navigate]);

    const handleCancelOrder = async (orderId: string) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/orders/${orderId}/cancel`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                },
            });
            if (response.ok) {
                setOrders(orders.map(order => 
                    order._id === orderId ? { ...order, status: 'Cancelled' } : order
                ));
                toast({
                    title: "Order Cancelled",
                    description: "Your order has been successfully cancelled.",
                });
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Could not cancel the order. Please try again.",
                variant: "destructive",
            });
        }
    };

    if (!user) return null;

    const tabs = [
        { id: 'orders', label: 'My Orders', icon: Package },
        { id: 'address', label: 'My Address', icon: MapPin },
        { id: 'wishlist', label: 'My Wishlist', icon: Heart },
    ];

    return (
        <div className="min-h-screen bg-background font-sans">
            <FaboraHeader />
            
            <main className="pt-32 pb-20 px-6 md:px-12 max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row gap-12">
                    {/* Sidebar */}
                    <aside className="w-full md:w-72 shrink-0">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-border">
                                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold">{user.name}</h2>
                                <p className="text-sm text-muted-foreground">{user.email}</p>
                            </div>
                        </div>

                        <nav className="space-y-1">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                                        activeTab === tab.id 
                                        ? "bg-secondary text-foreground font-medium shadow-sm" 
                                        : "text-muted-foreground hover:bg-secondary/50"
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <tab.icon size={18} strokeWidth={activeTab === tab.id ? 2 : 1.5} />
                                        <span className="text-sm uppercase tracking-wider">{tab.label}</span>
                                    </div>
                                    <ChevronRight size={14} className={activeTab === tab.id ? "opacity-100" : "opacity-0"} />
                                </button>
                            ))}
                            
                            <button
                                onClick={() => {
                                    logout();
                                    navigate('/');
                                }}
                                className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all mt-8"
                            >
                                <LogOut size={18} />
                                <span className="text-sm uppercase tracking-wider">Logout</span>
                            </button>
                        </nav>
                    </aside>

                    {/* Content Area */}
                    <div className="flex-1">
                        {activeTab === 'orders' && (
                            <div>
                                <h1 className="editorial-heading text-3xl mb-8">My Orders</h1>
                                {loading ? (
                                    <div className="space-y-4 animate-pulse">
                                        {[1, 2, 3].map(i => <div key={i} className="h-24 bg-secondary rounded-2xl" />)}
                                    </div>
                                ) : orders.length === 0 ? (
                                    <div className="text-center py-20 bg-secondary/30 rounded-3xl border border-dashed border-border">
                                        <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                                        <p className="text-muted-foreground">You haven't placed any orders yet.</p>
                                        <Link to="/products">
                                            <Button variant="link" className="mt-2 text-primary">Start Shopping</Button>
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        {orders.map((order) => (
                                            <div key={order._id} className="bg-white border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                                <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                                                    <div>
                                                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Order ID</p>
                                                        <p className="text-xs font-mono font-medium">{order._id}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Total</p>
                                                        <p className="text-sm font-semibold">₹{order.totalPrice}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Status</p>
                                                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                                                            order.status === 'Cancelled' ? 'bg-red-100 text-red-600' : 
                                                            order.status === 'Delivered' ? 'bg-green-100 text-green-600' : 'bg-primary/10 text-primary'
                                                        }`}>
                                                            {order.status}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="flex gap-4 mb-6 overflow-x-auto pb-2 scrollbar-none">
                                                    {order.orderItems.map((item: any, idx: number) => (
                                                        <div key={idx} className="flex items-center gap-3 bg-secondary/30 p-2 rounded-xl border border-border shrink-0">
                                                            <div className="w-12 h-16 rounded-lg overflow-hidden shrink-0">
                                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                            </div>
                                                            <div className="pr-4">
                                                                <p className="text-xs font-medium truncate max-w-[120px]">{item.name}</p>
                                                                <p className="text-[10px] text-muted-foreground">{item.color} / {item.size}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                {order.status !== 'Cancelled' && (
                                                    <div className="flex justify-end pt-4 border-t border-border">
                                                        <Button 
                                                            variant="ghost" 
                                                            size="sm" 
                                                            className="text-red-500 hover:text-red-600 hover:bg-red-50 h-8 text-[10px] uppercase tracking-widest rounded-lg gap-2"
                                                            onClick={() => handleCancelOrder(order._id)}
                                                        >
                                                            <XCircle size={14} />
                                                            Cancel Order
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'address' && (
                            <div>
                                <h1 className="editorial-heading text-3xl mb-8">My Address</h1>
                                <div className="p-10 bg-secondary/30 rounded-3xl border border-dashed border-border text-center">
                                    <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                                    <p className="text-muted-foreground">Address management coming soon.</p>
                                </div>
                            </div>
                        )}

                        {activeTab === 'wishlist' && (
                            <div>
                                <h1 className="editorial-heading text-3xl mb-8">My Wishlist</h1>
                                {wishlistItems.length === 0 ? (
                                    <div className="p-10 bg-secondary/30 rounded-3xl border border-dashed border-border text-center">
                                        <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                                        <p className="text-muted-foreground">Your wishlist is empty.</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {wishlistItems.map((product) => (
                                            <div key={product.id} className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                                <Link to={`/product/${product.id}`} className="block aspect-[3/4] bg-secondary overflow-hidden">
                                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                                </Link>
                                                <div className="p-4">
                                                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{product.brand}</p>
                                                    <Link to={`/product/${product.id}`}>
                                                        <h3 className="text-sm font-medium mb-2 hover:text-primary transition-colors">{product.name}</h3>
                                                    </Link>
                                                    <p className="text-sm font-semibold mb-3">₹{product.price}</p>
                                                    <div className="flex gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="flex-1 text-xs"
                                                            asChild
                                                        >
                                                            <Link to={`/product/${product.id}`}>View</Link>
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                                            onClick={() => removeFromWishlist(product.id)}
                                                        >
                                                            <XCircle size={16} />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </main>
            
            <Footer />
        </div>
    );
};

export default Profile;
