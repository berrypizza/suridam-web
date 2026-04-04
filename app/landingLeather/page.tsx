import FloatingCTA from "@/app/components/FloatingCTA";
import ServiceSeo from "@/app/components/ServiceSeo";
import HiddenSEO from "@/app/components/HiddenSEO";
import FadeIn from "@/app/components/FadeIn";
import React from "react";

const KAKAO_URL = "https://pf.kakao.com/_kaKTn/chat";

function KakaoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3C6.477 3 2 6.477 2 10.8c0 2.7 1.62 5.1 4.077 6.569l-1.04 3.847a.3.3 0 0 0 .461.324l4.666-3.1A11.66 11.66 0 0 0 12 18.6c5.523 0 10-3.477 10-7.8S17.523 3 12 3z" />
    </svg>
  );
}

// ── 히어로 ───────────────────────────────────────────────────
function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: "100svh", backgroundColor: "#0a0a0a" }}>
      {/* 배경 사진 */}
      <img
        src="/images/staff-main4.png"
        alt="수리담 의자 가죽교체 현장"
        className="absolute inset-0 z-0 h-full w-full object-cover"
        style={{ objectPosition: "center" }}
      />
      {/* 어둡게 오버레이 */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.65) 40%, rgba(0,0,0,0.97) 100%)",
        }}
      />
      {/* 하단 초록 글로우 */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 40% at 50% 100%, #2fae8a18 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 pt-24 pb-16 flex flex-col items-center text-center">
        <FadeIn delay={0}>
          <span
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold mb-8"
            style={{
              backgroundColor: "#2fae8a18",
              border: "1px solid #2fae8a55",
              color: "#2fae8a",
            }}>
            수리담 · 의자 가죽 · 천 교체 전문
          </span>
        </FadeIn>

        <FadeIn delay={100}>
          <h1
            className="font-black leading-[1.08] tracking-tight mb-6"
            style={{ fontSize: "clamp(2.6rem, 7vw, 5rem)", color: "white" }}>
            버리려던 의자,
            <br />
            <span style={{ color: "#2fae8a" }}>사진 한 장으로</span>
            <br />
            오늘 되살립니다
          </h1>
        </FadeIn>

        <FadeIn delay={200}>
          <p
            className="text-lg md:text-xl leading-relaxed mb-10 max-w-xl"
            style={{ color: "#aaa" }}>
            가죽 찢어진 의자, 식탁 의자 6개, 업소 붙박이 소파까지.
            <br />
            <strong style={{ color: "white" }}>
              기사가 직접 와서 30분~1시간 안에 끝냅니다.
            </strong>
          </p>
        </FadeIn>

        <FadeIn delay={300}>
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
            <a
              href={KAKAO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2.5 rounded-2xl py-5 font-black text-center"
              style={{
                backgroundColor: "#FEE500",
                color: "#191919",
                fontSize: "1.05rem",
              }}>
              <KakaoIcon />
              카카오로 사진 보내기
            </a>
            <a
              href="tel:01091273024"
              className="flex items-center justify-center rounded-2xl px-6 py-5 font-bold"
              style={{
                backgroundColor: "#1e1e1e",
                border: "1px solid #333",
                color: "#e5e5e5",
                fontSize: "0.95rem",
              }}>
              📞 전화 문의
            </a>
          </div>
          <p className="mt-4 text-sm font-medium" style={{ color: "#666" }}>
            🕐 매일 09:00 — 21:00 · 사진 보내면 30초 안에 가능 여부 확인
          </p>
        </FadeIn>

        {/* 신뢰 지표 */}
        <FadeIn delay={400}>
          <div className="mt-14 grid grid-cols-3 gap-6 w-full max-w-lg">
            {[
              { num: "1,000+", label: "누적 고객 후기" },
              { num: "4.9★", label: "네이버 평점" },
              { num: "2시간", label: "평균 시공 시간" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div
                  className="text-2xl font-black mb-1"
                  style={{ color: "#2fae8a" }}>
                  {s.num}
                </div>
                <div className="text-xs font-medium" style={{ color: "#666" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ── 가치 방정식 4단계 ─────────────────────────────────────────
function ValueEquation() {
  const values = [
    {
      num: "01",
      question: "이게 나를 어디까지 데려다줄까?",
      tag: "결과",
      icon: "✨",
      title: "손님 앞에서\n창피 안 당합니다",
      body: "찢어진 가죽, 튀어나온 스펀지. 식탁에 손님 불러도 의자 걱정부터 했잖아요. 교체 후엔 그냥 새 의자예요. 아무도 모릅니다.",
      accent: "#2fae8a",
    },
    {
      num: "02",
      question: "이게 진짜 될까?",
      tag: "확률",
      icon: "🛡",
      title: "1,000건 해봤습니다\n안 된 적 없습니다",
      body: "사진 보내주시면 30초 안에 가능 여부 먼저 말씀드립니다. 불가능하면 솔직히 말해요. 출장비 없이.",
      accent: "#60a5fa",
    },
    {
      num: "03",
      question: "얼마나 오래 걸릴까?",
      tag: "시간",
      icon: "⚡",
      title: "의자 방문 당일 완료 / 야간 작업 가능",
      body: "영업시간 외에 새벽에도 작업 가능합니다.",
      accent: "#f59e0b",
    },
    {
      num: "04",
      question: "내가 얼마나 고생해야 될까?",
      tag: "노력",
      icon: "📱",
      title: "사진 한 장만\n보내면 끝",
      body: "의자 사진 한 장 찍어서 카카오로 보내주세요. 견적, 예약, 시공, 뒷정리까지 기사가 다 합니다. 고생할 게 없어요.",
      accent: "#a855f7",
    },
  ];

  return (
    <section className="px-6 py-24" style={{ backgroundColor: "#0d0d0d" }}>
      <div className="mx-auto max-w-5xl">
        <FadeIn delay={0}>
          <div className="text-center mb-16">
            <span
              className="inline-block text-sm tracking-widest uppercase mb-4 px-3 py-1.5 rounded-full font-bold"
              style={{
                backgroundColor: "#2fae8a22",
                color: "#2fae8a",
                border: "1px solid #2fae8a55",
              }}>
              왜 수리담인가
            </span>
            <h2
              className="font-black leading-tight"
              style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", color: "white" }}>
              사람은 더 좋은 걸 사는 게 아니라
              <br />
              <span style={{ color: "#2fae8a" }}>더 쉽게 끝나는 걸 삽니다</span>
            </h2>
            <p className="mt-4 text-base" style={{ color: "#666" }}>
              의자 가죽교체를 결정할 때 머릿속으로 계산하는 4가지
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-5">
          {values.map((v, i) => (
            <FadeIn key={i} delay={i * 80}>
              <div
                className="rounded-2xl p-7 h-full"
                style={{
                  backgroundColor: "#161616",
                  border: `1px solid ${v.accent}33`,
                }}>
                <div className="flex items-start gap-4 mb-5">
                  <span className="text-3xl">{v.icon}</span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="text-xs font-black px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: v.accent + "22",
                          color: v.accent,
                          border: `1px solid ${v.accent}44`,
                        }}>
                        {v.tag}
                      </span>
                      <span
                        className="text-xs font-bold"
                        style={{ color: "#444" }}>
                        {v.num}
                      </span>
                    </div>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: "#555" }}>
                      Q. {v.question}
                    </p>
                  </div>
                </div>
                <h3
                  className="font-black mb-3 whitespace-pre-line"
                  style={{
                    fontSize: "clamp(1.2rem, 2.5vw, 1.45rem)",
                    color: "white",
                  }}>
                  {v.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#888" }}>
                  {v.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 비용 계산 섹션 ──────────────────────────────────────────
function BeforeAfter() {
  const cases = [
    {
      tag: "업소용 붙박이 소파 의자 가죽 교체",
      before: "/images/chair-before2.jpg",
      after: "/images/chair-after2.jpg",
      desc: "6개 · 1시간 30분",
    },
    {
      tag: "업소용 붙박이 소파 의자 가죽 교체",
      before: "/images/chair-before3.jpg",
      after: "/images/chair-after3.jpg",
      desc: "4개 · 1시간",
    },
    {
      tag: "식당 의자 가죽교체",
      before: "/images/chair-before5.jpg",
      after: "/images/chair-after5.jpg",
      desc: "30개 · 3시간",
    },
    {
      tag: "카페 의자 가죽교체",
      before: "/images/chair-before6.jpg",
      after: "/images/chair-after6.jpg",
      desc: "10개 · 1시간",
    },
    {
      tag: "병원 대기 의자 가죽교체",
      before: "/images/chair-before4.jpg",
      after: "/images/chair-after4.jpg",
      desc: "5개 · 3시간",
    },
    {
      tag: "식탁의자 가죽 교체",
      before: "/images/chair-before.jpg",
      after: "/images/chair-after.jpg",
      desc: "4개 · 당일 완료",
    },
  ];

  return (
    <section className="px-6 py-20" style={{ backgroundColor: "#111" }}>
      <div className="mx-auto max-w-5xl">
        <FadeIn delay={0}>
          <div className="text-center mb-12">
            <span
              className="inline-block text-sm tracking-widest uppercase mb-4 px-3 py-1.5 rounded-full font-bold"
              style={{
                backgroundColor: "#2fae8a22",
                color: "#2fae8a",
                border: "1px solid #2fae8a55",
              }}>
              Before / After
            </span>
            <h2
              className="font-black leading-tight mb-3"
              style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", color: "white" }}>
              말보다
              <br />
              <span style={{ color: "#2fae8a" }}>사진이 빠릅니다</span>
            </h2>
            <p className="text-base" style={{ color: "#666" }}>
              실제 수리 전·후 사진입니다. 가공 없이 그대로입니다.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-6">
          {cases.map((c, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div
                className="rounded-2xl overflow-hidden"
                style={{ border: "1px solid #2a2a2a" }}>
                <div className="grid grid-cols-2">
                  {/* Before */}
                  <div
                    className="relative"
                    style={{ aspectRatio: "4/3", backgroundColor: "#0d0d0d" }}>
                    <img
                      src={c.before}
                      alt={`${c.tag} 전`}
                      className="w-full h-full object-cover"
                    />
                    <div
                      className="absolute bottom-0 left-0 right-0 px-3 py-2"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)",
                      }}>
                      <span
                        className="text-sm font-black"
                        style={{ color: "#ddd", letterSpacing: "0.08em" }}>
                        BEFORE
                      </span>
                    </div>
                  </div>
                  {/* After */}
                  <div
                    className="relative"
                    style={{ aspectRatio: "4/3", backgroundColor: "#0d0d0d" }}>
                    <img
                      src={c.after}
                      alt={`${c.tag} 후`}
                      className="w-full h-full object-cover"
                    />
                    <div
                      className="absolute bottom-0 left-0 right-0 px-3 py-2"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(15,50,35,0.85) 0%, transparent 100%)",
                      }}>
                      <span
                        className="text-sm font-black"
                        style={{ color: "#2fae8a", letterSpacing: "0.08em" }}>
                        AFTER ✦
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="px-5 py-4 flex items-center justify-between"
                  style={{ backgroundColor: "#161616" }}>
                  <span className="text-sm font-bold" style={{ color: "#ccc" }}>
                    {c.tag}
                  </span>
                  <span
                    className="text-xs font-black px-3 py-1.5 rounded-full"
                    style={{
                      backgroundColor: "#2fae8a22",
                      color: "#2fae8a",
                      border: "1px solid #2fae8a44",
                    }}>
                    {c.desc}
                  </span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* 클로징 멘트 */}
        <FadeIn delay={120}>
          <div
            className="mt-10 text-center rounded-2xl px-7 py-6"
            style={{
              backgroundColor: "#0d2318",
              border: "1px solid #2fae8a44",
            }}>
            <p
              className="font-black mb-1"
              style={{
                fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
                color: "white",
              }}>
              새로 산 거랑 구분 안 됩니다.
            </p>
            <p className="text-sm" style={{ color: "#2fae8a88" }}>
              같은 의자 맞습니다
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function PriceSection() {
  const items = [
    {
      label: "식탁의자 가죽 교체 (미싱 없음)",
      price: "개당 3만원",
      note: "출장비 3만원 별도",
    },
    {
      label: "식탁의자 가죽 교체 (미싱 있음)",
      price: "개당 4만원+",
      note: "출장비 3만원 별도",
    },
    {
      label: "업소용 붙박이 소파 의자",
      price: "m당 5만원~",
      note: "출장비 별도, 현장 확인 후 확정",
    },
    {
      label: "나무의자 다리 부러짐",
      price: "개당 3만원",
      note: "출장비 3만원 별도",
    },
    {
      label: "의자 흔들림 수리 (업소용 포함)",
      price: "개당 2만원",
      note: "출장비 3만원 별도",
    },
  ];

  return (
    <section className="px-6 py-20" style={{ backgroundColor: "#111" }}>
      <div className="mx-auto max-w-2xl">
        <FadeIn delay={0}>
          <div className="text-center mb-12">
            <span
              className="inline-block text-sm tracking-widest uppercase mb-4 px-3 py-1.5 rounded-full font-bold"
              style={{
                backgroundColor: "#2fae8a22",
                color: "#2fae8a",
                border: "1px solid #2fae8a55",
              }}>
              가격 안내
            </span>
            <div className="flex items-center justify-center gap-3 flex-wrap mb-3">
              <h2
                className="font-black"
                style={{
                  fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
                  color: "white",
                }}>
                얼마면 될까요?
              </h2>
              <span
                className="inline-block text-sm font-black px-3 py-1.5 rounded-full"
                style={{
                  backgroundColor: "#f59e0b22",
                  color: "#f59e0b",
                  border: "1px solid #f59e0b55",
                }}>
                🎁 대량 할인 가능
              </span>
            </div>
            <p className="text-base" style={{ color: "#666" }}>
              표준 단가 기준 · 사진 보내주시면 더 정확히 알려드립니다
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={80}>
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: "1px solid #2a2a2a" }}>
            {items.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-6 py-5"
                style={{
                  borderBottom:
                    i < items.length - 1 ? "1px solid #1e1e1e" : "none",
                  backgroundColor: i % 2 === 0 ? "#161616" : "#141414",
                }}>
                <div className="flex-1 min-w-0 pr-4">
                  <p
                    className="text-sm font-bold mb-0.5"
                    style={{ color: "white" }}>
                    {item.label}
                  </p>
                  <p className="text-xs" style={{ color: "#555" }}>
                    {item.note}
                  </p>
                </div>
                <span
                  className="text-base font-black flex-shrink-0"
                  style={{ color: "#2fae8a" }}>
                  {item.price}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* 버리는 것 vs 고치는 것 비교 */}
        <FadeIn delay={120}>
          <div
            className="mt-8 rounded-2xl p-6"
            style={{
              backgroundColor: "#0d2318",
              border: "1px solid #2fae8a44",
            }}>
            <p className="text-sm font-black mb-4" style={{ color: "#2fae8a" }}>
              💡 새 의자 사는 것과 비교하면
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div
                className="rounded-xl px-4 py-4 text-center"
                style={{
                  backgroundColor: "#1a1a1a",
                  border: "1px solid #333",
                }}>
                <p className="text-xs font-bold mb-2" style={{ color: "#666" }}>
                  새 식탁의자 6개 구매
                </p>
                <p
                  className="text-2xl font-black mb-1"
                  style={{ color: "#ef4444" }}>
                  40만~150만원
                </p>
                <p className="text-xs" style={{ color: "#555" }}>
                  배송 2~5일 대기
                </p>
              </div>
              <div
                className="rounded-xl px-4 py-4 text-center"
                style={{
                  backgroundColor: "#0d2318",
                  border: "1px solid #2fae8a55",
                }}>
                <p
                  className="text-xs font-bold mb-2"
                  style={{ color: "#2fae8a" }}>
                  수리담 가죽 교체 6개
                </p>
                <p
                  className="text-2xl font-black mb-1"
                  style={{ color: "#2fae8a" }}>
                  21만원~
                </p>
                <p className="text-xs" style={{ color: "#2fae8a88" }}>
                  오늘 당일 완료
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ── 실제 후기 섹션 ─────────────────────────────────────────
function Reviews() {
  const reviews = [
    {
      who: "인천 계산동 / 김** 고객님",
      situation: "버리려던 식탁의자 4개",
      body: "버리려다가 '혹시나' 하고 사진 보내봤어요. 3만원에 다시 앉게 됐습니다. 버릴 뻔했네요.",
      saved: "약 60만원 절약",
    },
    {
      who: "서울 역삼동 / 김** 고객님",
      situation: "손님방 의자 가죽 교체",
      body: "손님 오실 때마다 가죽 찢어진 게 눈에 밟혔는데 이제 신경 안 써도 됩니다. 깔끔하게 잘 해주셨어요.",
      saved: "당일 완료",
    },
    {
      who: "부천 중동 / 이** 사장님",
      situation: "식당 붙박이 소파 6m",
      body: "손님이 앉다가 가죽 찢어졌다고 말했는데 너무 창피했어요. 빠르게 와주셔서 다음날 바로 장사 다시 했습니다.",
      saved: "영업 공백 최소화",
    },
  ];

  return (
    <section className="px-6 py-20" style={{ backgroundColor: "#0a0a0a" }}>
      <div className="mx-auto max-w-5xl">
        <FadeIn delay={0}>
          <div className="text-center mb-12">
            <span
              className="inline-block text-sm tracking-widest uppercase mb-4 px-3 py-1.5 rounded-full font-bold"
              style={{
                backgroundColor: "#2fae8a22",
                color: "#2fae8a",
                border: "1px solid #2fae8a55",
              }}>
              Real Reviews
            </span>
            <h2
              className="font-black leading-tight"
              style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", color: "white" }}>
              긴 설명보다
              <br />
              <span style={{ color: "#2fae8a" }}>후기가 정직합니다</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <FadeIn key={i} delay={i * 80}>
              <div
                className="rounded-2xl p-6 h-full flex flex-col"
                style={{
                  backgroundColor: "#161616",
                  border: "1px solid #2a2a2a",
                }}>
                <div className="flex-1">
                  <span
                    className="inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-4"
                    style={{
                      backgroundColor: "#1e1e1e",
                      color: "#aaa",
                      border: "1px solid #2a2a2a",
                    }}>
                    {r.situation}
                  </span>
                  <p
                    className="text-base leading-relaxed mb-4"
                    style={{ color: "#e5e5e5" }}>
                    <span style={{ color: "#2fae8a", fontSize: 18 }}>"</span>
                    {r.body}
                    <span style={{ color: "#2fae8a", fontSize: 18 }}>"</span>
                  </p>
                </div>
                <div className="pt-4" style={{ borderTop: "1px solid #222" }}>
                  <p className="text-sm mb-1" style={{ color: "#666" }}>
                    — {r.who}
                  </p>
                  <span
                    className="text-xs font-black px-2.5 py-1 rounded-full"
                    style={{
                      backgroundColor: "#2fae8a22",
                      color: "#2fae8a",
                      border: "1px solid #2fae8a44",
                    }}>
                    {r.saved}
                  </span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 프로세스 3단계 (노력=0) ───────────────────────────────
function Process() {
  const steps = [
    {
      num: "01",
      icon: "📸",
      title: "사진 1장 찍기",
      desc: "의자 전체 + 찢어진 부분 사진 1~2장. 스마트폰으로 찍으면 됩니다.",
      effort: "30초",
    },
    {
      num: "02",
      icon: "💬",
      title: "카카오로 보내기",
      desc: "지역이랑 의자 개수만 알려주세요. 견적 바로 드립니다. 전화 안 해도 돼요.",
      effort: "1분",
    },
    {
      num: "03",
      icon: "🪑",
      title: "기다리면 끝",
      desc: "기사가 가고, 30분~1시간, 새 의자. 그게 전부입니다. 고생할 게 없어요.",
      effort: "기다리기만",
    },
  ];

  return (
    <section className="px-6 py-20" style={{ backgroundColor: "#111" }}>
      <div className="mx-auto max-w-4xl">
        <FadeIn delay={0}>
          <div className="text-center mb-14">
            <span
              className="inline-block text-sm tracking-widest uppercase mb-4 px-3 py-1.5 rounded-full font-bold"
              style={{
                backgroundColor: "#2fae8a22",
                color: "#2fae8a",
                border: "1px solid #2fae8a55",
              }}>
              진행 방식
            </span>
            <h2
              className="font-black leading-tight"
              style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", color: "white" }}>
              고생할 게
              <br />
              <span style={{ color: "#2fae8a" }}>하나도 없어요</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-5">
          {steps.map((s, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div
                className="rounded-2xl p-7 text-center relative"
                style={{
                  backgroundColor: i === 2 ? "#0d2318" : "#161616",
                  border: `1px solid ${i === 2 ? "#2fae8a55" : "#2a2a2a"}`,
                }}>
                <div className="text-4xl mb-4">{s.icon}</div>
                <div
                  className="text-xs font-black mb-1"
                  style={{ color: i === 2 ? "#2fae8a" : "#555" }}>
                  {s.num}
                </div>
                <h3
                  className="text-lg font-black mb-3"
                  style={{ color: "white" }}>
                  {s.title}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: "#888" }}>
                  {s.desc}
                </p>
                <span
                  className="inline-block text-xs font-black px-3 py-1.5 rounded-full"
                  style={{
                    backgroundColor: i === 2 ? "#2fae8a" : "#252525",
                    color: i === 2 ? "white" : "#666",
                  }}>
                  소요 시간: {s.effort}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 최종 CTA ─────────────────────────────────────────────
function FinalCTA() {
  return (
    <section className="px-6 py-24" style={{ backgroundColor: "#0d0d0d" }}>
      <div className="mx-auto max-w-xl text-center">
        <FadeIn delay={0}>
          <div
            className="mb-8 rounded-2xl px-6 py-5"
            style={{
              backgroundColor: "#1a0d0d",
              border: "1px solid #ef444466",
            }}>
            <p
              className="text-base italic font-medium"
              style={{
                color: "#fca5a5",
                borderLeft: "3px solid #ef4444",
                paddingLeft: 16,
                textAlign: "left",
              }}>
              "방치하면 스펀지까지 망가져서 천갈이도 못 하게 됩니다."
            </p>
            <p
              className="text-sm mt-3 font-bold text-left"
              style={{ color: "#ef4444" }}>
              — 수리담 기사, 현장에서
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={80}>
          <h2
            className="font-black leading-tight mb-4"
            style={{ fontSize: "clamp(2rem, 6vw, 3.2rem)", color: "white" }}>
            지금 사진 보내면
            <br />
            <span style={{ color: "#2fae8a" }}>오늘 끝납니다</span>
          </h2>
          <p className="text-base mb-10" style={{ color: "#666" }}>
            사진 한 장 → 견적 확인 → 예약 → 당일 완료
          </p>
        </FadeIn>

        <FadeIn delay={120}>
          <div className="flex flex-col gap-3">
            <a
              href={KAKAO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 rounded-2xl py-5 font-black"
              style={{
                backgroundColor: "#FEE500",
                color: "#191919",
                fontSize: "1.1rem",
              }}>
              <KakaoIcon />
              카카오톡으로 사진 보내기
            </a>
            <div className="grid grid-cols-2 gap-3">
              <a
                href="/request"
                className="rounded-2xl py-4 text-center font-bold text-white"
                style={{ backgroundColor: "#2fae8a", fontSize: "0.95rem" }}>
                📷 문자 상담
              </a>
              <a
                href="tel:01091273024"
                className="rounded-2xl py-4 text-center font-bold"
                style={{
                  backgroundColor: "#161616",
                  border: "1px solid #333",
                  color: "#e5e5e5",
                  fontSize: "0.95rem",
                }}>
                📞 010-9127-3024
              </a>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
            {["수리 불가 시 출장비 0원", "1년 무상 AS", "당일 완료"].map(
              (b, i) => (
                <React.Fragment key={b}>
                  <span
                    className="flex items-center gap-1.5 text-sm font-semibold"
                    style={{ color: "#aaa" }}>
                    <span
                      className="h-1.5 w-1.5 rounded-full inline-block"
                      style={{ backgroundColor: "#2fae8a" }}
                    />
                    {b}
                  </span>
                  {i < 2 && <span style={{ color: "#333" }}>·</span>}
                </React.Fragment>
              ),
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ── 푸터 ─────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      className="px-6 py-10"
      style={{ backgroundColor: "#0a0a0a", borderTop: "1px solid #1e1e1e" }}>
      <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-start justify-between gap-6">
        <div>
          <p className="text-base font-black mb-1" style={{ color: "white" }}>
            수리담출장가구수리의자수리쇼파소파수리리폼업체
          </p>
          <p className="text-sm" style={{ color: "#555" }}>
            대표자 고관호 · 사업자등록번호 175-11-03137
          </p>
          <p className="text-sm mt-1" style={{ color: "#555" }}>
            서울특별시 영등포구 선유서로21길 14, 2층 201-b484호
          </p>
        </div>
        <div className="flex gap-4">
          <a
            href="https://blog.naver.com/sofaresq"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold px-3 py-2 rounded-xl"
            style={{
              backgroundColor: "#1e1e1e",
              color: "#aaa",
              border: "1px solid #2a2a2a",
            }}>
            N 블로그
          </a>
          <a
            href="tel:01091273024"
            className="text-sm font-semibold px-3 py-2 rounded-xl"
            style={{
              backgroundColor: "#1e1e1e",
              color: "#aaa",
              border: "1px solid #2a2a2a",
            }}>
            📞 전화
          </a>
        </div>
      </div>
    </footer>
  );
}

// ── 메인 ─────────────────────────────────────────────────
export default function ChairLeatherPage() {
  return (
    <>
      <main style={{ backgroundColor: "#0a0a0a" }}>
        <Hero />
        <ValueEquation />
        <BeforeAfter />
        <PriceSection />
        <Reviews />
        <Process />
        <FinalCTA />
        <ServiceSeo />
        <HiddenSEO />
        <Footer />
      </main>
      <FloatingCTA />
    </>
  );
}
