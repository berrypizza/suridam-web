import HookIntro from "@/app/components/HookIntro";
import DifferenceAndReviews from "@/app/components/DifferenceAndReviews";
import WhySuridam from "@/app/components/WhySuridam";
import StaffPhotos from "@/app/components/Staffphotos";
import ContactCTA from "@/app/components/ContactCTA";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import FloatingCTA from "@/app/components/FloatingCTA";

export default function AdPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen" style={{ backgroundColor: "#1e1e1e" }}>
        <HookIntro />
        <DifferenceAndReviews />
        <WhySuridam />
        <StaffPhotos />
        <ContactCTA />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
