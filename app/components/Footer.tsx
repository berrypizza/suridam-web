"use client";

import { useState } from "react";

export default function Footer() {
  const [contactOpen, setContactOpen] = useState(false);

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

        {/* Contact Us 아코디언 */}
        <div style={{ borderTop: "1px solid #1e1e1e", marginBottom: 24 }}>
          <button
            onClick={() => setContactOpen((v) => !v)}
            className="flex items-center justify-between w-full py-4"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
            }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#333",
              }}>
              Contact Us
            </span>
            <span
              style={{
                color: "#2a2a2a",
                fontSize: 12,
                display: "inline-block",
                transform: contactOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease",
              }}>
              ▾
            </span>
          </button>

          <div
            style={{
              maxHeight: contactOpen ? 180 : 0,
              overflow: "hidden",
              transition: "max-height 0.35s ease",
            }}>
            <div
              style={{
                borderTop: "1px solid #1a1a1a",
                paddingTop: 16,
                paddingBottom: 20,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}>
              <a
                href="tel:01091273024"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  textDecoration: "none",
                }}>
                <span style={{ fontSize: 12, color: "#2a2a2a" }}>📞</span>
                <span style={{ fontSize: 13, color: "#444" }}>
                  010-9127-3024
                </span>
              </a>
              <a
                href="sms:01091273024"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  textDecoration: "none",
                }}>
                <span style={{ fontSize: 12, color: "#2a2a2a" }}>✉️</span>
                <span style={{ fontSize: 13, color: "#444" }}>
                  문자로 사진 보내기
                </span>
              </a>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 12, color: "#2a2a2a" }}>🕐</span>
                <span style={{ fontSize: 13, color: "#333" }}>
                  매일 09:00 — 21:00
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 구분선 */}
        <div className="h-px mb-6" style={{ backgroundColor: "#1a1a1a" }} />

        {/* 하단 — 카피라이트 + 사업자 정보 */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="text-xs" style={{ color: "#2e2e2e" }}>
            © {new Date().getFullYear()} 수리담. All rights reserved.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <p className="text-xs" style={{ color: "#2e2e2e" }}>
              상호 수리담출장가구수리 · 대표자 고관호 · 사업자등록번호
              175-11-03137
            </p>
            <p className="text-xs" style={{ color: "#252525" }}>
              서울특별시 영등포구 선유서로21길 14, 2층 201-b484호
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
