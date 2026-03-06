import HookIntro from "@/app/components/HookIntro";
import DifferenceAndReviews from "@/app/components/DifferenceAndReviews";
import WhySuridam from "@/app/components/WhySuridam";
import StaffPhotos from "@/app/components/Staffphotos";
import ContactCTA from "@/app/components/ContactCTA";
import FloatingCTA from "@/app/components/FloatingCTA";
import EstimateCalculator from "@/app/components/EstimateCalculator";

export default function AdPage() {
  return (
    <>
      <main className="min-h-screen" style={{ backgroundColor: "#1e1e1e" }}>
        <HookIntro />
        <DifferenceAndReviews />
        <WhySuridam />
        <StaffPhotos />
        <EstimateCalculator />
        <ContactCTA />
      </main>
      <FloatingCTA />
    </>
  );
}
