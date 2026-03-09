"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { flowType: "implicit" } },
  );
}

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  // 이미 로그인된 경우 메인으로
  useEffect(() => {
    getSupabase()
      .auth.getSession()
      .then(({ data }) => {
        if (data.session) {
          window.location.href = "/";
        } else {
          setChecking(false);
        }
      });
  }, []);

  const handleKakaoLogin = async () => {
    setLoading(true);
    const { error } = await getSupabase().auth.signInWithOAuth({
      provider: "kakao",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      alert("로그인 실패: " + error.message);
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div
        style={{
          minHeight: "100dvh",
          backgroundColor: "#111",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <div
          style={{
            width: 32,
            height: 32,
            border: "3px solid #2fae8a",
            borderTopColor: "transparent",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100dvh",
        backgroundColor: "#111",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif",
      }}>
      {/* 로고 영역 */}
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 20,
            backgroundColor: "#2fae8a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
            fontSize: 28,
          }}>
          🪑
        </div>
        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "white",
            letterSpacing: "-0.5px",
          }}>
          수리담
        </div>
        <div style={{ fontSize: 13, color: "#555", marginTop: 4 }}>
          가구수리 서비스
        </div>
      </div>

      {/* 카드 */}
      <div
        style={{
          width: "100%",
          maxWidth: 360,
          backgroundColor: "#1a1a1a",
          borderRadius: 24,
          padding: "32px 24px",
          border: "1px solid #222",
        }}>
        <div style={{ marginBottom: 28, textAlign: "center" }}>
          <div
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "white",
              marginBottom: 8,
            }}>
            로그인 / 회원가입
          </div>
          <div style={{ fontSize: 13, color: "#555", lineHeight: 1.6 }}>
            수리 접수 현황 확인 및<br />
            편리한 서비스 이용을 위해
            <br />
            로그인해 주세요
          </div>
        </div>

        {/* 혜택 목록 */}
        <div
          style={{
            backgroundColor: "#141414",
            borderRadius: 16,
            padding: "16px",
            marginBottom: 28,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}>
          {[
            { icon: "📋", text: "내 수리 접수 현황 실시간 확인" },
            { icon: "🔔", text: "수리 완료 알림 받기" },
            { icon: "📱", text: "앱 출시 시 기존 회원 자동 연동" },
          ].map((item) => (
            <div
              key={item.text}
              style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              <span style={{ fontSize: 13, color: "#888" }}>{item.text}</span>
            </div>
          ))}
        </div>

        {/* 카카오 로그인 버튼 */}
        <button
          onClick={handleKakaoLogin}
          disabled={loading}
          style={{
            width: "100%",
            backgroundColor: "#FEE500",
            color: "#191919",
            border: "none",
            borderRadius: 14,
            padding: "16px",
            fontSize: 15,
            fontWeight: 700,
            cursor: loading ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            opacity: loading ? 0.7 : 1,
            transition: "opacity 0.2s",
            fontFamily: "inherit",
          }}>
          {loading ? (
            <>
              <div
                style={{
                  width: 18,
                  height: 18,
                  border: "2px solid #19191944",
                  borderTopColor: "#191919",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                }}
              />
              로그인 중...
            </>
          ) : (
            <>
              <KakaoIcon />
              카카오로 시작하기
            </>
          )}
        </button>

        <div
          style={{
            textAlign: "center",
            marginTop: 16,
            fontSize: 12,
            color: "#333",
          }}>
          처음 오셨나요? 로그인 시 자동으로 회원가입됩니다
        </div>
      </div>

      {/* 하단 링크 */}
      <div style={{ marginTop: 24, display: "flex", gap: 20 }}>
        <a
          href="/"
          style={{ fontSize: 13, color: "#444", textDecoration: "none" }}>
          ← 홈으로
        </a>
        <a
          href="/request"
          style={{ fontSize: 13, color: "#444", textDecoration: "none" }}>
          수리 접수하기
        </a>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function KakaoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M9 1.5C4.86 1.5 1.5 4.186 1.5 7.5c0 2.1 1.26 3.948 3.168 5.052L3.9 15.75l3.318-2.19A8.86 8.86 0 009 13.5c4.14 0 7.5-2.686 7.5-6S13.14 1.5 9 1.5z"
        fill="#191919"
      />
    </svg>
  );
}
