
import heroCamry from "@/assets/new/toyota_camry_hybrid_ws_2018_4k-1920x1080.jpg";
import rav4Hybrid from "@/assets/new/toyota_rav4_hybrid_2019_4k-1920x1080.jpg";
import tundraTruck from "@/assets/new/toyota_tundra_limited_crewmax_2024_4k_hd_cars-1920x1080.jpg";
import tacomaTruck from "@/assets/new/tacoma.jpg";
import camryWhiteHybrid from "@/assets/new/HybridCamryWhite.jpg";
import correcthighlander from "@/assets/new/correcthighlander.avif";
import supra from "@/assets/new/supra.avif";

export interface Car {
    id: string;
    name: string;
    price: string;
    image: string;
    mpg: string;
    isHybrid: boolean;
    hp: number;
    seating: number;
    type: "Sedan" | "SUV" | "Truck" | "Coupe";
    description?: string;
    features?: string[];
}

export const cars: Car[] = [
  {
    id: 'camry',
    name: 'Toyota Camry',
    price: "28000",
    image: heroCamry,
    mpg: '32',
    isHybrid: false,
    hp: 205,
    seating: 5,
    type: 'Sedan',
    description: 'Reliable sedan',
    features: ['Bluetooth', 'Backup Camera', 'Fuel Efficient'],
  },
  {
    id: 'camryHybrid',
    name: 'Toyota Camry(Hybrid)',
    price: "28000",
    image: camryWhiteHybrid,
    mpg: '40',
    isHybrid: true,
    hp: 210,
    type: 'Sedan',
    seating: 5,
    description: 'Very Reliable Sedan',
    features: ['Bluetooth', 'Backup Camera', 'Hybrid Engine'],
  },
  {
    id: 'rav4',
    name: 'Toyota RAV4',
    price: "30000",
    image: rav4Hybrid,
    type: 'SUV',
    mpg: '28',
    isHybrid: false,
    hp: 203,
    seating : 5,
    description: 'Compact SUV',
    features: ['All-Wheel Drive', 'Sunroof', 'Car Play'],
  },
  {
    id: 'tacoma',
    name: 'Toyota Tacoma',
    price: "60000",
    image: tacomaTruck,
    type: 'Truck',
    mpg: '13',
    isHybrid: false,
    hp: 278,
    seating: 5,
    description: 'Fast Truck',
    features: ['All-Wheel Drive', 'Sunroof', 'V6 Engine'],
  },
  {
    id: 'tundra',
    name: 'Toyota Tundra',
    price: "80000",
    image: tundraTruck,
    type: 'Truck',
    mpg: '12',
    isHybrid: false,
    hp: 358,
    seating: 5,
    description: 'Very Fast Truck',
    features: ['All-Wheel Drive', 'Sunroof', 'V8 Engine'],
  },
  {
    id: 'highlander',
    name: 'Toyota Highlander',
    price: "41000",
    image: correcthighlander,
    type: 'SUV',
    mpg: '24',
    isHybrid: false,
    hp: 243,
    seating: 7,
    description: 'Modern Day Spacious SUV',
    features: ['All-Wheel Drive', 'V6 Engine', 'Third-Row Seating'],
  },
  {
    id: 'supra',
    name: 'Toyota Supra',
    price: "45000",
    image: supra,
    type: 'Coupe',
    mpg: '18',
    isHybrid: false,
    hp: 382,
    seating: 4,
    description: 'Fast V8 Car',
    features: ['All-Wheel Drive', 'Sunroof', 'V8 Engine'],
  },
  // add more cars here
];