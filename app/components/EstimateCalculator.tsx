"use client";

import { useState } from "react";

// --- 타입 정의 ---
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

// --- 데이터 ---
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

export default function EstimateCalculator() {
  const [step, setStep] = useState(1);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [count, setCount] = useState(1);
  const [selectOpt, setSelectOpt] = useState("");

  const cat = categories.find((c) => c.id === selectedId);

  const calcPrice = () => {
    if (!cat) return { total: 0, breakdown: "" };

    if (cat.type === "fixed") {
      return {
        total: cat.fixedPrice!,
        breakdown: `정찰가 ${formatPrice(cat.fixedPrice!)}`,
      };
    }

    if (cat.type === "count") {
      const extra = Math.max(0, count - cat.baseCount!) * cat.addPrice!;
      const total = cat.basePrice! + extra;
      return {
        total,
        breakdown: `기본 ${formatPrice(cat.basePrice!)} + 추가 ${formatPrice(extra)}`,
      };
    }

    if (cat.type === "select_then_count") {
      if (!selectOpt) return { total: 0, breakdown: "옵션을 선택해주세요" };
      const opt = cat.selectOptions!.find((o) => o.id === selectOpt)!;
      const total = (cat.visitFee ?? 0) + opt.pricePerUnit * count;
      return {
        total,
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

  return (
    <section
      className="px-4 py-16 md:px-6"
      style={{
        background: "linear-gradient(180deg, #f8f9fa 0%, #f3f5f7 100%)",
      }}>
      <div className="mx-auto max-w-2xl">
        {/* 헤더 */}
        <div className="mb-10 text-center">
          <span
            className="inline-block rounded-full px-3 py-1 text-sm font-semibold tracking-widest uppercase"
            style={{
              backgroundColor: "#eaf8f3",
              color: "#2e9f83",
              border: "1px solid #bfe8d9",
            }}>
            Estimate
          </span>

          <h2
            className="mt-4 text-3xl md:text-4xl font-bold tracking-tight"
            style={{ color: "#111827" }}>
            수리 비용 계산기
          </h2>

          <p
            className="mt-3 text-base md:text-lg leading-relaxed"
            style={{ color: "#6b7280" }}>
            항목을 선택하시면 대략적인 수리비를 확인할 수 있습니다.
          </p>
        </div>

        {/* 메인 카드 */}
        <div
          className="overflow-hidden rounded-[28px] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.06)]"
          style={{ border: "1px solid #edf0f2" }}>
          {/* 진행바 */}
          <div className="px-6 pt-6 md:px-8">
            <div className="flex items-center gap-2">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className="h-2 flex-1 rounded-full transition-all"
                  style={{ backgroundColor: step >= s ? "#2fae8a" : "#e5e7eb" }}
                />
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between text-xs font-semibold uppercase tracking-widest">
              <span style={{ color: step >= 1 ? "#2fae8a" : "#9ca3af" }}>
                가구 종류
              </span>
              <span style={{ color: step >= 2 ? "#2fae8a" : "#9ca3af" }}>
                상세 증상
              </span>
              <span style={{ color: step >= 3 ? "#2fae8a" : "#9ca3af" }}>
                예상 비용
              </span>
            </div>
          </div>

          <div className="p-6 md:p-8">
            {/* STEP 1 */}
            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <p
                    className="text-sm font-bold uppercase tracking-widest"
                    style={{ color: "#9ca3af" }}>
                    Step 1
                  </p>
                  <h3
                    className="mt-2 text-2xl font-bold"
                    style={{ color: "#111827" }}>
                    어떤 가구를 수리하시나요?
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                  {groups.map((group) => (
                    <button
                      key={group}
                      onClick={() => {
                        setSelectedGroup(group);
                        setStep(2);
                      }}
                      className="rounded-2xl border p-5 text-center transition-all hover:-translate-y-0.5 active:scale-[0.98]"
                      style={{
                        borderColor: "#edf0f2",
                        backgroundColor: "#ffffff",
                      }}>
                      <div className="mb-3 text-3xl">
                        {categories.find((c) => c.group === group)?.icon}
                      </div>
                      <span
                        className="text-sm md:text-base font-bold"
                        style={{ color: "#374151" }}>
                        {group}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="space-y-5">
                <button
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-2 text-sm font-semibold"
                  style={{ color: "#6b7280" }}>
                  ← 이전으로
                </button>

                <div>
                  <p
                    className="text-sm font-bold uppercase tracking-widest"
                    style={{ color: "#9ca3af" }}>
                    Step 2
                  </p>
                  <h3
                    className="mt-2 text-2xl font-bold"
                    style={{ color: "#111827" }}>
                    {selectedGroup} 수리
                  </h3>
                  <p className="mt-2 text-base" style={{ color: "#6b7280" }}>
                    해당 증상을 선택하면 예상 비용을 바로 확인할 수 있습니다.
                  </p>
                </div>

                <div className="space-y-3">
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
                        className="flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left transition-all hover:-translate-y-0.5 active:scale-[0.99]"
                        style={{
                          borderColor: "#edf0f2",
                          backgroundColor: "#ffffff",
                        }}>
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{c.icon}</span>
                          <span
                            className="text-base md:text-lg font-semibold"
                            style={{ color: "#111827" }}>
                            {c.label}
                          </span>
                        </div>
                        <span style={{ color: "#9ca3af" }}>→</span>
                      </button>
                    ))}
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && cat && (
              <div className="space-y-6">
                <button
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 text-sm font-semibold"
                  style={{ color: "#6b7280" }}>
                  ← 이전으로
                </button>

                <div
                  className="flex items-center gap-4 rounded-2xl p-4"
                  style={{
                    backgroundColor: "#f8fafb",
                    border: "1px solid #edf0f2",
                  }}>
                  <span className="text-4xl">{cat.icon}</span>
                  <div>
                    <p
                      className="text-sm font-medium"
                      style={{ color: "#6b7280" }}>
                      {cat.group}
                    </p>
                    <h3
                      className="text-xl md:text-2xl font-bold"
                      style={{ color: "#111827" }}>
                      {cat.label}
                    </h3>
                  </div>
                </div>

                <div className="space-y-6">
                  {cat.type === "select_then_count" && (
                    <div>
                      <label
                        className="mb-3 block text-sm font-bold"
                        style={{ color: "#374151" }}>
                        {cat.selectLabel}
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {cat.selectOptions?.map((opt) => {
                          const active = selectOpt === opt.id;
                          return (
                            <button
                              key={opt.id}
                              onClick={() => setSelectOpt(opt.id)}
                              className="rounded-2xl border px-4 py-4 text-sm md:text-base font-bold transition-all"
                              style={{
                                backgroundColor: active ? "#2fae8a" : "#f9fafb",
                                color: active ? "#ffffff" : "#4b5563",
                                borderColor: active ? "#2fae8a" : "#e5e7eb",
                              }}>
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {(cat.type === "count" ||
                    cat.type === "select_then_count") && (
                    <div>
                      <label
                        className="mb-3 block text-sm font-bold"
                        style={{ color: "#374151" }}>
                        {cat.countLabel || "수량"}
                      </label>
                      <div
                        className="flex items-center justify-between rounded-2xl p-3"
                        style={{
                          backgroundColor: "#f8fafb",
                          border: "1px solid #edf0f2",
                        }}>
                        <button
                          onClick={() =>
                            setCount(Math.max(cat.baseCount ?? 1, count - 1))
                          }
                          className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl font-bold"
                          style={{
                            backgroundColor: "#ffffff",
                            color: "#111827",
                            border: "1px solid #e5e7eb",
                          }}>
                          −
                        </button>

                        <div className="text-center">
                          <div
                            className="text-3xl font-bold"
                            style={{ color: "#111827" }}>
                            {count}
                          </div>
                          <div
                            className="mt-1 text-sm"
                            style={{ color: "#6b7280" }}>
                            {cat.addUnit || "개"}
                          </div>
                        </div>

                        <button
                          onClick={() =>
                            setCount(Math.min(cat.maxCount ?? 20, count + 1))
                          }
                          className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl font-bold"
                          style={{
                            backgroundColor: "#2fae8a",
                            color: "#ffffff",
                            border: "1px solid #2fae8a",
                          }}>
                          +
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* 결과 */}
                <div
                  className="rounded-[24px] p-6"
                  style={{
                    background:
                      "linear-gradient(135deg, #111827 0%, #1f2937 100%)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}>
                  <p
                    className="text-sm font-medium"
                    style={{ color: "#9ca3af" }}>
                    예상 수리 비용
                  </p>

                  <div className="mt-2 flex items-end gap-2">
                    <span
                      className="text-4xl md:text-5xl font-bold"
                      style={{ color: "#34d399" }}>
                      {total > 0 ? formatPrice(total) : "—"}
                    </span>
                    {total > 0 && (
                      <span
                        className="pb-1 text-base font-medium"
                        style={{ color: "#9ca3af" }}>
                        내외
                      </span>
                    )}
                  </div>

                  <p
                    className="mt-3 text-sm leading-relaxed"
                    style={{ color: "#d1d5db" }}>
                    {breakdown}
                  </p>

                  {cat.fixedNote && (
                    <p
                      className="mt-3 text-sm font-medium"
                      style={{ color: "#fca5a5" }}>
                      ⚠️ {cat.fixedNote}
                    </p>
                  )}
                </div>

                {/* 버튼 */}
                <div className="grid grid-cols-1 gap-3">
                  <a
                    href="/request"
                    className="w-full rounded-2xl py-4 text-center text-base md:text-lg font-bold text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: "#2fae8a" }}>
                    상담 신청하고 정확한 견적 받기
                  </a>

                  <button
                    onClick={reset}
                    className="w-full rounded-2xl py-4 text-sm font-semibold"
                    style={{
                      backgroundColor: "#f8fafb",
                      color: "#6b7280",
                      border: "1px solid #edf0f2",
                    }}>
                    처음부터 다시 계산하기
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <p
          className="mt-6 text-center text-sm leading-relaxed"
          style={{ color: "#9ca3af" }}>
          위 금액은 표준 단가를 기준으로 산출되었습니다.
          <br />
          현장 상황(가구 브랜드, 파손 정도, 특수 부품 등)에 따라 금액이 달라질
          수 있습니다.
        </p>
      </div>
    </section>
  );
}
