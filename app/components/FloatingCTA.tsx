"use client";

import { useEffect, useState } from "react";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // 300px 스크롤 후 등장
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      style={{
        padding: "12px 16px",
        paddingBottom: "calc(12px + env(safe-area-inset-bottom))",
        background:
          "linear-gradient(to top, rgba(17,17,17,0.98) 80%, transparent)",
      }}>
      <div className="flex gap-3 max-w-md mx-auto">
        <a
          href="/request"
          className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3.5 font-bold text-white text-sm transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#2fae8a" }}>
          💬 사진 상담 시작하기
        </a>
        <a
          href="tel:01091273024"
          className="flex items-center justify-center rounded-xl px-4 py-3.5 font-bold text-sm transition-opacity hover:opacity-80"
          style={{
            backgroundColor: "#2a2a2a",
            border: "1px solid #333",
            color: "#e5e5e5",
          }}>
          📞
        </a>
      </div>
    </div>
  );
}
