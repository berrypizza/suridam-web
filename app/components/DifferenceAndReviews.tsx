"use client";

import { useRef } from "react";
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

const previewReviews: Review[] = [
  {
    who: "강서구 화곡동 / 김** 고객님",
    title: "싱크대 상부장 떨어짐",
    body: "상부장이 떨어져서, 혹시나 하는 마음에 사진으로 문의했는데, 사진 보고 방향부터 정리해줘서 불안이 줄었어요. 믿고 맡겼습니다.",
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
    body: "붙박이장 슬라이딩 문 바퀴가 부서졌는데 수리담에서 수리가 가능하다고 해서 맡겼어요. 새로 사는 것보다 훨씬 저렴하게 고쳐서 만족합니다.",
    stars: 5,
  },
];

const allReviews: Review[] = [
  {
    who: "마포구 합정 / 최** 고객님",
    title: "문짝 문제",
    body: "안 되는 건 안 된다고 먼저 말해주는 게 오히려 신뢰였습니다.",
    stars: 5,
  },
  {
    who: "서울 노원구 / 정** 고객님",
    title: "상부장 탈락",
    body: "출장비 걱정했는데 사진으로 먼저 확인해줘서 괜히 부른 게 아니었어요.",
    stars: 5,
  },
  {
    who: "인천 남동구 / 한** 고객님",
    title: "경첩 교체",
    body: "비용 범위 먼저 얘기해줘서 좋았어요. 딱 그 안에서 끝났습니다.",
    stars: 5,
  },
  {
    who: "부천 중동 / 오** 고객님",
    title: "서랍 수리",
    body: "다른 곳에서 교체하라고 했는데 수리담은 고칠 수 있다고 해서 수리했어요.",
    stars: 5,
  },
];

