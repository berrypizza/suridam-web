"use client";

import { useEffect, useRef, useState } from "react";

// ── 데이터 ────────────────────────────────────────────────────
const diffs = [
  {
    num: "01",
    problem: "전화하면 '일단 와봐야 알아요'",
    problemSub: "방문 후 금액이 처음과 달라졌다",
    solution: "사진 1장으로 가능 여부 먼저 판단",
    solutionSub: "불가능하면 방문 전에 말씀드립니다",
    icon: "📷",
  },
  {
    num: "02",
    problem: '"비용은 현장 봐야 알아요"',
    problemSub: "막상 오면 견적이 두 배가 된다",
    solution: "범위를 먼저 공유, 납득 후 진행",
    solutionSub: "표준 단가표 공개, 숨은 비용 없음",
    icon: "💬",
  },
  {
    num: "03",
    problem: '"됩니다" 해놓고 결과가 애매함',
    problemSub: "책임지지 않는 말만 하고 간다",
    solution: "어려우면 사진 보고 먼저 말씀드림",
    solutionSub: "수리 불가 시 출장비 0원",
    icon: "✅",
  },
  {
    num: "04",
    problem: "수리 끝나면 그냥 가버림",
    problemSub: "마무리 기준이 없다",
    solution: "수평·유격·열림감·소음 4가지 확인",
    solutionSub: "기준으로 마무리, 서명 후 종료",
    icon: "🤝",
  },
];

type Diff = (typeof diffs)[0];

// ── 스크롤 아코디언 카드 ──────────────────────────────────────
// 뷰포트 진입 시 펼쳐짐 → 스크롤로 지나치면 촤라라락 접힘
function ScrollAccordionCard({ d, index }: { d: Diff; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // 뷰포트 안으로 들어옴 → 천천히 펼침
          setOpen(true);
        } else {
          // 뷰포트 밖으로 나감 → 즉시 접힘 (위로 스크롤해서 지나쳤을 때)
          const rect = entry.boundingClientRect;
          if (rect.top < 0) {
            // 위로 사라짐 (스크롤 다운해서 지나침) → 촤라라락
            setOpen(false);
          }
          // 아래로 아직 안 나타난 경우는 closed 유지
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -80px 0px" },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // 내용 높이 추정 (px)
  const contentHeight = 140;

  return (
    <div
      ref={ref}
      className="rounded-2xl overflow-hidden"
      style={{
        border: `1px solid ${open ? "#2fae8a44" : "#1a1a1a"}`,
        transition: "border-color 0.3s ease",
        opacity: open ? 1 : 0.45,
        transform: open ? "translateY(0)" : "translateY(8px)",
        // 펼칠 때 느리게, 접힐 때 빠르게
        transitionProperty: "opacity, transform, border-color",
        transitionDuration: open ? "0.5s, 0.5s, 0.3s" : "0.15s, 0.15s, 0.15s",
        transitionTimingFunction: open
          ? "cubic-bezier(0.2,0,0,1)"
          : "cubic-bezier(0.7,0,1,1)",
      }}>
      {/* 헤더: 항상 노출 */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{
          backgroundColor: open ? "#131a17" : "#111",
          borderBottom: `1px solid ${open ? "#2fae8a22" : "#161616"}`,
          transition: "background-color 0.4s ease, border-color 0.4s ease",
        }}>
        <div className="flex items-center gap-3">
          <span
            className="text-xs font-black tabular-nums"
            style={{ color: "#2fae8a", letterSpacing: "0.1em" }}>
            {d.num}
          </span>
          <span className="text-lg">{d.icon}</span>
          <span
            className="text-sm font-bold"
            style={{
              color: open ? "white" : "#444",
              transition: "color 0.3s ease",
            }}>
            {d.solution}
          </span>
        </div>
        {/* 상태 인디케이터 */}
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{
            backgroundColor: open ? "#2fae8a" : "#333",
            transition: "background-color 0.3s ease",
            boxShadow: open ? "0 0 6px #2fae8a88" : "none",
          }}
        />
      </div>

      {/* 비교 본문: 펼쳐지고 접히는 부분 */}
      <div
        style={{
          maxHeight: open ? `${contentHeight}px` : "0px",
          overflow: "hidden",
          // 펼칠 때 부드럽게, 접힐 때 빠르게
          transition: open
            ? "max-height 0.45s cubic-bezier(0.2, 0, 0, 1)"
            : "max-height 0.18s cubic-bezier(0.7, 0, 1, 1)",
        }}>
        <div className="grid grid-cols-2">
          {/* 일반 업체 */}
          <div
            className="px-4 py-4"
            style={{
              backgroundColor: "#0f0f0f",
              borderRight: "1px solid #1a1a1a",
            }}>
            <span
              className="inline-block text-xs font-black px-2 py-0.5 rounded-full mb-2"
              style={{ backgroundColor: "#ef444415", color: "#ef4444" }}>
              일반 업체
            </span>
            <p
              className="font-bold leading-snug mb-1"
              style={{
                fontSize: "clamp(0.8rem, 2vw, 0.9rem)",
                color: "#555",
                textDecoration: "line-through",
                textDecorationColor: "#ef444455",
              }}>
              {d.problem}
            </p>
            <p className="text-xs" style={{ color: "#333" }}>
              {d.problemSub}
            </p>
          </div>
          {/* 수리담 */}
          <div className="px-4 py-4" style={{ backgroundColor: "#0d1410" }}>
            <span
              className="inline-block text-xs font-black px-2 py-0.5 rounded-full mb-2"
              style={{ backgroundColor: "#2fae8a22", color: "#2fae8a" }}>
              수리담
            </span>
            <p
              className="font-bold leading-snug mb-1"
              style={{
                fontSize: "clamp(0.8rem, 2vw, 0.9rem)",
                color: "white",
              }}>
              {d.solution}
            </p>
            <p className="text-xs" style={{ color: "#2fae8a88" }}>
              {d.solutionSub}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── 스크롤 페이드인 훅 ────────────────────────────────────────
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useFadeIn();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}>
      {children}
    </div>
  );
}

