import { VehicleCard } from "./VehicleCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cars, Car } from "@/data/cars";
import heroCamry from "@/assets/hero-camry.jpg";
import rav4Hybrid from "@/assets/rav4-hybrid.jpg";
import tacomaTruck from "@/assets/tacoma-truck.jpg";


export const VehicleShowcase = () => {
// ...existing code...
  // dynamically group cars from /src/data/cars
  const categoryMap: Record<string, string> = {
    Sedan: "sedans",
    SUV: "suvs",
    Truck: "trucks",
  };

  type Vehicle = (typeof cars)[number];

  const vehicles = cars.reduce<Record<string, Car[]>>((acc, car) => {
    const key = car.type.toLowerCase() + "s"; 
    if (!acc[key]) acc[key] = []; // initialize if missing
    acc[key].push(car); // add car to the category
    return acc;
  }, {} as Record<string, Car[]>); // start with an empty object

  const categories = Object.keys(vehicles);

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
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-4 mb-8">
            {categories.map((cat) => (
              <TabsTrigger key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)} {/* Capitalize */}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="sedans" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {vehicles.sedans.map((vehicle) => (
                <VehicleCard key={vehicle.name} {...vehicle} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="coupes" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {vehicles.coupes.map((vehicle) => (
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
