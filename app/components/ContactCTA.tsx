import React from "react";

const steps = [
  { num: "01", text: "가구 사진 1~3장 찍기" },
  { num: "02", text: "지역 + 증상 한 줄 적기" },
  { num: "03", text: "수리 가능 여부 + 비용 범위 먼저 안내" },
];

const badges = [
  "수리 불가 시 먼저 말씀드립니다",
  "방문 전 사진으로 1차 판단",
  "비용 범위 먼저 공유",
];

export default function ContactCTA() {
  return (
    <section className="px-6 py-24" style={{ backgroundColor: "#1e1e1e" }}>
      <div className="mx-auto max-w-5xl">
        {/* 헤더 */}
        <div className="text-center mb-14">
          <span
            className="inline-block text-sm tracking-widest uppercase mb-4 px-3 py-1 rounded-full font-semibold"
            style={{
              backgroundColor: "#2fae8a22",
              color: "#2fae8a",
              border: "1px solid #2fae8a55",
            }}>
            Contact
          </span>

          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-snug"
            style={{ color: "white" }}>
            아직 고민 중이어도 괜찮습니다.
          </h2>

          <p
            className="mt-4 text-base md:text-lg leading-relaxed"
            style={{ color: "#bdbdbd" }}>
            사진 한 장이면 가능 여부만 먼저 알 수 있어요.
          </p>

          <p
            className="mt-3 text-lg md:text-xl font-semibold"
            style={{ color: "#2fae8a" }}>
            그것만으로도 충분합니다.
          </p>
        </div>

        {/* 3단계 */}
        <div className="grid gap-4 sm:grid-cols-3 mb-12">
          {steps.map((s, i) => (
            <div
              key={s.num}
              className="rounded-2xl px-6 py-6 flex items-start gap-4"
              style={{
                backgroundColor: i === 2 ? "#2fae8a18" : "#2a2a2a",
                border: `1px solid ${i === 2 ? "#2fae8a55" : "#333"}`,
              }}>
              <span
                className="text-3xl md:text-4xl font-bold leading-none select-none flex-shrink-0"
                style={{ color: i === 2 ? "#2fae8a" : "#555" }}>
                {s.num}
              </span>

              <p
                className="text-base md:text-lg font-medium leading-loose pt-0.5"
                style={{ color: "#f0f0f0" }}>
                {s.text}
              </p>
            </div>
          ))}
        </div>

        {/* CTA 버튼 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <a
            href="/request"
            className="rounded-xl px-8 py-4 text-white font-bold text-center text-base md:text-lg transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#2fae8a" }}>
            💬 사진 상담 시작하기 →
          </a>

          <a
            href="tel:01091273024"
            className="rounded-xl px-8 py-4 font-bold text-center text-base md:text-lg transition-opacity hover:opacity-70"
            style={{
              border: "1px solid #333",
              color: "#f0f0f0",
              backgroundColor: "#2a2a2a",
            }}>
            📞 010-9127-3024
          </a>
        </div>

        {/* 신뢰 배지 */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{ color: "#888" }}>
          {badges.map((b, i) => (
            <React.Fragment key={b}>
              <span className="flex items-center gap-2 text-sm md:text-base font-medium">
                <span
                  className="h-2 w-2 rounded-full inline-block flex-shrink-0"
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
