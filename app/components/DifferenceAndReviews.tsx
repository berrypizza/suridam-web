"use client";

import { useMemo, useRef } from "react";
import Image from "next/image";

type Review = { who: string; title: string; body: string; stars?: number };

export default function DifferenceAndReviews() {
  const ref = useRef<HTMLDivElement | null>(null);

  const reviews: Review[] = useMemo(
    () => [
      {
        who: "인천 부평 / 고객님",
        title: "상부장 처짐",
        body: "사진 보고 방향부터 정리해줘서 불안이 줄었어요.",
        stars: 5,
      },
      {
        who: "부천 / 고객님",
        title: "소파 꺼짐",
        body: "새로 사려다 고민했는데, 다시 탄탄해져서 만족합니다.",
        stars: 5,
      },
      {
        who: "강서구 / 고객님",
        title: "슬라이딩 도어",
        body: "문이 안 걸리고 부드럽게 닫혀서 스트레스가 사라졌어요.",
        stars: 5,
      },
      {
        who: "인천 / 고객님",
        title: "문짝 문제",
        body: "안 되는 건 안 된다고 먼저 말해주는 게 오히려 신뢰였습니다.",
        stars: 5,
      },
    ],
    [],
  );

  const diffs = [
    {
      problem: "일단 방문부터 → 현장에서 말이 바뀜",
      solution: "사진으로 1차 판단 후, 가능한 경우에만 방문합니다",
      icon: "📷",
    },
    {
      problem: "비용 '가봐야 알아요' 로 끝",
      solution: "범위를 먼저 공유하고, 납득 후 진행합니다",
      icon: "💬",
    },
    {
      problem: "수리 후 마무리 기준이 없음",
      solution: "수평·유격·열림감·이상 소음 기준으로 확인합니다",
      icon: "✅",
    },
    {
      problem: '"할 수 있다"고 해놓고 결과가 애매함',
      solution: "어려우면 사진 보고 먼저 말씀드립니다",
      icon: "🤝",
    },
  ];

  const scrollByCard = (dir: "left" | "right") => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card='review']");
    const w = card?.offsetWidth ?? 360;
    el.scrollBy({
      left: dir === "left" ? -(w + 16) : w + 16,
      behavior: "smooth",
    });
  };

  return (
    <section style={{ backgroundColor: "#f5f5f5" }}>
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━
          STEP 1 — 리뷰 맛보기
      ━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="px-6 pt-14 pb-10">
        <div className="mx-auto max-w-5xl">
          <p
            className="text-xs tracking-widest uppercase mb-2"
            style={{ color: "#7a7a7a" }}>
            Real Reviews
          </p>
          <h2
            className="text-xl md:text-2xl font-semibold"
            style={{ color: "#1e1e1e" }}>
            말보다 후기가 먼저입니다
          </h2>
          <p className="mt-2 text-sm" style={{ color: "#7a7a7a" }}>
            긴 설명 대신, 실제 고객의 한 줄을 먼저 읽어보세요.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {reviews.slice(0, 3).map((r, i) => (
              <div
                key={i}
                className="rounded-2xl p-5"
                style={{
                  backgroundColor: "white",
                  border: "1px solid #e5e5e5",
                }}>
                {/* 별점 */}
                <div
                  className="flex gap-0.5 text-sm"
                  style={{ color: "#2fae8a" }}>
                  {"★".repeat(r.stars ?? 5)}
                </div>
                <p
                  className="mt-3 font-medium leading-relaxed"
                  style={{ color: "#1e1e1e" }}>
                  "{r.body}"
                </p>
                <div className="mt-4 text-xs" style={{ color: "#7a7a7a" }}>
                  {r.who} · {r.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━
          STEP 3 — Before / After
      ━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="px-6 py-12" style={{ backgroundColor: "#f5f5f5" }}>
        <div className="mx-auto max-w-5xl">
          <p
            className="text-xs tracking-widest uppercase mb-2"
            style={{ color: "#7a7a7a" }}>
            Before / After
          </p>
          <h2
            className="text-xl md:text-2xl font-semibold"
            style={{ color: "#1e1e1e" }}>
            수리 전 사진 한 장, 수리 후 탄성 한 번
          </h2>
          <p className="mt-2 text-sm" style={{ color: "#7a7a7a" }}>
            직접 확인하세요.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {/* Before */}
            <div
              className="rounded-2xl p-4"
              style={{ backgroundColor: "white", border: "1px solid #e5e5e5" }}>
              <div
                className="text-xs font-semibold mb-2 uppercase tracking-widest"
                style={{ color: "#7a7a7a" }}>
                Before
              </div>
              <div
                className="relative w-full aspect-[4/3] rounded-xl overflow-hidden"
                style={{ backgroundColor: "#e5e5e5" }}>
                <Image
                  src="/images/upper-before.jpg"
                  alt="수리 전"
                  fill
                  sizes="(max-width: 768px) 100vw, 480px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* After */}
            <div
              className="rounded-2xl p-4"
              style={{ backgroundColor: "white", border: "1px solid #2fae8a" }}>
              <div
                className="text-xs font-semibold mb-2 uppercase tracking-widest"
                style={{ color: "#2fae8a" }}>
                After ✦
              </div>
              <div
                className="relative w-full aspect-[4/3] rounded-xl overflow-hidden"
                style={{ backgroundColor: "#e5e5e5" }}>
                <Image
                  src="/images/upper-after.jpg"
                  alt="수리 후"
                  fill
                  sizes="(max-width: 768px) 100vw, 480px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━
          STEP 4 — 리뷰 전체 슬라이드
      ━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="px-6 py-12" style={{ backgroundColor: "white" }}>
        <div className="mx-auto max-w-5xl">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p
                className="text-xs tracking-widest uppercase mb-2"
                style={{ color: "#7a7a7a" }}>
                All Reviews
              </p>
              <h3
                className="text-lg font-semibold"
                style={{ color: "#1e1e1e" }}>
                직접 경험한 고객들의 이야기
              </h3>
              <p className="mt-1 text-sm" style={{ color: "#7a7a7a" }}>
                짧은 한 줄이 긴 설명보다 정확할 때가 많습니다.
              </p>
            </div>

            <div className="hidden md:flex gap-2 flex-shrink-0">
              <button
                onClick={() => scrollByCard("left")}
                className="rounded-xl px-3 py-2 transition-colors hover:opacity-70"
                style={{ border: "1px solid #e5e5e5", color: "#1e1e1e" }}>
                ←
              </button>
              <button
                onClick={() => scrollByCard("right")}
                className="rounded-xl px-3 py-2 transition-colors hover:opacity-70"
                style={{ border: "1px solid #e5e5e5", color: "#1e1e1e" }}>
                →
              </button>
            </div>
          </div>

          <div
            ref={ref}
            className="mt-5 flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2">
            {reviews.map((r, idx) => (
              <article
                key={`${r.title}-${idx}`}
                data-card="review"
                className="min-w-[85%] sm:min-w-[380px] snap-start rounded-2xl p-6"
                style={{
                  backgroundColor: "#f5f5f5",
                  border: "1px solid #e5e5e5",
                }}>
                <div
                  className="flex gap-0.5 text-sm"
                  style={{ color: "#2fae8a" }}>
                  {"★".repeat(r.stars ?? 5)}
                </div>
                <p
                  className="mt-3 leading-relaxed"
                  style={{ color: "#1e1e1e" }}>
                  "{r.body}"
                </p>
                <div
                  className="mt-4 pt-4 flex justify-between text-xs"
                  style={{
                    borderTop: "1px solid #e5e5e5",
                    color: "#7a7a7a",
                  }}>
                  <span>{r.who}</span>
                  <span>{r.title}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
