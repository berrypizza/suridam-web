"use client";

import { useEffect, useRef, useState } from "react";
import FadeIn from "@/app/components/FadeIn";

// ── 비교 데이터 ───────────────────────────────────────────────
const diffs = [
  {
    num: "01",
    icon: "📷",
    theme: "진단 방식",
    problem: "전화하면 '일단 와봐야 알아요'",
    problemSub: "방문 후 금액이 처음과 달라진다",
    solution: "사진 1장으로 가능 여부 먼저 판단",
    solutionSub: "불가능하면 방문 전에 말씀드립니다",
  },
  {
    num: "02",
    icon: "💬",
    theme: "견적 안내",
    problem: '"비용은 현장 봐야 알아요"',
    problemSub: "막상 오면 견적이 두 배가 된다",
    solution: "범위를 먼저 공유, 납득 후 진행",
    solutionSub: "표준 단가표 공개, 숨은 비용 없음",
  },
  {
    num: "03",
    icon: "✅",
    theme: "솔직함",
    problem: '"됩니다" 해놓고 결과가 애매함',
    problemSub: "책임 없는 말만 하고 간다",
    solution: "어려우면 사진 보고 먼저 말씀드림",
    solutionSub: "수리 불가 시 출장비 0원",
  },
  {
    num: "04",
    icon: "🤝",
    theme: "마무리 기준",
    problem: "수리 끝나면 기준 없이 가버림",
    problemSub: "나중에 다시 문제가 생겨도 모르쇠",
    solution: "수평·유격·열림감·소음 4가지 확인",
    solutionSub: "기준으로 마무리, 이상 시 재방문",
  },
];

