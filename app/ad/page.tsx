import HookIntro from "@/app/components/HookIntro";
import DifferenceAndReviews from "@/app/components/DifferenceAndReviews";
import ContactCTA from "@/app/components/ContactCTA";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";

export default function AdPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <HookIntro />
      <DifferenceAndReviews />
      <ContactCTA />
      <Footer />
    </main>
  );
}
