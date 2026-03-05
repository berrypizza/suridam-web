import Image from "next/image";
import Link from "next/link";

function NaverIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export default function Navbar() {
  return (
    <header
      className="sticky top-0 z-50"
      style={{ backgroundColor: "#1e1e1e", borderBottom: "1px solid #2a2a2a" }}>
      <div className="mx-auto max-w-5xl px-6 h-14 flex items-center justify-between gap-4">
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <Image
            src="/images/logo-transparent.png"
            alt="수리담 로고"
            width={100}
            height={32}
            className="h-20 w-auto object-contain"
            priority
          />
        </Link>

        {/* 우측 */}
        <div className="flex items-center gap-2">
          {/* SNS 아이콘 */}
          <div
            className="hidden sm:flex items-center gap-1 rounded-full px-1.5 py-1.5"
            style={{ backgroundColor: "#2a2a2a", border: "1px solid #333" }}>
            <a
              href="https://blog.naver.com/sofaresq"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="네이버 블로그"
              className="flex items-center justify-center w-7 h-7 rounded-full transition-all hover:scale-110"
              style={{ backgroundColor: "#03C75A", color: "white" }}>
              <NaverIcon />
            </a>
            <a
              href="https://www.youtube.com/@surirang-911"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="유튜브"
              className="flex items-center justify-center w-7 h-7 rounded-full transition-all hover:scale-110"
              style={{ backgroundColor: "#FF0000", color: "white" }}>
              <YouTubeIcon />
            </a>
          </div>

          {/* 구분선 */}
          <div
            className="hidden sm:block h-4 w-px"
            style={{ backgroundColor: "#333" }}
          />

          {/* 전화 CTA */}
          <a
            href="tel:01091273024"
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#2fae8a" }}>
            <span className="text-xs">📞</span>
            <span className="hidden sm:inline">전화 문의</span>
            <span className="sm:hidden">문의</span>
          </a>
        </div>
      </div>
    </header>
  );
}
