"use client";

import { useMemo, useRef } from "react";
import Image from "next/image";

type Review = { who: string; title: string; body: string; stars?: number };

const beforeAfterSets = [
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
  "소파 꺼짐",
  "스프링 교체",
  "솜 교체",
  "가죽 처짐",
  "패브릭 소파",
  "리클라이너 소파",
];

export default function DifferenceAndReviewsSofa() {
  const ref = useRef<HTMLDivElement | null>(null);

  const reviews: Review[] = useMemo(
    () => [
      {
        who: "부천 상동 / 이** 고객님",
        title: "소파 꺼짐",
        body: "새로 사려다 고민했는데, 다시 탄탄해져서 정말 만족합니다.",
        stars: 5,
      },
      {
        who: "인천 서구 / 박** 고객님",
        title: "소파 스프링",
        body: "앉으면 완전히 꺼지던 소파가 새 것처럼 됐어요. 교체 안 해도 됐네요.",
        stars: 5,
      },
      {
        who: "강서구 화곡동 / 김** 고객님",
        title: "소파 처짐",
        body: "사진 보고 방향부터 정리해줘서 불안이 줄었어요. 믿고 맡겼습니다.",
        stars: 5,
      },
      {
        who: "마포구 합정 / 최** 고객님",
        title: "소파 수리",
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
      {/* ━━━━ 리뷰 맛보기 ━━━━ */}
      <div className="px-6 pt-16 pb-12" style={{ backgroundColor: "#1e1e1e" }}>
        <div className="mx-auto max-w-5xl">
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
                소파 바꾸기 전,
                <br />
                후기 먼저 보세요
              </h2>
              <p className="mt-2 text-sm" style={{ color: "#7a7a7a" }}>
                실제로 수리한 고객들의 한 줄 후기예요.
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
              꺼진 소파, 교체 전에
              <br />
              <span style={{ color: "#2fae8a" }}>
                수리로 되는지 먼저 확인하세요.
              </span>
            </h2>
            <p className="mt-3 text-sm" style={{ color: "#7a7a7a" }}>
              대부분의 소파 꺼짐은 스프링·우레탄 교체로 해결됩니다. 새 소파
              가격의 1/5 이하로요.
            </p>
          </div>

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
                  <div
                    className="rounded-2xl overflow-hidden"
                    style={{ border: "1px solid #e5e5e5" }}>
                    <div
                      className="relative w-full aspect-[4/3]"
                      style={{ backgroundColor: "#e5e5e5" }}>
                      <Image
                        src={set.before}
                        alt="소파 수리 전"
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
                  <div
                    className="rounded-2xl overflow-hidden"
                    style={{ border: "2px solid #2fae8a" }}>
                    <div
                      className="relative w-full aspect-[4/3]"
                      style={{ backgroundColor: "#e5e5e5" }}>
                      <Image
                        src={set.after}
                        alt="소파 수리 후"
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
              + 다양한 소파 수리 가능
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
                짧은 한 줄이 긴 설명보다 정확합니다.
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
