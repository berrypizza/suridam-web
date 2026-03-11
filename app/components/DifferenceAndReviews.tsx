"use client";

import { useState } from "react";
import Image from "next/image";
import FadeIn from "@/app/components/FadeIn";

type Review = { who: string; title: string; body: string; stars?: number };

const categories = [
  {
    id: "upper",
    icon: "🔨",
    label: "상부장 처짐 수리",
    desc: "싱크대 상부장이 처지거나 탈락한 경우",
    cases: [
      {
        tag: "상부장 처짐 수리",
        before: "/images/upper-before.jpg",
        after: "/images/upper-after.jpg",
        review: {
          who: "강서구 화곡동 / 김** 고객님",
          body: "불안해서 요리를 못 했다. 사진 한 장 보냈더니 다음 날 고쳐졌다.",
        },
      },
      {
        tag: "상부장 처짐 수리",
        before: "/images/upper-before2.jpg",
        after: "/images/upper-after2.jpg",
        review: {
          who: "부천 작동 / 김** 고객님",
          body: "위에서 쾅 소리가 났다. 식칼 옆에 떨어졌다. 그날 바로 연락했다.",
        },
      },
      {
        tag: "상부장 처짐 수리",
        before: "/images/upper-before3.jpg",
        after: "/images/upper-after3.jpg",
        review: {
          who: "서울 마포구 / 정** 고객님",
          body: "2년째 조금씩 처지는 거 알면서 못 본 척했다. 더 미뤘으면 진짜 위험할 뻔했다.",
        },
      },
    ],
  },
  {
    id: "door",
    icon: "🚪",
    label: "문짝 교체 수리",
    desc: "싱크대·붙박이장 문짝이 떨어지거나 파손된 경우",
    cases: [
      {
        tag: "싱크대 문짝 교체",
        before: "/images/door-before.png",
        after: "/images/door-after.png",
        review: {
          who: "마포구 합정 / 최** 고객님",
          body: "안 된다고 먼저 말하는 업체를 처음 봤다. 그래서 더 믿었다.",
        },
      },
      {
        tag: "싱크대 문짝 교체",
        before: "/images/door-berfore2.jpg",
        after: "/images/door-after2.jpg",
        review: {
          who: "강서구 화곡동 / 정** 고객님",
          body: "업체 3곳 돌았는데 다 교체하래. 수리담은 7만원에 고쳤다.",
        },
      },
    ],
  },
  {
    id: "sofa",
    icon: "🛋️",
    label: "소파 꺼짐 수리",
    desc: "소파 쿠션이 꺼지거나 스프링·목대가 파손된 경우",
    cases: [
      {
        tag: "소파 꺼짐 수리",
        before: "/images/sofa-before.jpg",
        after: "/images/sofa-after.jpg",
        review: {
          who: "부천 상동 / 이** 고객님",
          body: "새 소파 180만원 장바구니에 담아놨다가 지웠다. 여기서 24만원에 끝났다.",
        },
      },
      {
        tag: "소파 꺼짐 수리",
        before: "/images/sofa-before2.jpg",
        after: "/images/sofa-after2.jpg",
        review: {
          who: "인천 송도 / 장** 고객님",
          body: "퇴근 후 유일한 낙이 소파였는데 반쪽짜리였다. 이제 제대로 눕는다.",
        },
      },
    ],
  },
  {
    id: "sliding",
    icon: "🔲",
    label: "슬라이딩 도어 수리",
    desc: "붙박이장 슬라이딩·포켓 도어가 걸리거나 탈선된 경우",
    cases: [
      {
        tag: "붙박이장 슬라이딩",
        before: "/images/sliding-before.jpg",
        after: "/images/sliding-after.jpg",
        review: {
          who: "인천 서구 / 고** 고객님",
          body: "가구점 가서 '새로 맞추면 얼마예요' 물어보고 왔다가 수리담 찾았다. 잘했다.",
        },
      },
      {
        tag: "붙박이장 슬라이딩",
        before: "/images/sliding-before2.jpg",
        after: "/images/sliding-after2.jpg",
        review: {
          who: "부천 중동 / 임** 고객님",
          body: "문짝이 레일에서 빠져서 한 달 동안 들어서 열었다. 이제 그냥 밀면 된다.",
        },
      },
    ],
  },
  {
    id: "hinge",
    icon: "🔩",
    label: "경첩 · 서랍 수리",
    desc: "경첩 파손, 서랍 레일 교체, 볼레일 수리",
    cases: [
      {
        tag: "서랍 철레일 교체",
        before: "/images/rail-before2.jpg",
        after: "/images/rail-after2.jpg",
        review: {
          who: "인천 남동구 / 한** 고객님",
          body: "'이 정도면 얼마 나올까요' 물었더니 범위를 딱 말해줬다. 그 범위 안에서 끝났다.",
        },
      },
      {
        tag: "서랍 볼레일 교체",
        before: "/images/rail-before.jpg",
        after: "/images/rail-after.jpg",
        review: {
          who: "서울 동작구 / 이** 고객님",
          body: "서랍 3개가 다 뻑뻑했다. 하나씩 덜 쓰게 됐다. 전부 진작 고쳤어야 했는데.",
        },
      },
    ],
  },
  {
    id: "chair",
    icon: "🪑",
    label: "의자 수리 · 가죽 교체",
    desc: "식탁의자 가죽 교체, 나무의자 다리 수리, 흔들림 교정",
    cases: [
      {
        tag: "식탁의자 가죽 교체",
        before: "/images/chair-before.jpg",
        after: "/images/chair-after.jpg",
        review: {
          who: "인천 계산동 / 김** 고객님",
          body: "버리려다 '혹시나' 하고 사진 보냈다. 3만원에 다시 앉게 됐다.",
        },
      },
      {
        tag: "식탁의자 가죽 교체",
        before: "/images/chair-before2.jpg",
        after: "/images/chair-after2.jpg",
        review: {
          who: "서울 역삼동 / 김** 고객님",
          body: "손님 올 때마다 가죽 찢어진 게 신경 쓰였다. 이제 안 신경 쓴다.",
        },
      },
    ],
  },
];

