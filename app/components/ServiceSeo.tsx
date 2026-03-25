// app/components/KeywordAccordion.tsx
// "use client" 없음 — 서버 컴포넌트, 네이버 봇 완전 읽힘
// 아코디언은 순수 HTML <details>/<summary> 사용 (JS 불필요)

const services = [
  {
    category: "싱크대 상부장",
    emoji: "🔨",
    items: [
      {
        name: "싱크대 상부장 처짐 수리",
        desc: "칸당 6만원 + 출장비 3만원 (보통 4칸 기준)",
        keywords:
          "싱크대상부장처짐 · 싱크대상부장수리 · 씽크대상부장수리 · 상부장처짐 · 상부장수리 · 싱크대상부장내려앉음 · 싱크대상부장들뜸 · 주방상부장처짐 · 부엌장처짐",
      },
      {
        name: "싱크대 문짝 떨어짐",
        desc: "1짝 총 5만원, 추가 1짝당 1만원 (예: 2짝 6만원)",
        keywords: "싱크대문짝떨어짐 · 싱크대상부장떨어짐 · 싱크대상부장쏟아짐",
      },
      {
        name: "싱크대 문짝 교체 제작",
        desc: "출장비 3만원 + 1짝당 UV 5만원 / PET 6만원",
        keywords: "싱크대문짝교체 · 싱크대문짝수리 · 싱크대문짝제작",
      },
      {
        name: "싱크대 문짝 경첩 교체",
        desc: "1짝 총 5만원, 추가 1짝당 15,000원 (예: 2짝 65,000원)",
        keywords: "싱크대문짝경첩수리 · 싱크대경첩교체 · 문짝경첩수리",
      },
      {
        name: "싱크대 양념장 레일 교체",
        desc: "총 7만원",
        keywords: "싱크대레일교체 · 양념장레일교체",
      },
      {
        name: "싱크대 하부장 밑판 교체",
        desc: "총 15만원 (긴 경우 추가 비용 있음)",
        keywords: "싱크대하부장수리 · 싱크대밑판교체",
      },
    ],
  },
  {
    category: "붙박이장",
    emoji: "🚪",
    items: [
      {
        name: "붙박이장 문짝 떨어짐",
        desc: "1짝 총 5만원, 추가 1짝당 1만원 (예: 2짝 6만원)",
        keywords: "붙박이장문짝떨어짐 · 붙박이장수리",
      },
      {
        name: "붙박이장 문짝 경첩 교체",
        desc: "1짝 총 6만원, 추가 1짝당 2만원 (예: 2짝 8만원)",
        keywords: "붙박이장경첩교체 · 붙박이장문짝경첩수리",
      },
      {
        name: "슬라이딩 도어 수리",
        desc: "총 8만원 (부품비 별도, 직영 출장만 가능)",
        keywords: "붙박이장슬라이딩도어수리 · 슬라이딩도어수리",
      },
    ],
  },
  {
    category: "소파",
    emoji: "🛋️",
    items: [
      {
        name: "소파 쿠션 꺼짐 수리",
        desc: "3인용 기준 24만원, 인용 추가당 8만원 (4인용 32만원)",
        keywords: "소파꺼짐수리 · 소파쿠션꺼짐 · 소파수리",
      },
      {
        name: "소파 내부 목대·스프링 수리",
        desc: "총 15만원 (밴드 보강, 부서진 목대 보강)",
        keywords: "소파스프링수리 · 소파목대수리",
      },
      {
        name: "소파 부직포 교체",
        desc: "총 8만원 (한 세트 기준, 카우치 별도)",
        keywords: "소파부직포교체 · 소파리폼",
      },
      {
        name: "소파 다리 부러짐",
        desc: "총 8만원",
        keywords: "소파다리수리 · 소파다리교체",
      },
    ],
  },
  {
    category: "의자",
    emoji: "🪑",
    items: [
      {
        name: "나무의자 다리 부러짐",
        desc: "출장비 3만원 + 의자 개당 3만원",
        keywords: "나무의자수리 · 의자다리부러짐",
      },
      {
        name: "나무의자 흔들림 수리 (업소용 포함)",
        desc: "출장비 3만원 + 의자 개당 2만원",
        keywords: "의자흔들림수리 · 업소용의자수리",
      },
      {
        name: "식탁의자 인조가죽 교체 (업소용 포함)",
        desc: "출장비 3만원 + 개당 3만원 (미싱 있으면 4만원+)",
        keywords: "식탁의자가죽교체 · 의자가죽교체 · 의자인조가죽교체",
      },
      {
        name: "업소용 붙박이의자 인조가죽 교체",
        desc: "출장비 3만원 + m당 5만원 (현장 상황에 따라 변동)",
        keywords: "업소용붙박이의자수리 · 업소용의자가죽교체",
      },
    ],
  },
  {
    category: "서랍·레일",
    emoji: "🗄️",
    items: [
      {
        name: "서랍 볼레일 교체",
        desc: "총 5만원, 레일 1세트 추가당 15,000원",
        keywords: "서랍볼레일교체 · 볼레일수리 · 서랍레일수리",
      },
      {
        name: "서랍 철레일 교체",
        desc: "총 5만원, 레일 1세트 추가당 15,000원",
        keywords: "서랍철레일교체 · 철레일수리",
      },
    ],
  },
  {
    category: "침대·식탁",
    emoji: "🛏️",
    items: [
      {
        name: "침대 프레임 수리",
        desc: "총 8만원 (프레임 부서짐 기준)",
        keywords: "침대수리 · 침대프레임수리",
      },
      {
        name: "식탁 다리 수리·흔들림",
        desc: "총 8만원",
        keywords: "식탁다리수리 · 식탁수리",
      },
    ],
  },
];