// ── 섹션 번호 레이블 ─────────────────────────────────────────
function SectionLabel({ num, text }: { num: string; text: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span
        className="text-xs font-black tabular-nums"
        style={{ color: "#2fae8a", letterSpacing: "0.15em" }}>
        {num}
      </span>
      <div
        className="h-px flex-1"
        style={{ backgroundColor: "#1e1e1e", maxWidth: 40 }}
      />
      <span
        className="text-xs font-bold uppercase tracking-widest"
        style={{ color: "#444" }}>
        {text}
      </span>
    </div>
  );
}

// ── 구분선 ────────────────────────────────────────────────────
function Divider() {
  return (
    <div
      className="my-16 mx-auto"
      style={{ width: 40, height: 1, backgroundColor: "#222" }}
    />
  );
}

const stats = [
  { value: "100+", label: "월 평균 출장 수리" },
  { value: "4.9", label: "네이버 고객 평점" },
  { value: "1,000+", label: "누적 고객 후기" },
  { value: "80%", label: "교체 없이 수리 해결" },
];

export default function WhyPage() {
  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "#0d0d0d", color: "#e5e5e5" }}>
      {/* ── HERO: 후킹 헤드라인 ─────────────────────────────── */}
      <section
        className="relative px-6 pt-20 pb-24 overflow-hidden"
        style={{ backgroundColor: "#0a0a0a" }}>
        {/* 배경 장식 */}
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, #2fae8a18 0%, transparent 70%)",
            transform: "translate(30%, -30%)",
          }}
        />

        <div className="mx-auto max-w-3xl relative">
          <FadeIn>
            <span
              className="inline-block text-xs tracking-widest uppercase mb-6 px-3 py-1.5 rounded-full font-bold"
              style={{
                backgroundColor: "#2fae8a18",
                color: "#2fae8a",
                border: "1px solid #2fae8a44",
              }}>
              Why Suridam
            </span>
          </FadeIn>

          {/* 규칙 4: 자존심 흠집 + 규칙 2: 추상어 없이 */}
          <FadeIn delay={100}>
            <h1
              className="font-black leading-[1.08] tracking-tight mb-6"
              style={{ fontSize: "clamp(2.4rem, 7vw, 4.8rem)" }}>
              <span style={{ color: "white" }}>가구수리 업체를</span>
              <br />
              <span style={{ color: "#2fae8a" }}>잘못 고르는 법.</span>
            </h1>
          </FadeIn>

          {/* 규칙 5: 라포르 + yes-set 오프닝 */}
          <FadeIn delay={200}>
            <p
              className="leading-relaxed max-w-xl"
              style={{ fontSize: "clamp(1rem, 2.5vw, 1.2rem)", color: "#888" }}>
              검색하고, 전화하고, 기다렸다가 "와봐야 알아요" 들은 적 있죠?
              <br />
              그게 잘못된 게 아닙니다.
              <br />
              <strong style={{ color: "rgba(255,255,255,0.75)" }}>
                그 말 하는 업체를 고른 게 문제입니다.
              </strong>
            </p>
          </FadeIn>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6">
        {/* ── SECTION 1: YES-SET 스토리텔링 ────────────────── */}
        <Divider />
        <FadeIn>
          <SectionLabel num="01" text="당신이 겪은 일" />
        </FadeIn>

        <FadeIn delay={80}>
          {/* 규칙 3: 명언 인용 */}
          <blockquote
            className="mb-10 pl-5 py-2"
            style={{ borderLeft: "2px solid #2fae8a" }}>
            <p
              className="text-lg font-semibold italic leading-relaxed"
              style={{ color: "#aaa" }}>
              "경험 없이는 아무것도 배울 수 없지만,
              <br />
              비싼 수업료를 반복해서 낼 필요도 없다."
            </p>
            <cite
              className="block mt-2 text-xs font-bold"
              style={{ color: "#555" }}>
              — 빌 게이츠
            </cite>
          </blockquote>
        </FadeIn>

        {/* Yes-set 카드 3개 */}
        <div className="flex flex-col gap-3 mb-6">
          {[
            {
              check: "✓",
              text: "가구 고치려고 전화했더니 '일단 와봐야 알아요'라는 말을 들었다",
            },
            {
              check: "✓",
              text: "막상 기사가 왔더니 처음 말한 비용보다 훨씬 비싼 견적을 받았다",
            },
            {
              check: "→",
              text: "그냥 새로 살걸, 하고 후회하셨죠?",
              highlight: true,
            },
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 80}>
              <div
                className="rounded-2xl px-5 py-4"
                style={{
                  backgroundColor: item.highlight ? "#2fae8a12" : "#141414",
                  border: `1px solid ${item.highlight ? "#2fae8a44" : "#1e1e1e"}`,
                }}>
                <p
                  className="font-semibold leading-snug"
                  style={{
                    fontSize: "clamp(0.95rem, 2.5vw, 1.1rem)",
                    color: item.highlight
                      ? "#2fae8a"
                      : "rgba(255,255,255,0.75)",
                  }}>
                  <span
                    className="mr-2"
                    style={{ color: item.highlight ? "#2fae8a" : "#444" }}>
                    {item.check}
                  </span>
                  {item.text}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={200}>
          <p className="text-base leading-relaxed" style={{ color: "#666" }}>
            이 경험은 당신 잘못이 아닙니다. 업계 전체가 그렇게 돌아가기
            때문입니다. 수리담을 만든 이유가 바로 여기에 있습니다.
          </p>
        </FadeIn>

        {/* ── SECTION 2: 권위 부여 ─────────────────────────── */}
        <Divider />
        <FadeIn>
          <SectionLabel num="02" text="수리담이 다른 이유" />
        </FadeIn>

        {/* 규칙 2: 권위 + 구체적 수치 */}
        <FadeIn delay={80}>
          <div
            className="rounded-2xl px-6 py-7 mb-10"
            style={{ backgroundColor: "#111", border: "1px solid #1e1e1e" }}>
            <p
              className="text-xs font-black uppercase tracking-widest mb-3"
              style={{ color: "#2fae8a" }}>
              설립 배경
            </p>
            <p
              className="font-black leading-snug mb-4"
              style={{
                fontSize: "clamp(1.3rem, 3.5vw, 2rem)",
                color: "white",
              }}>
              대형 가구회사 생산·마감·구조 전문 출신.
              <br />
              <span style={{ color: "#2fae8a" }}>
                직접 만든 기준으로 직접 수리합니다.
              </span>
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "#666" }}>
              수리담은 "다니던 회사에서 이렇게 하면 안 된다"는 경험을 바탕으로
              만들어진 서비스입니다. 사진 한 장으로 가능 여부를 판단하고,
              불가능하면 먼저 말하는 것. 업계에서는 당연하지 않은 일입니다.
            </p>
          </div>
        </FadeIn>

        {/* 숫자 지표 그리드 */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {stats.map((s, i) => (
            <FadeIn key={i} delay={i * 60}>
              <div
                className="rounded-2xl px-5 py-5 text-center"
                style={{
                  backgroundColor: "#111",
                  border: "1px solid #1a1a1a",
                }}>
                <div
                  className="font-black mb-1"
                  style={{
                    fontSize: "clamp(1.8rem, 5vw, 2.4rem)",
                    color: "#2fae8a",
                  }}>
                  {s.value}
                </div>
                <div className="text-xs font-medium" style={{ color: "#555" }}>
                  {s.label}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* ── SECTION 3: 4가지 차이 비교 ──────────────────── */}
        <Divider />
        <FadeIn>
          <SectionLabel num="03" text="4가지 차이" />
        </FadeIn>

        {/* 규칙 1: 상식 파괴 헤드라인 */}
        <FadeIn delay={80}>
          <h2
            className="font-black leading-tight mb-3"
            style={{
              fontSize: "clamp(1.6rem, 4.5vw, 2.8rem)",
              color: "white",
            }}>
            수리담에는
            <br />
            <span style={{ color: "#ef4444" }}>없는 것</span>이 4가지입니다.
          </h2>
          <p className="text-base mb-10" style={{ color: "#666" }}>
            없는 게 많은 곳이 더 좋은 서비스입니다.
          </p>
        </FadeIn>

        {/* 스크롤 아코디언 */}
        <div className="flex flex-col gap-3">
          {diffs.map((d, i) => (
            <ScrollAccordionCard key={i} d={d} index={i} />
          ))}
        </div>

        {/* ── SECTION 4: 약속 ──────────────────────────────── */}
        <Divider />
        <FadeIn>
          <SectionLabel num="04" text="수리담의 약속" />
        </FadeIn>

        {/* 규칙 5: 위협/금지 */}
        <FadeIn delay={80}>
          <h2
            className="font-black leading-tight mb-4"
            style={{
              fontSize: "clamp(1.6rem, 4.5vw, 2.6rem)",
              color: "white",
            }}>
            위 4가지 중 하나라도
            <br />
            <span style={{ color: "#ef4444" }}>못 지키면 출장비 0원.</span>
          </h2>
          <p
            className="text-base leading-relaxed mb-10"
            style={{ color: "#666" }}>
            광고 카피가 아닙니다. 실제로 지키지 못한 날은 청구하지 않습니다. 이
            약속이 지켜지지 않으면 후기로 남겨주세요. 그게 저희를 더 낫게 만드는
            유일한 방법입니다.
          </p>
        </FadeIn>

        {/* 규칙 6: 호기심 카드 */}
        <FadeIn delay={100}>
          <div
            className="rounded-2xl px-6 py-6 mb-4"
            style={{
              background: "linear-gradient(135deg, #0a1a12 0%, #0d2018 100%)",
              border: "1px solid #2fae8a33",
            }}>
            <p
              className="text-xs font-black uppercase tracking-widest mb-2"
              style={{ color: "#2fae8a" }}>
              수리담이 자신 있는 이유
            </p>
            <p
              className="font-bold leading-relaxed"
              style={{
                fontSize: "clamp(1rem, 2.5vw, 1.1rem)",
                color: "rgba(255,255,255,0.85)",
              }}>
              사진 상담 고객 중 절반 이상이
              <span style={{ color: "#2fae8a", fontWeight: 900 }}>
                {" "}
                "수리 불가"{" "}
              </span>
              판정을 현장 방문 전에 받습니다.
              <br />
              거절이 이렇게 많은 서비스가 왜 살아남았을까요?
            </p>
            <p className="text-sm mt-3" style={{ color: "#2fae8a88" }}>
              → 솔직한 곳을 한 번 경험하면 다시 찾기 때문입니다.
            </p>
          </div>
        </FadeIn>

        {/* ── CTA ──────────────────────────────────────────── */}
        <Divider />

        <FadeIn>
          <div className="text-center pb-16">
            <p
              className="font-black mb-2"
              style={{ fontSize: "clamp(1.4rem, 4vw, 2rem)", color: "white" }}>
              지금 사진 한 장 보내보세요.
            </p>
            <p className="text-base mb-8" style={{ color: "#555" }}>
              말이 아닌 행동으로 확인하는 게 제일 빠릅니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/request"
                className="rounded-2xl px-8 py-4 font-black text-white text-center transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#2fae8a", fontSize: "1rem" }}>
                📷 사진 상담 시작하기 →
              </a>
              <a
                href="tel:01091273024"
                className="rounded-2xl px-8 py-4 font-bold text-center transition-opacity hover:opacity-70"
                style={{
                  border: "1px solid #1e1e1e",
                  color: "#888",
                  backgroundColor: "#111",
                  fontSize: "1rem",
                }}>
                📞 010-9127-3024
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
