export const dynamic = "force-static";

export const metadata = {
  title: "수리담 가구수리 서비스 - 서울·인천·경기 출장 수리 전문 | 수리담",

  description:
    "인천·부천·김포·서울 강서·양천·구로·영등포·동작·마포 가구수리 출장. 소파 꺼짐, 싱크대 상부장 처짐, 붙박이장 문걸림까지 당일 수리 가능. 사진 보내주시면 1분 내 견적 안내드립니다.",

  keywords:
    "인천, 부천, 김포, 강서구, 양천구, 구로구, 영등포구, 동작구, 마포구, 청라동, 검단, 송도, 부평, 목동, 화곡동, 당산동, 신도림동",

  openGraph: {
    title: "가구 수리, 지금 안 고치면 교체까지 갑니다 | 수리담",
    description:
      "소파 꺼짐·상부장 처짐·붙박이장 수리 전문. 인천·부천·서울 출장. 사진 보내주시면 수리 가능 여부 바로 안내드립니다.",
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
import CompareTable from "./components/CompareTable";
import ServiceSeo from "./components/ServiceSeo";

export default function AdPage() {
  return (
    <>
      <main className="min-h-screen" style={{ backgroundColor: "#1e1e1e" }}>
        <HookIntro />
        <Staffphotos />
        <Intro />
        <DifferenceAndReviews />
        <CompareTable />
        <WhySuridam />
        <EstimateCalculator />
        <ContactCTA />
        <ServiceSeo />
      </main>
      <FloatingCTA />
    </>
  );
}
