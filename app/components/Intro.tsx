export default function Intro() {
  const cardStyle = {
    backgroundColor: "#2a2a2a",
    border: "1px solid #333",
  };

  const valueStyle = {
    color: "#2fae8a",
    fontSize: 28,
    fontWeight: 900,
  };

  return (
    <section
      className="flex flex-col items-center justify-center px-8 py-14"
      style={{ margin: "55px 0" }}>
      <div className="max-w-[720px] text-center">
        <h1
          className="text-3xl font-bold leading-snug md:text-4xl"
          style={{ color: "white" }}>
          가구수리는 번거롭습니다.
        </h1>

        <p
          className="mt-8 text-3xl font-bold leading-snug md:text-4xl"
          style={{ color: "white" }}>
          제대로 하는 곳을
          <br />
          찾는 일은 더 어렵습니다.
        </p>

        <p
          className="mt-10 text-3xl font-bold leading-snug md:text-4xl"
          style={{ color: "#11e2a7" }}>
          수리를 담다.
          <br />
          수리담 가구수리입니다.
        </p>
      </div>

      <div className="mt-10 grid w-full max-w-[900px] grid-cols-1 gap-4 md:grid-cols-3">
        <div
          className="flex min-h-[120px] flex-col items-center justify-center rounded-2xl px-5 py-4 text-center"
          style={cardStyle}>
          <div className="text-base font-bold" style={{ color: "white" }}>
            월 평균 수리 건
          </div>
          <div className="mt-2" style={valueStyle}>
            100+
          </div>
        </div>

        <div
          className="flex min-h-[120px] flex-col items-center justify-center rounded-2xl px-5 py-4 text-center"
          style={cardStyle}>
          <div className="text-base font-bold" style={{ color: "white" }}>
            고객 만족도
          </div>
          <div className="mt-2" style={valueStyle}>
            ★★★★★
          </div>
          <div
            className="mt-1 text-sm font-semibold"
            style={{ color: "#9ff3d7" }}>
            4.9 / 5.0
          </div>
        </div>

        <div
          className="flex min-h-[120px] flex-col items-center justify-center rounded-2xl px-5 py-4 text-center"
          style={cardStyle}>
          <div className="text-base font-bold" style={{ color: "white" }}>
            누적 후기
          </div>
          <div className="mt-2" style={valueStyle}>
            1000+
          </div>
        </div>
      </div>
    </section>
  );
}
