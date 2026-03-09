export default function HookIntroSofa() {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* 배경 이미지 */}
      <img
        src="/images/staff-main3.png"
        alt="Staff"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />

      {/* 오버레이 */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.96) 100%)",
        }}
      />

      {/* 내용 */}
      <div className="absolute bottom-0 left-0 right-0 z-20 mx-auto max-w-5xl px-6 pb-12 md:pb-14">
        {/* 브랜드 + 배지 */}
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <p className="text-sm md:text-base font-medium text-white/80">
            수리담 · 소파 꺼짐 수리
          </p>

          <span
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold"
            style={{
              border: "1px solid #2fae8a",
              backgroundColor: "#f0faf6",
              color: "#2e9f83",
            }}>
            <span
              className="h-2 w-2 rounded-full inline-block flex-shrink-0"
              style={{ backgroundColor: "#2fae8a" }}
            />
            교체 전 꼭 확인하세요
          </span>
        </div>

        {/* 메인 헤드라인 */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] tracking-tight text-white">
          <span className="relative inline-block">
            <span className="relative z-10">소파 수리 전 사진 한 장,</span>
            <span
              className="absolute left-0 w-full rounded"
              style={{
                bottom: "0.08em",
                height: "0.32em",
                backgroundColor: "#2fae8a",
                opacity: 0.4,
                zIndex: 0,
              }}
              aria-hidden="true"
            />
          </span>
          <br />
          <span className="relative inline-block mt-1">
            <span className="relative z-10">수리 후 탄성 한 번.</span>
            <span
              className="absolute left-0 w-full rounded"
              style={{
                bottom: "0.08em",
                height: "0.32em",
                backgroundColor: "#2fae8a",
                opacity: 0.4,
                zIndex: 0,
              }}
              aria-hidden="true"
            />
          </span>
        </h1>

        {/* 서브 카피 */}
        <div className="mt-5 max-w-2xl">
          <p className="text-base md:text-lg leading-relaxed text-white/90">
            새 소파 사기 전,{" "}
            <strong
              style={{
                backgroundColor: "#2fae8a",
                padding: "0 6px",
                borderRadius: 6,
                color: "white",
              }}>
              수리 가능한지 먼저 보세요.
            </strong>
            <br className="hidden sm:block" />
            수리담이 자신 있는 이유, <strong>스크롤 3번</strong>이면 확인됩니다.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <a
            href="/request"
            className="rounded-xl px-7 py-4 text-center text-base md:text-lg font-bold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#2fae8a" }}>
            소파 사진 상담 시작하기 →
          </a>

          <a
            href="tel:01091273024"
            className="rounded-xl px-7 py-4 text-center text-base md:text-lg font-semibold transition-opacity hover:opacity-80"
            style={{
              backgroundColor: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.4)",
              color: "white",
              backdropFilter: "blur(8px)",
            }}>
            📞 전화 문의
          </a>
        </div>

        {/* 스크롤 넛지 */}
        <div className="mt-9 flex w-fit animate-bounce items-center gap-2 text-sm md:text-base font-medium text-white/70">
          <span>↓</span>
          <span>후기부터 먼저 보실게요</span>
        </div>
      </div>
    </section>
  );
}
