import { Button } from "@/components/ui/button";
import { Search, User, Menu } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <button onClick={() => navigate("/")} className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors">
              TOYOTA
            </button>
            <nav className="hidden md:flex space-x-6">
              <button onClick={() => scrollToSection("vehicles")} className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Vehicles
              </button>
              <button onClick={() => navigate("/build-and-price?vehicle=camry-hybrid")} className="text-sm font-medium text-foreground hover:text-accent transition-colors">
                Hybrid & Electric
              </button>
              <button onClick={() => scrollToSection("compare")} className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Compare
              </button>
              <button onClick={() => scrollToSection("financing")} className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Financing
              </button>
            </nav>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <User className="h-5 w-5" />
            </Button>
            <Button 
              variant="default" 
              className="hidden md:flex"
              onClick={() => navigate("/finance-budget")}
            >
              Find Your Match
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-3">
            <button onClick={() => scrollToSection("vehicles")} className="block w-full text-left text-sm font-medium text-foreground hover:text-primary transition-colors">
              Vehicles
            </button>
            <button onClick={() => navigate("/build-and-price?vehicle=camry-hybrid")} className="block w-full text-left text-sm font-medium text-foreground hover:text-accent transition-colors">
              Hybrid & Electric
            </button>
            <button onClick={() => scrollToSection("compare")} className="block w-full text-left text-sm font-medium text-foreground hover:text-primary transition-colors">
              Compare
            </button>
            <button onClick={() => scrollToSection("financing")} className="block w-full text-left text-sm font-medium text-foreground hover:text-primary transition-colors">
              Financing
            </button>
            <Button onClick={() => navigate("/finance-budget")} className="w-full">
              Find Your Match
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};
