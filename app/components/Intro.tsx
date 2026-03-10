import FadeIn from "@/app/components/FadeIn";

export default function Intro() {
  const cardStyle = {
    backgroundColor: "#1e1e1e",
    border: "1px solid #2a2a2a",
  };

  const valueStyle: React.CSSProperties = {
    color: "#2fae8a",
    fontSize: "2.4rem",
    fontWeight: 900,
    lineHeight: 1,
  };

  const yesSet = [
    '가구 고치려고 전화했더니 "일단 와봐야 알아요"',
    "막상 오더니 견적이 처음 말과 달라졌고",
    "그냥 새로 살걸, 후회하셨죠?",
  ];

  const stats = [
    { label: "월 평균 출장 수리", value: "100+", unit: "건" },
    { label: "네이버 고객 평점", value: "4.9", unit: "/ 5.0 ★" },
    { label: "누적 고객 후기", value: "1,000+", unit: "건" },
  ];

  return (
    <section
      className="flex flex-col items-center justify-center px-6 py-20"
      style={{ backgroundColor: "#111" }}>
      <div className="max-w-[760px] w-full text-center">
        {/* ── YES-SET (규칙 4 마인드리딩) ── */}
        <div className="flex flex-col gap-5 mb-12">
          {yesSet.map((text, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div
                className="rounded-2xl px-6 py-5 text-left"
                style={{
                  backgroundColor: i === 2 ? "#1a2e27" : "#1a1a1a",
                  border: `1px solid ${i === 2 ? "#2fae8a44" : "#252525"}`,
                }}>
                <p
                  className="font-bold leading-snug"
                  style={{
                    fontSize: "clamp(1.2rem, 3.5vw, 1.5rem)",
                    color: i === 2 ? "#2fae8a" : "rgba(255,255,255,0.85)",
                  }}>
                  {i < 2 ? `✓ ${text}` : `→ ${text}`}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* ── 명언 인용 (규칙 1) ── */}
        <FadeIn delay={0}>
          <div
            className="mb-10 rounded-2xl px-6 py-5 text-left"
            style={{
              backgroundColor: "#0d2318",
              border: "1px solid #2fae8a66",
            }}>
            <p
              className="text-base italic leading-relaxed font-medium"
              style={{
                color: "#a8e8d0",
                borderLeft: "3px solid #2fae8a",
                paddingLeft: 16,
              }}>
              "좋은 장인은 무엇을 못 고치는지를 먼저 말한다."
            </p>
            <p className="text-sm mt-3 font-bold" style={{ color: "#2fae8a" }}>
              — 독일 가구장인 협회 훈련 교본
            </p>
          </div>
        </FadeIn>

        {/* ── 브랜드 소개 (규칙 2 권위 + 6 스토리텔링) ── */}
        <FadeIn delay={0}>
          <div className="mb-14 text-center">
            {/* 규칙 1 상식파괴: "서비스" 제거, 구체적 표현으로 */}
            <p
              className="font-black leading-snug"
              style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", color: "white" }}>
              그 불편을 직접 겪은 기사가
              <br />
              <span style={{ color: "#2fae8a" }}>고치러 나섭니다.</span>
            </p>
            <p
              className="mt-5 mx-auto max-w-lg text-lg md:text-xl leading-relaxed"
              style={{ color: "#888" }}>
              대형 가구회사 생산·마감 라인 출신.
              <br />
              구조를 알기 때문에 사진 한 장으로 판단하고,
              <br />
              안 되는 건 방문 전에 먼저 말합니다.
              <br />
              <strong style={{ color: "rgba(255,255,255,0.7)" }}>
                수리를 담다 — 수리담.
              </strong>
            </p>
          </div>
        </FadeIn>

        {/* ── 숫자 지표 ── */}
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
          {stats.map((item, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div
                className="flex flex-col items-center justify-center rounded-2xl px-5 py-7 text-center"
                style={cardStyle}>
                <div
                  className="text-base font-bold mb-3"
                  style={{ color: "#666" }}>
                  {item.label}
                </div>
                <div style={valueStyle}>{item.value}</div>
                <div
                  className="mt-2 text-base font-semibold"
                  style={{ color: "#2fae8a" }}>
                  {item.unit}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
