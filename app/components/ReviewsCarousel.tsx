"use client";

import { useMemo, useRef } from "react";

type Review = {
  name: string; // 예: "부천 / OOO님"
  title: string; // 예: "상부장 떨어짐"
  body: string; // 리뷰 본문(짧게)
};

export default function ReviewsCarousel() {
  const ref = useRef<HTMLDivElement | null>(null);

  const reviews: Review[] = useMemo(
    () => [
      {
        name: "인천 부평 / 고객님",
        title: "상부장 기울어짐",
        body: "사진 보내고 가능 여부부터 정리해주셔서 마음이 편했어요. 일정도 깔끔하게 맞춰주셨습니다.",
      },
      {
        name: "부천 / 고객님",
        title: "소파 꺼짐",
        body: "새로 사려다 고민했는데, 탄탄하게 잡히니까 집 분위기가 다시 살아났네요.",
      },
      {
        name: "강서구 / 고객님",
        title: "슬라이딩 도어",
        body: "문이 걸려서 스트레스였는데, 부드럽게 닫히니 생활이 달라졌습니다.",
      },
      {
        name: "인천 / 고객님",
        title: "문짝 수리",
        body: "안 되는 건 안 된다고 먼저 말씀해주시는 게 오히려 신뢰가 됐어요.",
      },
    ],
    [],
  );

  const scrollByCard = (dir: "left" | "right") => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card='review']");
    const w = card?.offsetWidth ?? 320;
    el.scrollBy({
      left: dir === "left" ? -(w + 16) : w + 16,
      behavior: "smooth",
    });
  };

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold">고객 후기</h2>
            <p className="mt-2 text-gray-600">
              기술 설명보다, 실제 사용이 편해졌다는 반응이 제일 기준이 됩니다.
            </p>
          </div>

          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scrollByCard("left")}
              className="rounded-xl border px-3 py-2"
              aria-label="리뷰 왼쪽">
              ←
            </button>
            <button
              onClick={() => scrollByCard("right")}
              className="rounded-xl border px-3 py-2"
              aria-label="리뷰 오른쪽">
              →
            </button>
          </div>
        </div>

        <div
          ref={ref}
          className="mt-6 flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2">
          {reviews.map((r, idx) => (
            <article
              key={`${r.title}-${idx}`}
              data-card="review"
              className="min-w-[85%] sm:min-w-[420px] snap-start rounded-2xl border p-5 bg-white">
              <div className="text-sm text-gray-500">{r.name}</div>
              <div className="mt-1 font-semibold">{r.title}</div>
              <p className="mt-3 text-gray-700 leading-relaxed">{r.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <a
            href="https://blog.naver.com/sofaresq/224129090889"
            className="rounded-xl bg-black px-6 py-3 text-white text-center">
            사진 상담하기
          </a>
          <a
            href="tel:01091273024"
            className="rounded-xl border border-black px-6 py-3 text-center">
            전화 문의
          </a>
        </div>
      </div>
    </section>
  );
}
