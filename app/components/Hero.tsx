export default function Hero() {
  return (
    <section className="px-6 py-16 text-center">
      <h1 className="mx-auto max-w-2xl text-3xl font-bold leading-tight md:text-4xl">
        망가진 가구, 사진 한 장이면 충분합니다.
      </h1>

      <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 md:text-lg">
        가구 사진 보내주시면 수리 가능 여부와 비용 범위, 1분 안에 바로
        안내드립니다.
      </p>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a
          href="https://blog.naver.com/sofaresq/224129090889"
          className="w-full rounded-xl bg-black px-6 py-3 text-white sm:w-auto">
          사진 상담하기
        </a>

        <a
          href="tel:01091273024"
          className="w-full rounded-xl border border-black px-6 py-3 sm:w-auto">
          전화 문의
        </a>
      </div>

      <p className="mt-6 text-sm text-gray-500">
        무조건 수리 가능하다고 말씀드리지는 않습니다.
      </p>
    </section>
  );
}
