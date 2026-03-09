"use client";

import { useEffect } from "react";
import { getSupabase } from "@/lib/supabase";

export default function AuthCallbackPage() {
  useEffect(() => {
    const supabase = getSupabase();

    const handleCallback = async () => {
      // implicit flow: 토큰이 URL 해시(#)에 들어옴
      const hash = window.location.hash;
      if (hash && hash.includes("access_token")) {
        // Supabase가 해시에서 자동으로 세션 설정
        const { data, error } = await supabase.auth.getSession();
        if (data.session) {
          window.location.href = "/mypage";
          return;
        }
        if (error) {
          window.location.href = "/login?error=auth_failed";
          return;
        }
      }

      // PKCE flow: code가 query string에 있음
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error) {
          window.location.href = "/mypage";
          return;
        }
      }

      // 이미 세션 있으면 이동
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        window.location.href = "/mypage";
      } else {
        window.location.href = "/login";
      }
    };

    // 해시 처리를 위해 약간 딜레이
    setTimeout(handleCallback, 300);
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
