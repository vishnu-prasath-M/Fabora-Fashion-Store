import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Upload, Plus, X, Loader2, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Color {
    name: string;
    hex: string;
}

interface Product {
    _id: string;
    name: string;
    price: number;
    category: string;
    description: string;
    brand: string;
    countInStock: number;
    sizes: string[];
    colors: Color[];
    image: string;
}

const EditProduct = () => {
    const { id } = useParams<{ id: string }>();
    const { admin } = useAdminAuth();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: 'Men',
        description: '',
        brand: 'MAISON',
        countInStock: '',
        sizes: [] as string[],
        colors: [] as Color[],
        image: '',
    });

    const [newSize, setNewSize] = useState('');
    const [newColor, setNewColor] = useState({ name: '', hex: '#000000' });

    const categories = ['Men', 'Women', 'Kids', 'Accessories'];
    const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '28', '30', '32', '34', '36'];

    // Redirect if not logged in
    useEffect(() => {
        if (!admin) {
            navigate('/admin');
        }
    }, [admin, navigate]);

    // Fetch product data
    useEffect(() => {
        if (id && admin) {
            fetchProduct();
        }
    }, [id, admin]);

    const fetchProduct = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`);
            if (response.ok) {
                const product: Product = await response.json();
                setFormData({
                    name: product.name,
                    price: product.price.toString(),
                    category: product.category,
                    description: product.description,
                    brand: product.brand,
                    countInStock: product.countInStock.toString(),
                    sizes: product.sizes || [],
                    colors: product.colors || [],
                    image: product.image,
                });
                setImagePreview(product.image);
            } else {
                toast({
                    title: "Error",
                    description: "Failed to load product.",
                    variant: "destructive",
                });
                navigate('/admin/dashboard');
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to load product.",
                variant: "destructive",
            });
            navigate('/admin/dashboard');
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setImagePreview(base64String);
                setFormData({ ...formData, image: base64String });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddSize = () => {
        if (newSize && !formData.sizes.includes(newSize)) {
            setFormData({ ...formData, sizes: [...formData.sizes, newSize] });
            setNewSize('');
        }
    };

    const handleRemoveSize = (size: string) => {
        setFormData({ ...formData, sizes: formData.sizes.filter(s => s !== size) });
    };

    const handleAddColor = () => {
        if (newColor.name && !formData.colors.find(c => c.name === newColor.name)) {
            setFormData({ ...formData, colors: [...formData.colors, { ...newColor }] });
            setNewColor({ name: '', hex: '#000000' });
        }
    };

    const handleRemoveColor = (colorName: string) => {
        setFormData({ ...formData, colors: formData.colors.filter(c => c.name !== colorName) });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.image) {
            toast({
                title: "Image Required",
                description: "Please upload a product image.",
                variant: "destructive",
            });
            return;
        }

        setSaving(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${admin?.token}`,
                },
                body: JSON.stringify({
                    name: formData.name,
                    price: Number(formData.price),
                    category: formData.category,
                    description: formData.description,
                    brand: formData.brand,
                    sizes: formData.sizes,
                    colors: formData.colors,
                    image: formData.image,
                    altImage: formData.image,
                    countInStock: Number(formData.countInStock),
                }),
            });

            if (response.ok) {
                toast({
                    title: "Product Updated",
                    description: "Product has been successfully updated.",
                });
                navigate('/admin/dashboard');
            } else {
                const error = await response.json();
                toast({
                    title: "Error",
                    description: error.message || "Failed to update product.",
                    variant: "destructive",
                });
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update product.",
                variant: "destructive",
            });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background font-sans flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (!admin) return null;

    return (
        <div className="min-h-screen bg-background font-sans">
            {/* Header */}
            <header className="border-b border-border bg-white sticky top-0 z-50">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
                    <button 
                        onClick={() => navigate('/admin/dashboard')}
                        className="p-2 hover:bg-secondary rounded-xl transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-lg font-medium">Edit Product</h1>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-6 py-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Image Upload */}
                    <div className="bg-white rounded-2xl p-6 border border-border">
                        <h2 className="text-sm font-medium mb-4 uppercase tracking-wider">Product Image</h2>
                        <div className="flex items-center gap-6">
                            <div className="w-32 h-40 bg-secondary rounded-xl overflow-hidden border border-border">
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                        <Upload className="w-8 h-8" />
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="block">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg text-sm cursor-pointer hover:bg-secondary/80 transition-colors">
                                        <Upload className="w-4 h-4" />
                                        Change Image
                                    </span>
                                </label>
                                <p className="text-xs text-muted-foreground mt-2">
                                    Upload from your computer. Max 5MB.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Basic Info */}
                    <div className="bg-white rounded-2xl p-6 border border-border space-y-6">
                        <h2 className="text-sm font-medium uppercase tracking-wider">Basic Information</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                                    Product Name *
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full border-b border-border py-2 text-sm outline-none focus:border-foreground transition-colors bg-transparent"
                                    placeholder="e.g., Cashmere Crew Sweater"
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                                    Price (₹) *
                                </label>
                                <input
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    className="w-full border-b border-border py-2 text-sm outline-none focus:border-foreground transition-colors bg-transparent"
                                    placeholder="e.g., 899"
                                    required
                                    min="0"
                                />
                            </div>

                            <div>
                                <label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                                    Category *
                                </label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full border-b border-border py-2 text-sm outline-none focus:border-foreground transition-colors bg-transparent"
                                    required
                                >
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                                    Brand
                                </label>
                                <input
                                    type="text"
                                    value={formData.brand}
                                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                                    className="w-full border-b border-border py-2 text-sm outline-none focus:border-foreground transition-colors bg-transparent"
                                    placeholder="e.g., MAISON"
                                />
                            </div>

                            <div>
                                <label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                                    Stock Quantity *
                                </label>
                                <input
                                    type="number"
                                    value={formData.countInStock}
                                    onChange={(e) => setFormData({ ...formData, countInStock: e.target.value })}
                                    className="w-full border-b border-border py-2 text-sm outline-none focus:border-foreground transition-colors bg-transparent"
                                    required
                                    min="0"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                                Description *
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full border-b border-border py-2 text-sm outline-none focus:border-foreground transition-colors bg-transparent resize-none"
                                rows={3}
                                placeholder="Describe the product..."
                                required
                            />
                        </div>
                    </div>

                    {/* Sizes */}
                    <div className="bg-white rounded-2xl p-6 border border-border">
                        <h2 className="text-sm font-medium mb-4 uppercase tracking-wider">Available Sizes</h2>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {formData.sizes.map((size) => (
                                <span
                                    key={size}
                                    className="inline-flex items-center gap-1 px-3 py-1 bg-secondary rounded-full text-sm"
                                >
                                    {size}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveSize(size)}
                                        className="text-muted-foreground hover:text-red-500"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <select
                                value={newSize}
                                onChange={(e) => setNewSize(e.target.value)}
                                className="flex-1 border-b border-border py-2 text-sm outline-none focus:border-foreground transition-colors bg-transparent"
                            >
                                <option value="">Select size</option>
                                {sizeOptions.filter(s => !formData.sizes.includes(s)).map(size => (
                                    <option key={size} value={size}>{size}</option>
                                ))}
                            </select>
                            <Button type="button" variant="outline" size="sm" onClick={handleAddSize}>
                                <Plus className="w-4 h-4 mr-1" />
                                Add
                            </Button>
                        </div>
                    </div>

                    {/* Colors */}
                    <div className="bg-white rounded-2xl p-6 border border-border">
                        <h2 className="text-sm font-medium mb-4 uppercase tracking-wider">Available Colors</h2>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {formData.colors.map((color) => (
                                <span
                                    key={color.name}
                                    className="inline-flex items-center gap-2 px-3 py-1 bg-secondary rounded-full text-sm"
                                >
                                    <span
                                        className="w-4 h-4 rounded-full border border-border"
                                        style={{ backgroundColor: color.hex }}
                                    />
                                    {color.name}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveColor(color.name)}
                                        className="text-muted-foreground hover:text-red-500"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            ))}
                        </div>
                        <div className="flex gap-2 items-end">
                            <div className="flex-1">
                                <input
                                    type="text"
                                    value={newColor.name}
                                    onChange={(e) => setNewColor({ ...newColor, name: e.target.value })}
                                    className="w-full border-b border-border py-2 text-sm outline-none focus:border-foreground transition-colors bg-transparent"
                                    placeholder="Color name (e.g., Black)"
                                />
                            </div>
                            <div>
                                <input
                                    type="color"
                                    value={newColor.hex}
                                    onChange={(e) => setNewColor({ ...newColor, hex: e.target.value })}
                                    className="w-10 h-10 p-0 border-0 rounded-lg cursor-pointer"
                                />
                            </div>
                            <Button type="button" variant="outline" size="sm" onClick={handleAddColor}>
                                <Plus className="w-4 h-4 mr-1" />
                                Add
                            </Button>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4">
                        <Button
                            type="submit"
                            variant="editorial"
                            size="lg"
                            className="flex-1 h-14 rounded-2xl text-xs uppercase tracking-widest"
                            disabled={saving}
                        >
                            {saving ? (
                                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                            ) : (
                                <>
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Changes
                                </>
                            )}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            size="lg"
                            className="h-14 px-8 rounded-2xl"
                            onClick={() => navigate('/admin/dashboard')}
                            disabled={saving}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;
