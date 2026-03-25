export const metadata = {
  title: "가구 수리 출장 | 소파 꺼짐, 싱크대 상부장 처짐 전문 - 수리담",
  description:
    "싱크대 상부장 처짐·떨어짐·수리, 소파 꺼짐, 붙박이장 슬라이딩 도어, 문짝 경첩 수리 전문. 인천·부천·서울·강서·마포·동작·영등포·송도·부평·검단·청라·연수구 출장. 사진 한 장으로 바로 판단해드립니다.",
  keywords:
    "가구수리, 싱크대상부장처짐, 상부장수리, 싱크대상부장수리, 씽크대상부장수리, 상부장떨어짐, 싱크대문짝수리, 붙박이장슬라이딩도어수리, 소파수리, 문짝경첩수리, 부천가구수리, 인천가구수리, 강서구가구수리, 마포구가구수리, 송도가구수리, 부평가구수리, 검단가구수리, 청라가구수리, 연수구가구수리, 영등포구가구수리, 동작구가구수리, 양천구가구수리, 은평구가구수리, 김포가구수리, 홍대가구수리",
  openGraph: {
    title: "가구 수리, 그냥 두면 교체까지 갑니다 | 수리담",
    description:
      "싱크대 상부장 처짐·소파 꺼짐·붙박이장 수리 전문. 인천·부천·서울 전 지역 출장. 사진 보내주시면 살릴 수 있는지 바로 확인해드립니다.",
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
