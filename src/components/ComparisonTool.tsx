import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Zap } from "lucide-react";
import { cars, Car } from "@/data/cars";

export const ComparisonTool = () => {
  const navigate = useNavigate();

  // Display first 3 cars by default
  const [displayedCars, setDisplayedCars] = useState<Car[]>(cars.slice(0, 3));

  // Show/hide selector for additional vehicles
  const [showSelector, setShowSelector] = useState(false);

  // Track which car should have the burst animation
  const [highlightedCarId, setHighlightedCarId] = useState<string | null>(null);

  const specs = [
    { label: "Starting Price", key: "price" },
    { label: "Est. MPG", key: "mpg" },
    { label: "Horsepower", key: "horsepower" },
    { label: "Seating", key: "seating" },
  ];

  const handleSelectVehicle = (newCarId: string) => {
    const newCar = cars.find((c) => c.id === newCarId);
    if (!newCar) return;

    // Replace the 3rd car
    setDisplayedCars((prev) => [prev[0], prev[1], newCar]);

    // Trigger animation on new card
    setHighlightedCarId(newCar.id);
    setTimeout(() => setHighlightedCarId(null), 1000);
    

    setShowSelector(false);
  };

  return (
    <section id="compare" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Smart Comparison Tool
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Compare specs, features, and pricing side-by-side to make the perfect choice.
          </p>
        </div>

        {/* Display cars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayedCars.map((vehicle) => (
            <Card
              key={vehicle.id}
              className="overflow-hidden shadow-md relative" // important for overlay
            >
              {/* Gradient burst overlay */}
              {highlightedCarId === vehicle.id && (
                <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
                  <div className="w-full h-full rounded-lg bg-gradient-to-r from-red-400 via-yellow-300 to-red-400 opacity-50 blur-3xl animate-burst-scale"></div>
                </div>
              )}

              <div className="relative z-10 bg-gradient-card p-6 pb-8">
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

              <div className="p-6 space-y-4 relative z-10">
                {specs.map((spec) => (
                  <div
                    key={spec.key}
                    className="flex justify-between items-center border-b border-border pb-2"
                  >
                    <span className="text-sm text-muted-foreground">{spec.label}</span>
                    <span className="font-semibold text-foreground">
                      {vehicle[spec.key as keyof typeof vehicle] ?? "-"}
                    </span>
                  </div>
                ))}

                <div className="pt-4">
                  <p className="text-sm font-semibold text-foreground mb-3">
                    Key Features
                  </p>
                  <ul className="space-y-2">
                    {vehicle.features?.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start text-sm text-muted-foreground"
                      >
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

        {/* Add More Vehicles */}
        <div className="text-center mt-8">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setShowSelector(!showSelector)}
          >
            Add More Vehicles to Compare
          </Button>

          {showSelector && (
            <div className="mt-4 flex justify-center gap-4 flex-wrap">
              {cars
                .filter((car) => !displayedCars.some((v) => v.id === car.id))
                .map((car) => (
                  <Button
                    key={car.id}
                    onClick={() => handleSelectVehicle(car.id)}
                  >
                    {car.name}
                  </Button>
                ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
