export default function HookIntro() {
  return (
    <section className="relative h-screen overflow-hidden px-6 py-16 md:py-14">
      {/* 배경 비디오 */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 z-0 h-full w-full object-cover">
        <source src="/images/staff2.mp4" type="video/mp4" />
      </video>

      {/* 어두운 오버레이(가독성) */}
      <div className="absolute inset-0 z-10 bg-black/0" />

      {/* 내용(항상 위) */}
      <div className="relative z-20 mx-auto max-w-5xl">
        {/* 브랜드 + 신뢰 배지 */}
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-sm text-white">수리담 · 가구 출장 수리</p>
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
            style={{
              border: "1px solid #2fae8a",
              backgroundColor: "#f0faf6",
              color: "#2e9f83",
            }}>
            <span
              className="h-1.5 w-1.5 rounded-full inline-block flex-shrink-0"
              style={{ backgroundColor: "#2fae8a", fontWeight: "800" }}
            />
            행동으로 증명하는 수리 서비스
          </span>
        </div>

        {/* 메인 헤드라인 */}
        <h1 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-white">
          <span
            style={{ marginTop: "324px" }}
            className="relative inline-block">
            <span className="relative z-10">수리 전 사진 한 장,</span>
            <span
              className="absolute left-0 w-full rounded"
              style={{
                bottom: "0.05em",
                height: "0.35em",
                backgroundColor: "#2fae8a",
                opacity: 0.35,
                zIndex: 0,
              }}
              aria-hidden="true"
            />
          </span>
          <br />
          <span className="relative inline-block">
            <span className="relative z-10">수리 후 탄성 한 번</span>
            <span
              className="absolute left-0 w-full rounded"
              style={{
                bottom: "0.05em",
                height: "0.35em",
                backgroundColor: "#2fae8a",
                opacity: 0.35,
                zIndex: 0,
              }}
              aria-hidden="true"
            />
          </span>
        </h1>

        {/* 넛지 서브 카피 */}
        <div className="mt-5 max-w-xl">
          <p className="text-base leading-relaxed text-white">
            처음 오셨나요? 그렇다면{" "}
            <strong style={{ color: "#2fae8a" }}>그냥 믿지 마세요.</strong>
            <br />
            수리담이 자신 있는 이유, <strong>스크롤 3번</strong>이면 확인됩니다.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="/request"
            className="rounded-xl px-6 py-3.5 text-center font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#2fae8a" }}>
            사진 상담 시작하기 →
          </a>
          <a
            href="tel:01091273024"
            className="rounded-xl bg-white px-6 py-3.5 text-center font-semibold text-neutral-900 hover:opacity-80"
            style={{ border: "1px solid #e5e5e5" }}>
            📞 전화 문의
          </a>
        </div>

        {/* 스크롤 넛지 */}
        <div className="mt-10 flex w-fit animate-bounce items-center gap-2 text-sm text-neutral-200">
          <span>↓</span>
          <span>후기부터 먼저 보실게요</span>
        </div>
      </div>
    </section>
  );
}