const regions = [
  {
    label: "🟢 주요 서비스 지역 (1등급)",
    desc: "인구 밀집 · 소비력 중상 · 60분 이내 출장 우선",
    areas: [
      {
        city: "인천",
        list: [
          "송도동",
          "청라동",
          "부평동·부평구",
          "계산동",
          "검암동",
          "가좌동",
          "석남동",
          "루원시티",
        ],
        keywords:
          "인천가구수리 · 송도가구수리 · 청라가구수리 · 부평가구수리 · 계산동가구수리 · 검암동가구수리 · 루원시티가구수리",
      },
      {
        city: "부천",
        list: ["중동", "상동", "심곡동", "원미동"],
        keywords:
          "부천가구수리 · 부천중동가구수리 · 부천상동가구수리 · 부천심곡동가구수리",
      },
      {
        city: "서울",
        list: [
          "강서구",
          "마포구",
          "관악구",
          "구로구",
          "영등포구",
          "동작구(사당)",
        ],
        keywords:
          "강서구가구수리 · 마포구가구수리 · 관악구가구수리 · 구로구가구수리 · 영등포구가구수리 · 동작구가구수리 · 사당가구수리",
      },
    ],
  },
  {
    label: "🟡 보조 서비스 지역 (2등급)",
    desc: "인구 충분 · 특정 키워드 효율 발생",
    areas: [
      {
        city: "인천",
        list: ["연수구(송도 제외)", "미추홀구 일부"],
        keywords: "연수구가구수리 · 미추홀구가구수리",
      },
      {
        city: "경기",
        list: ["김포", "부천 외곽"],
        keywords: "김포가구수리 · 김포문짝경첩수리",
      },
      {
        city: "서울",
        list: ["용산구", "강남구(고단가 작업)"],
        keywords: "용산구가구수리 · 강남구가구수리",
      },
    ],
  },
];

