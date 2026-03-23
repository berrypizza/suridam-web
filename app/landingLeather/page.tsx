import HookIntro from "@/app/components/HookIntro";
import DifferenceAndReviews from "@/app/components/DifferenceAndReviews";
import ContactCTA from "@/app/components/ContactCTA";
import Staffphotos from "@/app/components/Staffphotos";
import WhySuridam from "@/app/components/WhySuridam";
import FloatingCTA from "@/app/components/FloatingCTA";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import EstimateCalculator from "@/app/components/EstimateCalculator";
import Intro from "@/app/components/Intro";
import HonestSection from "@/app/components/Honestsection";
import CompareTable from "@/app/components/CompareTable";

export default function AdPage() {
  return (
    <>
      <main className="min-h-screen" style={{ backgroundColor: "#1e1e1e" }}>
        <HookIntro />
        <Intro />
        <Staffphotos />
        <HonestSection />
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
