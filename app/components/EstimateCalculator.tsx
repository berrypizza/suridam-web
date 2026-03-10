"use client";

import { useState } from "react";
import FadeIn from "@/app/components/FadeIn";

type OptionType = "fixed" | "count" | "select_then_count";

interface Category {
  id: string;
  label: string;
  icon: string;
  group: string;
  type: OptionType;
  fixedPrice?: number;
  fixedNote?: string;
  baseCount?: number;
  basePrice?: number;
  addPrice?: number;
  addUnit?: string;
  maxCount?: number;
  visitFee?: number;
  selectOptions?: { id: string; label: string; pricePerUnit: number }[];
  selectLabel?: string;
  countLabel?: string;
}

const categories: Category[] = [
  {
    id: "upper_sag",
    label: "상부장 처짐",
    icon: "🔨",
    group: "싱크대 상/하부장",
    type: "count",
    visitFee: 30000,
    baseCount: 4,
    basePrice: 270000,
    addPrice: 60000,
    addUnit: "칸",
    maxCount: 8,
  },
  {
    id: "upper_sag_make",
    label: "상/하부장 제작",
    icon: "🔨",
    group: "싱크대 상/하부장",
    type: "count",
    visitFee: 30000,
    baseCount: 1,
    basePrice: 230000,
    addPrice: 200000,
    addUnit: "통",
    maxCount: 10,
  },
  {
    id: "door_fall",
    label: "문짝 떨어짐",
    icon: "🚪",
    group: "싱크대 상/하부장",
    type: "count",
    baseCount: 1,
    basePrice: 50000,
    addPrice: 10000,
    addUnit: "짝",
    maxCount: 10,
  },
  {
    id: "door_replace",
    label: "문짝 교체(제작)",
    icon: "🔨",
    group: "싱크대 상/하부장",
    type: "select_then_count",
    visitFee: 30000,
    selectLabel: "재질",
    countLabel: "문짝 수",
    selectOptions: [
      { id: "uv", label: "UV (일반)", pricePerUnit: 50000 },
      { id: "pet", label: "PET (고급)", pricePerUnit: 60000 },
    ],
    baseCount: 1,
    maxCount: 20,
  },
  {
    id: "door_hinge",
    label: "경첩 교체",
    icon: "🔩",
    group: "싱크대 상/하부장",
    type: "count",
    baseCount: 1,
    basePrice: 50000,
    addPrice: 15000,
    addUnit: "짝",
    maxCount: 10,
  },
  {
    id: "sauce_rail",
    label: "양념장 레일 교체",
    icon: "🧂",
    group: "싱크대 상/하부장",
    type: "fixed",
    fixedPrice: 70000,
  },
  {
    id: "lower_bottom",
    label: "하부장 밑판 교체",
    icon: "📦",
    group: "싱크대 상/하부장",
    type: "fixed",
    fixedPrice: 150000,
    fixedNote: "길이에 따라 추가비용 있음",
  },
  {
    id: "ball_rail",
    label: "서랍 볼레일 교체",
    icon: "🗄️",
    group: "레일",
    type: "count",
    baseCount: 1,
    basePrice: 50000,
    addPrice: 15000,
    addUnit: "세트",
    maxCount: 10,
  },
  {
    id: "iron_rail",
    label: "철레일 교체",
    icon: "🔧",
    group: "레일",
    type: "count",
    baseCount: 1,
    basePrice: 50000,
    addPrice: 15000,
    addUnit: "세트",
    maxCount: 10,
  },
  {
    id: "builtin_fall",
    label: "문짝 떨어짐",
    icon: "🚪",
    group: "붙박이장",
    type: "count",
    baseCount: 1,
    basePrice: 50000,
    addPrice: 10000,
    addUnit: "짝",
    maxCount: 10,
  },
  {
    id: "builtin_hinge",
    label: "경첩 교체",
    icon: "🔩",
    group: "붙박이장",
    type: "count",
    baseCount: 1,
    basePrice: 60000,
    addPrice: 20000,
    addUnit: "짝",
    maxCount: 10,
  },
  {
    id: "chair_broken",
    label: "나무의자 다리 부러짐",
    icon: "🪑",
    group: "의자",
    type: "count",
    visitFee: 30000,
    baseCount: 1,
    basePrice: 60000,
    addPrice: 30000,
    addUnit: "개",
    maxCount: 20,
  },
  {
    id: "chair_wobble",
    label: "의자 흔들림",
    icon: "🪑",
    group: "의자",
    type: "count",
    visitFee: 30000,
    baseCount: 1,
    basePrice: 50000,
    addPrice: 20000,
    addUnit: "개",
    maxCount: 20,
  },
  {
    id: "chair_leather",
    label: "식탁의자 가죽 교체",
    icon: "🧵",
    group: "의자",
    type: "select_then_count",
    visitFee: 30000,
    selectLabel: "미싱 여부",
    countLabel: "의자 수",
    selectOptions: [
      { id: "no_sewing", label: "미싱 없음", pricePerUnit: 30000 },
      { id: "sewing", label: "미싱 있음", pricePerUnit: 40000 },
    ],
    baseCount: 1,
    maxCount: 30,
  },
  {
    id: "chair_leather_for_restaurant",
    label: "식당 붙박이 소파 의자 인조 가죽 교체",
    icon: "🧵",
    group: "의자",
    type: "select_then_count",
    visitFee: 50000,
    selectLabel: "미싱 여부",
    countLabel: "의자 M당",
    addUnit: "미터(단위m)",
    selectOptions: [
      { id: "no_sewing", label: "미싱 없음", pricePerUnit: 30000 },
      { id: "sewing", label: "미싱 있음", pricePerUnit: 40000 },
    ],
    baseCount: 1,
    maxCount: 30,
  },
  {
    id: "bed_frame",
    label: "침대 프레임 수리",
    icon: "🛏️",
    group: "침대·식탁",
    type: "fixed",
    fixedPrice: 80000,
  },
  {
    id: "table_leg",
    label: "식탁 다리 수리",
    icon: "🍽️",
    group: "침대·식탁",
    type: "fixed",
    fixedPrice: 80000,
  },
  {
    id: "sliding",
    label: "붙박이장 슬라이딩 도어 수리",
    icon: "🔲",
    group: "슬라이딩 도어",
    type: "fixed",
    fixedPrice: 80000,
    fixedNote: "부품비 별도 / 직영 기사만 가능",
  },
  {
    id: "sliding_pokect",
    label: "포켓 슬라이딩 도어 수리",
    icon: "🔲",
    group: "슬라이딩 도어",
    type: "fixed",
    fixedPrice: 100000,
    fixedNote: "부품비 별도 / 직영 기사만 가능",
  },
  {
    id: "sofa_sag",
    label: "소파 쿠션 꺼짐",
    icon: "🛋️",
    group: "소파",
    type: "count",
    baseCount: 3,
    basePrice: 240000,
    addPrice: 80000,
    addUnit: "인용",
    maxCount: 10,
  },
  {
    id: "sofa_frame",
    label: "목대·스프링 수리",
    icon: "🛋️",
    group: "소파",
    type: "fixed",
    fixedPrice: 150000,
  },
  {
    id: "sofa_cloth",
    label: "소파 부직포 교체",
    icon: "🛋️",
    group: "소파",
    type: "fixed",
    fixedPrice: 80000,
    fixedNote: "카우치 별도",
  },
  {
    id: "sofa_leg",
    label: "소파 다리 부러짐",
    icon: "🛋️",
    group: "소파",
    type: "fixed",
    fixedPrice: 80000,
  },
  {
    id: "else",
    label: "기타 가구 수리",
    icon: "🎸",
    group: "기타 가구 수리",
    type: "fixed",
    fixedPrice: 50000,
  },
];

