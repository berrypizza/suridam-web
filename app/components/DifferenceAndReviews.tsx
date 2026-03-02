"use client";

import { useMemo, useRef } from "react";
import Image from "next/image";

type Review = { who: string; title: string; body: string; stars?: number };

const beforeAfterSets = [
  {
    tag: "상부장 처짐 수리",
    before: "/images/upper-before.jpg",
    after: "/images/upper-after.jpg",
  },
  {
    tag: "상부장 처짐 수리",
    before: "/images/upper-before2.jpg",
    after: "/images/upper-after2.jpg",
  },
  {
    tag: "상부장 처짐 수리",
    before: "/images/upper-before3.jpg",
    after: "/images/upper-after3.jpg",
  },
  {
    tag: "싱크대 문짝 교체",
    before: "/images/door-before.png",
    after: "/images/door-after.png",
  },
  {
    tag: "소파 꺼짐 수리",
    before: "/images/sofa-before.jpg",
    after: "/images/sofa-after.jpg",
  },
  {
    tag: "소파 꺼짐 수리",
    before: "/images/sofa-before2.jpg",
    after: "/images/sofa-after2.jpg",
  },
];

const repairTags = [
  "상부장 처짐",
  "소파 꺼짐",
  "슬라이딩 도어",
  "문짝 교체",
  "서랍 수리",
  "경첩 교체",
];

