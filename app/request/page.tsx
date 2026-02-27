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
  // ✅ 모바일만 허용 (PC/태블릿 차단)
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const ua = navigator.userAgent || "";
    // 스마트폰만 허용 (iPad/태블릿 차단)
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

  // 깜빡임 방지
  if (isMobile === null) return null;

  // PC/태블릿 차단 화면
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

  // ✅ 여기부터 “원래 있던 구조/디자인 그대로”
  return (
    <main className="min-h-screen bg-white px-4 py-6 sm:py-10">
      <div className="mx-auto max-w-5xl">
        {/* 상단: 타이틀 */}
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

        {/* 반응형 레이아웃: 모바일 1열 / 데스크탑 2열 */}
        <div className="grid gap-4 lg:grid-cols-2 lg:items-start">
          {/* 좌측: 캐릭터/소개 카드 */}
          <section className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6 shadow-[0_2px_16px_rgba(0,0,0,0.05)]">
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#2fae8a] bg-[#f0faf6] px-3 py-1 text-[12px] font-bold text-[#2e9f83]">
                <span className="inline-block h-2 w-2 rounded-full bg-[#2fae8a]" />
                안 되는 건 안 된다고 먼저 말합니다
              </span>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
              <div className="order-2 sm:order-1">
                <h2 className="text-lg sm:text-xl font-black tracking-[-0.3px] text-zinc-900">
                  사진 1~3장으로 가능 여부부터 정리합니다
                </h2>
                <p className="mt-2 text-sm sm:text-[15px] leading-relaxed text-zinc-600">
                  무조건 된다고 말하지 않습니다. 사진을 보고 어려우면 먼저
                  말씀드립니다. 비용은 상태에 따라{" "}
                  <span className="font-semibold text-zinc-900">범위</span>로
                  안내합니다.
                </p>

                <div className="mt-4 grid grid-cols-2 gap-2 sm:flex sm:gap-3">
                  <a
                    href={`tel:${OWNER_PHONE}`}
                    className="rounded-xl border border-zinc-900 px-4 py-3 text-center text-sm font-bold">
                    전화 문의
                  </a>
                  <a
                    href={BLOG_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl bg-zinc-900 px-4 py-3 text-center text-sm font-bold text-white">
                    블로그 보기
                  </a>
                </div>
              </div>

              <div className="order-1 sm:order-2 flex justify-center">
                <Image
                  src="/images/suriragn2.png"
                  alt="수리랑"
                  width={240}
                  height={240}
                  priority
                  className="h-40 w-40 sm:h-44 sm:w-44 object-contain"
                />
              </div>
            </div>
          </section>

          {/* 우측: 폼 카드 */}
          <section className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6 shadow-[0_2px_16px_rgba(0,0,0,0.05)]">
            {/* 진행 단계 */}
            <div className="rounded-2xl border border-zinc-200 overflow-hidden">
              <div className="grid grid-cols-3">
                {steps.map((s, i) => (
                  <div
                    key={s.num}
                    className={[
                      "px-2 py-3 text-center",
                      i === 0 ? "bg-[#f0faf6]" : "bg-white",
                      i > 0 ? "border-l border-zinc-200" : "",
                    ].join(" ")}>
                    <div className="text-[16px] font-black leading-none text-zinc-200">
                      {s.num}
                    </div>
                    <div className="mt-1 text-[11px] sm:text-[12px] leading-snug text-zinc-500">
                      {s.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 폼 */}
            <form onSubmit={onSubmit} className="mt-5 grid gap-4">
              {/* 이름 */}
              <label className="grid">
                <span className="text-sm font-bold text-zinc-900">이름</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="홍길동"
                  className={inputClass(!!errors.name)}
                />
                {errors.name && (
                  <span className="mt-2 text-xs text-red-500">
                    {errors.name}
                  </span>
                )}
              </label>

              {/* 연락처 */}
              <label className="grid">
                <span className="text-sm font-bold text-zinc-900">연락처</span>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="010-0000-0000"
                  className={inputClass(!!errors.customerPhone)}
                />
                {errors.customerPhone && (
                  <span className="mt-2 text-xs text-red-500">
                    {errors.customerPhone}
                  </span>
                )}
              </label>

              {/* 지역 */}
              <label className="grid">
                <span className="text-sm font-bold text-zinc-900">
                  지역 <span className="text-zinc-500">(동까지만)</span>
                </span>
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="예) 인천 서구 ○○동"
                  className={inputClass(!!errors.address)}
                />
                {errors.address && (
                  <span className="mt-2 text-xs text-red-500">
                    {errors.address}
                  </span>
                )}
              </label>

              {/* 증상 */}
              <label className="grid">
                <span className="text-sm font-bold text-zinc-900">
                  증상 / 요청사항
                </span>
                <textarea
                  value={symptom}
                  onChange={(e) => setSymptom(e.target.value)}
                  rows={4}
                  placeholder="예) 싱크대 상부장이 떨어졌어요"
                  className={[
                    inputClass(!!errors.symptom),
                    "resize-none min-h-[120px]",
                  ].join(" ")}
                />
                {errors.symptom && (
                  <span className="mt-2 text-xs text-red-500">
                    {errors.symptom}
                  </span>
                )}
              </label>

              {/* 안내 카드들 */}
              <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
                <p className="text-sm font-semibold text-amber-900">
                  📎 사진은 문자 화면에서{" "}
                  <span className="font-black">첨부</span>로 보내주세요
                </p>
              </div>

              <div className="rounded-xl border border-[#2fae8a] bg-[#f0faf6] px-4 py-3">
                <p className="text-sm font-semibold text-zinc-900 leading-relaxed">
                  불필요한 교체를 권하지 않습니다.
                  <br />
                  <span className="font-normal text-zinc-600">
                    고칠 수 있으면 고치고, 안 되면 안 된다고 먼저 말합니다.
                  </span>
                </p>
              </div>

              <button
                type="submit"
                className="mt-1 rounded-xl bg-[#2fae8a] px-4 py-4 text-[16px] font-black text-white hover:opacity-95 active:opacity-90">
                📨 상담 문자 보내기
              </button>

              <p className="text-xs text-zinc-400">
                * PC에서는 문자 앱이 열리지 않을 수 있습니다. 모바일에서 진행을
                권장합니다.
              </p>
            </form>
          </section>
        </div>
      </div>

      {/* 완료 오버레이 */}
      {completed && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-[0_24px_60px_rgba(0,0,0,0.2)] text-center">
            <Image
              src="/images/surirang.png"
              alt="수리랑"
              width={200}
              height={200}
              className="mx-auto h-36 w-36 object-contain"
            />

            <div className="mt-3 flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#2fae8a] bg-[#f0faf6] px-3 py-1 text-xs font-bold text-[#2e9f83]">
                ✓ 접수 완료
              </span>
            </div>

            <h2 className="mt-3 text-lg font-black text-zinc-900">
              접수가 완료되었습니다
            </h2>
            <p className="mt-2 text-sm text-zinc-500">
              수리랑이 확인 중이에요 😊
            </p>
            <p className="mt-1 text-xs text-red-500">
              모바일이 아니라면 문자가 보내지지 않을 수 있어요.
            </p>

            <div className="mt-5 grid gap-2">
              <a
                href={YT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-zinc-900 px-4 py-3 text-sm font-black text-white">
                ▶ <span className="text-[#2fae8a]">YouTube</span> 수리담 영상
                보기
              </a>

              <a
                href={BLOG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-[#03C75A] px-4 py-3 text-sm font-black text-white">
                N 수리담 블로그 보기
              </a>

              <button
                type="button"
                onClick={() => setCompleted(false)}
                className="mt-1 rounded-xl border border-zinc-200 px-4 py-3 text-sm font-bold text-zinc-600">
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
