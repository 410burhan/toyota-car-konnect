import { VehicleCard } from "./VehicleCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import heroCamry from "@/assets/hero-camry.jpg";
import rav4Hybrid from "@/assets/rav4-hybrid.jpg";
import tacomaTruck from "@/assets/tacoma-truck.jpg";

export const VehicleShowcase = () => {
  const vehicles = {
    sedans: [
      {
        name: "Camry",
        type: "Sedan",
        image: heroCamry,
        price: "$28,400",
        mpg: "32",
        isHybrid: false,
      },
      {
        name: "Camry Hybrid",
        type: "Sedan",
        image: heroCamry,
        price: "$29,800",
        mpg: "52",
        isHybrid: true,
      },
    ],
    suvs: [
      {
        name: "RAV4 Hybrid",
        type: "SUV",
        image: rav4Hybrid,
        price: "$33,800",
        mpg: "40",
        isHybrid: true,
      },
      {
        name: "Highlander",
        type: "SUV",
        image: rav4Hybrid,
        price: "$38,500",
        mpg: "24",
        isHybrid: false,
      },
    ],
    trucks: [
      {
        name: "Tacoma",
        type: "Truck",
        image: tacomaTruck,
        price: "$31,900",
        mpg: "20",
        isHybrid: false,
      },
      {
        name: "Tundra",
        type: "Truck",
        image: tacomaTruck,
        price: "$42,500",
        mpg: "19",
        isHybrid: false,
      },
    ],
  };

  return (
    <section id="vehicles" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Explore Our Lineup
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find the perfect Toyota that matches your lifestyle, budget, and values.
          </p>
        </div>

        <Tabs defaultValue="sedans" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="sedans">Sedans</TabsTrigger>
            <TabsTrigger value="suvs">SUVs</TabsTrigger>
            <TabsTrigger value="trucks">Trucks</TabsTrigger>
          </TabsList>

          <TabsContent value="sedans" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {vehicles.sedans.map((vehicle) => (
                <VehicleCard key={vehicle.name} {...vehicle} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="suvs" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {vehicles.suvs.map((vehicle) => (
                <VehicleCard key={vehicle.name} {...vehicle} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trucks" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {vehicles.trucks.map((vehicle) => (
                <VehicleCard key={vehicle.name} {...vehicle} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
