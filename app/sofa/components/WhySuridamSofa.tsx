"use client";

const diffs = [
  {
    icon: "📷",
    theme: "방문 기준",
    problem: "일단 방문부터\n현장에서 말이 바뀜",
    solution: "사진으로 1차 판단 후\n가능한 경우에만 방문합니다",
  },
  {
    icon: "🛋️",
    theme: "수리 vs 교체",
    problem: '"교체하는 게 낫다"고만\n말하는 업체',
    solution: "수리로 가능하면 수리를\n먼저 권합니다",
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
    solution: "탄성·복원력·소음\n기준으로 확인합니다",
  },
];

export default function WhySuridamSofa() {
  return (
    <section style={{ backgroundColor: "#1e1e1e" }}>
      <div className="px-6 py-16 mx-auto max-w-5xl">
        <div className="mb-10">
          <span
            className="inline-block text-xs tracking-widest uppercase mb-4 px-3 py-1 rounded-full font-semibold"
            style={{
              backgroundColor: "#2fae8a22",
              color: "#2fae8a",
              border: "1px solid #2fae8a55",
            }}>
            Why Suridam
          </span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2
              className="text-2xl md:text-3xl lg:text-4xl font-bold"
              style={{ color: "white" }}>
              소파 수리, 뭐가 다른가요?
            </h2>
            <div className="hidden md:flex items-center gap-2 text-sm font-semibold pb-1">
              <span
                className="px-3 py-1 rounded-full"
                style={{
                  backgroundColor: "#fee2e233",
                  color: "#ef4444",
                  border: "1px solid #ef444433",
                }}>
                일반 업체
              </span>
              <span style={{ color: "#555" }}>vs</span>
              <span
                className="px-3 py-1 rounded-full"
                style={{
                  backgroundColor: "#2fae8a22",
                  color: "#2fae8a",
                  border: "1px solid #2fae8a55",
                }}>
                수리담
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {diffs.map((d, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden"
              style={{ border: "1px solid #2a2a2a" }}>
              <div
                className="flex items-start gap-3 px-5 py-5"
                style={{
                  backgroundColor: "#2a2a2a",
                  borderBottom: "1px solid #333",
                }}>
                <div
                  className="flex-shrink-0 mt-0.5 h-6 w-6 rounded-full flex items-center justify-center font-bold text-xs"
                  style={{
                    backgroundColor: "#ef444422",
                    color: "#ef4444",
                    border: "1px solid #ef444433",
                  }}>
                  ✕
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="text-[10px] font-semibold tracking-widest uppercase rounded-full px-2 py-0.5"
                      style={{
                        backgroundColor: "#ef444422",
                        color: "#ef4444",
                      }}>
                      일반 업체
                    </span>
                    <span className="text-xs" style={{ color: "#444" }}>
                      {d.theme}
                    </span>
                  </div>
                  <p
                    className="text-sm md:text-base leading-relaxed whitespace-pre-line"
                    style={{
                      color: "#555",
                      textDecoration: "line-through",
                      textDecorationColor: "#ef444466",
                    }}>
                    {d.problem}
                  </p>
                </div>
              </div>
              <div
                className="flex items-start gap-3 px-5 py-5"
                style={{ backgroundColor: "#242424" }}>
                <div
                  className="flex-shrink-0 mt-0.5 h-6 w-6 rounded-full flex items-center justify-center text-white font-bold text-xs"
                  style={{ backgroundColor: "#2fae8a" }}>
                  ✓
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="text-[10px] font-semibold tracking-widest uppercase rounded-full px-2 py-0.5"
                      style={{
                        backgroundColor: "#2fae8a22",
                        color: "#2fae8a",
                      }}>
                      수리담
                    </span>
                    <span className="text-lg">{d.icon}</span>
                  </div>
                  <p
                    className="text-sm md:text-base font-semibold leading-relaxed whitespace-pre-line"
                    style={{ color: "#e5e5e5" }}>
                    {d.solution}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className="mt-8 rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{
            backgroundColor: "#2fae8a18",
            border: "1px solid #2fae8a55",
          }}>
          <div>
            <p className="text-xs mb-1" style={{ color: "#2fae8a" }}>
              수리담의 약속
            </p>
            <p
              className="text-sm md:text-base font-medium"
              style={{ color: "white" }}>
              위 4가지 기준, 수리담이 지키지 못하면{" "}
              <strong style={{ color: "#2fae8a" }}>
                출장비를 받지 않습니다.
              </strong>
            </p>
          </div>
          <a
            href="/request"
            className="flex-shrink-0 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 whitespace-nowrap"
            style={{ backgroundColor: "#2fae8a" }}>
            소파 사진 상담 →
          </a>
        </div>
      </div>
    </section>
  );
}
