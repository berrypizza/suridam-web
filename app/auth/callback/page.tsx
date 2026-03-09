"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";

export default function AuthCallbackPage() {
  const [msg, setMsg] = useState("로그인 처리 중...");

  useEffect(() => {
    const run = async () => {
      const supabase = getSupabase();

      // URL에서 에러 확인
      const params = new URLSearchParams(window.location.search);
      const errorCode = params.get("error");
      if (errorCode) {
        setMsg("로그인 실패. 다시 시도해주세요.");
        setTimeout(() => window.location.replace("/login"), 2000);
        return;
      }

      // PKCE: code를 세션으로 교환
      const code = params.get("code");
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          setMsg("로그인 실패: " + error.message);
          setTimeout(() => window.location.replace("/login"), 2000);
          return;
        }
        setMsg("로그인 완료!");
        window.location.replace("/mypage");
        return;
      }

      // 세션 이미 있으면 이동
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        window.location.replace("/mypage");
        return;
      }

      window.location.replace("/login");
    };

    run();
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
