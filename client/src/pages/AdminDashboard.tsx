import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Button } from '@/components/ui/button';
import { 
    Package, 
    Grid3X3, 
    LogOut, 
    Plus, 
    Trash2, 
    Edit2,
    Loader2,
    TrendingUp,
    DollarSign
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Stats {
    totalProducts: number;
    totalCategories: number;
    productsByCategory: { _id: string; count: number }[];
    categories: string[];
}

interface Product {
    _id: string;
    name: string;
    price: number;
    category: string;
    image: string;
    countInStock: number;
}

const AdminDashboard = () => {
    const { admin, logout, loading } = useAdminAuth();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [stats, setStats] = useState<Stats | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [pageLoading, setPageLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'dashboard' | 'products'>('dashboard');
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        // Wait for auth context to finish loading
        if (loading) return;
        
        // Check if admin is logged in
        if (!admin) {
            navigate('/admin', { replace: true });
        }
        
        setIsChecking(false);
    }, [admin, navigate, loading]);

    useEffect(() => {
        if (admin && !isChecking) {
            fetchStats();
            fetchProducts();
        }
    }, [admin, isChecking]);

    const fetchStats = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/stats`, {
                headers: {
                    Authorization: `Bearer ${admin?.token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setStats(data);
            }
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/products`, {
                headers: {
                    Authorization: `Bearer ${admin?.token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setProducts(data);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setPageLoading(false);
        }
    };

    const handleDeleteProduct = async (id: string) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/products/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${admin?.token}`,
                },
            });

            if (response.ok) {
                toast({
                    title: "Product Deleted",
                    description: "Product has been removed successfully.",
                });
                fetchProducts();
                fetchStats();
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete product.",
                variant: "destructive",
            });
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/admin');
    };

    // Block ALL rendering while checking auth status
    if (loading || isChecking) {
        return (
            <div className="min-h-screen bg-background font-sans flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    // If no admin, don't render anything (redirect is handled in useEffect)
    if (!admin) {
        return null;
    }

    return (
        <div className="min-h-screen bg-background font-sans">
            {/* Header */}
            <header className="border-b border-border bg-white sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-foreground/5 rounded-xl flex items-center justify-center">
                            <Package className="w-5 h-5 text-foreground" />
                        </div>
                        <div>
                            <h1 className="font-medium text-foreground">Admin Dashboard</h1>
                            <p className="text-xs text-muted-foreground">{admin.email}</p>
                        </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
                        <LogOut className="w-4 h-4" />
                        Logout
                    </Button>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Navigation Tabs */}
                <div className="flex gap-2 mb-8">
                    <button
                        onClick={() => setActiveTab('dashboard')}
                        className={`px-6 py-3 rounded-xl text-sm font-medium transition-all ${
                            activeTab === 'dashboard' 
                                ? 'bg-foreground text-white' 
                                : 'bg-secondary text-muted-foreground hover:text-foreground'
                        }`}
                    >
                        Dashboard
                    </button>
                    <button
                        onClick={() => setActiveTab('products')}
                        className={`px-6 py-3 rounded-xl text-sm font-medium transition-all ${
                            activeTab === 'products' 
                                ? 'bg-foreground text-white' 
                                : 'bg-secondary text-muted-foreground hover:text-foreground'
                        }`}
                    >
                        Products
                    </button>
                </div>

                {pageLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                    </div>
                ) : activeTab === 'dashboard' ? (
                    <>
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <div className="bg-white rounded-2xl p-6 border border-border">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                                        <Package className="w-5 h-5 text-emerald-600" />
                                    </div>
                                    <span className="text-sm text-muted-foreground">Total Products</span>
                                </div>
                                <p className="text-3xl font-bold">{stats?.totalProducts || 0}</p>
                            </div>

                            <div className="bg-white rounded-2xl p-6 border border-border">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                                        <Grid3X3 className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <span className="text-sm text-muted-foreground">Categories</span>
                                </div>
                                <p className="text-3xl font-bold">{stats?.totalCategories || 0}</p>
                            </div>

                            <div className="bg-white rounded-2xl p-6 border border-border">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                                        <TrendingUp className="w-5 h-5 text-amber-600" />
                                    </div>
                                    <span className="text-sm text-muted-foreground">Stock Items</span>
                                </div>
                                <p className="text-3xl font-bold">
                                    {products.reduce((acc, p) => acc + (p.countInStock || 0), 0)}
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl p-6 border border-border">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center">
                                        <DollarSign className="w-5 h-5 text-rose-600" />
                                    </div>
                                    <span className="text-sm text-muted-foreground">Avg Price</span>
                                </div>
                                <p className="text-3xl font-bold">
                                    ₹{products.length ? Math.round(products.reduce((acc, p) => acc + p.price, 0) / products.length) : 0}
                                </p>
                            </div>
                        </div>

                        {/* Categories Breakdown */}
                        <div className="bg-white rounded-2xl p-6 border border-border">
                            <h2 className="text-lg font-medium mb-6">Products by Category</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {stats?.productsByCategory.map((cat) => (
                                    <div key={cat._id} className="bg-secondary/50 rounded-xl p-4">
                                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{cat._id}</p>
                                        <p className="text-2xl font-bold">{cat.count}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="mt-8 flex gap-4">
                            <Button 
                                variant="editorial" 
                                size="lg"
                                onClick={() => navigate('/admin/add-product')}
                                className="gap-2"
                            >
                                <Plus className="w-5 h-5" />
                                Add New Product
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        {/* Products List */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-medium">All Products ({products.length})</h2>
                            <Button 
                                variant="editorial" 
                                size="sm"
                                onClick={() => navigate('/admin/add-product')}
                                className="gap-2"
                            >
                                <Plus className="w-4 h-4" />
                                Add Product
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {products.map((product) => (
                                <div key={product._id} className="bg-white rounded-2xl border border-border overflow-hidden group">
                                    <div className="aspect-[3/4] bg-secondary overflow-hidden">
                                        <img 
                                            src={product.image} 
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                                            {product.category}
                                        </p>
                                        <h3 className="font-medium text-sm mb-2 line-clamp-1">{product.name}</h3>
                                        <div className="flex items-center justify-between">
                                            <span className="font-semibold">₹{product.price}</span>
                                            <div className="flex gap-1">
                                                <button
                                                    onClick={() => navigate(`/admin/edit-product/${product._id}`)}
                                                    className="p-2 hover:bg-secondary rounded-lg transition-colors"
                                                >
                                                    <Edit2 className="w-4 h-4 text-muted-foreground" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteProduct(product._id)}
                                                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4 text-red-500" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
