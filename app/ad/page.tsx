import Hero from "@/app/components/Hero";
import BeforeAfter from "@/app/components/BeforeAfter";
import Process from "@/app/components/Process";
import Trust from "@/app/components/Trust";
import Footer from "@/app/components/Footer";

export default function AdPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Hero />
      <BeforeAfter />
      <Process />
      <Trust />
      <Footer />
    </main>
  );
}
