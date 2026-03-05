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

// --- 데이터 (기존 데이터 유지) ---
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
  const [step, setStep] = useState(1); // 1: 대분류, 2: 소분류, 3: 상세설정
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [count, setCount] = useState(1);
  const [selectOpt, setSelectOpt] = useState("");

  const cat = categories.find((c) => c.id === selectedId);

  // 가격 계산 로직 (기존 유지)
  const calcPrice = () => {
    if (!cat) return { total: 0, breakdown: "" };
    if (cat.type === "fixed")
      return {
        total: cat.fixedPrice!,
        breakdown: `정찰가 ${formatPrice(cat.fixedPrice!)}`,
      };
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
      className="px-4 py-12 md:px-6"
      style={{ backgroundColor: "#f8f9fa" }}>
      <div className="mx-auto max-w-xl">
        {/* 헤더 */}
        <div className="mb-10 text-center">
          <h2
            className="text-2xl font-bold tracking-tight"
            style={{ color: "#1a1a1a" }}>
            수리 비용 계산기
          </h2>
          <p className="mt-2 text-sm" style={{ color: "#666" }}>
            항목을 선택하시면 대략적인 수리비를 확인할 수 있습니다.
          </p>
        </div>

        {/* 메인 카드 */}
        <div
          className="bg-white rounded-3xl shadow-sm overflow-hidden"
          style={{ border: "1px solid #eee" }}>
          {/* 상단 진행 표시바 (Step 1~3) */}
          <div className="flex border-b border-gray-50">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className="flex-1 h-1.5 transition-all"
                style={{ backgroundColor: step >= s ? "#2fae8a" : "#eee" }}
              />
            ))}
          </div>

          <div className="p-6 md:p-8">
            {/* --- STEP 1: 대분류 선택 --- */}
            {step === 1 && (
              <div className="space-y-4">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                  Step 1. 가구 종류 선택
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {groups.map((group) => (
                    <button
                      key={group}
                      onClick={() => {
                        setSelectedGroup(group);
                        setStep(2);
                      }}
                      className="p-5 rounded-2xl text-center transition-all hover:bg-emerald-50 border border-gray-100 active:scale-95">
                      <div className="text-2xl mb-2">
                        {categories.find((c) => c.group === group)?.icon}
                      </div>
                      <span className="text-sm font-bold text-gray-700">
                        {group}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* --- STEP 2: 소분류 선택 --- */}
            {step === 2 && (
              <div className="space-y-4">
                <button
                  onClick={() => setStep(1)}
                  className="text-xs text-gray-700 mb-2">
                  ← 이전으로
                </button>
                <p className="text-sm font-bold text-gray-700 uppercase tracking-widest">
                  Step 2. 상세 증상 선택
                </p>
                <h3 className="text-xl font-bold mb-4">{selectedGroup} 수리</h3>
                <div className="space-y-2">
                  {categories
                    .filter((c) => c.group === selectedGroup)
                    .map((c) => (
                      <button
                        key={c.id}
                        onClick={() => {
                          setSelectedId(c.id);
                          setCount(c.baseCount ?? 1);
                          setStep(3);
                        }}
                        className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50 transition-all text-left">
                        <span className="text-sm font-medium text-gray-1000">
                          {c.label}
                        </span>
                        <span className="text-gray-700">→</span>
                      </button>
                    ))}
                </div>
              </div>
            )}

            {/* --- STEP 3: 상세 설정 및 결과 --- */}
            {step === 3 && cat && (
              <div className="space-y-6">
                <button
                  onClick={() => setStep(2)}
                  className="text-xs text-gray-700 mb-2">
                  ← 이전으로
                </button>
                <div className="flex items-center gap-3 pb-4 border-b">
                  <span className="text-3xl">{cat.icon}</span>
                  <div>
                    <p className="text-xs text-gray-700">{cat.group}</p>
                    <h3 className="text-lg font-bold">{cat.label}</h3>
                  </div>
                </div>

                {/* 옵션 선택 영역 */}
                <div className="py-2 space-y-6">
                  {cat.type === "select_then_count" && (
                    <div>
                      <label className="block text-sm font-bold mb-3">
                        {cat.selectLabel}
                      </label>
                      <div className="flex gap-2">
                        {cat.selectOptions?.map((opt) => (
                          <button
                            key={opt.id}
                            onClick={() => setSelectOpt(opt.id)}
                            className={`flex-1 py-3 rounded-xl text-sm font-bold border transition-all ${
                              selectOpt === opt.id
                                ? "bg-emerald-500 text-white border-emerald-500"
                                : "bg-gray-50 text-gray-500 border-gray-100"
                            }`}>
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {(cat.type === "count" ||
                    cat.type === "select_then_count") && (
                    <div>
                      <label className="block text-sm font-bold mb-3">
                        {cat.countLabel || "수량"}
                      </label>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded-2xl">
                        <button
                          onClick={() =>
                            setCount(Math.max(cat.baseCount ?? 1, count - 1))
                          }
                          className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-xl font-bold">
                          —
                        </button>
                        <div className="text-center">
                          <span className="text-xl font-bold">{count}</span>
                          <span className="ml-1 text-gray-400 text-sm">
                            {cat.addUnit || "개"}
                          </span>
                        </div>
                        <button
                          onClick={() =>
                            setCount(Math.min(cat.maxCount ?? 20, count + 1))
                          }
                          className="w-12 h-12 rounded-xl bg-emerald-500 text-white shadow-sm flex items-center justify-center text-xl font-bold">
                          +
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* 결과창 */}
                <div className="mt-8 p-6 rounded-2xl bg-gray-900 text-white relative overflow-hidden">
                  <p className="text-xs text-gray-400 mb-1">예상 수리 비용</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-emerald-400">
                      {total > 0 ? formatPrice(total) : "—"}
                    </span>
                    {total > 0 && (
                      <span className="text-sm text-gray-400">내외</span>
                    )}
                  </div>
                  <p className="mt-2 text-[11px] text-gray-500 leading-relaxed">
                    {breakdown}
                  </p>
                  {cat.fixedNote && (
                    <p className="mt-2 text-[11px] text-rose-400">
                      ⚠️ {cat.fixedNote}
                    </p>
                  )}
                </div>

                {/* 푸터 버튼 */}
                <div className="grid grid-cols-1 gap-2">
                  <a
                    href="/request"
                    className="w-full py-4 bg-emerald-500 text-white rounded-xl text-center text-sm font-bold">
                    상담 신청하고 정확한 견적 받기
                  </a>
                  <button
                    onClick={reset}
                    className="w-full py-3 text-gray-400 text-xs">
                    처음부터 다시 계산하기
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <p className="mt-6 text-center text-[11px] text-gray-400 leading-relaxed">
          위 금액은 표준 단가를 기준으로 산출되었습니다.
          <br />
          현장 상황(가구 브랜드, 파손 정도, 특수 부품 등)에 따라 금액이 변동될
          수 있습니다.
        </p>
      </div>
    </section>
  );
}
