// app/admin/layout.tsx
// 어드민 전용 레이아웃 - PWA 메타태그 + 서비스워커 등록

import { Metadata, Viewport } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "수리담 관리자",
  description: "수리담 기사 전용 관리 앱",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "수리담 Admin",
  },
};

export const viewport: Viewport = {
  themeColor: "#2fae8a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* iOS PWA 아이콘 */}
      <link rel="apple-touch-icon" href="/icons/icon-192.png" />

      {/* 서비스워커 등록 */}
      <Script id="sw-register" strategy="afterInteractive">
        {`
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
              navigator.serviceWorker
                .register('/sw.js')
                .then(() => console.log('[SW] 등록 완료'))
                .catch((e) => console.log('[SW] 등록 실패', e));
            });
          }
        `}
      </Script>

      {children}
    </>
  );
}
