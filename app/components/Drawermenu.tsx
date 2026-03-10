"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

function NaverIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727z" />
    </svg>
  );
}
function YouTubeIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

const menuItems = [
  {
    label: "수리 문의",
    href: "/request",
    badge: "1분 답변",
    highlight: true,
  },
  { label: "수리 사례", href: "/reviews", badge: null, highlight: false },
  {
    label: "비용 확인",
    href: "/estimate",
    badge: "즉시 조회",
    highlight: false,
  },
  { label: "왜 수리담", href: "/why", badge: null, highlight: false },
  { label: "마이페이지", href: "/mypage", badge: null, highlight: false },
];

export default function DrawerMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!mounted) return null;

  return (
    <>
      {/* 햄버거 버튼 */}
      <button
        onClick={() => setOpen(true)}
        aria-label="메뉴 열기"
        className="flex flex-col justify-center items-center gap-[5px] w-9 h-9 rounded-xl transition-all"
        style={{
          backgroundColor: "#2a2a2a",
          border: "1px solid #333",
        }}>
        <span
          className="block rounded-full transition-all duration-300"
          style={{ width: 16, height: 1.5, backgroundColor: "#e5e5e5" }}
        />
        <span
          className="block rounded-full transition-all duration-300"
          style={{ width: 10, height: 1.5, backgroundColor: "#2fae8a" }}
        />
        <span
          className="block rounded-full transition-all duration-300"
          style={{ width: 16, height: 1.5, backgroundColor: "#e5e5e5" }}
        />
      </button>

      {/* 오버레이 */}
      <div
        onClick={() => setOpen(false)}
        className="fixed inset-0 z-[60] transition-all duration-300"
        style={{
          backgroundColor: "rgba(0,0,0,0.65)",
          backdropFilter: open ? "blur(4px)" : "none",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
      />

      {/* 드로어 패널 */}
      <div
        className="fixed top-0 right-0 z-[70] h-full flex flex-col"
        style={{
          width: "min(340px, 88vw)",
          backgroundColor: "#111",
          borderLeft: "1px solid #2a2a2a",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s cubic-bezier(0.32, 0, 0.15, 1)",
          boxShadow: open ? "-24px 0 80px rgba(0,0,0,0.7)" : "none",
        }}>
        {/* 헤더 */}
        <div
          className="flex items-center justify-between px-5 py-4 flex-shrink-0"
          style={{ borderBottom: "1px solid #1e1e1e" }}>
          <Link href="/" onClick={() => setOpen(false)}>
            <Image
              src="/images/logo-transparent.png"
              alt="수리담"
              width={88}
              height={28}
              className="h-7 w-auto object-contain"
            />
          </Link>
          <button
            onClick={() => setOpen(false)}
            aria-label="메뉴 닫기"
            className="w-8 h-8 flex items-center justify-center rounded-xl transition-opacity hover:opacity-60"
            style={{ backgroundColor: "#1e1e1e", color: "#888", fontSize: 16 }}>
            ✕
          </button>
        </div>

        {/* 메인 메뉴 */}
        <nav className="flex-1 overflow-y-auto px-4 py-5">
          <div className="flex flex-col gap-1.5">
            {menuItems.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-xl px-4 py-3.5 transition-all"
                style={{
                  backgroundColor: item.highlight ? "#2fae8a" : "#1a1a1a",
                  border: `1px solid ${item.highlight ? "transparent" : "#252525"}`,
                  textDecoration: "none",
                }}>
                <span
                  className="text-sm font-bold"
                  style={{ color: item.highlight ? "white" : "#e5e5e5" }}>
                  {item.label}
                </span>
                <div className="flex items-center gap-2">
                  {item.badge && (
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: item.highlight
                          ? "rgba(255,255,255,0.2)"
                          : "#2fae8a22",
                        color: item.highlight ? "white" : "#2fae8a",
                      }}>
                      {item.badge}
                    </span>
                  )}
                  <span
                    style={{
                      color: item.highlight ? "rgba(255,255,255,0.6)" : "#444",
                      fontSize: 12,
                    }}>
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* 구분선 */}
          <div
            className="my-5"
            style={{ height: 1, backgroundColor: "#1e1e1e" }}
          />

          {/* 운영 정보 카드 */}
          <div
            className="rounded-2xl p-4"
            style={{ backgroundColor: "#161616", border: "1px solid #1e1e1e" }}>
            <p className="text-xs font-bold mb-3" style={{ color: "#555" }}>
              운영 정보
            </p>
            <div className="flex flex-col gap-2">
              {[
                { label: "서비스 지역", value: "인천 · 부천 · 서울 강서구" },
                { label: "답변 시간", value: "오전 9시 ~ 오후 9시" },
                { label: "방문 가능일", value: "월 ~ 토요일" },
              ].map((info, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: "#555" }}>
                    {info.label}
                  </span>
                  <span
                    className="text-xs font-semibold"
                    style={{ color: "#bbb" }}>
                    {info.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 신뢰 지표 */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            {[
              { num: "4.9", unit: "★ 평점" },
              { num: "1,000+", unit: "누적 후기" },
            ].map((stat, i) => (
              <div
                key={i}
                className="rounded-xl px-4 py-3 text-center"
                style={{
                  backgroundColor: "#161616",
                  border: "1px solid #1e1e1e",
                }}>
                <div
                  className="text-lg font-black"
                  style={{ color: "#2fae8a" }}>
                  {stat.num}
                </div>
                <div className="text-xs mt-0.5" style={{ color: "#555" }}>
                  {stat.unit}
                </div>
              </div>
            ))}
          </div>
        </nav>

        {/* 하단 고정 영역 */}
        <div
          className="flex-shrink-0 px-4 py-4"
          style={{ borderTop: "1px solid #1e1e1e" }}>
          {/* CTA 버튼 */}
          <a
            href="tel:01091273024"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2 w-full rounded-xl py-3.5 mb-3 font-bold text-sm transition-opacity hover:opacity-80"
            style={{
              backgroundColor: "#1e1e1e",
              border: "1px solid #2a2a2a",
              color: "#e5e5e5",
            }}>
            📞 010-9127-3024
          </a>

          {/* SNS */}
          <div className="flex items-center justify-center gap-2">
            <a
              href="https://blog.naver.com/sofaresq"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition-opacity hover:opacity-80"
              style={{
                backgroundColor: "#03C75A18",
                color: "#03C75A",
                border: "1px solid #03C75A33",
              }}>
              <NaverIcon /> 블로그
            </a>
            <a
              href="https://www.youtube.com/@surirang-911"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition-opacity hover:opacity-80"
              style={{
                backgroundColor: "#FF000018",
                color: "#FF6B6B",
                border: "1px solid #FF000033",
              }}>
              <YouTubeIcon /> 유튜브
            </a>
            <a
              href="/privacy"
              className="flex-1 flex items-center justify-center rounded-xl py-2.5 text-xs font-bold transition-opacity hover:opacity-80"
              style={{
                backgroundColor: "#1a1a1a",
                color: "#555",
                border: "1px solid #252525",
              }}>
              개인정보
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
