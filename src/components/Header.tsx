import { Button } from "@/components/ui/button";
import { Search, User, Menu } from "lucide-react";
import { useState } from "react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-primary">TOYOTA</h1>
            <nav className="hidden md:flex space-x-6">
              <a href="#vehicles" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Vehicles
              </a>
              <a href="#hybrid" className="text-sm font-medium text-foreground hover:text-accent transition-colors">
                Hybrid & Electric
              </a>
              <a href="#compare" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Compare
              </a>
              <a href="#financing" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Financing
              </a>
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
            <Button variant="default" className="hidden md:flex">
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
            <a href="#vehicles" className="block text-sm font-medium text-foreground hover:text-primary transition-colors">
              Vehicles
            </a>
            <a href="#hybrid" className="block text-sm font-medium text-foreground hover:text-accent transition-colors">
              Hybrid & Electric
            </a>
            <a href="#compare" className="block text-sm font-medium text-foreground hover:text-primary transition-colors">
              Compare
            </a>
            <a href="#financing" className="block text-sm font-medium text-foreground hover:text-primary transition-colors">
              Financing
            </a>
          </nav>
        )}
      </div>
    </header>
  );
};
