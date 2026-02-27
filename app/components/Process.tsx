const steps = [
  { title: "1) 사진 전송", desc: "가구 상태가 보이게 1~3장" },
  { title: "2) 가능 여부 안내", desc: "안 되는 건 안 된다고 말씀드립니다" },
  { title: "3) 비용 범위 공유", desc: "상태에 따라 범위로 안내" },
  { title: "4) 일정 조율", desc: "가능한 시간에 맞춰 방문" },
];

export default function Process() {
  return (
    <section className="px-6 py-12 bg-gray-50">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-xl font-semibold">진행 방식</h2>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {steps.map((s) => (
            <div key={s.title} className="rounded-2xl border bg-white p-5">
              <div className="font-semibold">{s.title}</div>
              <div className="mt-2 text-sm text-gray-600">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