const groups = Array.from(new Set(categories.map((c) => c.group)));

function formatPrice(p: number) {
  if (p >= 10000) return `${(p / 10000).toFixed(p % 10000 === 0 ? 0 : 1)}만원`;
  return `${p.toLocaleString()}원`;
}

function Calculator() {
  const [step, setStep] = useState(1);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [count, setCount] = useState(1);
  const [selectOpt, setSelectOpt] = useState("");

  const cat = categories.find((c) => c.id === selectedId);

  const calcPrice = () => {
    if (!cat) return { total: 0, breakdown: "" };
    if (cat.type === "fixed")
      return {
        total: cat.fixedPrice!,
        breakdown: `정찰가 ${formatPrice(cat.fixedPrice!)}`,
      };
    if (cat.type === "count") {
      const extra = Math.max(0, count - cat.baseCount!) * cat.addPrice!;
      return {
        total: cat.basePrice! + extra,
        breakdown: `기본 ${formatPrice(cat.basePrice!)} + 추가 ${formatPrice(extra)}`,
      };
    }
    if (cat.type === "select_then_count") {
      if (!selectOpt) return { total: 0, breakdown: "옵션을 선택해주세요" };
      const opt = cat.selectOptions!.find((o) => o.id === selectOpt)!;
      return {
        total: (cat.visitFee ?? 0) + opt.pricePerUnit * count,
        breakdown: `출장비 ${formatPrice(cat.visitFee ?? 0)} + 옵션가 ${formatPrice(opt.pricePerUnit * count)}`,
      };
    }
    return { total: 0, breakdown: "" };
  };

  const { total, breakdown } = calcPrice();
  const reset = () => {
    setStep(1);
    setSelectedGroup(null);
    setSelectedId(null);
    setCount(1);
    setSelectOpt("");
  };

  const labelColor = "#9ca3af";
  const cardBg = "#1a1a1a";
  const cardBorder = "#252525";

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className="h-1.5 flex-1 rounded-full transition-all duration-300"
              style={{ backgroundColor: step >= s ? "#2fae8a" : "#2a2a2a" }}
            />
          ))}
        </div>
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest">
          <span style={{ color: step >= 1 ? "#2fae8a" : "#444" }}>
            가구 종류
          </span>
          <span style={{ color: step >= 2 ? "#2fae8a" : "#444" }}>
            상세 증상
          </span>
          <span style={{ color: step >= 3 ? "#2fae8a" : "#444" }}>
            예상 비용
          </span>
        </div>
      </div>

      {step === 1 && (
        <div>
          <p
            className="text-xs font-black uppercase tracking-widest mb-2"
            style={{ color: "#444" }}>
            Step 1
          </p>
          <h3
            className="font-black mb-6"
            style={{ fontSize: "clamp(1.3rem, 3vw, 1.7rem)", color: "white" }}>
            어떤 가구를 수리하시나요?
          </h3>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {groups.map((group) => (
              <button
                key={group}
                onClick={() => {
                  setSelectedGroup(group);
                  setStep(2);
                }}
                className="rounded-2xl p-5 text-center transition-all hover:-translate-y-0.5 active:scale-[0.98]"
                style={{
                  backgroundColor: cardBg,
                  border: `1px solid ${cardBorder}`,
                }}>
                <div className="mb-3 text-3xl">
                  {categories.find((c) => c.group === group)?.icon}
                </div>
                <span
                  className="text-sm font-bold"
                  style={{ color: "#e0e0e0" }}>
                  {group}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <button
            onClick={() => setStep(1)}
            className="inline-flex items-center gap-2 text-sm font-semibold mb-5"
            style={{ color: "#555" }}>
            ← 이전으로
          </button>
          <p
            className="text-xs font-black uppercase tracking-widest mb-2"
            style={{ color: "#444" }}>
            Step 2
          </p>
          <h3
            className="font-black mb-2"
            style={{ fontSize: "clamp(1.3rem, 3vw, 1.7rem)", color: "white" }}>
            {selectedGroup} 수리
          </h3>
          <p className="text-base mb-6" style={{ color: "#666" }}>
            증상을 선택하면 예상 비용을 바로 확인할 수 있습니다.
          </p>
          <div className="flex flex-col gap-3">
            {categories
              .filter((c) => c.group === selectedGroup)
              .map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setSelectedId(c.id);
                    setCount(c.baseCount ?? 1);
                    setSelectOpt("");
                    setStep(3);
                  }}
                  className="flex w-full items-center justify-between rounded-2xl px-5 py-4 text-left transition-all hover:-translate-y-0.5"
                  style={{
                    backgroundColor: cardBg,
                    border: `1px solid ${cardBorder}`,
                  }}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{c.icon}</span>
                    <span
                      className="text-base font-bold"
                      style={{ color: "#e0e0e0" }}>
                      {c.label}
                    </span>
                  </div>
                  <span style={{ color: "#444" }}>→</span>
                </button>
              ))}
          </div>
        </div>
      )}

      {step === 3 && cat && (
        <div>
          <button
            onClick={() => setStep(2)}
            className="inline-flex items-center gap-2 text-sm font-semibold mb-5"
            style={{ color: "#555" }}>
            ← 이전으로
          </button>
          <div
            className="flex items-center gap-4 rounded-2xl p-4 mb-6"
            style={{ backgroundColor: "#141414", border: "1px solid #222" }}>
            <span className="text-4xl">{cat.icon}</span>
            <div>
              <p
                className="text-sm font-medium mb-0.5"
                style={{ color: "#555" }}>
                {cat.group}
              </p>
              <h3 className="text-xl font-black" style={{ color: "white" }}>
                {cat.label}
              </h3>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            {cat.type === "select_then_count" && (
              <div>
                <label
                  className="block text-sm font-black mb-3"
                  style={{ color: labelColor }}>
                  {cat.selectLabel}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {cat.selectOptions?.map((opt) => {
                    const active = selectOpt === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => setSelectOpt(opt.id)}
                        className="rounded-2xl px-4 py-4 text-sm font-black transition-all"
                        style={{
                          backgroundColor: active ? "#2fae8a" : "#1a1a1a",
                          color: active ? "white" : "#888",
                          border: `1px solid ${active ? "#2fae8a" : "#252525"}`,
                        }}>
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            {(cat.type === "count" || cat.type === "select_then_count") && (
              <div>
                <label
                  className="block text-sm font-black mb-3"
                  style={{ color: labelColor }}>
                  {cat.countLabel || "수량"}
                </label>
                <div
                  className="flex items-center justify-between rounded-2xl p-3"
                  style={{
                    backgroundColor: "#141414",
                    border: "1px solid #222",
                  }}>
                  <button
                    onClick={() =>
                      setCount(Math.max(cat.baseCount ?? 1, count - 1))
                    }
                    className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl font-black"
                    style={{
                      backgroundColor: "#1e1e1e",
                      color: "white",
                      border: "1px solid #2a2a2a",
                    }}>
                    −
                  </button>
                  <div className="text-center">
                    <div
                      className="text-4xl font-black"
                      style={{ color: "white" }}>
                      {count}
                    </div>
                    <div className="mt-1 text-sm" style={{ color: "#555" }}>
                      {cat.addUnit || "개"}
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      setCount(Math.min(cat.maxCount ?? 20, count + 1))
                    }
                    className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl font-black"
                    style={{
                      backgroundColor: "#2fae8a",
                      color: "white",
                      border: "none",
                    }}>
                    +
                  </button>
                </div>
              </div>
            )}
          </div>
          <div
            className="rounded-2xl p-6 mt-6"
            style={{
              background: "linear-gradient(135deg, #0a1a12 0%, #0d1f17 100%)",
              border: "1px solid #2fae8a33",
            }}>
            <p className="text-sm font-bold mb-2" style={{ color: "#2fae8a" }}>
              예상 수리 비용
            </p>
            <div className="flex items-end gap-2 mb-3">
              <span
                className="font-black"
                style={{
                  fontSize: "clamp(2.2rem, 6vw, 3rem)",
                  color: "#2fae8a",
                }}>
                {total > 0 ? formatPrice(total) : "—"}
              </span>
              {total > 0 && (
                <span
                  className="pb-1 text-base font-medium"
                  style={{ color: "#555" }}>
                  내외
                </span>
              )}
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "#666" }}>
              {breakdown}
            </p>
            {cat.fixedNote && (
              <p
                className="mt-3 text-sm font-semibold"
                style={{ color: "#f87171" }}>
                ⚠️ {cat.fixedNote}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-3 mt-5">
            <a
              href="/request"
              className="w-full rounded-2xl py-5 text-center font-black text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#2fae8a", fontSize: "1.05rem" }}>
              상담 신청하고 정확한 견적 받기 →
            </a>
            <button
              onClick={reset}
              className="w-full rounded-2xl py-4 text-sm font-bold"
              style={{
                backgroundColor: "#141414",
                color: "#555",
                border: "1px solid #1e1e1e",
              }}>
              처음부터 다시 계산하기
            </button>
          </div>
        </div>
      )}
      <p
        className="mt-6 text-center text-sm leading-relaxed"
        style={{ color: "#3a3a3a" }}>
        표준 단가 기준이며, 현장 상황에 따라 달라질 수 있습니다.
      </p>
    </div>
  );
}

