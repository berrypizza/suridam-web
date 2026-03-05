export default function BlogBanner() {
  return (
    <div style={{ backgroundColor: "#1e1e1e" }}>
      <div className="mx-auto max-w-5xl px-6 pb-0 pt-2">
        <a
          href="https://blog.naver.com/sofaresq"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-2xl px-5 py-4 transition-opacity hover:opacity-80"
          style={{ backgroundColor: "#2a2a2a", border: "1px solid #333" }}>
          <div className="flex items-center gap-3">
            {/* 네이버 N 아이콘 */}
            <div
              className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{ backgroundColor: "#03C75A" }}>
              N
            </div>
            <div>
              <p className="text-xs mb-0.5" style={{ color: "#7a7a7a" }}>
                수리담 네이버 블로그
              </p>
              <p className="text-sm font-semibold" style={{ color: "#e5e5e5" }}>
                수리담이 어떤 곳인지 더 알고 싶다면 → 실제 수리 과정 보기
              </p>
            </div>
          </div>

          <span
            className="flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap"
            style={{
              backgroundColor: "#2fae8a22",
              color: "#2fae8a",
              border: "1px solid #2fae8a55",
            }}>
            블로그 보러가기 →
          </span>
        </a>
      </div>
    </div>
  );
}
