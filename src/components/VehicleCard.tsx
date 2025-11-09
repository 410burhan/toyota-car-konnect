import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Car }  from "@/data/cars";


export const VehicleCard = ({id, name, image, price, mpg, isHybrid, type}: Car) => {
  const navigate = useNavigate();
  
  const getSlug = () => id;


  return (
    <Card className="group overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-card">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {isHybrid && (
          <Badge className="absolute top-4 right-4 bg-gradient-electric text-white border-0">
            <Zap className="w-3 h-3 mr-1" />
            Hybrid
          </Badge>
        )}
      </div>
      
      <div className="p-6 space-y-4">
        <div>
          <p className="text-sm text-muted-foreground uppercase tracking-wider">{type}</p>
          <h3 className="text-2xl font-bold text-foreground mt-1">{name}</h3>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div>
            <p className="text-muted-foreground">Starting at</p>
            <p className="text-xl font-bold text-primary">${Number(price).toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-muted-foreground">Est. MPG</p>
            <p className="text-xl font-bold text-foreground">{mpg}</p>
          </div>
        </div>
        
        <div className="flex gap-2 pt-2">
          <Button 
            className="flex-1 group/btn"
            onClick={() => navigate(`/build-and-price?vehicle=${getSlug()}`)}
          >
            Build & Price
            <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => navigate("/?section=compare")}
          >
            Compare
          </Button>
        </div>
      </div>
    </Card>
  );
};
