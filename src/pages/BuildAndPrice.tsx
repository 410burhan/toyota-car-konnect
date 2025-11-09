import { Header } from "@/components/Header";
import { ChatBot } from "@/components/ChatBot";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Check, Palette, Settings, Package } from "lucide-react";
import { cars, Car } from "@/data/cars";
import heroCamry from "@/assets/hero-camry.jpg";
import rav4Hybrid from "@/assets/rav4-hybrid.jpg";
import tacomaTruck from "@/assets/tacoma-truck.jpg";

const BuildAndPrice = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const vehicleParam = searchParams.get("vehicle") || "camry";


  type carRecords = Record<string, Car>;
  const vehicles: carRecords = cars.reduce((acc, car) => {
    acc[car.id] = car;
    return acc;
  }, {} as carRecords);
  const vehicle = vehicles[vehicleParam] || vehicles.camry;
  
  console.log("vehicleParam:", vehicleParam);
  console.log("vehicles keys:", Object.keys(vehicles));
  console.log("lookup:", vehicles[vehicleParam]);

  const [selectedTrim, setSelectedTrim] = useState("LE");
  const [selectedColor, setSelectedColor] = useState("Silver");
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);

  const trims = [
    { name: "LE", price: 0, features: ["LED Headlights", "Toyota Safety Sense", "8-inch Display"] },
    { name: "SE", price: 2500, features: ["Sport Styling", "18-inch Wheels", "Paddle Shifters"] },
    { name: "XSE", price: 4800, features: ["Leather Seats", "Moonroof", "Premium Audio"] },
  ];

  const colors = [
    { name: "Silver", code: "#C0C0C0" },
    { name: "Black", code: "#000000" },
    { name: "White", code: "#FFFFFF" },
    { name: "Red", code: "#CC0000" },
    { name: "Blue", code: "#1E40AF" },
  ];

  const packages = [
    { name: "Technology Package", price: 1500, items: ["Navigation", "Premium Display", "Wireless Charging"] },
    { name: "Comfort Package", price: 1200, items: ["Heated Seats", "Power Seats", "Auto Climate"] },
    { name: "Safety Package", price: 800, items: ["Blind Spot Monitor", "Rear Cross Traffic", "Parking Sensors"] },
  ];

  const getTrimPrice = () => trims.find(t => t.name === selectedTrim)?.price || 0;
  const getPackagesPrice = () => selectedPackages.reduce((sum, pkg) => {
    const found = packages.find(p => p.name === pkg);
    return sum + (found?.price || 0);
  }, 0);

  const totalPrice = Number(vehicle.price) + getTrimPrice() + getPackagesPrice();

  const togglePackage = (pkgName: string) => {
    setSelectedPackages(prev => 
      prev.includes(pkgName) ? prev.filter(p => p !== pkgName) : [...prev, pkgName]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ChatBot />
      
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            className="mb-6"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>

          <div className="grid lg:grid-cols-2 gap-8">
            {}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">
                  Build Your {vehicle.name}
                </h1>
                <p className="text-muted-foreground">
                  Customize your perfect {vehicle.type.toLowerCase()} with options that match your style.
                </p>
              </div>

              <Card className="p-6 bg-gradient-card shadow-md">
                <div className="space-y-6">
                  {}
                  <div className="bg-gradient-hero text-white p-6 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm opacity-90">Your Price</p>
                        <p className="text-4xl font-bold">${totalPrice.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm opacity-90">Est. Monthly</p>
                        <p className="text-2xl font-semibold">${Math.round(totalPrice / 60)}/mo</p>
                      </div>
                    </div>
                  </div>

                  {}
                  <Tabs defaultValue="trim" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="trim">
                        <Settings className="mr-2 h-4 w-4" />
                        Trim
                      </TabsTrigger>
                      <TabsTrigger value="color">
                        <Palette className="mr-2 h-4 w-4" />
                        Color
                      </TabsTrigger>
                      <TabsTrigger value="packages">
                        <Package className="mr-2 h-4 w-4" />
                        Packages
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="trim" className="space-y-4 mt-6">
                      {trims.map((trim) => (
                        <Card
                          key={trim.name}
                          className={`p-4 cursor-pointer transition-all ${
                            selectedTrim === trim.name 
                              ? "border-primary border-2 bg-primary/5" 
                              : "border-border hover:border-primary/50"
                          }`}
                          onClick={() => setSelectedTrim(trim.name)}
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-bold text-lg">{trim.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {trim.price === 0 ? "Base model" : `+$${trim.price.toLocaleString()}`}
                              </p>
                            </div>
                            {selectedTrim === trim.name && (
                              <Badge className="bg-primary">
                                <Check className="w-3 h-3 mr-1" />
                                Selected
                              </Badge>
                            )}
                          </div>
                          <ul className="space-y-1">
                            {trim.features.map((feature) => (
                              <li key={feature} className="text-sm text-muted-foreground flex items-center">
                                <Check className="w-3 h-3 text-primary mr-2" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </Card>
                      ))}
                    </TabsContent>

                    <TabsContent value="color" className="mt-6">
                      <div className="grid grid-cols-5 gap-4">
                        {colors.map((color) => (
                          <button
                            key={color.name}
                            onClick={() => setSelectedColor(color.name)}
                            className={`relative rounded-lg p-1 transition-all ${
                              selectedColor === color.name 
                                ? "ring-4 ring-primary" 
                                : "ring-2 ring-border hover:ring-primary/50"
                            }`}
                          >
                            <div 
                              className="w-full h-16 rounded-md"
                              style={{ backgroundColor: color.code }}
                            />
                            <p className="text-xs mt-2 text-center font-medium">{color.name}</p>
                            {selectedColor === color.name && (
                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <Check className="w-6 h-6 text-white drop-shadow-lg" />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="packages" className="space-y-4 mt-6">
                      {packages.map((pkg) => (
                        <Card
                          key={pkg.name}
                          className={`p-4 cursor-pointer transition-all ${
                            selectedPackages.includes(pkg.name)
                              ? "border-primary border-2 bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                          onClick={() => togglePackage(pkg.name)}
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-bold">{pkg.name}</h3>
                              <p className="text-sm text-muted-foreground">+${pkg.price.toLocaleString()}</p>
                            </div>
                            {selectedPackages.includes(pkg.name) && (
                              <Badge className="bg-primary">
                                <Check className="w-3 h-3 mr-1" />
                                Added
                              </Badge>
                            )}
                          </div>
                          <ul className="space-y-1">
                            {pkg.items.map((item) => (
                              <li key={item} className="text-sm text-muted-foreground flex items-center">
                                <Check className="w-3 h-3 text-primary mr-2" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </Card>
                      ))}
                    </TabsContent>
                  </Tabs>

                  <div className="flex gap-3 pt-4">
                    <Button 
                      className="flex-1" 
                      size="lg"
                      onClick={() => navigate("/finance-budget")}
                    >
                      Get Financing Options
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1" 
                      size="lg"
                      onClick={() => navigate("/?section=compare")}
                    >
                      Compare Models
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            {}
            <div className="lg:sticky lg:top-24 h-fit">
              <Card className="overflow-hidden shadow-lg">
                <div className="relative">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-[500px] object-cover"
                  />
                  {vehicle.isHybrid && (
                    <Badge className="absolute top-4 right-4 bg-gradient-electric text-white border-0">
                      Hybrid
                    </Badge>
                  )}
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground uppercase tracking-wider">{vehicle.type}</p>
                    <h2 className="text-3xl font-bold text-foreground">{vehicle.name}</h2>
                    <p className="text-muted-foreground mt-2">
                      {selectedTrim} • {selectedColor}
                      {selectedPackages.length > 0 && ` • ${selectedPackages.length} package${selectedPackages.length > 1 ? 's' : ''}`}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                    <div>
                      <p className="text-xs text-muted-foreground">Est. MPG</p>
                      <p className="text-2xl font-bold text-primary">{vehicle.mpg}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Seating</p>
                      <p className="text-2xl font-bold">5</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Type</p>
                      <p className="text-lg font-semibold">{vehicle.type}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildAndPrice;
