"use client";

import { useState } from "react";
import Image from "next/image";
import ContactCTA from "@/app/components/ContactCTA";
import FadeIn from "@/app/components/FadeIn";

// ── 카테고리별 수리 사례 데이터 ─────────────────────────────
const categories = [
  {
    id: "upper",
    icon: "🔨",
    label: "상부장 처짐 수리",
    desc: "싱크대 상부장이 처지거나 탈락한 경우",
    count: 3,
    cases: [
      {
        tag: "상부장 처짐 수리",
        before: "/images/upper-before.jpg",
        after: "/images/upper-after.jpg",
        review: {
          who: "강서구 화곡동 / 김** 고객님",
          body: "상부장이 떨어져서 사진으로 문의했는데, 방향부터 정리해줘서 불안이 줄었어요. 믿고 맡겼습니다.",
        },
      },
      {
        tag: "상부장 처짐 수리",
        before: "/images/upper-before2.jpg",
        after: "/images/upper-after2.jpg",
        review: {
          who: "부천 작동 / 김** 고객님",
          body: "상부장이 갑자기 떨어져서 당황했는데, 사진 상담으로 빠르게 수리해줘서 정말 감사했어요.",
        },
      },
      {
        tag: "상부장 처짐 수리",
        before: "/images/upper-before3.jpg",
        after: "/images/upper-after3.jpg",
        review: {
          who: "서울 마포구 / 정** 고객님",
          body: "상부장이 오래되서 처졌는데, 수리담에서 고칠 수 있다고 해서 맡겼어요. 정말 튼튼하게 고쳐졌습니다.",
        },
      },
    ],
  },
  {
    id: "door",
    icon: "🚪",
    label: "문짝 교체 수리",
    desc: "싱크대·붙박이장 문짝이 떨어지거나 파손된 경우",
    count: 2,
    cases: [
      {
        tag: "싱크대 문짝 교체",
        before: "/images/door-before.png",
        after: "/images/door-after.png",
        review: {
          who: "마포구 합정 / 최** 고객님",
          body: "안 되는 건 안 된다고 먼저 말해주는 게 오히려 신뢰였습니다.",
        },
      },
      {
        tag: "싱크대 문짝 교체",
        before: "/images/door-berfore2.jpg",
        after: "/images/door-after2.jpg",
        review: {
          who: "강서구 화곡동 / 정** 고객님",
          body: "싱크대 문짝이 물에 불어서 교체 업체 알아봤는데, 수리담 조금 알아보니 믿을만 해서 맡겼어요. 결과도 만족스럽습니다.",
        },
      },
    ],
  },
  {
    id: "sofa",
    icon: "🛋️",
    label: "소파 꺼짐 수리",
    desc: "소파 쿠션이 꺼지거나 스프링·목대가 파손된 경우",
    count: 2,
    cases: [
      {
        tag: "소파 꺼짐 수리",
        before: "/images/sofa-before.jpg",
        after: "/images/sofa-after.jpg",
        review: {
          who: "부천 상동 / 이** 고객님",
          body: "새로 사려다 고민했는데, 수리담 다녀가고 나서 다시 탄탄해졌어요. 진작 연락할걸.",
        },
      },
      {
        tag: "소파 꺼짐 수리",
        before: "/images/sofa-before2.jpg",
        after: "/images/sofa-after2.jpg",
        review: {
          who: "인천 송도 / 장** 고객님",
          body: "퇴근하고 매번 소파에 누워있는데, 남자의 공간을 되찾은 느낌이에요. 수리담 고마워요.",
        },
      },
    ],
  },
  {
    id: "sliding",
    icon: "🔲",
    label: "슬라이딩 도어 수리",
    desc: "붙박이장 슬라이딩·포켓 도어가 걸리거나 탈선된 경우",
    count: 2,
    cases: [
      {
        tag: "붙박이장 슬라이딩",
        before: "/images/sliding-before.jpg",
        after: "/images/sliding-after.jpg",
        review: {
          who: "인천 서구 / 고** 고객님",
          body: "다른 곳은 교체하라고만 했어요. 수리담은 고칠 수 있다고 해서 맡겼는데, 정말 고쳐졌습니다.",
        },
      },
      {
        tag: "붙박이장 슬라이딩",
        before: "/images/sliding-before2.jpg",
        after: "/images/sliding-after2.jpg",
        review: {
          who: "부천 중동 / 임** 고객님",
          body: "문짝이 갑자기 떨어져서 당황했는데, 수리담에서 사진 상담으로 빠르게 수리해줘서 정말 감사했어요.",
        },
      },
    ],
  },
  {
    id: "hinge",
    icon: "🔩",
    label: "경첩 · 서랍 수리",
    desc: "경첩 파손, 서랍 레일 교체, 볼레일 수리",
    count: 2,
    cases: [
      {
        tag: "서랍 철레일 교체",
        before: "/images/rail-before2.jpg",
        after: "/images/rail-after2.jpg",
        review: {
          who: "인천 남동구 / 한** 고객님",
          body: "비용 범위 먼저 얘기해줘서 좋았어요. 딱 그 안에서 끝났습니다.",
        },
      },
      {
        tag: "서랍 볼레일 교체",
        before: "/images/rail-before.jpg",
        after: "/images/rail-after.jpg",
        review: {
          who: "서울 동작구 / 이** 고객님",
          body: "볼레일 교체 문의했는데, 광폭으로 단단하게 달아주셨습니다. 서랍이 새것처럼 잘 열리고 닫혀요.",
        },
      },
    ],
  },
  {
    id: "chair",
    icon: "🪑",
    label: "의자 수리 · 가죽 교체",
    desc: "식탁의자 가죽 교체, 나무의자 다리 수리, 흔들림 교정",
    count: 2,
    cases: [
      {
        tag: "식탁의자 가죽 교체",
        before: "/images/chair-before.jpg",
        after: "/images/chair-after.jpg",
        review: {
          who: "인천 계산동 / 김** 고객님",
          body: "버리긴 아깝고 그냥 두긴 싫었는데, 이제 다시 써도 되겠다는 생각이 들었어요.",
        },
      },
      {
        tag: "식탁의자 가죽 교체",
        before: "/images/chair-before2.jpg",
        after: "/images/chair-after2.jpg",
        review: {
          who: "서울 역삼동 / 김** 고객님",
          body: "손님들이 의자 가죽 찢어진거 신경쓰시는거 같아서 고민이었는데, 새것처럼 고쳐져서 만족합니다.",
        },
      },
    ],
  },
];

