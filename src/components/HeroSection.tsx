import { Button } from "@/components/ui/button";
import { ChevronRight, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroCamry from "@/assets/hero-camry.jpg";

export const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {}
      <div className="absolute inset-0">
        <img
          src={heroCamry}
          alt="Toyota Camry"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      </div>

      {}
      <div className="relative h-full container mx-auto px-4 flex items-center">
        <div className="max-w-2xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="inline-block">
            <span className="text-accent font-semibold text-sm tracking-wider uppercase">
              New 2025 Camry
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Confidence
            <br />
            in Motion
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 max-w-xl">
            Experience the perfect blend of performance, efficiency, and style with Toyota's latest innovation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-red group"
              onClick={() => navigate("/build-and-price?vehicle=camry")}
            >
              Build & Price
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
              onClick={() => document.getElementById("vehicles")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Play className="mr-2 h-5 w-5" />
              Explore Vehicles
            </Button>
          </div>
        </div>
      </div>

      {}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};
