import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ComparisonTool = () => {
  const navigate = useNavigate();
  
  const comparison = [
    {
      name: "Camry Hybrid",
      price: "$29,800",
      mpg: "52",
      horsepower: "208",
      seating: "5",
      features: ["Hybrid Synergy Drive", "Toyota Safety Sense", "Apple CarPlay"],
      isHybrid: true,
    },
    {
      name: "RAV4 Hybrid",
      price: "$33,800",
      mpg: "40",
      horsepower: "219",
      seating: "5",
      features: ["AWD", "Hybrid Synergy Drive", "Smart Key System"],
      isHybrid: true,
    },
    {
      name: "Tacoma",
      price: "$31,900",
      mpg: "20",
      horsepower: "278",
      seating: "5",
      features: ["4x4", "Towing Package", "Multi-Terrain Select"],
      isHybrid: false,
    },
  ];

  const specs = [
    { label: "Starting Price", key: "price" },
    { label: "Est. MPG", key: "mpg" },
    { label: "Horsepower", key: "horsepower" },
    { label: "Seating", key: "seating" },
  ];

  return (
    <section id="compare" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Smart Comparison Tool
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Compare specs, features, and pricing side-by-side to make the perfect choice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {comparison.map((vehicle) => (
            <Card key={vehicle.name} className="overflow-hidden shadow-md">
              <div className="relative bg-gradient-card p-6 pb-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-foreground">{vehicle.name}</h3>
                  {vehicle.isHybrid && (
                    <Badge className="bg-gradient-electric text-white border-0">
                      <Zap className="w-3 h-3 mr-1" />
                      Hybrid
                    </Badge>
                  )}
                </div>
              </div>

              <div className="p-6 space-y-4">
                {specs.map((spec) => (
                  <div key={spec.key} className="flex justify-between items-center border-b border-border pb-2">
                    <span className="text-sm text-muted-foreground">{spec.label}</span>
                    <span className="font-semibold text-foreground">
                      {vehicle[spec.key as keyof typeof vehicle]}
                    </span>
                  </div>
                ))}

                <div className="pt-4">
                  <p className="text-sm font-semibold text-foreground mb-3">Key Features</p>
                  <ul className="space-y-2">
                    {vehicle.features.map((feature) => (
                      <li key={feature} className="flex items-start text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  className="w-full mt-6"
                  onClick={() => {
                    const slug = vehicle.name.toLowerCase().replace(/\s+/g, "-");
                    navigate(`/build-and-price?vehicle=${slug}`);
                  }}
                >
                  Select & Configure
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Add More Vehicles to Compare
          </Button>
        </div>
      </div>
    </section>
  );
};
