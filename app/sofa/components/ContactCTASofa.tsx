import React from "react";

const steps = [
  { num: "01", text: "소파 꺼진 부분 사진 1~3장 찍기" },
  { num: "02", text: "지역 + 증상 한 줄 적기" },
  { num: "03", text: "수리 가능 여부 + 비용 범위 먼저 안내" },
];

const badges = [
  "수리 불가 시 먼저 말씀드립니다",
  "사진으로 1차 판단 후 방문",
  "불필요한 교체 권유 없음",
];

export default function ContactCTASofa() {
  return (
    <section className="px-6 py-20" style={{ backgroundColor: "#1e1e1e" }}>
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <span
            className="inline-block text-xs tracking-widest uppercase mb-4 px-3 py-1 rounded-full font-semibold"
            style={{
              backgroundColor: "#2fae8a22",
              color: "#2fae8a",
              border: "1px solid #2fae8a55",
            }}>
            Contact
          </span>
          <h2
            className="text-2xl md:text-3xl font-bold leading-snug"
            style={{ color: "white" }}>
            새 소파 결제 전,
          </h2>
          <p className="mt-3 text-lg font-normal" style={{ color: "#7a7a7a" }}>
            사진 한 장으로 수리 가능한지 먼저 확인해보세요.
          </p>
          <p
            className="mt-2 text-base font-semibold"
            style={{ color: "#2fae8a" }}>
            확인만 해도 수십만원이 절약될 수 있습니다.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 mb-10">
          {steps.map((s, i) => (
            <div
              key={s.num}
              className="rounded-2xl px-5 py-5 flex items-start gap-4"
              style={{
                backgroundColor: i === 2 ? "#2fae8a18" : "#2a2a2a",
                border: `1px solid ${i === 2 ? "#2fae8a55" : "#333"}`,
              }}>
              <span
                className="text-2xl font-bold leading-none select-none flex-shrink-0"
                style={{ color: i === 2 ? "#2fae8a" : "#444" }}>
                {s.num}
              </span>
              <p
                className="text-sm font-medium leading-relaxed pt-0.5"
                style={{ color: "#e5e5e5" }}>
                {s.text}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <a
            href="/request"
            className="rounded-xl px-8 py-4 text-white font-bold text-center text-base transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#2fae8a" }}>
            💬 소파 사진 상담 시작하기 →
          </a>
          <a
            href="tel:01091273024"
            className="rounded-xl px-8 py-4 font-bold text-center text-base transition-opacity hover:opacity-70"
            style={{
              border: "1px solid #333",
              color: "#e5e5e5",
              backgroundColor: "#2a2a2a",
            }}>
            📞 010-9127-3024
          </a>
        </div>

        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{ color: "#555" }}>
          {badges.map((b, i) => (
            <React.Fragment key={b}>
              <span className="flex items-center gap-1.5 text-sm">
                <span
                  className="h-1.5 w-1.5 rounded-full inline-block flex-shrink-0"
                  style={{ backgroundColor: "#2fae8a" }}
                />
                {b}
              </span>
              {i < badges.length - 1 && (
                <span className="hidden sm:block" style={{ color: "#333" }}>
                  ·
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
