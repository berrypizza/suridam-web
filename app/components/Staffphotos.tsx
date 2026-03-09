"use client";
import Image from "next/image";

const photos = [
  { src: "/images/staff-1.jpg", alt: "현장 수리 작업 1" },
  { src: "/images/staff-2.jpg", alt: "현장 수리 작업 2" },
  { src: "/images/staff-3.jpg", alt: "현장 수리 작업 3" },
  { src: "/images/staff-4.jpg", alt: "현장 수리 작업 4" },
];

export default function StaffPhotos() {
  return (
    <section className="px-6 py-20" style={{ backgroundColor: "white" }}>
      <div className="mx-auto max-w-5xl">
        {/* 헤더 */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <span
              className="inline-block text-sm tracking-widest uppercase mb-4 px-3 py-1 rounded-full font-semibold"
              style={{
                backgroundColor: "#f5f5f5",
                color: "#7a7a7a",
                border: "1px solid #e5e5e5",
              }}>
              Our Work
            </span>

            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-snug"
              style={{ color: "#1e1e1e" }}>
              수리담이 온다는 건,
              <br />
              <span className="relative inline-block mt-1">
                <span className="relative z-10">해결된다는 겁니다.</span>
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
              className="mt-4 text-base md:text-lg leading-relaxed"
              style={{ color: "#666" }}>
              불필요한 교체를 권하지 않습니다.
              <br className="hidden md:block" />
              고칠 수 있으면 고치고, 안 되면 안 된다고 먼저 말합니다.
            </p>
          </div>

          <div
            className="flex items-center gap-3 rounded-2xl px-5 py-4 flex-shrink-0 self-start"
            style={{ backgroundColor: "#f0faf6", border: "1px solid #2fae8a" }}>
            <div
              className="h-9 w-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
              style={{ backgroundColor: "#2fae8a" }}>
              ✓
            </div>

            <div>
              <p className="text-sm" style={{ color: "#666" }}>
                방문 전 사진으로 1차 판단
              </p>
              <p
                className="text-base md:text-lg font-semibold"
                style={{ color: "#1e1e1e" }}>
                가능할 때만 출장 갑니다
              </p>
            </div>
          </div>
        </div>

        {/* 사진 그리드 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {photos.map((p, i) => (
            <div
              key={i}
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
                  style={{ backgroundColor: "rgba(47,174,138,0.15)" }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* 태그라인 */}
        <div className="mt-8 flex items-center gap-3">
          <div className="h-px flex-1" style={{ backgroundColor: "#e5e5e5" }} />

          <p
            className="text-sm md:text-base flex items-center gap-2 font-medium"
            style={{ color: "#666" }}>
            <span style={{ color: "#2fae8a" }}>✦</span>
            수리담은 결과로 말합니다
            <span style={{ color: "#2fae8a" }}>✦</span>
          </p>

          <div className="h-px flex-1" style={{ backgroundColor: "#e5e5e5" }} />
        </div>
      </div>
    </section>
  );
}
