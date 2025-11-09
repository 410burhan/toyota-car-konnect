import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { VehicleShowcase } from "@/components/VehicleShowcase";
import { ComparisonTool } from "@/components/ComparisonTool";
import { FinanceCalculator } from "@/components/FinanceCalculator";
import { ChatBot } from "@/components/ChatBot";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <VehicleShowcase />
        <ComparisonTool />
        <FinanceCalculator />
      </main>
      <ChatBot />
    </div>
  );
};

export default Index;
