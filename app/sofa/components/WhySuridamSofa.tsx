"use client";

import Image from "next/image";

const diffs = [
  {
    icon: "📷",
    theme: "소파 꺼짐 복원 조율",
    problem: "일단 돌덩이 처럼\n딴딴하게만 만드는 업체",
    solution: "소파 수리 중간에\n쿠션 꺼짐 정도 조율합니다.",
    image: "/images/why-sofa1.png",
    imageAlt: "소파 쿠션 꺼짐 정도를 조율하는 모습",
  },
  {
    icon: "🛋️",
    theme: "추가 비용",
    problem: "방문해서 견적이\n달라지는 업체",
    solution: "추가 비용 일절\n없습니다",
    image: "/images/why-sofa2.png",
    imageAlt: "추가 비용 없이 약속대로 마무리하는 모습",
  },
  {
    icon: "💬",
    theme: "비용 안내",
    problem: "비용은\n'가봐야 알아요'로 끝",
    solution: "범위를 먼저 공유하고\n납득 후 진행합니다",
    image: "/images/why-sofa3.png",
    imageAlt: "비용 범위를 미리 안내하는 모습",
  },
  {
    icon: "✅",
    theme: "마무리 기준",
    problem: "수리 후\n마무리 기준이 없음",
    solution: "탄성·복원력·소음\n기준으로 확인합니다",
    image: "/images/why-sofa4.png",
    imageAlt: "탄성과 복원력 기준으로 마무리 확인하는 모습",
  },
];

export default function WhySuridamSofa() {
  return (
    <section style={{ backgroundColor: "#1e1e1e" }}>
      <div className="px-6 py-20 mx-auto max-w-5xl">
        {/* 헤더 */}
        <div className="mb-14">
          <span
            className="inline-block text-sm tracking-widest uppercase mb-4 px-3 py-1 rounded-full font-semibold"
            style={{
              backgroundColor: "#2fae8a22",
              color: "#2fae8a",
              border: "1px solid #2fae8a55",
            }}>
            Why Suridam
          </span>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2
              className="text-3xl md:text-4xl font-bold"
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

        {/* 카드 */}
        <div className="flex flex-col gap-8">
          {diffs.map((d, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden"
              style={{ border: "1px solid #2a2a2a" }}>
              <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_300px]">
                {/* 일반 업체 */}
                <div
                  className="flex items-start gap-4 px-6 py-6"
                  style={{
                    backgroundColor: "#2a2a2a",
                    borderBottom: "1px solid #2e2e2e",
                  }}>
                  <div
                    className="flex-shrink-0 mt-1 h-6 w-6 rounded-full flex items-center justify-center font-bold text-xs"
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
                        className="text-xs font-semibold tracking-widest uppercase rounded-full px-2 py-0.5"
                        style={{
                          backgroundColor: "#ef444422",
                          color: "#ef4444",
                        }}>
                        일반 업체
                      </span>

                      <span
                        className="text-sm font-semibold"
                        style={{ color: "#888" }}>
                        {d.theme}
                      </span>
                    </div>

                    <p
                      className="text-base md:text-lg leading-loose whitespace-pre-line"
                      style={{
                        color: "#cfcfcf",
                        textDecoration: "line-through",
                        textDecorationColor: "#ff4d4db7",
                      }}>
                      {d.problem}
                    </p>
                  </div>
                </div>

                {/* 수리담 */}
                <div
                  className="flex items-start gap-4 px-6 py-6"
                  style={{
                    backgroundColor: "#242424",
                    borderBottom: "1px solid #2e2e2e",
                  }}>
                  <div
                    className="flex-shrink-0 mt-1 h-6 w-6 rounded-full flex items-center justify-center text-white font-bold text-xs"
                    style={{ backgroundColor: "#2fae8a" }}>
                    ✓
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="text-xs font-semibold tracking-widest uppercase rounded-full px-2 py-0.5"
                        style={{
                          backgroundColor: "#2fae8a22",
                          color: "#2fae8a",
                        }}>
                        수리담
                      </span>

                      <span className="text-lg">{d.icon}</span>
                    </div>

                    <p
                      className="text-base md:text-lg font-semibold leading-loose whitespace-pre-line"
                      style={{ color: "#ffffff" }}>
                      {d.solution}
                    </p>
                  </div>
                </div>

                {/* 이미지 */}
                <div
                  className="relative w-full h-44 md:h-auto overflow-hidden"
                  style={{ backgroundColor: "#1a1a1a", minHeight: "180px" }}>
                  <Image
                    src={d.image}
                    alt={d.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover"
                  />

                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(47,174,138,0.15) 0%, transparent 60%)",
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 하단 배너 */}
        <div
          className="mt-10 rounded-2xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{
            backgroundColor: "#2fae8a18",
            border: "1px solid #2fae8a55",
          }}>
          <div>
            <p
              className="text-sm mb-1 font-semibold"
              style={{ color: "#2fae8a" }}>
              수리담의 약속
            </p>

            <p
              className="text-base md:text-lg font-medium"
              style={{ color: "white" }}>
              위 4가지 기준, 수리담이 지키지 못하면{" "}
              <strong style={{ color: "#2fae8a" }}>
                출장비를 받지 않습니다.
              </strong>
            </p>
          </div>

          <a
            href="/request"
            className="flex-shrink-0 rounded-xl px-6 py-3 text-base font-semibold text-white transition-opacity hover:opacity-90 whitespace-nowrap"
            style={{ backgroundColor: "#2fae8a" }}>
            소파 사진 상담 →
          </a>
        </div>
      </div>
    </section>
  );
}