export default function DifferenceAndReviews() {
  const ref = useRef<HTMLDivElement | null>(null);

  const reviews: Review[] = useMemo(
    () => [
      {
        who: "강서구 화곡동 / 김** 고객님",
        title: "상부장 처짐",
        body: "사진 보고 방향부터 정리해줘서 불안이 줄었어요.",
        stars: 5,
      },
      {
        who: "부천 상동 / 이** 고객님",
        title: "소파 꺼짐",
        body: "새로 사려다 고민했는데, 다시 탄탄해져서 만족합니다.",
        stars: 5,
      },
      {
        who: "인천 서구 / 고** 고객님",
        title: "슬라이딩 도어",
        body: "문이 안 걸리고 부드럽게 닫혀서 스트레스가 사라졌어요.",
        stars: 5,
      },
      {
        who: "마포구 합정 / 최** 고객님",
        title: "문짝 문제",
        body: "안 되는 건 안 된다고 먼저 말해주는 게 오히려 신뢰였습니다.",
        stars: 5,
      },
    ],
    [],
  );

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
    <section>
      {/* ━━━━ 리뷰 맛보기 — 다크 배경 ━━━━ */}
      <div className="px-6 pt-16 pb-12" style={{ backgroundColor: "#1e1e1e" }}>
        <div className="mx-auto max-w-5xl">
          {/* 헤더 */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <span
                className="inline-block text-xs tracking-widest uppercase mb-3 px-3 py-1 rounded-full font-semibold"
                style={{
                  backgroundColor: "#2fae8a22",
                  color: "#2fae8a",
                  border: "1px solid #2fae8a55",
                }}>
                Real Reviews
              </span>
              <h2
                className="text-2xl md:text-3xl font-bold leading-snug"
                style={{ color: "white" }}>
                말보다 후기가
                <br />
                먼저입니다
              </h2>
              <p className="mt-2 text-sm" style={{ color: "#7a7a7a" }}>
                긴 설명 대신, 실제 고객의 한 줄을 먼저 읽어보세요.
              </p>
            </div>
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-2xl flex-shrink-0"
              style={{ backgroundColor: "#2a2a2a", border: "1px solid #333" }}>
              <span style={{ color: "#2fae8a", fontSize: 18 }}>★★★★★</span>
              <div>
                <div className="text-xs font-bold" style={{ color: "white" }}>
                  5.0 / 5.0
                </div>
                <div className="text-xs" style={{ color: "#7a7a7a" }}>
                  실제 고객 후기
                </div>
              </div>
            </div>
          </div>

          {/* 리뷰 카드 */}
          <div className="grid gap-4 sm:grid-cols-3">
            {reviews.slice(0, 3).map((r, i) => (
              <div
                key={i}
                className="rounded-2xl p-5 flex flex-col gap-3"
                style={{
                  backgroundColor: "#2a2a2a",
                  border: "1px solid #333",
                }}>
                <div className="flex items-center justify-between">
                  <div
                    className="flex gap-0.5 text-sm"
                    style={{ color: "#2fae8a" }}>
                    {"★".repeat(r.stars ?? 5)}
                  </div>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: "#1e1e1e",
                      color: "#7a7a7a",
                      border: "1px solid #333",
                    }}>
                    {r.title}
                  </span>
                </div>
                <p
                  className="text-sm leading-relaxed flex-1"
                  style={{ color: "#e5e5e5" }}>
                  <span style={{ color: "#2fae8a", fontSize: 20 }}>"</span>
                  {r.body}
                  <span style={{ color: "#2fae8a", fontSize: 20 }}>"</span>
                </p>
                <div
                  className="flex items-center gap-2 pt-2"
                  style={{ borderTop: "1px solid #333" }}>
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{ backgroundColor: "#2fae8a22", color: "#2fae8a" }}>
                    {r.who[0]}
                  </div>
                  <span className="text-xs" style={{ color: "#7a7a7a" }}>
                    {r.who}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ━━━━ Before / After ━━━━ */}
      <div className="px-6 py-16" style={{ backgroundColor: "#f5f5f5" }}>
        <div className="mx-auto max-w-5xl">
          {/* 헤더 */}
          <div className="mb-12">
            <span
              className="inline-block text-xs tracking-widest uppercase mb-3 px-3 py-1 rounded-full font-semibold"
              style={{
                backgroundColor: "#f0faf6",
                color: "#2fae8a",
                border: "1px solid #2fae8a",
              }}>
              Before / After
            </span>
            <h2
              className="text-2xl md:text-3xl lg:text-4xl font-bold leading-snug"
              style={{ color: "#1e1e1e" }}>
              소파든, 장롱이든, 문짝이든
              <br />
              <span style={{ color: "#2fae8a" }}>
                수리담은 가구를 가리지 않습니다.
              </span>
            </h2>
            <p className="mt-3 text-sm" style={{ color: "#7a7a7a" }}>
              다양한 수리 경험이 쌓인 만큼, 어떤 상황에서도 판단이 빠릅니다.
            </p>
          </div>

          {/* Before/After 세트 */}
          <div className="flex flex-col gap-6">
            {beforeAfterSets.map((set, i) => (
              <div key={i}>
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold flex-shrink-0"
                    style={{ backgroundColor: "#1e1e1e", color: "white" }}>
                    {set.tag}
                  </span>
                  <div
                    className="h-px flex-1"
                    style={{ backgroundColor: "#e5e5e5" }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 md:gap-4">
                  {/* Before */}
                  <div
                    className="rounded-2xl overflow-hidden relative"
                    style={{ border: "1px solid #e5e5e5" }}>
                    <div
                      className="relative w-full aspect-[4/3]"
                      style={{ backgroundColor: "#e5e5e5" }}>
                      <Image
                        src={set.before}
                        alt={`${set.tag} 전`}
                        fill
                        sizes="(max-width: 768px) 50vw, 480px"
                        className="object-cover"
                      />
                      <div
                        className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-xs font-bold"
                        style={{
                          backgroundColor: "rgba(0,0,0,0.55)",
                          color: "white",
                          backdropFilter: "blur(4px)",
                        }}>
                        Before
                      </div>
                    </div>
                  </div>

                  {/* After */}
                  <div
                    className="rounded-2xl overflow-hidden relative"
                    style={{ border: "2px solid #2fae8a" }}>
                    <div
                      className="relative w-full aspect-[4/3]"
                      style={{ backgroundColor: "#e5e5e5" }}>
                      <Image
                        src={set.after}
                        alt={`${set.tag} 후`}
                        fill
                        sizes="(max-width: 768px) 50vw, 480px"
                        className="object-cover"
                      />
                      <div
                        className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-xs font-bold"
                        style={{ backgroundColor: "#2fae8a", color: "white" }}>
                        After ✦
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 태그 모음 */}
          <div className="mt-10 flex flex-wrap gap-2">
            {repairTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full px-3 py-1 text-xs font-medium"
                style={{
                  backgroundColor: "white",
                  border: "1px solid #e5e5e5",
                  color: "#7a7a7a",
                }}>
                {tag}
              </span>
            ))}
            <span
              className="rounded-full px-3 py-1 text-xs font-medium"
              style={{
                backgroundColor: "#f0faf6",
                border: "1px solid #2fae8a",
                color: "#2e9f83",
              }}>
              + 그 외 가구 수리 전반
            </span>
          </div>
        </div>
      </div>

      {/* ━━━━ 리뷰 전체 슬라이드 ━━━━ */}
      <div className="px-6 py-14" style={{ backgroundColor: "white" }}>
        <div className="mx-auto max-w-5xl">
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <span
                className="inline-block text-xs tracking-widest uppercase mb-3 px-3 py-1 rounded-full font-semibold"
                style={{
                  backgroundColor: "#f5f5f5",
                  color: "#7a7a7a",
                  border: "1px solid #e5e5e5",
                }}>
                All Reviews
              </span>
              <h3 className="text-xl font-bold" style={{ color: "#1e1e1e" }}>
                직접 경험한 고객들의 이야기
              </h3>
              <p className="mt-1 text-sm" style={{ color: "#7a7a7a" }}>
                짧은 한 줄이 긴 설명보다 정확할 때가 많습니다.
              </p>
            </div>
            <div className="hidden md:flex gap-2 flex-shrink-0">
              <button
                onClick={() => scrollByCard("left")}
                className="rounded-xl px-3 py-2 hover:opacity-70"
                style={{ border: "1px solid #e5e5e5", color: "#1e1e1e" }}>
                ←
              </button>
              <button
                onClick={() => scrollByCard("right")}
                className="rounded-xl px-3 py-2 hover:opacity-70"
                style={{ border: "1px solid #e5e5e5", color: "#1e1e1e" }}>
                →
              </button>
            </div>
          </div>

          <div
            ref={ref}
            className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2">
            {reviews.map((r, idx) => (
              <article
                key={`${r.title}-${idx}`}
                data-card="review"
                className="min-w-[85%] sm:min-w-[360px] snap-start rounded-2xl p-6 flex flex-col gap-3"
                style={{
                  backgroundColor: "#f5f5f5",
                  border: "1px solid #e5e5e5",
                }}>
                <div className="flex items-center justify-between">
                  <div
                    className="flex gap-0.5 text-sm"
                    style={{ color: "#2fae8a" }}>
                    {"★".repeat(r.stars ?? 5)}
                  </div>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: "white",
                      border: "1px solid #e5e5e5",
                      color: "#7a7a7a",
                    }}>
                    {r.title}
                  </span>
                </div>
                <p
                  className="leading-relaxed flex-1"
                  style={{ color: "#1e1e1e" }}>
                  <span style={{ color: "#2fae8a", fontSize: 22 }}>"</span>
                  {r.body}
                  <span style={{ color: "#2fae8a", fontSize: 22 }}>"</span>
                </p>
                <div
                  className="flex items-center gap-2 pt-3"
                  style={{ borderTop: "1px solid #e5e5e5" }}>
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{
                      backgroundColor: "#f0faf6",
                      color: "#2fae8a",
                      border: "1px solid #2fae8a44",
                    }}>
                    {r.who[0]}
                  </div>
                  <span className="text-xs" style={{ color: "#7a7a7a" }}>
                    {r.who}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
