import HookIntro from "@/app/components/HookIntro";
import DifferenceAndReviews from "@/app/components/DifferenceAndReviews";
import ContactCTA from "@/app/components/ContactCTA";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import Staffphotos from "@/app/components/Staffphotos";
import WhySuridam from "@/app/components/WhySuridam";
import FloatingCTA from "@/app/components/FloatingCTA";

export default function AdPage() {
  return (
    <>
      <main className="min-h-screen" style={{ backgroundColor: "#1e1e1e" }}>
        <HookIntro />
        <DifferenceAndReviews />
        <WhySuridam />
        <Staffphotos />
        <ContactCTA />
      </main>
      <FloatingCTA />
    </>
  );
}
