import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FaboraHeader from "@/components/FaboraHeader";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Github, Chrome, Loader2 } from "lucide-react";
import loginIllustrationDark from "@/assets/login-illustration-dark.png";
import mylogo from "@/assets/mylogo.png";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [email, setEmail] = useState("Admin@gmail.com");
  const [password, setPassword] = useState("Admin1234");
  const [name, setName] = useState("");

  const { login, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
        const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";
        const body = isLogin ? { email, password } : { name, email, password };

        const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        if (response.ok) {
            login(data);
            toast({
                title: isLogin ? "Welcome back!" : "Account created!",
                description: isLogin ? "Successfully logged in." : "You can now start shopping.",
            });
            navigate("/");
        } else {
            toast({
                title: "Authentication Error",
                description: data.message || "Something went wrong. Please try again.",
                variant: "destructive",
            });
        }
    } catch (error) {
        toast({
            title: "Network Error",
            description: "Could not connect to the server. Check your connection.",
            variant: "destructive",
        });
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111812] flex items-center justify-center md:justify-end p-4 md:p-12 lg:p-20 xl:p-28 relative overflow-hidden font-sans">
      <FaboraHeader />
      
      {/* Background Illustration Area */}
      <div className="absolute left-0 top-0 w-full md:w-[65%] h-full flex flex-col items-center justify-center p-8 lg:p-20 z-0">
        <div className="relative w-full h-full max-w-2xl flex items-center justify-center mt-20 md:mt-0 lg:translate-y-6">
          <img 
            src={loginIllustrationDark} 
            alt="Shopping Illustration" 
            className="w-full h-auto object-contain transition-transform duration-1000 hover:scale-[1.03]"
          />
          {/* Clock decoration similar to messimo */}
          <div className="absolute top-0 md:top-10 right-0 md:right-10 w-14 h-14 rounded-full border-2 border-white/5 bg-white/5 backdrop-blur-2xl flex items-center justify-center">
            <div className="w-0.5 h-3.5 bg-white/30 absolute top-3 origin-bottom rotate-45" />
            <div className="w-0.5 h-2.5 bg-white/30 absolute top-4 origin-bottom -rotate-45" />
            <div className="w-1.5 h-1.5 bg-white/50 rounded-full z-10" />
          </div>
        </div>
        
        {/* Decorative ambient elements */}
        <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-primary/10 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[15%] w-80 h-80 bg-emerald-900/20 rounded-full blur-[160px] animate-pulse" style={{ animationDelay: '3s' }} />
      </div>

      {/* The floating form card on the right */}
      <div className="relative z-10 w-full max-w-[480px] h-full flex items-center">
        <div className="w-full bg-white rounded-[3rem] p-8 md:p-10 lg:p-14 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] border border-white/5 relative transition-all duration-700">
          
          <div className="w-full space-y-8">
            {/* Logo & Header */}
            <div className="text-center">
              <Link to="/" className="inline-block mb-6 group">
                <img src={mylogo} alt="Fabora" className="h-7 object-contain transition-transform group-hover:scale-105" />
              </Link>
              <h1 className="text-[2.5rem] font-semibold tracking-tight text-[#1a1a1a] mb-1.5 leading-[1.1]">
                {isLogin ? "Welcome back" : "Create account"}
              </h1>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {!isLogin && (
                <div className="space-y-1">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    className="w-full bg-white border-2 border-[#f5f5f5] rounded-2xl py-3.5 px-6 text-[0.95rem] outline-none transition-all focus:border-emerald-500/30 focus:ring-4 focus:ring-emerald-500/5 placeholder:text-gray-300"
                    required
                  />
                </div>
              )}

              <div className="space-y-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full bg-white border-2 border-[#f5f5f5] rounded-2xl py-3.5 px-6 text-[0.95rem] outline-none transition-all focus:border-emerald-500/30 focus:ring-4 focus:ring-emerald-500/5 placeholder:text-gray-300"
                  required
                />
              </div>

              <div className="space-y-1 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full bg-white border-2 border-[#f5f5f5] rounded-2xl py-3.5 px-6 text-[0.95rem] outline-none transition-all focus:border-emerald-500/30 focus:ring-4 focus:ring-emerald-500/5 placeholder:text-gray-300"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 p-2 text-gray-300 hover:text-gray-500 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-[#add659] hover:bg-[#9cc44d] text-[#1a1a1a] font-bold py-7 rounded-2xl text-[1rem] shadow-lg shadow-[#add659]/10 transition-all border-none mt-6"
                disabled={loading}
              >
                {loading ? <Loader2 className="animate-spin mr-2" /> : (isLogin ? "Log in" : "Create account")}
              </Button>
            </form>

            {/* Social Login */}
            <div className="space-y-6">
              <div className="relative flex items-center justify-center">
                <span className="bg-white px-4 text-[0.7rem] text-gray-400 font-bold uppercase tracking-widest z-10 relative">or sign up with</span>
                <div className="absolute w-full h-[1px] bg-[#f0f0f0]" />
              </div>

              <div className="flex gap-4 justify-center">
                <button className="w-14 h-14 flex items-center justify-center rounded-xl bg-[#fafafa] border border-[#f0f0f0] hover:bg-white hover:shadow-sm transition-all focus:ring-2 focus:ring-emerald-500/10">
                  <Chrome className="w-5 h-5 text-gray-600" />
                </button>
                <button className="w-14 h-14 flex items-center justify-center rounded-xl bg-[#fafafa] border border-[#f0f0f0] hover:bg-white hover:shadow-sm transition-all focus:ring-2 focus:ring-emerald-500/10">
                  <Github className="w-5 h-5 text-gray-600" />
                </button>
                <button className="w-14 h-14 flex items-center justify-center rounded-xl bg-[#fafafa] border border-[#f0f0f0] hover:bg-white hover:shadow-sm transition-all focus:ring-2 focus:ring-emerald-500/10">
                  <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33V21.88C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Terms & Footer */}
            <div className="text-center pt-2">
              <p className="text-[0.75rem] text-gray-400 font-medium mb-8 leading-relaxed">
                By creating an account you agree to Fabora's{" "}
                <Link to="/" className="text-gray-500 hover:text-[#1a1a1a] underline underline-offset-4">Terms of Service</Link> and{" "}
                <Link to="/" className="text-gray-500 hover:text-[#1a1a1a] underline underline-offset-4">Privacy Policy</Link>.
              </p>

              <div className="flex items-center justify-center gap-2 text-[0.95rem]">
                <span className="text-gray-400 font-medium">{isLogin ? "Don't have an account?" : "Have an account?"}</span>
                <button
                  onClick={toggleForm}
                  className="text-emerald-700 font-bold hover:underline underline-offset-4"
                >
                  {isLogin ? "Sign up" : "Log in"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
