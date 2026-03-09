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
        const url = new URL(window.location.href);
        const code = url.searchParams.get("code");
        const errorDescription = url.searchParams.get("error_description");
        const error = url.searchParams.get("error");

        console.log("callback url:", window.location.href);
        console.log("code:", code);
        console.log("error:", error, errorDescription);

        if (error) {
          router.replace(
            `/login?error=${encodeURIComponent(
              errorDescription || error || "oauth_error",
            )}`,
          );
          return;
        }

        if (!code) {
          router.replace("/login?error=no_code");
          return;
        }

        const { error: exchangeError } =
          await supabase.auth.exchangeCodeForSession(code);

        if (exchangeError) {
          console.error("exchangeCodeForSession error:", exchangeError);
          router.replace(
            `/login?error=${encodeURIComponent(exchangeError.message)}`,
          );
          return;
        }

        const { data: sessionData } = await supabase.auth.getSession();

        if (!sessionData.session) {
          router.replace("/login?error=session_not_found");
          return;
        }

        router.replace("/");
      } catch (err) {
        console.error("callback unexpected error:", err);
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
