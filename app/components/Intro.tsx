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

  return (
    <section
      className="flex flex-col items-center justify-center px-6 py-20"
      style={{ backgroundColor: "#111" }}>
      <div className="max-w-[760px] w-full text-center">
        {/* YES-SET 공감 블록 */}
        <div className="flex flex-col gap-5 mb-14">
          {[
            '가구 고치려고 전화했더니 "일단 와봐야 알아요"',
            "막상 오더니 견적이 처음 말과 달라졌고",
            "그냥 새로 살걸, 후회하셨죠?",
          ].map((text, i) => (
            <div
              key={i}
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
          ))}
        </div>

        {/* 브랜드 소개 — 스토리텔링 */}
        <div className="mb-14 text-center">
          <p
            className="font-black leading-snug"
            style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", color: "white" }}>
            그 경험을 가장 잘 아는 사람이
            <br />
            <span style={{ color: "#2fae8a" }}>직접 만든 서비스</span>입니다.
          </p>
          <p
            className="mt-5 mx-auto max-w-lg text-lg md:text-xl leading-relaxed"
            style={{ color: "#888" }}>
            대형 가구회사 출신 기사가 직접 진단하고,
            <br />
            사진 한 장으로 가능 여부부터 먼저 말합니다.
            <br />
            <strong style={{ color: "rgba(255,255,255,0.7)" }}>
              수리를 담다 — 수리담.
            </strong>
          </p>
        </div>

        {/* 숫자 지표 */}
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
          {[
            { label: "월 평균 출장 수리", value: "100+", unit: "건" },
            { label: "네이버 고객 평점", value: "4.9", unit: "/ 5.0 ★" },
            { label: "누적 고객 후기", value: "1,000+", unit: "건" },
          ].map((item, i) => (
            <div
              key={i}
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
          ))}
        </div>
      </div>
    </section>
  );
}
