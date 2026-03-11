import FadeIn from "@/app/components/FadeIn";

const episodes = [
  {
    icon: "🔧",
    label: "AS 이야기",
    title: "다시 왔습니다. 돈은 없습니다.",
    story: `수리를 마치고 한 달쯤 지났을 때 연락이 왔습니다.
같은 부위에서 소리가 난다고요.
다시 방문했습니다.
제가 마무리를 덜 한 부분이 있었어요.

고객분이 현관에서 지갑을 꺼내셨습니다.
"얼마예요?"

"없습니다."

고객분이 잠깐 멈추셨어요.
그리고 말씀하셨습니다.
"이런 사람인 줄 몰랐어요."`,
    point: "같은 부위 재발 시 1년 무상 AS 출장비·공임 없음",
  },
  {
    icon: "💡",
    label: "더 받을 수 있었는데",
    title: "5개 중 2개만 청구했습니다.",
    story: `경첩 5개를 다 교체해달라는 요청이었습니다.
현장에 가보니 실제로 문제가 있는 건 2개였어요.
나머지 3개는 아직 멀쩡했습니다.

5개 기준으로 견적을 받으셨으니
그냥 다 갈아도 됐습니다.
말 안 하면 모르는 일이었어요.

2개만 고쳤습니다.
2개 비용만 받았습니다.

고객분이 의아해하셨어요.
"왜 다 안 갈아요?"
"멀쩡한 걸 굳이 바꿀 이유가 없어서요."`,
    point: "필요한 것만 고칩니다. 필요한 것만 청구합니다.",
  },
  {
    icon: "🛋",
    label: "사지 마세요",
    title: "180만원짜리 소파 구매를 취소시켰습니다.",
    story: `"소파를 새로 사려는데, 혹시 고칠 수 있나요?"
장바구니에 이미 담아두셨다고 했어요.

사진을 보냈더니 충분히 수리가 가능한 상태였습니다.
목대가 주저앉은 거라 스프링만 교체하면 됐어요.

"취소하세요. 고칠 수 있어요."

수리비는 24만원이었습니다.
156만원을 아끼셨습니다.

고객분이 말씀하셨어요.
"이렇게 말해주는 데가 어딨어요."`,
    point: "고칠 수 있으면 고칠 수 있다고 먼저 말합니다.",
  },
];

export default function HonestSection() {
  return (
    <section style={{ backgroundColor: "#0a0a0a" }}>
      <div className="px-6 py-24 mx-auto max-w-3xl">
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

        {/* 헤드라인 — 규칙 1 상식파괴 + 6 호기심 */}
        <FadeIn delay={80}>
          <h2
            className="font-black leading-[1.08] tracking-tight mb-4"
            style={{ fontSize: "clamp(2rem, 5.5vw, 3.5rem)", color: "white" }}>
            돈 안 되는 일을
            <br />
            <span style={{ color: "#2fae8a" }}>굳이 했습니다.</span>
          </h2>
        </FadeIn>

        {/* 라포르 — 규칙 5 */}
        <FadeIn delay={140}>
          <p
            className="text-lg leading-relaxed mb-14"
            style={{ color: "#888" }}>
            착하다는 말 듣고 싶어서가 아닙니다.
            <br />
            <span style={{ color: "rgba(255,255,255,0.65)" }}>
              그게 오래 하는 방법이라는 걸 알기 때문입니다.
            </span>
          </p>
        </FadeIn>

        {/* 에피소드 카드 */}
        <div className="flex flex-col gap-5 mb-14">
          {episodes.map((ep, i) => (
            <FadeIn key={i} delay={i * 120}>
              <div
                className="rounded-2xl overflow-hidden"
                style={{ border: "1px solid #1e1e1e" }}>
                {/* 헤더 */}
                <div
                  className="flex items-center gap-3 px-6 py-4"
                  style={{
                    backgroundColor: "#111",
                    borderBottom: "1px solid #1a1a1a",
                  }}>
                  <span style={{ fontSize: 18 }}>{ep.icon}</span>
                  <div>
                    <p
                      className="text-sm font-bold uppercase tracking-widest mb-1"
                      style={{ color: "#2fae8a", letterSpacing: "0.1em" }}>
                      {ep.label}
                    </p>
                    <p
                      className="font-black leading-snug"
                      style={{
                        fontSize: "clamp(1.1rem, 2.8vw, 1.3rem)",
                        color: "white",
                      }}>
                      {ep.title}
                    </p>
                  </div>
                </div>

                {/* 스토리 — 규칙 6 스토리텔링 */}
                <div
                  className="px-6 py-5"
                  style={{ backgroundColor: "#0d0d0d" }}>
                  <p
                    className="leading-[2] mb-5 whitespace-pre-line"
                    style={{
                      fontSize: "clamp(1rem, 2.2vw, 1.05rem)",
                      color: "#bbb",
                    }}>
                    {ep.story}
                  </p>
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
                      {ep.point}
                    </span>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* 명언 — 규칙 1 */}
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
