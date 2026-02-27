import HookIntro from "@/app/components/HookIntro";
import DifferenceAndReviews from "@/app/components/DifferenceAndReviews";
import ContactCTA from "@/app/components/ContactCTA";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import Staffphotos from "@/app/components/Staffphotos";
import WhySuridam from "@/app/components/WhySuridam";

export default function AdPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <HookIntro />
      <DifferenceAndReviews />
      <WhySuridam />
      <Staffphotos />
      <ContactCTA />
    </main>
  );
}
