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
    title: "싱크대 상부장 탈락",
    body: "상부장이 떨어져서 사진으로 문의했는데, 방향부터 정리해줘서 불안이 줄었어요. 믿고 맡겼습니다.",
    stars: 5,
  },
  {
    who: "부천 상동 / 이** 고객님",
    title: "소파 쿠션 꺼짐",
    body: "새로 사려다 고민했는데, 수리담 다녀가고 나서 다시 탄탄해졌어요. 진작 연락할걸.",
    stars: 5,
  },
  {
    who: "인천 서구 / 고** 고객님",
    title: "붙박이장 슬라이딩",
    body: "다른 곳은 교체하라고만 했어요. 수리담은 고칠 수 있다고 해서 맡겼는데, 정말 고쳐졌습니다.",
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
      {/* ───── 리뷰 맛보기 ───── */}
      <div className="px-6 pt-20 pb-14" style={{ backgroundColor: "#111" }}>
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
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
                style={{
                  fontSize: "clamp(2rem, 5vw, 3.2rem)",
                  color: "white",
                }}>
                긴 설명보다
                <br />
                <span style={{ color: "#2fae8a" }}>
                  후기 한 줄이 정직합니다
                </span>
              </h2>
              <p
                className="mt-4 text-lg leading-relaxed"
                style={{ color: "#888" }}>
                광고 카피가 아닌, 실제 고객의 말입니다.
              </p>
            </div>

            <div
              className="flex items-center gap-4 px-6 py-5 rounded-2xl flex-shrink-0"
              style={{
                backgroundColor: "#1a1a1a",
                border: "1px solid #2a2a2a",
              }}>
              <span style={{ color: "#2fae8a", fontSize: 26 }}>★★★★★</span>
              <div>
                <div className="text-xl font-black" style={{ color: "white" }}>
                  4.9 / 5.0
                </div>
                <div className="text-sm mt-0.5" style={{ color: "#666" }}>
                  실제 고객 후기 기준
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {previewReviews.map((r, i) => (
              <div
                key={i}
                className="rounded-2xl p-7 flex flex-col gap-5"
                style={{
                  backgroundColor: "#1a1a1a",
                  border: "1px solid #252525",
                }}>
                <div className="flex items-center justify-between">
                  <div
                    className="flex gap-0.5 text-lg"
                    style={{ color: "#2fae8a" }}>
                    {"★".repeat(r.stars ?? 5)}
                  </div>
                  <span
                    className="text-sm px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: "#111",
                      color: "#888",
                      border: "1px solid #2a2a2a",
                    }}>
                    {r.title}
                  </span>
                </div>
                <p
                  className="text-lg leading-relaxed flex-1"
                  style={{ color: "#e8e8e8" }}>
                  <span
                    style={{ color: "#2fae8a", fontSize: 24, lineHeight: 0 }}>
                    "
                  </span>
                  {r.body}
                  <span
                    style={{ color: "#2fae8a", fontSize: 24, lineHeight: 0 }}>
                    "
                  </span>
                </p>
                <div
                  className="flex items-center gap-3 pt-4"
                  style={{ borderTop: "1px solid #222" }}>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-black flex-shrink-0"
                    style={{
                      backgroundColor: "#2fae8a22",
                      color: "#2fae8a",
                      border: "1px solid #2fae8a44",
                    }}>
                    {r.who[0]}
                  </div>
                  <span className="text-sm" style={{ color: "#666" }}>
                    {r.who}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ───── YES-SET 헤드 + Before/After ───── */}
      <div className="px-6 py-20" style={{ backgroundColor: "#f5f5f5" }}>
        <div className="mx-auto max-w-5xl">
          {/* 강화된 yes-set — 규칙 4·5 */}
          <div className="mb-16 flex flex-col gap-4">
            {[
              { q: "가구수리 업체, 여러 곳 검색해봤다 → 맞죠?", dim: false },
              { q: '전화하면 전부 "와봐야 알아요" → 답답했죠?', dim: false },
              {
                q: "막상 방문 후 견적이 처음보다 비쌌다 → 황당했죠?",
                dim: false,
              },
              {
                q: "저렴한 곳 골랐다가 퀄리티에 실망했다 → 결국 손해였죠?",
                dim: true,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-2xl px-7 py-5"
                style={{
                  backgroundColor: item.dim ? "#1e1e1e" : "white",
                  border: `1px solid ${item.dim ? "#2fae8a33" : "#e5e5e5"}`,
                }}>
                <p
                  className="font-bold"
                  style={{
                    fontSize: "clamp(1.1rem, 3vw, 1.4rem)",
                    color: item.dim ? "#2fae8a" : "#1e1e1e",
                  }}>
                  {item.q}
                </p>
              </div>
            ))}

            {/* 권위 — 규칙 3 */}
            <div
              className="rounded-2xl px-7 py-6 mt-2"
              style={{
                backgroundColor: "#1e1e1e",
                border: "1px solid #2fae8a55",
              }}>
              <p
                className="text-base font-semibold mb-2"
                style={{ color: "#2fae8a" }}>
                ✦ 대형 가구회사 생산·마감·구조 전문 출신
              </p>
              <p
                className="font-black leading-snug"
                style={{
                  fontSize: "clamp(1.4rem, 3.5vw, 2rem)",
                  color: "white",
                }}>
                그래서 수리담은
                <br />
                사진 보고{" "}
                <span style={{ color: "#2fae8a" }}>
                  안 된다고 먼저 말합니다.
                </span>
              </p>
            </div>
          </div>

          {/* Before / After */}
          <span
            className="inline-block text-sm tracking-widest uppercase mb-6 px-3 py-1.5 rounded-full font-bold"
            style={{
              backgroundColor: "#f0faf6",
              color: "#2fae8a",
              border: "1px solid #2fae8a",
            }}>
            Before / After
          </span>

          <div className="flex flex-col gap-10">
            {beforeAfterSets.map((set, i) => (
              <div key={i}>
                {/* 태그 */}
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-bold flex-shrink-0"
                    style={{ backgroundColor: "#1e1e1e", color: "white" }}>
                    {set.tag}
                  </span>
                  <div
                    className="h-px flex-1"
                    style={{ backgroundColor: "#ddd" }}
                  />
                </div>

                {/* 모바일: 세로 스택 / 데스크탑: 좌우 */}
                <div className="flex flex-col md:grid md:grid-cols-2 gap-3 md:gap-5">
                  {/* Before */}
                  <div
                    className="rounded-2xl overflow-hidden"
                    style={{ border: "2px solid #e0e0e0" }}>
                    <div
                      className="relative w-full"
                      style={{
                        aspectRatio: "3/2",
                        backgroundColor: "#e5e5e5",
                      }}>
                      <Image
                        src={set.before}
                        alt={`${set.tag} 전`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                      {/* 하단 레이블 바 */}
                      <div
                        className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 py-3"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)",
                        }}>
                        <span
                          className="text-base font-black"
                          style={{ color: "white", letterSpacing: "0.05em" }}>
                          Before
                        </span>
                        <span
                          className="text-sm font-semibold px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: "rgba(255,255,255,0.2)",
                            color: "rgba(255,255,255,0.85)",
                          }}>
                          수리 전
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* After */}
                  <div
                    className="rounded-2xl overflow-hidden"
                    style={{ border: "2px solid #2fae8a" }}>
                    <div
                      className="relative w-full"
                      style={{
                        aspectRatio: "3/2",
                        backgroundColor: "#e5e5e5",
                      }}>
                      <Image
                        src={set.after}
                        alt={`${set.tag} 후`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                      {/* 하단 레이블 바 */}
                      <div
                        className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 py-3"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(15,60,40,0.85) 0%, transparent 100%)",
                        }}>
                        <span
                          className="text-base font-black"
                          style={{ color: "#2fae8a", letterSpacing: "0.05em" }}>
                          After ✦
                        </span>
                        <span
                          className="text-sm font-semibold px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: "#2fae8a33",
                            color: "#2fae8a",
                            border: "1px solid #2fae8a66",
                          }}>
                          수리 완료
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-2.5">
            {repairTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full px-4 py-1.5 text-sm font-medium"
                style={{
                  backgroundColor: "white",
                  border: "1px solid #e5e5e5",
                  color: "#666",
                }}>
                {tag}
              </span>
            ))}
            <span
              className="rounded-full px-4 py-1.5 text-sm font-semibold"
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

      {/* ───── 리뷰 슬라이드 ───── */}
      <div className="px-6 py-16" style={{ backgroundColor: "white" }}>
        <div className="mx-auto max-w-5xl">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <span
                className="inline-block text-sm tracking-widest uppercase mb-3 px-3 py-1 rounded-full font-bold"
                style={{
                  backgroundColor: "#f5f5f5",
                  color: "#7a7a7a",
                  border: "1px solid #e5e5e5",
                }}>
                All Reviews
              </span>
              <h3
                className="text-2xl md:text-3xl font-black"
                style={{ color: "#1e1e1e" }}>
                직접 경험한 고객들의 한 마디
              </h3>
              <p
                className="mt-2 text-base md:text-lg"
                style={{ color: "#666" }}>
                짧은 한 줄이 긴 설명보다 정확합니다.
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
            className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2"
            style={{ scrollbarWidth: "none" }}>
            {allReviews.map((r, idx) => (
              <article
                key={`${r.title}-${idx}`}
                data-card="review"
                className="min-w-[85%] sm:min-w-[380px] snap-start rounded-2xl p-7 flex flex-col gap-5"
                style={{
                  backgroundColor: "#f5f5f5",
                  border: "1px solid #e5e5e5",
                }}>
                <div className="flex items-center justify-between gap-3">
                  <div
                    className="flex gap-0.5 text-lg"
                    style={{ color: "#2fae8a" }}>
                    {"★".repeat(r.stars ?? 5)}
                  </div>
                  <span
                    className="text-sm px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: "white",
                      border: "1px solid #e5e5e5",
                      color: "#666",
                    }}>
                    {r.title}
                  </span>
                </div>
                <p
                  className="text-lg leading-relaxed flex-1"
                  style={{ color: "#1e1e1e" }}>
                  <span style={{ color: "#2fae8a", fontSize: 24 }}>"</span>
                  {r.body}
                  <span style={{ color: "#2fae8a", fontSize: 24 }}>"</span>
                </p>
                <div
                  className="flex items-center gap-3 pt-4"
                  style={{ borderTop: "1px solid #e5e5e5" }}>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-black flex-shrink-0"
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
