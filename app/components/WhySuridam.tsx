"use client";

import Image from "next/image";
import FadeIn from "@/app/components/FadeIn";

const diffs = [
  {
    icon: "📷",
    theme: "진단 방식",
    problem: "일단 방문부터\n현장에서 말이 바뀜",
    solution: "사진으로 1차 판단 후\n가능한 경우에만 방문합니다",
    image: "/images/why1.png",
    imageAlt: "사진으로 먼저 판단하는 모습",
  },
  {
    icon: "💬",
    theme: "견적 안내",
    problem: '"가봐야 알아요"\n방문 후 금액이 달라짐',
    solution: "범위를 먼저 공유하고\n납득 후에 진행합니다",
    image: "/images/why2.png",
    imageAlt: "비용 범위 미리 안내",
  },
  {
    icon: "✅",
    theme: "마무리 기준",
    problem: "수리 끝났다고 가버림\n기준이 없음",
    solution: "수평·유격·열림감·소음\n4가지 기준으로 확인합니다",
    image: "/images/why3.png",
    imageAlt: "기준으로 마무리 확인",
  },
  {
    icon: "🤝",
    theme: "솔직함",
    problem: '"할 수 있다" 해놓고\n결과가 애매함',
    solution: "어려우면 사진 보고\n먼저 말씀드립니다",
    image: "/images/why4.png",
    imageAlt: "솔직한 상담",
  },
];

export default function WhySuridam() {
  return (
    <section style={{ backgroundColor: "#0d0d0d" }}>
      <div className="px-6 py-20 mx-auto max-w-5xl">
        {/* 헤더 */}
        <FadeIn delay={0}>
          <div className="mb-14">
            <span
              className="inline-block text-sm tracking-widest uppercase mb-5 px-3 py-1.5 rounded-full font-bold"
              style={{
                backgroundColor: "#2fae8a22",
                color: "#2fae8a",
                border: "1px solid #2fae8a55",
              }}>
              Why Suridam
            </span>
            <h2
              className="font-black leading-tight mb-5"
              style={{
                fontSize: "clamp(2rem, 5.5vw, 3.5rem)",
                color: "white",
              }}>
              수리담에 <span style={{ color: "#2fae8a" }}>없는 것</span> 4가지
            </h2>
            <p
              className="text-lg md:text-xl leading-relaxed max-w-xl"
              style={{ color: "#888" }}>
              가구수리 업체를 고를 때<br />이 4가지 없는 곳 찾기가 가장
              어렵습니다.
            </p>
          </div>
        </FadeIn>

        {/* 카드 */}
        <div className="flex flex-col gap-6">
          {diffs.map((d, i) => (
            <FadeIn key={i} delay={i * 80}>
              <div
                className="rounded-2xl overflow-hidden"
                style={{ border: "1px solid #1e1e1e" }}>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_280px]">
                  {/* 일반 업체 */}
                  <div
                    className="flex items-start gap-4 px-6 py-7"
                    style={{
                      backgroundColor: "#161616",
                      borderBottom: "1px solid #1e1e1e",
                    }}>
                    <div
                      className="flex-shrink-0 mt-1 h-7 w-7 rounded-full flex items-center justify-center font-black text-xs"
                      style={{
                        backgroundColor: "#ef444415",
                        color: "#ef4444",
                        border: "1px solid #ef444433",
                      }}>
                      ✕
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className="text-xs font-black tracking-widest uppercase rounded-full px-2.5 py-0.5"
                          style={{
                            backgroundColor: "#ef444415",
                            color: "#ef4444",
                          }}>
                          일반 업체
                        </span>
                        <span
                          className="text-sm font-semibold"
                          style={{ color: "#555" }}>
                          {d.theme}
                        </span>
                      </div>
                      <p
                        className="text-lg md:text-xl leading-relaxed whitespace-pre-line"
                        style={{
                          color: "#888",
                          textDecoration: "line-through",
                          textDecorationColor: "#ef4444aa",
                        }}>
                        {d.problem}
                      </p>
                    </div>
                  </div>

                  {/* 수리담 */}
                  <div
                    className="flex items-start gap-4 px-6 py-7"
                    style={{
                      backgroundColor: "#121212",
                      borderBottom: "1px solid #1e1e1e",
                    }}>
                    <div
                      className="flex-shrink-0 mt-1 h-7 w-7 rounded-full flex items-center justify-center text-white font-black text-xs"
                      style={{ backgroundColor: "#2fae8a" }}>
                      ✓
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className="text-xs font-black tracking-widest uppercase rounded-full px-2.5 py-0.5"
                          style={{
                            backgroundColor: "#2fae8a22",
                            color: "#2fae8a",
                          }}>
                          수리담
                        </span>
                        <span className="text-lg">{d.icon}</span>
                      </div>
                      <p
                        className="text-lg md:text-xl font-bold leading-relaxed whitespace-pre-line"
                        style={{ color: "white" }}>
                        {d.solution}
                      </p>
                    </div>
                  </div>

                  {/* 이미지 */}
                  <div
                    className="relative w-full overflow-hidden"
                    style={{ backgroundColor: "#0a0a0a", minHeight: "180px" }}>
                    <Image
                      src={d.image}
                      alt={d.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 280px"
                      className="object-cover opacity-80"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(47,174,138,0.2) 0%, transparent 60%)",
                      }}
                    />
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* 하단 약속 */}
        <FadeIn delay={0}>
          <div
            className="mt-10 rounded-2xl px-7 py-7 flex flex-col sm:flex-row items-center justify-between gap-5"
            style={{
              backgroundColor: "#2fae8a15",
              border: "1px solid #2fae8a55",
            }}>
            <div>
              <p
                className="text-base font-black mb-2"
                style={{ color: "#2fae8a" }}>
                수리담의 약속
              </p>
              <p
                className="text-lg md:text-xl font-bold leading-snug"
                style={{ color: "white" }}>
                위 4가지 지키지 못하면{" "}
                <strong style={{ color: "#2fae8a" }}>
                  출장비를 받지 않습니다.
                </strong>
              </p>
            </div>
            <a
              href="/request"
              className="flex-shrink-0 rounded-xl px-7 py-4 text-base font-black text-white transition-opacity hover:opacity-90 whitespace-nowrap"
              style={{ backgroundColor: "#2fae8a" }}>
              사진 상담 시작하기 →
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
