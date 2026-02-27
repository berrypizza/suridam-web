"use client";

const diffs = [
  {
    icon: "📷",
    theme: "방문 기준",
    problem: "일단 방문부터\n현장에서 말이 바뀜",
    solution: "사진으로 1차 판단 후\n가능한 경우에만 방문합니다",
  },
  {
    icon: "💬",
    theme: "비용 안내",
    problem: "비용은\n'가봐야 알아요'로 끝",
    solution: "범위를 먼저 공유하고\n납득 후 진행합니다",
  },
  {
    icon: "✅",
    theme: "마무리 기준",
    problem: "수리 후\n마무리 기준이 없음",
    solution: "수평·유격·열림감·소음\n기준으로 확인합니다",
  },
  {
    icon: "🤝",
    theme: "솔직함",
    problem: '"할 수 있다"고 해놓고\n결과가 애매함',
    solution: "어려우면 사진 보고\n먼저 말씀드립니다",
  },
];

export default function WhySuridam() {
  return (
    <section className="px-6 py-16" style={{ backgroundColor: "white" }}>
      <div className="mx-auto max-w-5xl">
        {/* 섹션 헤더 */}
        <div className="mb-10">
          <p
            className="text-xs md:text-sm tracking-widest uppercase mb-3"
            style={{ color: "#7a7a7a" }}>
            Why Suridam
          </p>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2
              className="text-2xl md:text-3xl lg:text-4xl font-bold"
              style={{ color: "#1e1e1e" }}>
              그래서 뭐가 다른가요?
            </h2>

            {/* vs 레이블 */}
            <div className="hidden md:flex items-center gap-2 text-xs md:text-sm font-semibold pb-1">
              <span
                className="px-3 py-1 rounded-full"
                style={{ backgroundColor: "#fee2e2", color: "#ef4444" }}>
                일반 업체
              </span>
              <span style={{ color: "#7a7a7a" }}>vs</span>
              <span
                className="px-3 py-1 rounded-full"
                style={{ backgroundColor: "#f0faf6", color: "#2e9f83" }}>
                수리담
              </span>
            </div>
          </div>
        </div>

        {/* 비교 리스트 */}
        <div className="flex flex-col gap-3">
          {diffs.map((d, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden"
              style={{ border: "1px solid #e5e5e5" }}>
              {/* ── 일반 업체 (좌) ── */}
              <div
                className="flex items-start gap-3 md:gap-4 px-5 md:px-6 py-5 md:py-6"
                style={{
                  backgroundColor: "#fafafa",
                  borderBottom: "1px solid #e5e5e5",
                }}>
                {/* ✕ 아이콘 */}
                <div
                  className="flex-shrink-0 mt-0.5 h-5 w-5 md:h-6 md:w-6 rounded-full flex items-center justify-center font-bold text-xs md:text-sm"
                  style={{ backgroundColor: "#fee2e2", color: "#ef4444" }}>
                  ✕
                </div>

                <div>
                  <span
                    className="inline-block text-[10px] md:text-xs font-semibold tracking-widest uppercase mb-2 rounded-full px-2 py-0.5"
                    style={{ backgroundColor: "#fee2e2", color: "#ef4444" }}>
                    일반 업체
                  </span>
                  <p
                    className="text-sm md:text-base lg:text-lg leading-relaxed whitespace-pre-line"
                    style={{
                      color: "#7a7a7a",
                      textDecoration: "line-through",
                      textDecorationColor: "#fca5a5",
                    }}>
                    {d.problem}
                  </p>
                </div>
              </div>

              {/* ── 수리담 (우) ── */}
              <div
                className="flex items-start gap-3 md:gap-4 px-5 md:px-6 py-5 md:py-6"
                style={{ backgroundColor: "white" }}>
                {/* ✓ 아이콘 */}
                <div
                  className="flex-shrink-0 mt-0.5 h-5 w-5 md:h-6 md:w-6 rounded-full flex items-center justify-center text-white font-bold text-xs md:text-sm"
                  style={{ backgroundColor: "#2fae8a" }}>
                  ✓
                </div>

                <div>
                  <span
                    className="inline-block text-[10px] md:text-xs font-semibold tracking-widest uppercase mb-2 rounded-full px-2 py-0.5"
                    style={{ backgroundColor: "#f0faf6", color: "#2e9f83" }}>
                    수리담
                  </span>
                  <p
                    className="text-sm md:text-base lg:text-lg font-semibold leading-relaxed whitespace-pre-line"
                    style={{ color: "#1e1e1e" }}>
                    {d.solution}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 하단 약속 배너 */}
        <div
          className="mt-8 rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ backgroundColor: "#f0faf6", border: "1px solid #2fae8a" }}>
          <p
            className="text-sm md:text-base lg:text-lg font-medium text-center sm:text-left"
            style={{ color: "#1e1e1e" }}>
            위 4가지 기준, 수리담이 지키지 못하면{" "}
            <strong>출장비를 받지 않습니다.</strong>
          </p>
          <a
            href="https://suridam.vercel.app/"
            className="flex-shrink-0 rounded-xl px-5 py-2.5 text-sm md:text-base font-semibold text-white transition-opacity hover:opacity-90 whitespace-nowrap"
            style={{ backgroundColor: "#2fae8a" }}>
            사진 상담 시작하기 →
          </a>
        </div>
      </div>
    </section>
  );
}