export default function DifferenceAndReviews() {
  const ref = useRef<HTMLDivElement | null>(null);

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
      {/* 리뷰 맛보기 */}
      <div className="px-6 pt-20 pb-14" style={{ backgroundColor: "#1e1e1e" }}>
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <span
                className="inline-block text-sm tracking-widest uppercase mb-3 px-3 py-1 rounded-full font-semibold"
                style={{
                  backgroundColor: "#2fae8a22",
                  color: "#2fae8a",
                  border: "1px solid #2fae8a55",
                }}>
                Real Reviews
              </span>

              <h2
                className="text-3xl md:text-4xl font-bold leading-snug"
                style={{ color: "white" }}>
                말보다 후기가
                <br />
                먼저입니다
              </h2>

              <p
                className="mt-3 text-base md:text-lg leading-relaxed"
                style={{ color: "#bdbdbd" }}>
                긴 설명 대신, 실제 고객의 한 줄을 먼저 읽어보세요.
              </p>
            </div>

            <div
              className="flex items-center gap-3 px-5 py-4 rounded-2xl flex-shrink-0"
              style={{ backgroundColor: "#2a2a2a", border: "1px solid #333" }}>
              <span style={{ color: "#2fae8a", fontSize: 22 }}>★★★★★</span>
              <div>
                <div className="text-sm font-bold" style={{ color: "white" }}>
                  4.9 / 5.0
                </div>
                <div className="text-sm" style={{ color: "#bdbdbd" }}>
                  실제 고객 후기
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {previewReviews.map((r, i) => (
              <div
                key={i}
                className="rounded-2xl p-6 flex flex-col gap-4"
                style={{
                  backgroundColor: "#2a2a2a",
                  border: "1px solid #333",
                }}>
                <div className="flex items-center justify-between gap-3">
                  <div
                    className="flex gap-0.5 text-base"
                    style={{ color: "#2fae8a" }}>
                    {"★".repeat(r.stars ?? 5)}
                  </div>

                  <span
                    className="text-sm px-2.5 py-1 rounded-full whitespace-nowrap"
                    style={{
                      backgroundColor: "#1e1e1e",
                      color: "#bdbdbd",
                      border: "1px solid #333",
                    }}>
                    {r.title}
                  </span>
                </div>

                <p
                  className="text-base md:text-lg leading-loose flex-1"
                  style={{ color: "#f0f0f0" }}>
                  <span style={{ color: "#2fae8a", fontSize: 22 }}>"</span>
                  {r.body}
                  <span style={{ color: "#2fae8a", fontSize: 22 }}>"</span>
                </p>

                <div
                  className="flex items-center gap-2 pt-3"
                  style={{ borderTop: "1px solid #333" }}>
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{ backgroundColor: "#2fae8a22", color: "#2fae8a" }}>
                    {r.who[0]}
                  </div>
                  <span className="text-sm" style={{ color: "#bdbdbd" }}>
                    {r.who}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Before / After */}
      <div className="px-6 py-20" style={{ backgroundColor: "#f5f5f5" }}>
        <div className="mx-auto max-w-5xl">
          <div className="mb-14">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-snug"
              style={{ color: "#1e1e1e", marginBottom: 12 }}>
              가구수리 업체, <br />
              <span
                style={{
                  color: "#0cd199",
                  boxShadow: "0 0 0 2px #0cd199",
                }}>
                검색 많이 하셨나요?
              </span>
            </h2>

            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-snug"
              style={{ color: "#1e1e1e", marginBottom: 12 }}>
              많은 업체들, <br />
              <span
                style={{
                  color: "#0cd199",
                  boxShadow: "0 0 0 2px #0cd199",
                  backgroundColor: "#00000027",
                }}>
                견적 받아 보셨나요?
              </span>
            </h2>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-snug"
              style={{ color: "#1e1e1e", marginBottom: 12 }}>
              견적은 여러 군데 받았는데, <br />
              <span
                style={{
                  color: "#0cd199",
                  boxShadow: "0 0 0 2px #0cd199",
                  backgroundColor: "#000000a2",
                }}>
                금액이 다 달라서 머리 아프죠?
              </span>
            </h2>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-snug"
              style={{ color: "#1e1e1e", marginBottom: 12 }}>
              저렴한 업체 낮은 퀄리티, <br />
              <span
                style={{
                  color: "#0cd199",
                  boxShadow: "0 0 0 2px #0cd199",
                  backgroundColor: "#000000e5",
                }}>
                실망 하셨죠??
              </span>
            </h2>
            <p
              className="mt-4 text-base md:text-lg leading-relaxed"
              style={{ color: "#666" }}>
              대표가 대형 가구회사 출신으로, 가구의 재질부터 마감, 구조, 생산
              공정까지 모두 이해하고 있습니다.{" "}
            </p>
          </div>
          <span
            className="inline-block text-sm tracking-widest uppercase mb-3 px-3 py-1 rounded-full font-semibold"
            style={{
              backgroundColor: "#f0faf6",
              color: "#2fae8a",
              border: "1px solid #2fae8a",
            }}>
            Before / After
          </span>
          <div className="flex flex-col gap-8">
            {beforeAfterSets.map((set, i) => (
              <div key={i}>
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold flex-shrink-0"
                    style={{ backgroundColor: "#1e1e1e", color: "white" }}>
                    {set.tag}
                  </span>

                  <div
                    className="h-px flex-1"
                    style={{ backgroundColor: "#dddddd" }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 md:gap-5">
                  <div
                    className="rounded-2xl overflow-hidden"
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
                        className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-sm font-bold"
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
                        alt={`${set.tag} 후`}
                        fill
                        sizes="(max-width: 768px) 50vw, 480px"
                        className="object-cover"
                      />
                      <div
                        className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-sm font-bold"
                        style={{ backgroundColor: "#2fae8a", color: "white" }}>
                        After ✦
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-2.5">
            {repairTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full px-3 py-1.5 text-sm font-medium"
                style={{
                  backgroundColor: "white",
                  border: "1px solid #e5e5e5",
                  color: "#666",
                }}>
                {tag}
              </span>
            ))}

            <span
              className="rounded-full px-3 py-1.5 text-sm font-medium"
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

      {/* 리뷰 전체 슬라이드 */}
      <div className="px-6 py-16" style={{ backgroundColor: "white" }}>
        <div className="mx-auto max-w-5xl">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <span
                className="inline-block text-sm tracking-widest uppercase mb-3 px-3 py-1 rounded-full font-semibold"
                style={{
                  backgroundColor: "#f5f5f5",
                  color: "#7a7a7a",
                  border: "1px solid #e5e5e5",
                }}>
                All Reviews
              </span>

              <h3
                className="text-2xl md:text-3xl font-bold"
                style={{ color: "#1e1e1e" }}>
                직접 경험한 고객들의 이야기
              </h3>

              <p
                className="mt-2 text-base md:text-lg leading-relaxed"
                style={{ color: "#666" }}>
                짧은 한 줄이 긴 설명보다 정확할 때가 많습니다.
              </p>
            </div>

            <div className="hidden md:flex gap-2 flex-shrink-0">
              <button
                onClick={() => scrollByCard("left")}
                className="rounded-xl px-4 py-2.5 hover:opacity-70 text-base"
                style={{ border: "1px solid #e5e5e5", color: "#1e1e1e" }}>
                ←
              </button>
              <button
                onClick={() => scrollByCard("right")}
                className="rounded-xl px-4 py-2.5 hover:opacity-70 text-base"
                style={{ border: "1px solid #e5e5e5", color: "#1e1e1e" }}>
                →
              </button>
            </div>
          </div>

          <div
            ref={ref}
            className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2">
            {allReviews.map((r, idx) => (
              <article
                key={`${r.title}-${idx}`}
                data-card="review"
                className="min-w-[85%] sm:min-w-[380px] snap-start rounded-2xl p-6 flex flex-col gap-4"
                style={{
                  backgroundColor: "#f5f5f5",
                  border: "1px solid #e5e5e5",
                }}>
                <div className="flex items-center justify-between gap-3">
                  <div
                    className="flex gap-0.5 text-base"
                    style={{ color: "#2fae8a" }}>
                    {"★".repeat(r.stars ?? 5)}
                  </div>

                  <span
                    className="text-sm px-2.5 py-1 rounded-full whitespace-nowrap"
                    style={{
                      backgroundColor: "white",
                      border: "1px solid #e5e5e5",
                      color: "#666",
                    }}>
                    {r.title}
                  </span>
                </div>

                <p
                  className="text-base md:text-lg leading-loose flex-1"
                  style={{ color: "#1e1e1e" }}>
                  <span style={{ color: "#2fae8a", fontSize: 22 }}>"</span>
                  {r.body}
                  <span style={{ color: "#2fae8a", fontSize: 22 }}>"</span>
                </p>

                <div
                  className="flex items-center gap-2 pt-3"
                  style={{ borderTop: "1px solid #e5e5e5" }}>
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{
                      backgroundColor: "#f0faf6",
                      color: "#2fae8a",
                      border: "1px solid #2fae8a44",
                    }}>
                    {r.who[0]}
                  </div>

                  <span className="text-sm" style={{ color: "#666" }}>
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
