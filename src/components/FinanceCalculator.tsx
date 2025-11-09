import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { Calculator, TrendingDown } from "lucide-react";

export const FinanceCalculator = () => {
  const [vehiclePrice, setVehiclePrice] = useState(30000);
  const [downPayment, setDownPayment] = useState(5000);
  const [interestRate, setInterestRate] = useState(4.5);
  const [loanTerm, setLoanTerm] = useState(60);

  const calculateMonthlyPayment = () => {
    const principal = vehiclePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm;
    
    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                          (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    return monthlyPayment.toFixed(0);
  };

  return (
    <section id="financing" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Finance Calculator
            </h2>
            <p className="text-lg text-muted-foreground">
              Estimate your monthly payments and find options that fit your budget.
            </p>
          </div>

          <Card className="p-8 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Inputs */}
              <div className="space-y-6">
                <div>
                  <Label htmlFor="price" className="text-sm font-medium">
                    Vehicle Price
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    value={vehiclePrice}
                    onChange={(e) => setVehiclePrice(Number(e.target.value))}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="down" className="text-sm font-medium">
                    Down Payment: ${downPayment.toLocaleString()}
                  </Label>
                  <Slider
                    id="down"
                    value={[downPayment]}
                    onValueChange={(value) => setDownPayment(value[0])}
                    min={0}
                    max={vehiclePrice * 0.5}
                    step={500}
                    className="mt-4"
                  />
                </div>

                <div>
                  <Label htmlFor="rate" className="text-sm font-medium">
                    Interest Rate: {interestRate}%
                  </Label>
                  <Slider
                    id="rate"
                    value={[interestRate]}
                    onValueChange={(value) => setInterestRate(value[0])}
                    min={2}
                    max={12}
                    step={0.1}
                    className="mt-4"
                  />
                </div>

                <div>
                  <Label htmlFor="term" className="text-sm font-medium">
                    Loan Term: {loanTerm} months
                  </Label>
                  <Slider
                    id="term"
                    value={[loanTerm]}
                    onValueChange={(value) => setLoanTerm(value[0])}
                    min={24}
                    max={84}
                    step={12}
                    className="mt-4"
                  />
                </div>
              </div>

              {/* Results */}
              <div className="space-y-6">
                <div className="bg-gradient-hero rounded-lg p-8 text-center text-white">
                  <Calculator className="w-12 h-12 mx-auto mb-4 opacity-90" />
                  <p className="text-sm uppercase tracking-wider mb-2 opacity-90">
                    Estimated Monthly Payment
                  </p>
                  <p className="text-5xl font-bold mb-2">
                    ${calculateMonthlyPayment()}
                  </p>
                  <p className="text-sm opacity-80">
                    for {loanTerm} months at {interestRate}% APR
                  </p>
                </div>

                <div className="bg-secondary rounded-lg p-6 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Amount Financed</span>
                    <span className="font-semibold">
                      ${(vehiclePrice - downPayment).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Interest</span>
                    <span className="font-semibold text-primary">
                      ${(Number(calculateMonthlyPayment()) * loanTerm - (vehiclePrice - downPayment)).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-border">
                    <span className="text-sm font-medium">Total Amount</span>
                    <span className="font-bold">
                      ${(Number(calculateMonthlyPayment()) * loanTerm).toLocaleString()}
                    </span>
                  </div>
                </div>

                <Button className="w-full" size="lg">
                  <TrendingDown className="mr-2 h-5 w-5" />
                  Get Pre-Approved
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
