export const metadata = {
  title: "가구 수리 | 소파 꺼짐, 상부장 처짐 그냥 두면 더 커집니다",
  description:
    "가구를 버리기 전에 확인하세요. 소파 꺼짐, 상부장 처짐 대부분 수리로 해결되는 경우 많습니다. 사진 한 장 보내주시면 지금 상태 기준으로 바로 판단해드립니다.",
  openGraph: {
    title: "가구 수리, 그냥 두면 교체까지 갑니다",
    description:
      "소파 꺼짐, 상부장 처짐 대부분 원인은 따로 있습니다. 사진 보내주시면 살릴 수 있는지 바로 확인해드립니다.",
    images: ["/images/staff-main4.png"],
  },
};

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
