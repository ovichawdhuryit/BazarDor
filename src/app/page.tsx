import Hero from "@/Components/Hero";
import PriceWise from "@/Components/PriceWise";
import { SortProvider } from "@/Components/SortContext";

export default function Home() {
  return (
    <SortProvider>
      <Hero />
      <PriceWise />
    </SortProvider>
  );
}