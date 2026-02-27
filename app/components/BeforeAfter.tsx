const items = [
  { title: "상부장 처짐", desc: "기울어짐 → 안정적으로 고정" },
  { title: "소파 꺼짐", desc: "꺼짐 → 탄탄하게 복원" },
  { title: "슬라이딩 도어", desc: "레일/바퀴 문제 → 부드럽게 작동" },
];

export default function BeforeAfter() {
  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-xl font-semibold">전/후 사례</h2>
        <p className="mt-2 text-gray-600">
          사진 1~3장만 보내주시면, 가능한 방향부터 정리해드립니다.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {items.map((it) => (
            <div key={it.title} className="rounded-2xl border p-5">
              <div className="text-base font-semibold">{it.title}</div>
              <div className="mt-2 text-sm text-gray-600">{it.desc}</div>
              <div className="mt-4 h-32 rounded-xl bg-gray-100 text-sm text-gray-500 flex items-center justify-center">
                (여기에 전/후 사진)
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
