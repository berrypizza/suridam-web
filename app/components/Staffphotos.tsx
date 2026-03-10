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
        {/* 헤더 */}
        <FadeIn delay={0}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">
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
              <h2
                className="font-black leading-tight"
                style={{
                  fontSize: "clamp(2rem, 5vw, 3.2rem)",
                  color: "#1e1e1e",
                }}>
                교체 전,
                <br />
                <span className="relative inline-block mt-1">
                  <span className="relative z-10">
                    한 번만 더 확인해보세요.
                  </span>
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
              <p
                className="mt-5 text-lg md:text-xl leading-relaxed max-w-lg"
                style={{ color: "#555" }}>
                수리담이 온 현장의 80%는
                <br />
                교체 없이 수리로 해결됐습니다.
                <br />
                <span className="font-bold" style={{ color: "#1e1e1e" }}>
                  고칠 수 있으면 고칩니다. 안 되면 먼저 말합니다.
                </span>
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
                <p className="text-sm" style={{ color: "#555" }}>
                  방문 전 사진으로 1차 판단
                </p>
                <p className="text-lg font-black" style={{ color: "#1e1e1e" }}>
                  가능할 때만 출장 갑니다
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* 사진 그리드 */}
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

        {/* 태그라인 */}
        <FadeIn delay={0}>
          <div className="mt-10 flex items-center gap-3">
            <div
              className="h-px flex-1"
              style={{ backgroundColor: "#e5e5e5" }}
            />
            <p
              className="text-base md:text-lg flex items-center gap-2 font-bold"
              style={{ color: "#444" }}>
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
