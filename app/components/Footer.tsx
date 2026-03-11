export default function Footer() {
  return (
    <footer
      style={{ backgroundColor: "#111111", borderTop: "1px solid #2a2a2a" }}>
      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* 상단 — 브랜드 + 링크 */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-8">
          {/* 브랜드 */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg font-bold" style={{ color: "white" }}>
                수리담
              </span>
              <span
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{
                  backgroundColor: "#2fae8a22",
                  color: "#2fae8a",
                  border: "1px solid #2fae8a44",
                }}>
                가구 출장 수리
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "#555" }}>
              안 되는 건 안 된다고 먼저 말합니다.
              <br />
              수도권 · 인천 · 부천 · 서울 전 지역 방문
            </p>
          </div>

          {/* 링크 모음 */}
          <div
            className="flex flex-col gap-2 text-sm"
            style={{ color: "#555" }}>
            <a
              href="tel:01091273024"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              style={{ color: "#e5e5e5" }}>
              📞 010-9127-3024
            </a>
            <a
              href="https://blog.naver.com/sofaresq"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              style={{ color: "#555" }}>
              N 네이버 블로그
            </a>
            <a
              href="https://www.youtube.com/@surirang-911"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              style={{ color: "#555" }}>
              ▶ 유튜브 채널
            </a>
            <a
              href="/privacy"
              className="hover:opacity-80 transition-opacity"
              style={{ color: "#444" }}>
              개인정보처리방침
            </a>
          </div>
        </div>

        {/* 구분선 */}
        <div className="h-px mb-6" style={{ backgroundColor: "#222" }} />

        {/* 하단 — 카피라이트 */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="text-xs" style={{ color: "#444" }}>
            © {new Date().getFullYear()} 수리담. All rights reserved.
          </p>
          <div className="flex flex-col gap-1">
            <p className="text-xs" style={{ color: "#444" }}>
              대표자 고관호 / 상호
              수리담출장가구수리의자수리쇼파소파수리리폼업체 / 사업자등록번호
              175-11-03137
            </p>
            <p className="text-xs" style={{ color: "#333" }}>
              서울특별시 영등포구 선유서로21길 14, 2층 201-b484호
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
