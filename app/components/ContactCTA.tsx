import React from "react";

const steps = [
  { num: "01", text: "가구 사진 1~3장 찍기" },
  { num: "02", text: "지역 + 증상 한 줄 적기" },
  { num: "03", text: "수리 가능 여부 + 비용 범위 안내" },
];

const badges = [
  "수리 불가 시 먼저 말씀드립니다",
  "방문 전 사진으로 1차 판단",
  "비용 범위 먼저 공유",
];

export default function ContactCTA() {
  return (
    <section className="px-6 py-20" style={{ backgroundColor: "#1e1e1e" }}>
      <div className="mx-auto max-w-5xl">
        {/* 헤더 */}
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
            바로 문의하지 마세요.
          </h2>
          <p
            className="mt-3 text-lg md:text-xl font-normal"
            style={{ color: "#7a7a7a" }}>
            최대한 저희를 알아보시고, 납득하신 후에 연락 주세요.
          </p>
          <p
            className="mt-2 text-base font-semibold"
            style={{ color: "#2fae8a" }}>
            급할 필요 없습니다.
          </p>
        </div>

        {/* 3단계 */}
        <div className="grid gap-3 sm:grid-cols-3 mb-10">
          {steps.map((s, i) => (
            <div
              key={s.num}
              className="rounded-2xl px-5 py-5 flex items-start gap-4"
              style={{ backgroundColor: "#2a2a2a", border: "1px solid #333" }}>
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

        {/* CTA 버튼 */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <a
            href="/request"
            className="rounded-xl px-8 py-4 text-white font-bold text-center text-base transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#2fae8a" }}>
            사진 상담 시작하기 →
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

        {/* 신뢰 배지 */}
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
