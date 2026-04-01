import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Button } from '@/components/ui/button';
import { Package, Lock, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminLogin = () => {
    const [email, setEmail] = useState('Admin@gmail.com');
    const [password, setPassword] = useState('Admin1234');
    const [loading, setLoading] = useState(false);
    const { login, admin } = useAdminAuth();
    const navigate = useNavigate();
    const { toast } = useToast();

    // Redirect if already logged in
    React.useEffect(() => {
        if (admin) {
            navigate('/admin/dashboard');
        }
    }, [admin, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const success = await login(email, password);
        
        if (success) {
            toast({
                title: "Welcome Admin",
                description: "Successfully logged in to admin dashboard.",
            });
            navigate('/admin/dashboard');
        } else {
            toast({
                title: "Login Failed",
                description: "Invalid admin credentials.",
                variant: "destructive",
            });
        }
        
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-background font-sans flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                <div className="text-center mb-12">
                    <div className="w-20 h-20 bg-foreground/5 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Package className="w-10 h-10 text-foreground" />
                    </div>
                    <h1 className="editorial-heading text-3xl mb-2">Admin Portal</h1>
                    <p className="text-sm text-muted-foreground">FABORA Fashion Store Management</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border-b border-border py-3 text-sm outline-none focus:border-foreground transition-colors bg-transparent"
                            placeholder="admin@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border-b border-border py-3 text-sm outline-none focus:border-foreground transition-colors bg-transparent pr-10"
                                placeholder="••••••••"
                                required
                            />
                            <Lock className="w-4 h-4 text-muted-foreground absolute right-0 top-1/2 -translate-y-1/2" />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        variant="editorial"
                        size="lg"
                        className="w-full h-14 rounded-2xl text-xs uppercase tracking-widest mt-8"
                        disabled={loading}
                    >
                        {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        ) : (
                            "Sign In"
                        )}
                    </Button>
                </form>

                <p className="text-center text-xs text-muted-foreground mt-8">
                    Default: Admin@gmail.com / Admin1234
                </p>
            </div>
        </div>
    );
};

export default AdminLogin;