export default function EstimateCalculator() {
  const [open, setOpen] = useState(false);

  return (
    <section className="px-6 py-16" style={{ backgroundColor: "#111" }}>
      <div className="mx-auto max-w-2xl">
        {/* ── 후킹 카피 (규칙 4 자아흠집 + 5 위협 + 라포르) ── */}
        <FadeIn delay={0}>
          <div
            className="mb-6 rounded-2xl px-7 py-6"
            style={{
              backgroundColor: "#0d2318",
              border: "1px solid #2fae8a66",
            }}>
            {/* 규칙 1 명언 인용 */}
            <p
              className="text-sm italic mb-4 leading-relaxed font-medium"
              style={{
                color: "#a8e8d0",
                borderLeft: "3px solid #2fae8a",
                paddingLeft: 14,
              }}>
              "싼 게 비지떡. 수리도 마찬가지다."
              <br />
              <span
                className="not-italic font-bold"
                style={{ color: "#2fae8a" }}>
                — 가구업계 20년 현장 기사
              </span>
            </p>
            {/* 규칙 4 라포르 + Yes-set */}
            <p
              className="font-bold leading-relaxed"
              style={{
                fontSize: "clamp(1rem, 2.5vw, 1.15rem)",
                color: "#aaa",
              }}>
              "견적 받으러 갔다가 방문 후 더 비싸진 경험 있으세요?"
              <br />
              "전화만 해도 출장비 청구하는 곳을 만나셨나요?"
            </p>
            {/* 규칙 5 위협 + 상식파괴 */}
            <p
              className="mt-3 font-black"
              style={{
                fontSize: "clamp(1.1rem, 3vw, 1.35rem)",
                color: "white",
              }}>
              전화하기 전에,{" "}
              <span style={{ color: "#2fae8a" }}>
                30초면 비용을 알 수 있습니다.
              </span>
            </p>
          </div>
        </FadeIn>

        {/* ── 아코디언 트리거 ── */}
        <FadeIn delay={80}>
          <button
            onClick={() => setOpen((v) => !v)}
            className="w-full rounded-2xl px-7 py-6 flex items-center justify-between transition-all"
            style={{
              backgroundColor: open ? "#1a2e27" : "#161616",
              border: `1px solid ${open ? "#2fae8a55" : "#222"}`,
            }}>
            <div className="flex items-center gap-4 text-left">
              <span className="text-3xl">🧮</span>
              <div>
                <p
                  className="text-xs font-black uppercase tracking-widest mb-1"
                  style={{ color: "#2fae8a" }}>
                  Estimate
                </p>
                {/* 규칙 6 호기심 + 1 상식파괴 */}
                <p
                  className="font-black"
                  style={{
                    fontSize: "clamp(1.1rem, 3vw, 1.4rem)",
                    color: "white",
                  }}>
                  내 가구, 얼마면 고칠 수 있을까?
                </p>
                <p className="text-sm mt-0.5" style={{ color: "#555" }}>
                  항목 선택 → 즉시 예상 비용 확인
                </p>
              </div>
            </div>
            <div
              className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
              style={{
                backgroundColor: open ? "#2fae8a" : "#1e1e1e",
                border: `1px solid ${open ? "#2fae8a" : "#2a2a2a"}`,
                transform: open ? "rotate(180deg)" : "rotate(0deg)",
                color: open ? "white" : "#555",
                fontSize: "1.1rem",
              }}>
              ↓
            </div>
          </button>
        </FadeIn>

        <div
          style={{
            maxHeight: open ? "2000px" : "0px",
            overflow: "hidden",
            transition: "max-height 0.5s cubic-bezier(0.4,0,0.2,1)",
          }}>
          <div
            className="rounded-2xl px-6 py-8 mt-3"
            style={{ backgroundColor: "#161616", border: "1px solid #1e1e1e" }}>
            <Calculator />
          </div>
        </div>
      </div>
    </section>
  );
}
