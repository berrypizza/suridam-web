"use client";

import { useEffect } from "react";
import { getSupabase } from "@/lib/supabase";

export default function AuthCallbackPage() {
  useEffect(() => {
    const supabase = getSupabase();

    // onAuthStateChange가 해시에서 토큰을 자동으로 읽고 세션 설정
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        subscription.unsubscribe();
        window.location.replace("/mypage");
      }
      if (event === "SIGNED_OUT") {
        window.location.replace("/login");
      }
    });

    // 이미 세션 있으면 바로 이동
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        subscription.unsubscribe();
        window.location.replace("/mypage");
      }
    });

    // 10초 후에도 안 되면 로그인으로
    const timer = setTimeout(() => {
      subscription.unsubscribe();
      window.location.replace("/login");
    }, 10000);

    return () => {
      clearTimeout(timer);
      subscription.unsubscribe();
    };
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
