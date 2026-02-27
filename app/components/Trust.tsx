const bullets = [
  "비용은 현장 전 단정하지 않고, 상태에 따라 범위로 안내합니다.",
  "무리해서 진행하지 않습니다. 안 되는 건 안 된다고 솔직히 말씀드립니다.",
  "사진 상담 → 방향 정리 → 일정 조율 순서로 진행합니다.",
];

export default function Trust() {
  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-5xl rounded-2xl border p-6">
        <h2 className="text-xl font-semibold">신뢰를 만드는 기준</h2>
        <ul className="mt-4 space-y-2 text-gray-700">
          {bullets.map((b) => (
            <li key={b} className="text-sm md:text-base">
              • {b}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
