import Image from "next/image";

const items = [
  {
    title: "상부장 처짐/떨어짐",
    desc: "기울어짐 → 다시 수평 잡고 고정",
    before: "/images/upper-before.jpg",
    after: "/images/upper-after.jpg",
  },
  {
    title: "소파 꺼짐",
    desc: "꺼짐 → 탄탄하게 복원",
    before: "/images/sofa-before.jpg",
    after: "/images/sofa-after.jpg",
  },
  {
    title: "슬라이딩 도어",
    desc: "바퀴 파손 → 부드럽게 작동",
    before: "/images/door-before.jpg",
    after: "/images/door-after.jpg",
  },
];

export default function BeforeAfter() {
  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-xl font-semibold">전/후 사례</h2>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <div key={item.title} className="rounded-2xl border p-4">
              <div className="font-semibold">{item.title}</div>
              <div className="mt-2 text-sm text-gray-600">{item.desc}</div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <Image
                  src={item.before}
                  alt="before"
                  width={400}
                  height={300}
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="rounded-lg object-cover w-full h-40"
                />
                <Image
                  src={item.after}
                  alt="after"
                  width={400}
                  height={300}
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="rounded-lg object-cover w-full h-40"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