// ── 스크롤 아코디언 카드 ──────────────────────────────────────
function ScrollAccordionCard({ d }: { d: (typeof diffs)[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOpen(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3, rootMargin: "0px 0px -60px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="rounded-2xl overflow-hidden"
      style={{
        border: `1px solid ${open ? "#2fae8a44" : "#1a1a1a"}`,
        opacity: open ? 1 : 0.4,
        transform: open ? "translateY(0)" : "translateY(10px)",
        transitionProperty: "opacity, transform, border-color",
        transitionDuration: open ? "0.5s, 0.5s, 0.3s" : "0.15s, 0.15s, 0.15s",
        transitionTimingFunction: open
          ? "cubic-bezier(0.2, 0, 0, 1)"
          : "cubic-bezier(0.7, 0, 1, 1)",
      }}>
      {/* 헤더 */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{
          backgroundColor: open ? "#131a17" : "#111",
          borderBottom: `1px solid ${open ? "#2fae8a22" : "#161616"}`,
          transition: "background-color 0.4s ease",
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
              transition: "color 0.3s",
            }}>
            {d.solution}
          </span>
        </div>
        <div
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{
            backgroundColor: open ? "#2fae8a" : "#2a2a2a",
            boxShadow: open ? "0 0 8px #2fae8a99" : "none",
            transition: "all 0.3s",
          }}
        />
      </div>

      {/* 비교 본문 */}
      <div
        style={{
          maxHeight: open ? "160px" : "0px",
          overflow: "hidden",
          transition: open
            ? "max-height 0.45s cubic-bezier(0.2, 0, 0, 1)"
            : "max-height 0.18s cubic-bezier(0.7, 0, 1, 1)",
        }}>
        <div className="grid grid-cols-2">
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
              className="font-bold leading-snug mb-1 text-sm"
              style={{
                color: "#555",
                textDecoration: "line-through",
                textDecorationColor: "#ef444455",
              }}>
              {d.problem}
            </p>
            <p className="text-xs" style={{ color: "#2d2d2d" }}>
              {d.problemSub}
            </p>
          </div>
          <div className="px-4 py-4" style={{ backgroundColor: "#0d1410" }}>
            <span
              className="inline-block text-xs font-black px-2 py-0.5 rounded-full mb-2"
              style={{ backgroundColor: "#2fae8a22", color: "#2fae8a" }}>
              수리담
            </span>
            <p
              className="font-bold leading-snug mb-1 text-sm"
              style={{ color: "white" }}>
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

// ── 메인 섹션 ──────────────────────────────────────────────────
export default function WhySuridam() {
  return (
    <section style={{ backgroundColor: "#0d0d0d" }}>
      <div className="px-6 py-24 mx-auto max-w-3xl">
        {/* ── 배지 ── */}
        <FadeIn delay={0}>
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

        {/* ── 후킹 헤드라인: 자아흠집 + 상식파괴 ── */}
        <FadeIn delay={80}>
          <h2
            className="font-black leading-[1.08] tracking-tight mb-5"
            style={{ fontSize: "clamp(2.2rem, 6vw, 4rem)", color: "white" }}>
            가구수리 업체를
            <br />
            <span style={{ color: "#2fae8a" }}>잘못 고르는 법.</span>
          </h2>
        </FadeIn>

        {/* ── 명언 (규칙 1) ── */}
        <FadeIn delay={140}>
          <blockquote
            className="mb-8 rounded-2xl px-6 py-5"
            style={{
              backgroundColor: "#0d2318",
              border: "1px solid #2fae8a66",
            }}>
            <p
              className="text-base italic font-medium leading-relaxed"
              style={{
                color: "#a8e8d0",
                borderLeft: "3px solid #2fae8a",
                paddingLeft: 16,
              }}>
              "경험 없이는 아무것도 배울 수 없지만,
              <br />
              비싼 수업료를 반복해서 낼 필요도 없다."
            </p>
            <p className="text-sm mt-3 font-bold" style={{ color: "#2fae8a" }}>
              — 빌 게이츠
            </p>
          </blockquote>
        </FadeIn>

        {/* ── YES-SET: 라포르 + 마인드리딩 ── */}
        <div className="flex flex-col gap-3 mb-6">
          {[
            {
              check: "✓",
              text: "수리는 됐는데 며칠 뒤 또 문제가 생겼다",
              hi: false,
            },
            {
              check: "✓",
              text: "기사가 가고 나서 마무리가 애매해서 다시 연락했는데 안 받았다",
              hi: false,
            },
            {
              check: "→",
              text: "그 업체, 다시는 안 부르겠다고 생각했죠?",
              hi: true,
            },
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 80}>
              <div
                className="rounded-2xl px-5 py-4"
                style={{
                  backgroundColor: item.hi ? "#2fae8a12" : "#141414",
                  border: `1px solid ${item.hi ? "#2fae8a44" : "#1e1e1e"}`,
                }}>
                <p
                  className="font-semibold leading-snug"
                  style={{
                    fontSize: "clamp(1rem, 2.5vw, 1.15rem)",
                    color: item.hi ? "#2fae8a" : "rgba(255,255,255,0.75)",
                  }}>
                  <span
                    className="mr-2"
                    style={{ color: item.hi ? "#2fae8a" : "#3a3a3a" }}>
                    {item.check}
                  </span>
                  {item.text}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* ── 라포르 연결문 ── */}
        <FadeIn delay={240}>
          <p
            className="text-base leading-relaxed mb-14"
            style={{ color: "#666" }}>
            AS도 없고 마무리 기준도 없는 수리.
            <br />
            <strong style={{ color: "rgba(255,255,255,0.6)" }}>
              싼 게 비지떡이 아니라, 기준 없는 게 비지떡입니다.
            </strong>
            <br />
            수리담이 4가지 기준을 만든 이유입니다.
          </p>
        </FadeIn>

        {/* ── 구분선 ── */}
        <div className="mb-10 flex items-center gap-4">
          <div className="h-px flex-1" style={{ backgroundColor: "#1e1e1e" }} />
          <span
            className="text-xs font-black uppercase tracking-widest"
            style={{ color: "#2fae8a" }}>
            4가지 차이
          </span>
          <div className="h-px flex-1" style={{ backgroundColor: "#1e1e1e" }} />
        </div>

        {/* ── 소제목: 상식파괴 ── */}
        <FadeIn delay={0}>
          <h3
            className="font-black leading-tight mb-2"
            style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", color: "white" }}>
            수리담에는
            <br />
            <span style={{ color: "#ef4444" }}>없는 것</span>이 4가지입니다.
          </h3>
          <p className="text-sm mb-8" style={{ color: "#555" }}>
            없는 게 많은 곳이 더 좋은 수리입니다. 스크롤하면 펼쳐집니다.
          </p>
        </FadeIn>

        {/* ── 스크롤 아코디언 ── */}
        <div className="flex flex-col gap-3 mb-14">
          {diffs.map((d, i) => (
            <ScrollAccordionCard key={i} d={d} />
          ))}
        </div>

        {/* ── 약속 + 호기심 + CTA ── */}
        <FadeIn delay={0}>
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: "1px solid #2fae8a44" }}>
            {/* 약속 헤드 */}
            <div
              className="px-7 py-7"
              style={{
                background: "linear-gradient(135deg, #0a1a12 0%, #0d2018 100%)",
              }}>
              <p
                className="text-xs font-black uppercase tracking-widest mb-3"
                style={{ color: "#2fae8a" }}>
                수리담의 약속
              </p>
              <h3
                className="font-black leading-snug mb-2"
                style={{
                  fontSize: "clamp(1.3rem, 3.5vw, 1.9rem)",
                  color: "white",
                }}>
                위 4가지 중 하나라도 못 지키면
                <br />
                <span style={{ color: "#2fae8a" }}>
                  출장비를 받지 않습니다.
                </span>
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#2fae8a88" }}>
                광고 카피가 아닙니다. 실제로 지키지 못한 날은 청구하지 않습니다.
              </p>
            </div>

            {/* 호기심 훅 + CTA */}
            <div
              className="px-7 py-6"
              style={{
                backgroundColor: "#0f0f0f",
                borderTop: "1px solid #1e1e1e",
              }}>
              <p
                className="text-sm font-semibold leading-relaxed mb-5"
                style={{ color: "rgba(255,255,255,0.5)" }}>
                거절이 잦은 서비스가 왜 살아남았을까요?
                <br />
                <span style={{ color: "#2fae8a", fontWeight: 700 }}>
                  → 솔직한 곳을 한 번 경험하면 다시 찾기 때문입니다.
                </span>
              </p>
              <a
                href="/request"
                className="flex w-full items-center justify-center gap-2 rounded-xl py-4 font-black text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#2fae8a", fontSize: "1.05rem" }}>
                📷 사진 한 장으로 직접 확인하기 →
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
