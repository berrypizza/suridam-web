export default function ContactCTA() {
  const steps = [
    { num: "01", text: "가구 사진 1~3장 찍기" },
    { num: "02", text: "지역 + 증상 한 줄 적기" },
    { num: "03", text: "수리 가능 여부 + 비용 범위 안내" },
  ];

  const badges = [
    "수리 불가 시 먼저 말씀드립니다",
    "방문 전 사진으로 1차 판단",
    "비용 범위 먼저 공유",
  ];

  return (
    <section className="px-6 py-20" style={{ backgroundColor: "#f5f5f5" }}>
      <div className="mx-auto max-w-5xl">
        {/* 클로징 후킹 */}
        <div className="text-center">
          <p
            className="text-xs tracking-widest uppercase mb-3"
            style={{ color: "#7a7a7a" }}>
            Contact
          </p>
          <h2
            className="text-2xl md:text-3xl font-bold leading-snug"
            style={{ color: "#1e1e1e" }}>
            스크롤 3번 다 보셨나요?
          </h2>
          <p
            className="mt-2 text-xl md:text-2xl font-normal"
            style={{ color: "#7a7a7a" }}>
            그럼 이제 사진 한 장만 보내주세요.
          </p>
          <p className="mt-3 text-sm" style={{ color: "#7a7a7a" }}>
            가능한지부터 먼저 정리해드립니다. 비용 걱정 전에 여부 확인이
            먼저입니다.
          </p>
        </div>

        {/* 3단계 프로세스 */}
        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.num}
              className="rounded-2xl px-5 py-5 flex items-start gap-4"
              style={{ backgroundColor: "white", border: "1px solid #e5e5e5" }}>
              <span
                className="text-2xl font-bold leading-none select-none flex-shrink-0"
                style={{ color: "#e5e5e5" }}>
                {s.num}
              </span>
              <p
                className="text-sm font-medium leading-relaxed pt-0.5"
                style={{ color: "#1e1e1e" }}>
                {s.text}
              </p>
            </div>
          ))}
        </div>

        {/* CTA 버튼 */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="https://suridam.vercel.app/"
            className="rounded-xl px-7 py-4 text-white font-semibold text-center transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#2fae8a" }}>
            사진 상담 시작하기 →
          </a>
          <a
            href="tel:01091273024"
            className="rounded-xl px-7 py-4 font-semibold text-center transition-colors hover:opacity-70"
            style={{
              border: "1px solid #e5e5e5",
              color: "#1e1e1e",
              backgroundColor: "white",
            }}>
            📞 010-9127-3024
          </a>
        </div>

        {/* 신뢰 배지 3개 — HookIntro와 동일한 언어로 마무리 */}
        <div
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm"
          style={{ color: "#7a7a7a" }}>
          {badges.map((b, i) => (
            <>
              <span key={b} className="flex items-center gap-1.5">
                <span
                  className="h-1.5 w-1.5 rounded-full inline-block flex-shrink-0"
                  style={{ backgroundColor: "#2fae8a" }}
                />
                {b}
              </span>
              {i < badges.length - 1 && (
                <span
                  key={`dot-${i}`}
                  className="hidden sm:block"
                  style={{ color: "#e5e5e5" }}>
                  ·
                </span>
              )}
            </>
          ))}
        </div>
      </div>
    </section>
  );
}
