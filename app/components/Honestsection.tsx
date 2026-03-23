import FadeIn from "@/app/components/FadeIn";

export default function HonestSection() {
  return (
    <section style={{ backgroundColor: "#0a0a0a" }}>
      <div className="px-6 py-20 mx-auto max-w-3xl">
        {/* 배지 */}
        <FadeIn delay={0}>
          <span
            className="inline-block text-sm tracking-widest uppercase mb-6 px-3 py-1.5 rounded-full font-bold"
            style={{
              backgroundColor: "#2fae8a18",
              color: "#2fae8a",
              border: "1px solid #2fae8a44",
            }}>
            Real Stories
          </span>
        </FadeIn>

        {/* 헤드라인 */}
        <FadeIn delay={80}>
          <h2
            className="font-black leading-[1.08] tracking-tight mb-4"
            style={{ fontSize: "clamp(2rem, 5.5vw, 3.5rem)", color: "white" }}>
            돈 안 되는 일을
            <br />
            <span style={{ color: "#2fae8a" }}>굳이 했습니다.</span>
          </h2>
        </FadeIn>

        <FadeIn delay={140}>
          <p
            className="text-lg leading-relaxed mb-10"
            style={{ color: "#888" }}>
            착하다는 말 듣고 싶어서가 아닙니다.
            <br />
            <span style={{ color: "rgba(255,255,255,0.65)" }}>
              그게 오래 하는 방법이라는 걸 알기 때문입니다.
            </span>
          </p>
        </FadeIn>

        {/* ── 메인 에피소드 1개 — 소파 ── */}
        <FadeIn delay={0}>
          <div
            className="rounded-2xl overflow-hidden mb-6"
            style={{ border: "1px solid #1e1e1e" }}>
            {/* 헤더 */}
            <div
              className="flex items-center gap-3 px-6 py-4"
              style={{
                backgroundColor: "#111",
                borderBottom: "1px solid #1a1a1a",
              }}>
              <span style={{ fontSize: 18 }}>🛋</span>
              <div>
                <p
                  className="text-sm font-bold uppercase tracking-widest mb-1"
                  style={{ color: "#2fae8a", letterSpacing: "0.1em" }}>
                  사지 마세요
                </p>
                <p
                  className="font-black leading-snug"
                  style={{
                    fontSize: "clamp(1.1rem, 2.8vw, 1.3rem)",
                    color: "white",
                  }}>
                  180만원짜리 소파 구매를 취소시켰습니다.
                </p>
              </div>
            </div>

            {/* 스토리 */}
            <div className="px-6 py-5" style={{ backgroundColor: "#0d0d0d" }}>
              <p
                className="leading-[2] mb-5 whitespace-pre-line"
                style={{
                  fontSize: "clamp(1rem, 2.2vw, 1.05rem)",
                  color: "#bbb",
                }}>
                {`"소파를 새로 사려는데, 혹시 고칠 수 있나요?"
장바구니에 이미 담아두셨다고 했어요.

사진을 보냈더니 충분히 수리가 가능한 상태였습니다.
목대가 주저앉은 거라 스프링만 교체하면 됐어요.

"취소하세요. 고칠 수 있어요."

수리비는 24만원이었습니다.
156만원을 아끼셨습니다.

고객분이 말씀하셨어요.
"이렇게 말해주는 데가 어딨어요."`}
              </p>

              {/* 포인트 배지 */}
              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-2"
                style={{
                  backgroundColor: "#2fae8a15",
                  border: "1px solid #2fae8a44",
                }}>
                <span style={{ color: "#2fae8a", fontSize: 15 }}>✦</span>
                <span
                  className="text-base font-bold"
                  style={{ color: "#2fae8a" }}>
                  고칠 수 있으면 고칠 수 있다고 먼저 말합니다.
                </span>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* ── 나머지 2개 — 배지로 압축 ── */}
        <FadeIn delay={80}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
            <div
              className="rounded-2xl px-5 py-4 flex items-start gap-4"
              style={{ backgroundColor: "#111", border: "1px solid #1e1e1e" }}>
              <span style={{ fontSize: 20, flexShrink: 0 }}>🔧</span>
              <div>
                <p
                  className="text-sm font-black mb-1"
                  style={{ color: "#2fae8a" }}>
                  1년 무상 AS
                </p>
                <p className="text-sm leading-snug" style={{ color: "#777" }}>
                  "얼마예요?" "없습니다."
                  <br />
                  같은 부위 재발 시 출장비·공임 0원.
                </p>
              </div>
            </div>

            <div
              className="rounded-2xl px-5 py-4 flex items-start gap-4"
              style={{ backgroundColor: "#111", border: "1px solid #1e1e1e" }}>
              <span style={{ fontSize: 20, flexShrink: 0 }}>💡</span>
              <div>
                <p
                  className="text-sm font-black mb-1"
                  style={{ color: "#2fae8a" }}>
                  필요한 것만 청구
                </p>
                <p className="text-sm leading-snug" style={{ color: "#777" }}>
                  경첩 5개 요청 → 멀쩡한 3개 그대로.
                  <br />
                  2개 비용만 받았습니다.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* 명언 */}
        <FadeIn delay={0}>
          <div
            className="rounded-2xl px-6 py-5"
            style={{
              backgroundColor: "#0d2318",
              border: "1px solid #2fae8a66",
            }}>
            <p
              className="text-base italic leading-relaxed font-medium"
              style={{
                color: "#a8e8d0",
                borderLeft: "3px solid #2fae8a",
                paddingLeft: 16,
              }}>
              "한 번 제대로 하면 다시 찾아옵니다.
              <br />두 번 대충 하면 다시는 안 옵니다."
            </p>
            <p className="text-sm mt-3 font-bold" style={{ color: "#2fae8a" }}>
              — 수리담 기사, 현장에서
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