export default function KeywordAccordion() {
  return (
    <section className="px-6 py-14" style={{ backgroundColor: "#111" }}>
      <div className="mx-auto max-w-5xl">
        {/* 헤더 */}
        <div className="text-center mb-10">
          <span
            className="inline-block text-sm tracking-widest uppercase mb-4 px-3 py-1.5 rounded-full font-bold"
            style={{
              backgroundColor: "#2fae8a22",
              color: "#2fae8a",
              border: "1px solid #2fae8a55",
            }}>
            서비스 안내
          </span>
          <h2
            className="font-black leading-tight"
            style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", color: "white" }}>
            수리 항목 단가 및
            <br />
            <span style={{ color: "#2fae8a" }}>출장 가능 지역 안내</span>
          </h2>
          <p className="mt-3 text-sm font-semibold" style={{ color: "#888" }}>
            표준 단가 기준이며, 현장 상황에 따라 달라질 수 있습니다.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* 왼쪽: 서비스 단가 */}
          <div>
            <p
              className="text-xs font-black uppercase tracking-widest mb-3"
              style={{ color: "#2fae8a" }}>
              🔧 수리 항목 및 단가
            </p>
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                border: "1px solid #2a2a2a",
                backgroundColor: "#161616",
              }}>
              {services.map((s, si) => (
                <details
                  key={s.category}
                  style={{
                    borderBottom:
                      si < services.length - 1 ? "1px solid #222" : "none",
                  }}>
                  <summary
                    className="flex items-center justify-between px-5 py-4 cursor-pointer select-none"
                    style={{ listStyle: "none" }}>
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{s.emoji}</span>
                      <span
                        className="text-sm font-black"
                        style={{ color: "white" }}>
                        {s.category}
                      </span>
                    </div>
                    <span
                      style={{
                        color: "#2fae8a",
                        fontWeight: 900,
                        fontSize: 20,
                      }}>
                      ＋
                    </span>
                  </summary>

                  <div
                    className="flex flex-col gap-3 px-4 pb-4"
                    style={{ borderTop: "1px solid #222", paddingTop: 16 }}>
                    {s.items.map((item) => (
                      <div
                        key={item.name}
                        className="rounded-xl px-4 py-3"
                        style={{
                          backgroundColor: "#1a1a1a",
                          border: "1px solid #252525",
                        }}>
                        <p
                          className="text-sm font-black"
                          style={{ color: "white" }}>
                          {item.name}
                        </p>
                        <p
                          className="text-xs mt-1 leading-relaxed"
                          style={{ color: "#aaa" }}>
                          {item.desc}
                        </p>
                        <p
                          className="text-xs mt-2"
                          style={{ color: "#333", lineHeight: 1.8 }}>
                          {item.keywords}
                        </p>
                      </div>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* 오른쪽: 지역 */}
          <div>
            <p
              className="text-xs font-black uppercase tracking-widest mb-3"
              style={{ color: "#2fae8a" }}>
              📍 출장 가능 지역
            </p>
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                border: "1px solid #2a2a2a",
                backgroundColor: "#161616",
              }}>
              {regions.map((r, ri) => (
                <details
                  key={r.label}
                  style={{
                    borderBottom:
                      ri < regions.length - 1 ? "1px solid #222" : "none",
                  }}>
                  <summary
                    className="flex items-center justify-between px-5 py-4 cursor-pointer select-none"
                    style={{ listStyle: "none" }}>
                    <span
                      className="text-sm font-black"
                      style={{ color: "white" }}>
                      {r.label}
                    </span>
                    <span
                      style={{
                        color: "#2fae8a",
                        fontWeight: 900,
                        fontSize: 20,
                      }}>
                      ＋
                    </span>
                  </summary>

                  <div
                    className="px-4 pb-4"
                    style={{ borderTop: "1px solid #222", paddingTop: 12 }}>
                    <p className="text-xs mb-4" style={{ color: "#666" }}>
                      {r.desc}
                    </p>
                    <div className="flex flex-col gap-4">
                      {r.areas.map((area) => (
                        <div key={area.city}>
                          <p
                            className="text-xs font-black mb-2"
                            style={{ color: "#2fae8a" }}>
                            {area.city}
                          </p>
                          <div className="flex flex-wrap gap-1.5 mb-2">
                            {area.list.map((loc) => (
                              <span
                                key={loc}
                                className="text-xs px-2.5 py-1 rounded-full font-bold"
                                style={{
                                  backgroundColor: "#1e1e1e",
                                  color: "#ccc",
                                  border: "1px solid #2a2a2a",
                                }}>
                                {loc}
                              </span>
                            ))}
                          </div>
                          <p
                            className="text-xs"
                            style={{ color: "#2a2a2a", lineHeight: 1.8 }}>
                            {area.keywords}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </details>
              ))}

              {/* 전체 키워드 SEO용 */}
              <div
                style={{
                  padding: "14px 20px",
                  borderTop: "1px solid #1e1e1e",
                }}>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "#252525", lineHeight: 1.9 }}>
                  인천가구수리 · 부천가구수리 · 송도가구수리 · 청라가구수리 ·
                  부평가구수리 · 계산동가구수리 · 검암동가구수리 ·
                  루원시티가구수리 · 부천중동가구수리 · 부천상동가구수리 ·
                  강서구가구수리 · 마포구가구수리 · 관악구가구수리 ·
                  구로구가구수리 · 영등포구가구수리 · 동작구가구수리 ·
                  사당가구수리 · 연수구가구수리 · 김포가구수리 · 용산구가구수리
                  · 싱크대상부장처짐 · 싱크대상부장수리 · 씽크대상부장수리 ·
                  상부장처짐 · 싱크대문짝수리 · 문짝경첩수리 ·
                  붙박이장슬라이딩도어수리 · 소파꺼짐수리 · 소파부직포교체 ·
                  서랍레일교체 · 침대수리 · 식탁수리 · 의자가죽교체 ·
                  나무의자수리
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
