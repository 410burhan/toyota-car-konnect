import { Header } from "@/components/Header";
import { ChatBot } from "@/components/ChatBot";
import { VehicleCard } from "@/components/VehicleCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, DollarSign, TrendingUp, Check } from "lucide-react";
import { cars, Car } from "@/data/cars";
import heroCamry from "@/assets/hero-camry.jpg";
import rav4Hybrid from "@/assets/rav4-hybrid.jpg";
import tacomaTruck from "@/assets/tacoma-truck.jpg";

const FinanceBudget = () => {
  const navigate = useNavigate();
  const [monthlyBudget, setMonthlyBudget] = useState(500);
  const [downPayment, setDownPayment] = useState(5000);
  const [creditScore, setCreditScore] = useState("good");
  const [loanTerm, setLoanTerm] = useState(60);

  const creditScores = [
    { value: "excellent", label: "Excellent (750+)", rate: 3.5 },
    { value: "good", label: "Good (700-749)", rate: 4.5 },
    { value: "fair", label: "Fair (650-699)", rate: 6.5 },
    { value: "building", label: "Building Credit", rate: 8.5 },
  ];

  const getInterestRate = () => {
    return creditScores.find(s => s.value === creditScore)?.rate || 4.5;
  };

  const calculateMaxPrice = () => {
    const rate = getInterestRate() / 100 / 12;
    const maxLoan = (monthlyBudget * (Math.pow(1 + rate, loanTerm) - 1)) / (rate * Math.pow(1 + rate, loanTerm));
    return Math.floor(maxLoan + downPayment);
  };

  const maxPrice = calculateMaxPrice();

  const allVehicles = cars;

  const affordableVehicles = allVehicles.filter(v => Number(v.price) <= maxPrice);

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

          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Finance & Budget Finder
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Find vehicles that match your budget and get pre-approved financing options.
              </p>
            </div>

            {}
            <Card className="p-8 mb-12 shadow-lg">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-4 flex items-center">
                      <DollarSign className="mr-2 h-5 w-5 text-primary" />
                      Your Budget Details
                    </h3>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">
                      Monthly Budget: ${monthlyBudget}
                    </Label>
                    <Slider
                      value={[monthlyBudget]}
                      onValueChange={(value) => setMonthlyBudget(value[0])}
                      min={200}
                      max={1500}
                      step={25}
                      className="mt-4"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      How much can you comfortably spend per month?
                    </p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">
                      Down Payment: ${downPayment.toLocaleString()}
                    </Label>
                    <Slider
                      value={[downPayment]}
                      onValueChange={(value) => setDownPayment(value[0])}
                      min={0}
                      max={20000}
                      step={500}
                      className="mt-4"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      Higher down payment = lower monthly costs
                    </p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-3 block">Credit Score Range</Label>
                    <div className="space-y-2">
                      {creditScores.map((score) => (
                        <button
                          key={score.value}
                          onClick={() => setCreditScore(score.value)}
                          className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                            creditScore === score.value
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{score.label}</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-muted-foreground">{score.rate}% APR</span>
                              {creditScore === score.value && (
                                <Check className="w-4 h-4 text-primary" />
                              )}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">
                      Loan Term: {loanTerm} months
                    </Label>
                    <Slider
                      value={[loanTerm]}
                      onValueChange={(value) => setLoanTerm(value[0])}
                      min={24}
                      max={84}
                      step={12}
                      className="mt-4"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gradient-hero rounded-lg p-8 text-white text-center">
                    <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-90" />
                    <p className="text-sm uppercase tracking-wider mb-2 opacity-90">
                      Your Maximum Vehicle Price
                    </p>
                    <p className="text-5xl font-bold mb-4">
                      ${maxPrice.toLocaleString()}
                    </p>
                    <p className="text-sm opacity-80">
                      Based on ${monthlyBudget}/mo at {getInterestRate()}% APR for {loanTerm} months
                    </p>
                  </div>

                  <Card className="bg-secondary p-6 space-y-4">
                    <h4 className="font-semibold text-foreground">Your Financing Details</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Monthly Payment</span>
                        <span className="font-semibold">${monthlyBudget}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Down Payment</span>
                        <span className="font-semibold">${downPayment.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Interest Rate</span>
                        <span className="font-semibold">{getInterestRate()}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Loan Term</span>
                        <span className="font-semibold">{loanTerm} months</span>
                      </div>
                      <div className="flex justify-between pt-3 border-t border-border">
                        <span className="text-sm font-medium">Amount Financed</span>
                        <span className="font-bold">${(maxPrice - downPayment).toLocaleString()}</span>
                      </div>
                    </div>
                  </Card>

                  <Button className="w-full" size="lg">
                    Get Pre-Approved Now
                  </Button>
                </div>
              </div>
            </Card>

            {}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Vehicles Within Your Budget ({affordableVehicles.length})
              </h2>
              
              {affordableVehicles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {affordableVehicles.map((vehicle) => (
                    <VehicleCard key={vehicle.id} {...vehicle} />
                  ))}
                </div>
              ) : (
                <Card className="p-12 text-center">
                  <p className="text-lg text-muted-foreground mb-4">
                    No vehicles match your current budget. Try adjusting your monthly payment or down payment.
                  </p>
                  <Button onClick={() => setMonthlyBudget(600)}>
                    Increase Monthly Budget
                  </Button>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceBudget;
