export default function About() {
  return (
    <section className="px-6 py-12 bg-gray-50">
      <div className="mx-auto max-w-5xl grid gap-6 md:grid-cols-2 items-center">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold">
            수리담은 “사진 상담”부터 시작합니다
          </h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            블로그 글만 있는 개인 작업처럼 보이지 않도록, 저희는
            상담-진단-일정-방문까지 흐름을 표준화해서 운영합니다.
          </p>
          <p className="mt-3 text-gray-700 leading-relaxed">
            현장에서 늘 마음에 두는 말은 하나입니다. <br />
            <span className="font-semibold">“널리 사람을 이롭게하라.”</span>
          </p>
          <p className="mt-3 text-gray-700 leading-relaxed">
            무조건 된다고 말씀드리기보다, 사진을 보고 안 되는 건 안 된다고
            솔직히 말씀드립니다.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a
              href="https://blog.naver.com/sofaresq/224129090889"
              className="rounded-xl bg-black px-6 py-3 text-white text-center">
              사진 상담하기
            </a>
            <a
              href="tel:01091273024"
              className="rounded-xl border border-black px-6 py-3 text-center">
              전화 문의
            </a>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-6">
          <div className="text-sm text-gray-500">운영 기준</div>
          <ul className="mt-3 space-y-2 text-gray-800">
            <li>• 사진 1~3장으로 가능 여부 먼저 안내</li>
            <li>• 비용은 상태에 따라 범위로 안내</li>
            <li>• 인천 / 부천 / 서울 강서구 중심 운영</li>
            <li>• 안전/원상 회복 우선</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
