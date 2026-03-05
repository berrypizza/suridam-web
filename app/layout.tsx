import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TrustBar from "./components/Trustbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "수리담 가구 수리 서비스",
  description:
    "사진 한 장 이면 수리가 가능한지 먼저 알려드립니다. 불필요한 교체를 권하지 않는, 믿을 수 있는 가구 수리 서비스입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        <TrustBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
