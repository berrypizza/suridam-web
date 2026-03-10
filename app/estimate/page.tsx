import EstimateCalculator from "@/app/components/EstimateCalculator";
import ContactCTA from "@/app/components/ContactCTA";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "수리 비용 확인 | 수리담",
  description:
    "가구 수리 비용을 항목별로 즉시 확인해보세요. 상부장 처짐, 소파 꺼짐, 경첩 교체, 식탁의자 가죽 교체 등 수리 종류별 예상 비용을 바로 조회할 수 있습니다.",
};

export default function EstimatePage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#111" }}>
      {/* 페이지 헤더 */}
      <div
        className="px-6 py-12"
        style={{
          backgroundColor: "#0d0d0d",
          borderBottom: "1px solid #1e1e1e",
        }}>
        <div className="mx-auto max-w-5xl">
          <span
            className="inline-block text-xs tracking-widest uppercase mb-4 px-3 py-1.5 rounded-full font-bold"
            style={{
              backgroundColor: "#2fae8a22",
              color: "#2fae8a",
              border: "1px solid #2fae8a55",
            }}>
            비용 확인
          </span>
          <h1
            className="font-black leading-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)", color: "white" }}>
            방문 전에
            <br />
            <span style={{ color: "#2fae8a" }}>비용 먼저 확인하세요</span>
          </h1>
          <p className="mt-4 text-base" style={{ color: "#666" }}>
            항목 선택만 하면 예상 비용을 즉시 조회할 수 있습니다.
            <br />
            현장 상황에 따라 달라질 수 있으며, 정확한 견적은 사진 상담으로
            확인해드립니다.
          </p>
        </div>
      </div>

      {/* 계산기 — 항상 펼쳐진 상태로 보여주기 위해 래퍼로 감쌈 */}
      <EstimateCalculator />

      {/* 추가 안내 */}
      <div className="px-6 pb-0" style={{ backgroundColor: "#111" }}>
        <div className="mx-auto max-w-2xl">
          <div
            className="rounded-2xl p-5 mb-0"
            style={{
              backgroundColor: "#161616",
              border: "1px solid #1e1e1e",
            }}>
            <p className="text-sm font-bold mb-3" style={{ color: "#2fae8a" }}>
              💡 비용 안내 원칙
            </p>
            <div className="flex flex-col gap-2">
              {[
                "표준 단가 기준이며 현장 상태에 따라 달라질 수 있습니다",
                "사진 보내주시면 더 정확한 범위를 안내드립니다",
                "수리 불가 판단 시 출장비를 받지 않습니다",
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span
                    className="mt-0.5 h-1.5 w-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: "#2fae8a" }}
                  />
                  <p className="text-sm" style={{ color: "#888" }}>
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ContactCTA />
    </main>
  );
}
