export default function HookIntro() {
  return (
    <section className="px-6 py-16 md:py-24 bg-white">
      <div className="mx-auto max-w-5xl">
        {/* 브랜드 + 신뢰 배지 */}
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-sm" style={{ color: "#7a7a7a" }}>
            수리담 · 가구 출장 수리
          </p>
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
            style={{
              border: "1px solid #2fae8a",
              backgroundColor: "#f0faf6",
              color: "#2e9f83",
            }}>
            <span
              className="h-1.5 w-1.5 rounded-full inline-block flex-shrink-0"
              style={{ backgroundColor: "#2fae8a" }}
            />
            안 되는 건 안 된다고 먼저 말합니다
          </span>
        </div>

        {/* 메인 헤드라인 */}
        <h1
          className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight"
          style={{ color: "#1e1e1e" }}>
          수리 전 사진 한 장,
          <br />
          수리 후 탄성 한 번{" "}
          <span className="relative inline-block">
            <span className="relative z-10">— 직접 확인하세요.</span>
            <span
              className="absolute bottom-1 left-0 w-full h-2 -z-0 rounded"
              style={{ backgroundColor: "#2fae8a", opacity: 0.35 }}
              aria-hidden="true"
            />
          </span>
        </h1>

        {/* 넛지 서브 카피 */}
        <div
          className="mt-5 max-w-xl rounded-2xl px-5 py-4"
          style={{ backgroundColor: "#f5f5f5", border: "1px solid #e5e5e5" }}>
          <p className="text-base leading-relaxed" style={{ color: "#1e1e1e" }}>
            처음 오셨나요? 그렇다면 <strong>그냥 믿지 마세요.</strong>
            <br />
            수리담이 자신 있는 이유, <strong>스크롤 3번</strong>이면 확인됩니다.
          </p>
        </div>

        {/* CTA 버튼 */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <a
            href="https://suridam.vercel.app/"
            className="rounded-xl px-6 py-3.5 text-white text-center font-semibold transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#2fae8a" }}>
            사진 상담 시작하기 →
          </a>
          <a
            href="tel:01091273024"
            className="rounded-xl px-6 py-3.5 text-center font-semibold transition-colors hover:opacity-80"
            style={{
              border: "1px solid #e5e5e5",
              color: "#1e1e1e",
              backgroundColor: "white",
            }}>
            📞 전화 문의
          </a>
        </div>

        {/* 스크롤 넛지 */}
        <div
          className="mt-10 flex items-center gap-2 text-sm animate-bounce w-fit"
          style={{ color: "#7a7a7a" }}>
          <span>↓</span>
          <span>후기부터 먼저 보실게요</span>
        </div>
      </div>
    </section>
  );
}