// ── 케이스 카드 ──────────────────────────────────────────────
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

// ── 아코디언 아이템 ──────────────────────────────────────────
function AccordionItem({
  cat,
  index,
}: {
  cat: (typeof categories)[0];
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <FadeIn delay={index * 60}>
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
                  {cat.count}건
                </span>
              </div>
              <p className="text-xs mt-0.5" style={{ color: "#555" }}>
                {cat.desc}
              </p>
            </div>
          </div>

          <div
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-xl transition-all duration-300"
            style={{
              backgroundColor: open ? "#2fae8a" : "#1a1a1a",
              border: `1px solid ${open ? "#2fae8a" : "#252525"}`,
              color: open ? "white" : "#555",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
            }}>
            ↓
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
    </FadeIn>
  );
}

// ── 메인 페이지 ──────────────────────────────────────────────
export default function ReviewsPage() {
  const totalCases = categories.reduce((s, c) => s + c.count, 0);

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#111" }}>
      <div
        className="px-6 py-12"
        style={{
          backgroundColor: "#0d0d0d",
          borderBottom: "1px solid #1e1e1e",
        }}>
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <span
              className="inline-block text-xs tracking-widest uppercase mb-4 px-3 py-1.5 rounded-full font-bold"
              style={{
                backgroundColor: "#2fae8a22",
                color: "#2fae8a",
                border: "1px solid #2fae8a55",
              }}>
              수리 사례
            </span>
          </FadeIn>

          <FadeIn delay={80}>
            <h1
              className="font-black leading-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3rem)", color: "white" }}>
              실제 수리 현장,
              <br />
              <span style={{ color: "#2fae8a" }}>결과로 말합니다</span>
            </h1>
          </FadeIn>

          <FadeIn delay={160}>
            <p className="mt-4 text-base" style={{ color: "#666" }}>
              카테고리를 눌러 Before / After 사진과 고객 후기를 확인해보세요.
            </p>
          </FadeIn>

          <FadeIn delay={220}>
            <div className="flex items-center gap-4 mt-6 flex-wrap">
              {[
                `${categories.length}개 카테고리`,
                `${totalCases}건 수리 사례`,
                "★★★★★ 4.9 평점",
              ].map((text, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                  style={{
                    backgroundColor: "#1a1a1a",
                    border: "1px solid #222",
                  }}>
                  <span
                    className="text-xs font-bold"
                    style={{ color: "#2fae8a" }}>
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>

      <div className="px-4 py-8 mx-auto max-w-3xl">
        <div className="flex flex-col gap-3">
          {categories.map((cat, index) => (
            <AccordionItem key={cat.id} cat={cat} index={index} />
          ))}
        </div>

        <FadeIn delay={100}>
          <div
            className="mt-8 rounded-2xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{
              backgroundColor: "#2fae8a15",
              border: "1px solid #2fae8a44",
            }}>
            <div>
              <p
                className="text-sm font-bold mb-1"
                style={{ color: "#2fae8a" }}>
                내 가구도 수리될까요?
              </p>
              <p className="text-base font-bold" style={{ color: "white" }}>
                사진 보내주시면 1분 안에 답변드립니다.
              </p>
            </div>
            <a
              href="/request"
              className="flex-shrink-0 rounded-xl px-6 py-3 text-sm font-black text-white whitespace-nowrap transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#2fae8a" }}>
              📷 사진 상담 시작하기 →
            </a>
          </div>
        </FadeIn>
      </div>

      <ContactCTA />
    </main>
  );
}
