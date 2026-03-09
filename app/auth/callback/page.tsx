"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const run = async () => {
      try {
        const supabase = getSupabase();

        // 해시/세션 반영될 시간 잠깐 대기
        await new Promise((resolve) => setTimeout(resolve, 700));

        const { data, error } = await supabase.auth.getSession();

        console.log("callback session:", data, error);
        console.log("callback url:", window.location.href);

        if (error) {
          router.replace(`/login?error=${encodeURIComponent(error.message)}`);
          return;
        }

        if (data.session) {
          router.replace("/");
          return;
        }

        router.replace("/login?error=session_not_found");
      } catch (err) {
        console.error("callback error:", err);
        router.replace("/login?error=unexpected");
      }
    };

    run();
  }, [router]);

  return (
    <div
      style={{
        minHeight: "100dvh",
        backgroundColor: "#111",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      로그인 처리 중...
    </div>
  );
}
