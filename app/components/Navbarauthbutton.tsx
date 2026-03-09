"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";
import Link from "next/link";

export default function NavbarAuthButton() {
  const [user, setUser] = useState<{ name?: string; avatar?: string } | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = getSupabase();
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) {
        const u = data.session.user;
        setUser({
          name: u.user_metadata?.name || u.user_metadata?.full_name || "회원",
          avatar: u.user_metadata?.avatar_url || u.user_metadata?.picture,
        });
      }
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          const u = session.user;
          setUser({
            name: u.user_metadata?.name || u.user_metadata?.full_name || "회원",
            avatar: u.user_metadata?.avatar_url || u.user_metadata?.picture,
          });
        } else {
          setUser(null);
        }
      },
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  if (loading) return <div style={{ width: 36, height: 36 }} />;

  if (user) {
    return (
      <Link
        href="/mypage"
        className="flex items-center gap-2 rounded-full px-3 py-1.5 transition-opacity hover:opacity-80"
        style={{ backgroundColor: "#2a2a2a", border: "1px solid #333" }}>
        {user.avatar ? (
          <img
            src={user.avatar}
            alt="프로필"
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        ) : (
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              backgroundColor: "#2fae8a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              color: "white",
              fontWeight: 700,
            }}>
            {user.name?.charAt(0)}
          </div>
        )}
        <span style={{ fontSize: 13, color: "#ddd", fontWeight: 500 }}>
          {user.name?.split(" ")[0]}
        </span>
      </Link>
    );
  }

  return (
    <Link
      href="/login"
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold transition-opacity hover:opacity-80"
      style={{ backgroundColor: "#FEE500", color: "#191919" }}>
      <span style={{ fontSize: 12 }}>👤</span>
      <span className="hidden sm:inline" style={{ fontSize: 13 }}>
        로그인
      </span>
    </Link>
  );
}
