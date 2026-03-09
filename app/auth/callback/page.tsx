"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const run = async () => {
      try {
        const currentUrl = new URL(window.location.href);
        const code = currentUrl.searchParams.get("code");

        console.log("callback url:", window.location.href);
        console.log("auth code:", code);

        if (!code) {
          console.error("No code found in callback URL");
          router.replace("/login?error=no_code");
          return;
        }

        const { data, error } =
          await getSupabase().auth.exchangeCodeForSession(code);

        console.log("exchange result:", data, error);

        if (error) {
          console.error("Exchange error:", error);
          router.replace(`/login?error=${encodeURIComponent(error.message)}`);
          return;
        }

        router.replace("/");
      } catch (err) {
        console.error("Unexpected callback error:", err);
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
