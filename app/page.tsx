import HookIntro from "@/app/components/HookIntro";
import DifferenceAndReviews from "@/app/components/DifferenceAndReviews";
import ContactCTA from "@/app/components/ContactCTA";
import Staffphotos from "@/app/components/Staffphotos";
import WhySuridam from "@/app/components/WhySuridam";
import FloatingCTA from "@/app/components/FloatingCTA";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import EstimateCalculator from "./components/EstimateCalculator";
import Intro from "./components/Intro";
import HonestSection from "./components/Honestsection";
import CompareTable from "./components/CompareTable";

export default function AdPage() {
  return (
    <>
      <main className="min-h-screen" style={{ backgroundColor: "#1e1e1e" }}>
        <HookIntro />
        <Staffphotos />
        <Intro />
        <CompareTable />
        <WhySuridam />
        <DifferenceAndReviews />
        <EstimateCalculator />
        <ContactCTA />
      </main>
      <FloatingCTA />
    </>
  );
}
