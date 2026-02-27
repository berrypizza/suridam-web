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
    <section className="px-6 py-16" style={{ backgroundColor: "white" }}>
      <div className="mx-auto max-w-5xl">
        {/* 헤더 */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <p
              className="text-xs tracking-widest uppercase mb-3"
              style={{ color: "#7a7a7a" }}>
              Our Work
            </p>

            {/* 메인 카피 */}
            <h2
              className="text-2xl md:text-3xl font-bold leading-snug"
              style={{ color: "#1e1e1e" }}>
              수리담이 온다는 건,
              <br />
              <span className="relative inline-block mt-1">
                <span className="relative z-10">해결된다는 겁니다.</span>
                {/* 브랜드 컬러 밑줄 강조 */}
                <span
                  className="absolute bottom-1 left-0 w-full h-2 -z-0 rounded"
                  style={{ backgroundColor: "#2fae8a", opacity: 0.3 }}
                  aria-hidden="true"
                />
              </span>
            </h2>

            <p
              className="mt-3 text-sm leading-relaxed"
              style={{ color: "#7a7a7a" }}>
              가능한 경우에만 방문합니다. 수리담이 문을 두드렸다면,
              <br className="hidden md:block" />
              이미 해결될 수 있다고 판단한 겁니다.
            </p>
          </div>

          {/* 우측 수치 뱃지 */}
          <div
            className="flex items-center gap-3 rounded-2xl px-5 py-4 flex-shrink-0 self-start md:self-auto"
            style={{ backgroundColor: "#f0faf6", border: "1px solid #2fae8a" }}>
            <div
              className="h-8 w-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
              style={{ backgroundColor: "#2fae8a" }}>
              ✓
            </div>
            <div>
              <p className="text-xs" style={{ color: "#7a7a7a" }}>
                방문 전 사진으로 1차 판단
              </p>
              <p className="text-sm font-semibold" style={{ color: "#1e1e1e" }}>
                가능할 때만 출장 갑니다
              </p>
            </div>
          </div>
        </div>

        {/* 사진 그리드 — 모바일 2열 / PC 4열 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
                {/* 호버 오버레이 */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: "#2fae8a", opacity: 0 }}
                  onMouseOver={(e) => (e.currentTarget.style.opacity = "0.15")}
                  onMouseOut={(e) => (e.currentTarget.style.opacity = "0")}
                />
              </div>
            </div>
          ))}
        </div>

        {/* 하단 태그라인 */}
        <div className="mt-6 flex items-center gap-3">
          <div className="h-px flex-1" style={{ backgroundColor: "#e5e5e5" }} />
          <p className="text-xs" style={{ color: "#7a7a7a" }}>
            수리담은 결과로 말합니다
          </p>
          <div className="h-px flex-1" style={{ backgroundColor: "#e5e5e5" }} />
        </div>
      </div>
    </section>
  );
}
