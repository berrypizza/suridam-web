import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#e5e5e5]">
      <div className="mx-auto max-w-5xl px-6 h-14 flex items-center justify-between">
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo-transparent.png"
            alt="수리담 로고"
            width={100}
            height={32}
            className="h-20 w-auto object-contain"
            priority
          />
          {/* 로고 이미지 없을 경우 텍스트 폴백 */}
          {/* <span className="text-lg font-bold text-[#1e1e1e] tracking-tight">수리담</span> */}
        </Link>

        {/* 우측 CTA */}
        <a
          href="tel:01091273024"
          className="inline-flex items-center gap-1.5 rounded-xl bg-[#2fae8a] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2e9f83] transition-colors">
          📞 <span className="hidden sm:inline">전화 문의</span>
          <span className="sm:hidden">010-9127-3024</span>
        </a>
      </div>
    </header>
  );
}
