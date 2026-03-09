"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";

export default function AuthCallbackPage() {
  const [msg, setMsg] = useState("로그인 처리 중...");

  useEffect(() => {
    const supabase = getSupabase();

    // implicit flow: 브라우저 URL 해시에서 자동으로 세션 설정됨
    // detectSessionInUrl: true 가 설정되어 있으면 자동 처리
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        setMsg("로그인 완료! 이동 중...");
        subscription.unsubscribe();
        setTimeout(() => {
          window.location.replace("/mypage");
        }, 500);
      }
    });

    // 1초 후 세션 직접 체크 (이미 처리됐을 수도 있음)
    const check = setTimeout(async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setMsg("로그인 완료! 이동 중...");
        subscription.unsubscribe();
        window.location.replace("/mypage");
      }
    }, 1000);

    // 15초 타임아웃
    const timeout = setTimeout(() => {
      setMsg("로그인 실패. 다시 시도해주세요.");
      subscription.unsubscribe();
      setTimeout(() => window.location.replace("/login"), 2000);
    }, 15000);

    return () => {
      clearTimeout(check);
      clearTimeout(timeout);
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
      <div style={{ color: "#888", fontSize: 14 }}>{msg}</div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
