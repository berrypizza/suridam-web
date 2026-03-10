// app/admin/layout.tsx
// 어드민 전용 레이아웃 - 어드민 manifest 참조

import { Metadata, Viewport } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "수리담 관리자",
  description: "수리담 기사 전용 관리 앱",
  // 루트 layout의 manifest.json을 덮어씀
  manifest: "/manifest-admin.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "수리담 Admin",
  },
};

export const viewport: Viewport = {
  themeColor: "#2fae8a",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* iOS용 어드민 아이콘 (별도 아이콘 없으면 icon-192.png 그대로 써도 됨) */}
      <link rel="apple-touch-icon" href="/icons/icon-admin-192.png" />
      {children}
    </>
  );
}
