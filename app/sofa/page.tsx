import HookIntroSofa from "@/app/sofa/components/HookIntroSofa";
import DifferenceAndReviewsSofa from "@/app/sofa/components/DifferenceAndReviewsSofa";
import WhySuridamSofa from "@/app/sofa/components/WhySuridamSofa";
import StaffPhotosSofa from "@/app/sofa/components/StaffPhotosSofa";
import ContactCTASofa from "@/app/sofa/components/ContactCTASofa";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import FloatingCTA from "@/app/components/FloatingCTA";

export const metadata = {
  title: "소파 꺼짐 수리 | 수리담",
  description:
    "소파 꺼짐·처짐, 교체 전 사진 한 장으로 먼저 확인하세요. 수도권·인천·부천·서울 출장. 수리 가능 여부와 비용 범위 먼저 안내드립니다.",
};

export default function SofaPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen" style={{ backgroundColor: "#1e1e1e" }}>
        <HookIntroSofa />
        <DifferenceAndReviewsSofa />
        <WhySuridamSofa />
        <StaffPhotosSofa />
        <ContactCTASofa />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
