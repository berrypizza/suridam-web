"use client";

import Image from "next/image";
import FadeIn from "@/app/components/FadeIn";

const photos = [
  { src: "/images/staff-1.jpg", alt: "현장 수리 1" },
  { src: "/images/staff-2.jpg", alt: "현장 수리 2" },
  { src: "/images/staff-10.jpg", alt: "현장 수리 3" },
  { src: "/images/staff-4.jpg", alt: "현장 수리 4" },
];

export default function StaffPhotos() {
  return (
    <section className="px-6 py-20" style={{ backgroundColor: "white" }}>
      <div className="mx-auto max-w-5xl">
        {/* ── 헤더 ── */}
        <FadeIn delay={0}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-10">
            <div>
              <span
                className="inline-block text-sm tracking-widest uppercase mb-5 px-3 py-1.5 rounded-full font-bold"
                style={{
                  backgroundColor: "#f5f5f5",
                  color: "#7a7a7a",
                  border: "1px solid #e5e5e5",
                }}>
                Our Work
              </span>
              {/* 규칙 1 상식파괴 + 6 호기심 */}
              <h2
                className="font-black leading-tight"
                style={{
                  fontSize: "clamp(2rem, 5vw, 3.2rem)",
                  color: "#1e1e1e",
                }}>
                140만원 견적서를
                <br />
                <span className="relative inline-block mt-1">
                  <span className="relative z-10">8만원으로 찢었습니다.</span>
                  <span
                    className="absolute bottom-1 left-0 w-full h-3 rounded"
                    style={{
                      backgroundColor: "#2fae8a",
                      opacity: 0.25,
                      zIndex: 0,
                    }}
                    aria-hidden="true"
                  />
                </span>
              </h2>
              {/* 규칙 2 경험/결과 권위 */}
              <p
                className="mt-5 text-lg md:text-xl leading-relaxed max-w-lg"
                style={{ color: "#888" }}>
                수리담이 방문한 현장의{" "}
                <strong style={{ color: "#1e1e1e" }}>
                  80%는 교체 없이 수리로 끝났습니다.
                </strong>
                <br />
                나머지 20%는 방문 전에 먼저 말씀드렸습니다. 출장비 없이.
              </p>
            </div>
            <div
              className="flex items-center gap-4 rounded-2xl px-6 py-5 flex-shrink-0 self-start"
              style={{
                backgroundColor: "#f0faf6",
                border: "1px solid #2fae8a",
              }}>
              <div
                className="h-10 w-10 rounded-full flex items-center justify-center text-white text-base font-black flex-shrink-0"
                style={{ backgroundColor: "#2fae8a" }}>
                ✓
              </div>
              <div>
                <p className="text-sm" style={{ color: "#888" }}>
                  교체 견적 받기 전에
                </p>
                <p className="text-lg font-black" style={{ color: "#1e1e1e" }}>
                  한 번만 더 물어보세요
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* ── 스토리 카드 (규칙 5 라포르 + 6 스토리텔링) ── */}
        <FadeIn delay={80}>
          <div
            className="mb-10 rounded-2xl px-7 py-6"
            style={{ backgroundColor: "#f0faf6", border: "1px solid #2fae8a" }}>
            {/* 규칙 1 명언 인용 */}
            <p
              className="text-sm italic mb-3 leading-relaxed font-medium"
              style={{
                color: "#1a5c42",
                borderLeft: "3px solid #2fae8a",
                paddingLeft: 14,
              }}>
              "사람들은 버리기 전에 한 번만 더 물어봤으면 한다."
              <br />
              <span
                className="not-italic font-bold"
                style={{ color: "#2fae8a" }}>
                — 수리담 기사, 현장 인터뷰 중
              </span>
            </p>
            {/* 스토리텔링 */}
            <p
              className="font-semibold leading-relaxed"
              style={{ fontSize: "clamp(1rem, 2.5vw, 1.1rem)", color: "#777" }}>
              인천 서구의 한 고객은 붙박이장 문짝이 탈선되자 가구점에 교체
              견적을 먼저 알아봤습니다.
              <br />
              <span style={{ color: "#1e1e1e", fontWeight: 700 }}>
                견적은 140만 원.
              </span>{" "}
              사진 한 장을 수리담에 보낸 건 반포기 심정이었다고 했어요.
              <br />
              수리비는{" "}
              <span style={{ color: "#2fae8a", fontWeight: 800 }}>8만 원</span>
              이었습니다.
            </p>
          </div>
        </FadeIn>

        {/* ── 사진 그리드 ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {photos.map((p, i) => (
            <FadeIn key={i} delay={i * 80}>
              <div
                className="group relative rounded-2xl overflow-hidden"
                style={{ border: "1px solid #e5e5e5" }}>
                <div
                  className="relative w-full aspect-square"
                  style={{ backgroundColor: "#e5e5e5" }}>
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ backgroundColor: "rgba(47,174,138,0.18)" }}
                  />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* ── 태그라인 ── */}
        <FadeIn delay={0}>
          <div className="mt-10 flex items-center gap-3">
            <div
              className="h-px flex-1"
              style={{ backgroundColor: "#e5e5e5" }}
            />
            <p
              className="text-base md:text-lg flex items-center gap-2 font-bold"
              style={{ color: "#777" }}>
              <span style={{ color: "#2fae8a" }}>✦</span>
              말이 아닌 결과로 증명합니다
              <span style={{ color: "#2fae8a" }}>✦</span>
            </p>
            <div
              className="h-px flex-1"
              style={{ backgroundColor: "#e5e5e5" }}
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
