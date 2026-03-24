import FadeIn from "@/app/components/FadeIn";

export default function Intro() {
  const cardStyle = { backgroundColor: "#1e1e1e", border: "1px solid #2a2a2a" };
  const valueStyle: React.CSSProperties = {
    color: "#2fae8a",
    fontSize: "2.4rem",
    fontWeight: 900,
    lineHeight: 1,
  };

  const yesSet = [
    "기사가 오더니 '이거 교체하는 게 낫겠어요'라고 했다",
    "수리비가 끝나고 나서 처음 말보다 훨씬 많이 나왔다",
    "나중에 알고 보니 고칠 수 있는 가구였다 — 맞죠?",
  ];

  const stats = [
    { label: "월 평균 출장 수리", value: "100+", unit: "건" },
    { label: "네이버 고객 평점", value: "4.9", unit: "/ 5.0 ★" },
    { label: "누적 고객 후기", value: "1,000+", unit: "건" },
  ];

  return (
    <section
      className="flex flex-col items-center justify-center px-6 py-20"
      style={{ backgroundColor: "#111" }}>
      <div className="max-w-[760px] w-full text-center">
        {/* YES-SET */}
        <div className="flex flex-col gap-5 mb-12">
          {yesSet.map((text, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div
                className="rounded-2xl px-6 py-5 text-left"
                style={{
                  backgroundColor: i === 2 ? "#1a2e27" : "#1a1a1a",
                  border: `1px solid ${i === 2 ? "#2fae8a44" : "#252525"}`,
                }}>
                <p
                  className="font-bold leading-snug"
                  style={{
                    fontSize: "clamp(1.2rem, 3.5vw, 1.5rem)",
                    color: i === 2 ? "#2fae8a" : "rgba(255,255,255,0.85)",
                  }}>
                  {i < 2 ? `✓ ${text}` : `→ ${text}`}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* 명언 */}
        <FadeIn delay={0}>
          <div
            className="mb-10 rounded-2xl px-6 py-5 text-left"
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
              "좋은 장인은 무엇을 못 고치는지를 먼저 말한다."
            </p>
            <p className="text-sm mt-3 font-bold" style={{ color: "#2fae8a" }}>
              — 독일 가구장인 협회 훈련 교본
            </p>
          </div>
        </FadeIn>

        {/* 브랜드 소개 — ✅ 추상어 제거, 숫자로 대체 */}
        <FadeIn delay={0}>
          <div className="mb-10 text-center">
            <p
              className="font-black leading-snug"
              style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", color: "white" }}>
              제조사 구조를 아는 기사가
              <br />
              <span style={{ color: "#2fae8a" }}>직접 고칩니다.</span>
            </p>
            <p
              className="mt-5 mx-auto max-w-lg text-lg leading-relaxed"
              style={{ color: "#bbb" }}>
              대형 가구회사 생산·마감 라인 출신.
              <br />
              재질, 조립 구조, 어디서 균열이 생기는지까지 압니다.
              <br />
              그냥 고치는 것과{" "}
              <strong style={{ color: "white" }}>결과가 다른 이유</strong>가
              여기 있습니다.
              <br />
              <span style={{ fontSize: "1rem", color: "#aaa" }}>
                서울 · 인천 · 경기 전 지역 출장
              </span>
            </p>
          </div>
        </FadeIn>

        {/* ✅ "사진만 보고 어떻게 알아요?" 반박 카드 — 공식B 보강 */}
        <FadeIn delay={0}>
          <div
            className="mb-10 rounded-2xl overflow-hidden text-left"
            style={{ border: "1px solid #2a2a2a" }}>
            <div
              className="px-6 py-4"
              style={{
                backgroundColor: "#161616",
                borderBottom: "1px solid #222",
              }}>
              <p className="text-sm font-black" style={{ color: "#ef4444" }}>
                💬 자주 묻는 질문
              </p>
              <p
                className="font-black mt-1"
                style={{
                  fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
                  color: "white",
                }}>
                "사진만 보고 어떻게 정확히 알아요?"
              </p>
            </div>
            <div className="px-6 py-5" style={{ backgroundColor: "#0d0d0d" }}>
              <p
                className="text-base leading-relaxed"
                style={{ color: "#ccc" }}>
                사진만으로 100% 판단은 어렵습니다.
                <br />
                그래서 현장에서 직접 확인합니다.
              </p>
              <p
                className="text-base leading-relaxed mt-3"
                style={{ color: "#ccc" }}>
                연 1200건 이상 다니다 보면,
                <br />
                손으로 눌러보는 순간 대부분 느낌이 옵니다.
                <br />
                <span style={{ color: "white", fontWeight: 700 }}>
                  그래도 모르겠으면 솔직히 말씀드립니다.
                </span>
              </p>
              <p
                className="text-base leading-relaxed mt-3"
                style={{ color: "#ccc" }}>
                수리 불가 판정 시 출장비는 받지 않습니다.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* ✅ 내구성 — "왜 오래 가냐" 설명 + 1년 AS 연결 */}
        <FadeIn delay={0}>
          <div
            className="mb-14 rounded-2xl overflow-hidden text-left"
            style={{ border: "1px solid #2fae8a44" }}>
            <div
              className="px-6 py-4"
              style={{
                backgroundColor: "#0d2318",
                borderBottom: "1px solid #2fae8a33",
              }}>
              <p className="text-sm font-black" style={{ color: "#2fae8a" }}>
                🛡 수리 후 내구성
              </p>
              <p
                className="font-black mt-1"
                style={{
                  fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
                  color: "white",
                }}>
                "수리해도 또 망가지면 어쩌죠?"
              </p>
            </div>
            <div className="px-6 py-5" style={{ backgroundColor: "#0a1a10" }}>
              <p
                className="text-base leading-relaxed"
                style={{ color: "#ccc" }}>
                구조를 알고 고치는 것과 모르고 고치는 건 다릅니다.
              </p>
              <p
                className="text-base leading-relaxed mt-3"
                style={{ color: "#ccc" }}>
                어디서 균열이 생기는지, 어느 부품이 먼저 닳는지,
                <br />
                제조사 라인 출신이라 그 패턴을 알고 있습니다.
              </p>
              <p
                className="text-base leading-relaxed mt-3"
                style={{ color: "#ccc" }}>
                그래도 혹시 같은 부위에서 재발하면
                <br />
                <span style={{ color: "#2fae8a", fontWeight: 700 }}>
                  1년 안에는 출장비·공임 없이 다시 옵니다.
                </span>
                <br />
                그만큼 자신 있다는 뜻입니다.
              </p>
              <span
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold"
                style={{
                  display: "block",
                  textAlign: "center",
                  marginTop: 20,
                  backgroundColor: "#44ef7718",
                  border: "1px solid #00ffa297",
                  color: "#00ffa2",
                }}>
                보증 스티커
              </span>
            </div>

            <img src="/images/st.png" alt="수리담 현장" />
          </div>
        </FadeIn>

        {/* 숫자 지표 */}
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
          {stats.map((item, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div
                className="flex flex-col items-center justify-center rounded-2xl px-5 py-7 text-center"
                style={cardStyle}>
                <div
                  className="text-base font-bold mb-3"
                  style={{ color: "#aaa" }}>
                  {item.label}
                </div>
                <div style={valueStyle}>{item.value}</div>
                <div
                  className="mt-2 text-base font-semibold"
                  style={{ color: "#2fae8a" }}>
                  {item.unit}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* ✅ 지인 추천 카드 */}
        <FadeIn delay={0}>
          <div
            className="mt-6 rounded-2xl px-6 py-4 text-left"
            style={{
              backgroundColor: "#1a1a1a",
              border: "1px solid #00ffa2",
              textAlign: "center",
            }}>
            <p
              className="mt-2 font-black"
              style={{
                fontSize: "clamp(1rem, 2.5vw, 1.15rem)",
                color: "white",
              }}>
              "지인 추천 연 100건 이상 가는 업체"
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
