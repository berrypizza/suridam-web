"use client";

import { useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

export default function AuthCallbackPage() {
  useEffect(() => {
    const supabase = getSupabase();

    // URL 해시에서 토큰 자동 처리 (Supabase가 알아서 함)
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        window.location.href = "/mypage";
      }
    });

    // 혹시 이미 세션이 있으면 바로 이동
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        window.location.href = "/mypage";
      }
    });

    // 5초 후에도 안 되면 홈으로
    const timer = setTimeout(() => {
      window.location.href = "/";
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        minHeight: "100dvh",
        backgroundColor: "#111",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        fontFamily: "'Pretendard', sans-serif",
      }}>
      <div
        style={{
          width: 40,
          height: 40,
          border: "3px solid #2fae8a",
          borderTopColor: "transparent",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <div style={{ color: "#555", fontSize: 14 }}>로그인 처리 중...</div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