const previewReviews: Review[] = [
  {
    who: "강서구 화곡동 / 김** 고객님",
    title: "상부장 탈락",
    body: "교체 견적 140만원 받았다가, 사진 보내고 8만원에 끝났다.",
    stars: 5,
  },
  {
    who: "부천 상동 / 이** 고객님",
    title: "소파 꺼짐",
    body: "새 소파 장바구니에 담아놨다가 지웠다. 여기서 24만원에 끝났다.",
    stars: 5,
  },
  {
    who: "인천 서구 / 고** 고객님",
    title: "슬라이딩 도어",
    body: "다른 데서 '그냥 새로 사세요' 들었다. 여기서 고쳤다.",
    stars: 5,
  },
];

function CaseCard({ c }: { c: (typeof categories)[0]["cases"][0] }) {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: "1px solid #222" }}>
      <div className="grid grid-cols-2">
        <div
          className="relative"
          style={{ aspectRatio: "3/2", backgroundColor: "#0d0d0d" }}>
          <Image
            src={c.before}
            alt={`${c.tag} 전`}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className="object-cover"
          />
          <div
            className="absolute bottom-0 left-0 right-0 px-3 py-2"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)",
            }}>
            <span
              className="text-xs font-black"
              style={{ color: "#bbb", letterSpacing: "0.08em" }}>
              BEFORE
            </span>
          </div>
        </div>
        <div
          className="relative"
          style={{ aspectRatio: "3/2", backgroundColor: "#0d0d0d" }}>
          <Image
            src={c.after}
            alt={`${c.tag} 후`}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className="object-cover"
          />
          <div
            className="absolute bottom-0 left-0 right-0 px-3 py-2"
            style={{
              background:
                "linear-gradient(to top, rgba(15,50,35,0.85) 0%, transparent 100%)",
            }}>
            <span
              className="text-xs font-black"
              style={{ color: "#2fae8a", letterSpacing: "0.08em" }}>
              AFTER ✦
            </span>
          </div>
        </div>
      </div>
      <div className="px-4 py-3" style={{ backgroundColor: "#161616" }}>
        <span
          className="inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-2"
          style={{
            backgroundColor: "#1e1e1e",
            color: "#888",
            border: "1px solid #252525",
          }}>
          {c.tag}
        </span>
        {c.review && (
          <div
            className="rounded-xl px-3 py-2.5 mt-1"
            style={{ backgroundColor: "#1a1a1a", border: "1px solid #222" }}>
            <p className="text-sm leading-relaxed" style={{ color: "#ddd" }}>
              <span style={{ color: "#2fae8a", fontSize: 16 }}>"</span>
              {c.review.body}
              <span style={{ color: "#2fae8a", fontSize: 16 }}>"</span>
            </p>
            <p className="text-xs mt-1.5" style={{ color: "#555" }}>
              — {c.review.who}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function AccordionItem({ cat }: { cat: (typeof categories)[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-200"
      style={{
        border: `1px solid ${open ? "#2fae8a55" : "#1e1e1e"}`,
        backgroundColor: open ? "#111" : "#0f0f0f",
      }}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left transition-all"
        style={{ backgroundColor: open ? "#141414" : "transparent" }}>
        <div className="flex items-center gap-3">
          <span className="text-2xl">{cat.icon}</span>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="text-sm font-bold"
                style={{ color: open ? "white" : "#e5e5e5" }}>
                {cat.label}
              </span>
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: open ? "#2fae8a22" : "#1e1e1e",
                  color: open ? "#2fae8a" : "#555",
                  border: `1px solid ${open ? "#2fae8a44" : "#252525"}`,
                }}>
                {cat.cases.length}건
              </span>
            </div>
            <p className="text-xs mt-0.5" style={{ color: "#555" }}>
              {cat.desc}
            </p>
          </div>
        </div>

        {/* 화살표 + pulse 링 */}
        <div
          className="relative flex-shrink-0 flex items-center justify-center"
          style={{ width: 36, height: 36 }}>
          {/* pulse 링 — 닫혀있을 때만 표시 */}
          {!open && (
            <>
              <span
                className="absolute inset-0 rounded-xl animate-ping"
                style={{ backgroundColor: "#2fae8a", opacity: 0.2 }}
              />
              <span
                className="absolute inset-0 rounded-xl animate-pulse"
                style={{ backgroundColor: "#2fae8a", opacity: 0.1 }}
              />
            </>
          )}
          <div
            className="relative flex items-center justify-center w-8 h-8 rounded-xl transition-all duration-300"
            style={{
              backgroundColor: open ? "#2fae8a" : "#1a1a1a",
              border: `1px solid ${open ? "#2fae8a" : "#2fae8a55"}`,
              color: open ? "white" : "#2fae8a",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              fontWeight: 900,
            }}>
            ↓
          </div>
        </div>
      </button>
      <div
        style={{
          maxHeight: open ? `${cat.cases.length * 600}px` : "0px",
          overflow: "hidden",
          transition: "max-height 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
        }}>
        <div
          className="px-4 pb-4 flex flex-col gap-4"
          style={{ borderTop: "1px solid #1e1e1e", paddingTop: 16 }}>
          {cat.cases.map((c, i) => (
            <CaseCard key={i} c={c} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DifferenceAndReviews() {
  return (
    <section>
      {/* ───── 리뷰 맛보기 ───── */}
      <div className="px-6 pt-20 pb-14" style={{ backgroundColor: "#111" }}>
        <div className="mx-auto max-w-5xl">
          {/* 규칙 1 상식파괴 헤더 */}
          <FadeIn delay={0}>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
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
                  <div
                    className="text-xl font-black"
                    style={{ color: "white" }}>
                    4.9 / 5.0
                  </div>
                  <div className="text-sm mt-0.5" style={{ color: "#666" }}>
                    실제 고객 후기 기준
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* 후기 도입 — 간결하게 */}
          <FadeIn delay={60}>
            <p
              className="mb-8 text-base font-semibold"
              style={{ color: "#888" }}>
              광고 카피가 아닌, 실제 고객의 말입니다.
            </p>
          </FadeIn>

          {/* 리뷰 카드 */}
          <div className="grid gap-5 sm:grid-cols-3">
            {previewReviews.map((r, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div
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
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* ───── YES-SET + Before/After 아코디언 ───── */}
      <div className="px-6 py-20" style={{ backgroundColor: "#f5f5f5" }}>
        <div className="mx-auto max-w-5xl">
          {/* 섹션 브릿지 — 후기에서 사례로 자연스럽게 연결 */}
          <FadeIn delay={0}>
            <div
              className="mb-14 rounded-2xl px-7 py-6"
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
                고칠 수 있는 건 고치고,
                <br />
                <span style={{ color: "#2fae8a" }}>안 되면 먼저 말합니다.</span>
                <br />
                <span
                  style={{
                    fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
                    fontWeight: 500,
                    color: "#888",
                  }}>
                  아래는 실제 수리 전·후 사진입니다.
                </span>
              </p>
            </div>
          </FadeIn>

          {/* Before/After 헤더 + 명언 */}
          <FadeIn delay={0}>
            <span
              className="inline-block text-sm tracking-widest uppercase mb-4 px-3 py-1.5 rounded-full font-bold"
              style={{
                backgroundColor: "#f0faf6",
                color: "#2fae8a",
                border: "1px solid #2fae8a",
              }}>
              Before / After
            </span>
            <p
              className="mb-6 text-base font-semibold"
              style={{ color: "#888" }}>
              말보다 사진이 빠릅니다. 직접 확인하세요.
            </p>
          </FadeIn>

          {/* 아코디언 */}
          <div className="flex flex-col gap-3">
            {categories.map((cat, i) => (
              <FadeIn key={cat.id} delay={i * 60}>
                <AccordionItem cat={cat} />
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
