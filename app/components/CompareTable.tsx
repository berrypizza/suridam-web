import FadeIn from "@/app/components/FadeIn";

const rows = [
  {
    label: "사전 진단",
    other: "X\n일단 와봐야 알아요",
    ours: "O\n사진 1장으로 먼저 판단",
    highlight: false,
  },
  {
    label: "수리 불가 시\n출장비",
    other: "청구",
    ours: "0원",
    highlight: false,
  },
  {
    label: "견적 투명성",
    other: "현장서\n추가 발생",
    ours: "표준 단가 공개\n숨은 비용 없음",
    highlight: false,
  },
  {
    label: "AS 보장",
    other: "X\n수리 후 연락 두절",
    ours: "1년 무상 AS",
    highlight: true,
  },
  {
    label: "누적 후기",
    other: "확인 불가",
    ours: "1,000건+\n네이버 4.9★",
    highlight: true,
  },
];

export default function CompareTable() {
  return (
    <section className="px-6 py-20" style={{ backgroundColor: "#0a0a0a" }}>
      <div className="mx-auto max-w-2xl">
        <FadeIn delay={0}>
          <div className="text-center mb-10">
            <span
              className="inline-block text-sm tracking-widest uppercase mb-4 px-3 py-1.5 rounded-full font-bold"
              style={{
                backgroundColor: "#2fae8a22",
                color: "#2fae8a",
                border: "1px solid #2fae8a55",
              }}>
              Why Suridam
            </span>
            <h2
              className="font-black leading-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3rem)", color: "white" }}>
              가구수리 업체를
              <br />
              <span style={{ color: "#2fae8a" }}>잘못 고르는 법.</span>
            </h2>
            <p
              className="mt-3 text-base font-semibold"
              style={{ color: "#666" }}>
              좋은 업체를 고르려다 오히려 손해 본 경험, 한 번쯤은 있으셨죠.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={80}>
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: "1px solid #222" }}>
            {/* 컬럼 헤더 */}
            <div className="grid grid-cols-[1fr_auto_1fr]">
              <div
                className="px-5 py-5 text-center"
                style={{ backgroundColor: "#2a2a2a" }}>
                <p className="text-base font-black" style={{ color: "#888" }}>
                  일반 업체
                </p>
              </div>
              <div
                className="flex items-center justify-center px-5"
                style={{
                  backgroundColor: "#1a1a1a",
                  borderLeft: "1px solid #222",
                  borderRight: "1px solid #222",
                }}>
                <p
                  className="text-xs font-black tracking-widest"
                  style={{ color: "#333" }}>
                  VS
                </p>
              </div>
              <div
                className="px-5 py-5 text-center"
                style={{ backgroundColor: "#2fae8a" }}>
                <p className="text-base font-black" style={{ color: "white" }}>
                  수리담
                </p>
              </div>
            </div>

            {/* 행 */}
            {rows.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-[1fr_auto_1fr]"
                style={{ borderTop: "1px solid #1e1e1e" }}>
                {/* 일반 업체 */}
                <div
                  className="px-5 py-5 flex items-center justify-center text-center"
                  style={{ backgroundColor: "#161616" }}>
                  <p
                    className="text-sm font-bold whitespace-pre-line leading-snug"
                    style={{
                      color: row.other.startsWith("X") ? "#ef4444" : "#555",
                    }}>
                    {row.other}
                  </p>
                </div>

                {/* 중간 라벨 */}
                <div
                  className="flex items-center justify-center px-4 py-5 text-center"
                  style={{
                    backgroundColor: "#111",
                    borderLeft: "1px solid #1e1e1e",
                    borderRight: "1px solid #1e1e1e",
                    minWidth: "6.5rem",
                  }}>
                  <p
                    className="text-xs font-semibold leading-snug whitespace-pre-line"
                    style={{ color: "#444" }}>
                    {row.label}
                  </p>
                </div>

                {/* 수리담 */}
                <div
                  className="px-5 py-5 flex items-center justify-center text-center"
                  style={{
                    backgroundColor: row.highlight ? "#0d2318" : "#111",
                  }}>
                  <p
                    className="text-sm font-black whitespace-pre-line leading-snug"
                    style={{ color: row.highlight ? "#2fae8a" : "white" }}>
                    {row.ours}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={120}>
          <p
            className="mt-6 text-center text-sm font-semibold"
            style={{ color: "#555" }}>
            방문 현장의 80%는 교체 없이 수리로 끝났습니다.
            <span style={{ color: "#2fae8a" }}>
              {" "}
              나머지 20%는 방문 전에 먼저 말씀드렸습니다.
            </span>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
