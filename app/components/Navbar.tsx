import Image from "next/image";
import Link from "next/link";
import NavbarAuthButton from "./Navbarauthbutton";
import DrawerMenu from "./Drawermenu";

const KAKAO_CHANNEL_URL = "http://pf.kakao.com/_kaKTn/chat";

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
function KakaoIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3C6.477 3 2 6.477 2 10.8c0 2.7 1.62 5.1 4.077 6.569l-1.04 3.847a.3.3 0 0 0 .461.324l4.666-3.1A11.66 11.66 0 0 0 12 18.6c5.523 0 10-3.477 10-7.8S17.523 3 12 3z" />
    </svg>
  );
}

export default function Navbar() {
  return (
    <header
      className="sticky top-0 z-50"
      style={{ backgroundColor: "#1e1e1e", borderBottom: "1px solid #2a2a2a" }}>
      <div className="mx-auto max-w-5xl px-6 h-14 flex items-center justify-between gap-4">
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

        <div className="flex items-center gap-2">
          {/* SNS — 데스크탑만 */}
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

          <div
            className="hidden sm:block h-4 w-px"
            style={{ backgroundColor: "#333" }}
          />

          <NavbarAuthButton />

          {/* 카카오 CTA */}
          <a
            href={KAKAO_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-black transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#FEE500", color: "#191919" }}>
            <KakaoIcon />
            <span className="hidden sm:inline">카카오 상담</span>
            <span className="sm:hidden">상담</span>
          </a>

          {/* 전화 — 데스크탑만 */}
          <a
            href="tel:01091273024"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-opacity hover:opacity-90"
            style={{
              backgroundColor: "#2a2a2a",
              border: "1px solid #333",
              color: "#e5e5e5",
            }}>
            <span className="text-xs">📞</span>
            <span>전화 문의</span>
          </a>

          <DrawerMenu />
        </div>
      </div>
    </header>
  );
}
