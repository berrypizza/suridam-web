export default function HookIntro() {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* 배경 비디오 */}
      {/* <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/images/staff.gif"
        controls={false}
        disablePictureInPicture
        controlsList="nodownload noplaybackrate noremoteplayback"
        className="absolute inset-0 z-0 h-full w-full object-cover">
        <source src="/images/staff2.mp4" type="video/mp4" />
      </video> */}
      <img
        src="/images/staff-main3.png"
        alt="Staff"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />

      {/* 하단 그라디언트 오버레이 — 텍스트 가독성 */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0) 7%, rgba(0, 0, 0, 0.99) 100%)",
        }}
      />

      {/* 내용 — 하단 고정 */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-6 pb-12 mx-auto max-w-5xl">
        {/* 브랜드 + 신뢰 배지 */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <p className="text-sm text-white/80">수리담 · 가구 출장 수리</p>
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
            style={{
              border: "1px solid #2fae8a",
              backgroundColor: "#f0faf6",
              color: "#2e9f83",
              fontWeight: "700",
            }}>
            <span
              className="h-1.5 w-1.5 rounded-full inline-block flex-shrink-0"
              style={{ backgroundColor: "#2fae8a" }}
            />
            행동으로 증명하는 수리 서비스
          </span>
        </div>

        {/* 메인 헤드라인 */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-white">
          <span className="relative inline-block">
            <span className="relative z-10">가구 수리 전 사진 한 장,</span>
            <span
              className="absolute left-0 w-full rounded"
              style={{
                bottom: "0.05em",
                height: "0.35em",
                backgroundColor: "#2fae8a",
                opacity: 0.45,
                zIndex: 0,
              }}
              aria-hidden="true"
            />
          </span>
          <br />
          <span className="relative inline-block">
            <span className="relative z-10">수리 후 탄성 한 번.</span>
            <span
              className="absolute left-0 w-full rounded"
              style={{
                bottom: "0.05em",
                height: "0.35em",
                backgroundColor: "#2fae8a",
                opacity: 0.45,
                zIndex: 0,
              }}
              aria-hidden="true"
            />
          </span>
        </h1>

        {/* 넛지 서브 카피 */}
        <div className="mt-4 max-w-xl">
          <p className="text-base leading-relaxed text-white/90">
            처음 오셨나요? 그렇다면{" "}
            <strong
              style={{
                backgroundColor: "#2fae8a",
                padding: "0 4px",
                borderRadius: 4,
              }}>
              그냥 믿지 마세요.
            </strong>
            <br />
            수리담이 자신 있는 이유, <strong>스크롤 3번</strong>이면 확인됩니다.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href="/request"
            className="rounded-xl px-6 py-3.5 text-center font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#2fae8a" }}>
            사진 상담 시작하기 →
          </a>
          <a
            href="tel:01091273024"
            className="rounded-xl px-6 py-3.5 text-center font-semibold transition-opacity hover:opacity-80"
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
        <div className="mt-8 flex w-fit animate-bounce items-center gap-2 text-sm text-white/60">
          <span>↓</span>
          <span>후기부터 먼저 보실게요</span>
        </div>
      </div>
    </section>
  );
}
