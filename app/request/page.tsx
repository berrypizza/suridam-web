"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const OWNER_PHONE = "01091273024";
const YT_URL = "https://www.youtube.com/shorts/CuHnjj4o-J4";
const BLOG_URL = "https://blog.naver.com/sofaresq";

function buildSmsBody(v: {
  name: string;
  customerPhone: string;
  address: string;
  symptom: string;
}) {
  return [
    "[수리담 가구수리 상담]",
    `이름: ${v.name}`,
    `연락처: ${v.customerPhone}`,
    `지역(동): ${v.address}`,
    `증상: ${v.symptom}`,
    "",
    "※ 사진은 이 문자에 '첨부'로 1~3장 보내주세요.",
  ].join("\n");
}

type Errors = {
  name?: string;
  customerPhone?: string;
  address?: string;
  symptom?: string;
};

function inputClass(hasError: boolean) {
  return [
    "mt-2 w-full rounded-xl border px-4 py-3 text-[15px] outline-none",
    "bg-zinc-50 text-zinc-900 placeholder:text-zinc-400",
    "focus:ring-2 focus:ring-[#2fae8a]/30 focus:border-[#2fae8a]",
    hasError ? "border-red-500 bg-red-50/60" : "border-zinc-200",
  ].join(" ");
}

export default function RequestPage() {
  // 🔥 모바일 감지 (오류 안 나게 useEffect 사용)
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const ua = navigator.userAgent || "";
    const isPhone = /iPhone|Android.+Mobile/i.test(ua);
    setIsMobile(isPhone);
  }, []);

  const [name, setName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [address, setAddress] = useState("");
  const [symptom, setSymptom] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [completed, setCompleted] = useState(false);

  const smsBody = useMemo(
    () => buildSmsBody({ name, customerPhone, address, symptom }),
    [name, customerPhone, address, symptom],
  );

  const smsHref = useMemo(
    () => `sms:${OWNER_PHONE}?&body=${encodeURIComponent(smsBody)}`,
    [smsBody],
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (!name.trim()) next.name = "이름을 입력해 주세요";
    if (!customerPhone.trim()) next.customerPhone = "연락처를 입력해 주세요";
    if (!address.trim()) next.address = "지역을 입력해 주세요";
    if (!symptom.trim()) next.symptom = "증상을 적어 주세요";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    window.location.href = smsHref;
    setCompleted(true);
  };

  const steps = [
    { num: "01", text: "아래 정보 입력" },
    { num: "02", text: "문자 보내기 클릭" },
    { num: "03", text: "사진 첨부 후 전송" },
  ];

  // 🔥 모바일 판단 전 렌더링 방지 (깜빡임 없음)
  if (isMobile === null) return null;

  // 🔥 PC/태블릿 차단
  if (!isMobile) {
    return (
      <main className="min-h-screen bg-white px-4 py-10">
        <div className="mx-auto max-w-md rounded-2xl border border-zinc-200 bg-white p-6 text-center shadow-[0_2px_16px_rgba(0,0,0,0.05)]">
          <h1 className="text-xl font-black text-zinc-900">
            현재는 모바일 문자 상담만 지원합니다
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-zinc-600">
            이 페이지는 문자 앱을 열어 상담 내용을 전송하는 구조입니다.
            <br />
            PC 및 태블릿에서는 지원하지 않습니다.
            <br />
            휴대폰으로 다시 접속해 주세요.
          </p>

          <div className="mt-6">
            <a
              href={`tel:${OWNER_PHONE}`}
              className="rounded-xl border border-zinc-900 px-4 py-3 text-sm font-bold inline-block">
              전화 문의 : 010-9127-3024
            </a>
          </div>

          <p className="mt-6 text-xs text-zinc-400">
            무조건 수리 가능하다고 말씀드리지는 않습니다.
          </p>
        </div>
      </main>
    );
  }

  // 📱 모바일일 때만 기존 화면
  return (
    <main className="min-h-screen bg-white px-4 py-6 sm:py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-black tracking-[-0.3px] text-zinc-900">
            사진 수리 리폼 상담
          </h1>
          <p className="mt-2 text-sm sm:text-base text-zinc-500">
            정보 입력 후{" "}
            <span className="font-semibold text-zinc-900">
              상담 문자 보내기
            </span>
            를 누르면 문자 앱이 열립니다.
            <span className="text-zinc-400"> (모바일 권장)</span>
          </p>
        </div>

        {/* 기존 네 폼 구조 그대로 */}
        {/* 여기 아래는 네가 준 기존 코드 그대로 유지해도 됨 */}
      </div>
    </main>
  );
}
