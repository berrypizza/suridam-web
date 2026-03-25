// app/components/KeywordAccordion.tsx
// 서버 컴포넌트 — 네이버 봇 완전 읽힘
// 아코디언: 순수 HTML <details>/<summary>

const services = [
  {
    category: "싱크대 상부장, 하부장",
    emoji: "🔨",
    items: [
      {
        name: "싱크대 상부장 처짐 수리",
        desc: "칸당 6만원 + 출장비 3만원 (보통 4칸 기준)",
      },
      {
        name: "싱크대 문짝 떨어짐",
        desc: "1짝 총 5만원, 추가 1짝당 1만원 (예: 2짝 6만원)",
      },
      {
        name: "싱크대 문짝 교체 제작",
        desc: "출장비 3만원 + 1짝당 UV 5만원 / PET 6만원",
      },
      {
        name: "싱크대 문짝 경첩 교체",
        desc: "1짝 총 5만원, 추가 1짝당 15,000원 (예: 2짝 65,000원)",
      },
      { name: "싱크대 양념장 레일 교체", desc: "총 7만원" },
      {
        name: "싱크대 하부장 밑판 교체",
        desc: "총 15만원 (긴 경우 추가 비용 있음)",
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
      },
      {
        name: "붙박이장 문짝 경첩 교체",
        desc: "1짝 총 6만원, 추가 1짝당 2만원 (예: 2짝 8만원)",
      },
      {
        name: "슬라이딩 도어 수리",
        desc: "총 8만원 (부품비 별도, 직영 출장만 가능)",
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
      },
      {
        name: "소파 내부 목대·스프링 수리",
        desc: "총 15만원 (밴드 보강, 부서진 목대 보강)",
      },
      {
        name: "소파 부직포 교체",
        desc: "총 8만원 (한 세트 기준, 카우치 별도)",
      },
      { name: "소파 다리 부러짐", desc: "총 8만원" },
    ],
  },
  {
    category: "의자 (파손, 가죽 교체)",
    emoji: "🪑",
    items: [
      { name: "나무의자 다리 부러짐", desc: "출장비 3만원 + 의자 개당 3만원" },
      {
        name: "나무의자 흔들림 수리 (업소용 포함)",
        desc: "출장비 3만원 + 의자 개당 2만원",
      },
      {
        name: "식탁의자 인조가죽 교체 (업소용 포함)",
        desc: "출장비 3만원 + 개당 3만원 (미싱 있으면 4만원+)",
      },
      {
        name: "업소용 붙박이의자 인조가죽 교체",
        desc: "출장비 3만원 + m당 5만원 (현장 상황에 따라 변동)",
      },
    ],
  },
  {
    category: "경첩교체",
    emoji: "🔩",
    items: [
      { name: "싱크대 문짝", desc: "총 5만원, 문짝 1짝 추가당 10,000원원" },
      {
        name: "장 경첩 (180도)",
        desc: "총 6만원, 문짝 1짝 추가당 20,000원원",
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
      },
      {
        name: "서랍 철레일 교체",
        desc: "총 5만원, 레일 1세트 추가당 15,000원",
      },
    ],
  },
  {
    category: "침대·식탁",
    emoji: "🛏️",
    items: [
      { name: "침대 프레임 수리", desc: "총 8만원 (프레임 부서짐 기준)" },
      { name: "식탁 다리 수리·흔들림", desc: "총 8만원" },
    ],
  },
];

const regions = [
  {
    label: "🟢 주요 서비스 지역",
    areas: [
      {
        city: "서울",
        list: [
          "강서구",
          "마포구",
          "관악구",
          "구로구",
          "영등포구",
          "동작구(사당)",
          "용산",
          "강남",
          "서초",
          "구로",
          "은평구",
          "서대문구",
          "양천구",
          "여의도",
          "홍대",
          "합정",
        ],
      },
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
          "연수구",
          "서구",
          "남동구",
          "중구",
          "동구",
          "영종도",
        ],
      },
      {
        city: "경기",
        list: ["부천", "김포", "광명", "시흥"],
      },
    ],
  },
];

export default function KeywordAccordion() {
  return (
    <section className="px-6 py-14" style={{ backgroundColor: "#111" }}>
      <div className="mx-auto max-w-5xl">
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
          {/* 수리 항목 단가 */}
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
                      </div>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* 출장 가능 지역 */}
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
                    <div className="flex flex-col gap-4">
                      {r.areas.map((area) => (
                        <div key={area.city}>
                          <p
                            className="text-xs font-black mb-2"
                            style={{ color: "#2fae8a" }}>
                            {area.city}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
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
                        </div>
                      ))}
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
