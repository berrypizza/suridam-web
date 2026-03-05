"use client";

import { useEffect, useState } from "react";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // 광고 유저는 의도가 있으므로 100px만 스크롤해도 바로 노출
    const onScroll = () => setVisible(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pt-3 md:hidden"
      style={{
        background:
          "linear-gradient(to top, rgba(18,18,18,0.98) 70%, transparent)",
      }}>
      <div className="flex gap-2 mx-auto max-w-sm">
        <a
          href="/request"
          className="flex-1 rounded-xl py-3.5 text-center text-sm font-bold text-white transition-opacity active:opacity-80"
          style={{ backgroundColor: "#2fae8a" }}>
          💬 사진 상담 시작하기
        </a>
        <a
          href="tel:01091273024"
          className="rounded-xl px-4 py-3.5 text-center text-sm font-bold transition-opacity active:opacity-80"
          style={{
            backgroundColor: "#2a2a2a",
            border: "1px solid #444",
            color: "#e5e5e5",
          }}>
          📞
        </a>
      </div>
    </div>
  );
}
