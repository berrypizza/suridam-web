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

export default function RequestPage() {
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

  if (isMobile === null) return null;

  // PC 차단 화면
  if (!isMobile) {
    return (
      <main
        className="min-h-screen flex items-center justify-center px-6 py-10"
        style={{ backgroundColor: "#1e1e1e" }}>
        <div
          className="mx-auto max-w-md rounded-2xl p-8 text-center"
          style={{ backgroundColor: "#2a2a2a", border: "1px solid #333" }}>
          <span
            className="inline-block text-xs tracking-widest uppercase mb-4 px-3 py-1 rounded-full font-semibold"
            style={{
              backgroundColor: "#2fae8a22",
              color: "#2fae8a",
              border: "1px solid #2fae8a55",
            }}>
            안내
          </span>
          <h1 className="text-xl font-bold mt-2" style={{ color: "white" }}>
            현재는 모바일 문자 상담만 지원합니다
          </h1>
          <p
            className="mt-3 text-sm leading-relaxed"
            style={{ color: "#7a7a7a" }}>
            이 페이지는 문자 앱을 열어 상담 내용을 전송하는 구조입니다.
            <br />
            PC 및 태블릿에서는 지원하지 않습니다.
            <br />
            휴대폰으로 다시 접속해 주세요.
          </p>
          <a
            href={`tel:${OWNER_PHONE}`}
            className="mt-6 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#2fae8a" }}>
            📞 010-9127-3024
          </a>
          <p className="mt-5 text-xs" style={{ color: "#555" }}>
            무조건 수리 가능하다고 말씀드리지는 않습니다.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen px-4 py-8 sm:py-12"
      style={{ backgroundColor: "#1e1e1e" }}>
      <div className="mx-auto max-w-5xl">
        {/* 페이지 헤더 */}
        <div className="mb-8">
          <span
            className="inline-block text-xs tracking-widest uppercase mb-3 px-3 py-1 rounded-full font-semibold"
            style={{
              backgroundColor: "#2fae8a22",
              color: "#2fae8a",
              border: "1px solid #2fae8a55",
            }}>
            상담 접수
          </span>
          <h1
            className="text-2xl md:text-3xl font-bold"
            style={{ color: "white" }}>
            사진 수리 상담
          </h1>
          <p className="mt-2 text-sm" style={{ color: "#7a7a7a" }}>
            정보 입력 후{" "}
            <span style={{ color: "#e5e5e5", fontWeight: 600 }}>
              상담 문자 보내기
            </span>
            를 누르면 문자 앱이 열립니다.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2 lg:items-start">
          {/* 좌측 — 소개 카드 */}
          <div
            className="rounded-2xl p-6"
            style={{ backgroundColor: "#2a2a2a", border: "1px solid #333" }}>
            <span
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold"
              style={{
                backgroundColor: "#2fae8a22",
                color: "#2fae8a",
                border: "1px solid #2fae8a55",
              }}>
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: "#2fae8a" }}
              />
              안 되는 건 안 된다고 먼저 말합니다
            </span>

            <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-5">
              <div className="flex-1">
                <h2
                  className="text-lg font-bold leading-snug"
                  style={{ color: "white" }}>
                  사진 1~3장으로
                  <br />
                  가능 여부부터 정리합니다
                </h2>
                <p
                  className="mt-3 text-sm leading-relaxed"
                  style={{ color: "#7a7a7a" }}>
                  무조건 된다고 말하지 않습니다. 사진을 보고 어려우면 먼저
                  말씀드립니다. 비용은 상태에 따라{" "}
                  <span style={{ color: "#e5e5e5", fontWeight: 600 }}>
                    범위
                  </span>
                  로 안내합니다.
                </p>

                {/* 신뢰 포인트 3개 */}
                <div className="mt-4 flex flex-col gap-2">
                  {[
                    "사진으로 1차 판단 후 방문",
                    "비용 범위 먼저 공유",
                    "수리 불가 시 출장비 없음",
                  ].map((t) => (
                    <div key={t} className="flex items-center gap-2">
                      <span
                        className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: "#2fae8a" }}
                      />
                      <span className="text-xs" style={{ color: "#7a7a7a" }}>
                        {t}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 캐릭터 이미지 */}
              <div className="flex justify-center sm:justify-end flex-shrink-0">
                <Image
                  src="/images/main-transparent.png"
                  alt="수리담 캐릭터"
                  width={320}
                  height={320}
                  priority
                  className="h-36 w-36 object-contain"
                />
              </div>
            </div>

            {/* 버튼 */}
            <div className="mt-5 flex gap-3">
              <a
                href={`tel:${OWNER_PHONE}`}
                className="flex-1 rounded-xl py-3 text-center text-sm font-bold transition-opacity hover:opacity-80"
                style={{
                  border: "1px solid #444",
                  color: "#e5e5e5",
                  backgroundColor: "#333",
                }}>
                📞 전화 문의
              </a>
              <a
                href={BLOG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-xl py-3 text-center text-sm font-bold transition-opacity hover:opacity-80"
                style={{
                  backgroundColor: "#03C75A22",
                  color: "#03C75A",
                  border: "1px solid #03C75A44",
                }}>
                N 블로그 보기
              </a>
            </div>
          </div>

          {/* 우측 — 폼 카드 */}
          <div
            className="rounded-2xl p-6"
            style={{ backgroundColor: "#2a2a2a", border: "1px solid #333" }}>
            {/* 단계 표시 */}
            <div
              className="grid grid-cols-3 rounded-xl overflow-hidden mb-6"
              style={{ border: "1px solid #333" }}>
              {steps.map((s, i) => (
                <div
                  key={s.num}
                  className="px-2 py-3 text-center"
                  style={{
                    backgroundColor: i === 0 ? "#2fae8a18" : "#242424",
                    borderLeft: i > 0 ? "1px solid #333" : "none",
                  }}>
                  <div
                    className="text-base font-bold leading-none"
                    style={{ color: i === 0 ? "#2fae8a" : "#444" }}>
                    {s.num}
                  </div>
                  <div
                    className="mt-1 text-[11px] leading-snug"
                    style={{ color: "#7a7a7a" }}>
                    {s.text}
                  </div>
                </div>
              ))}
            </div>

            {/* 폼 */}
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              {/* 이름 */}
              <label className="flex flex-col gap-1.5">
                <span
                  className="text-sm font-semibold"
                  style={{ color: "#e5e5e5" }}>
                  이름
                </span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="홍길동"
                  className="rounded-xl px-4 py-3 text-sm outline-none transition-all"
                  style={{
                    backgroundColor: errors.name ? "#3a2020" : "#1e1e1e",
                    border: `1px solid ${errors.name ? "#ef4444" : "#333"}`,
                    color: "#e5e5e5",
                  }}
                />
                {errors.name && (
                  <span className="text-xs" style={{ color: "#ef4444" }}>
                    {errors.name}
                  </span>
                )}
              </label>

              {/* 연락처 */}
              <label className="flex flex-col gap-1.5">
                <span
                  className="text-sm font-semibold"
                  style={{ color: "#e5e5e5" }}>
                  연락처
                </span>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="010-0000-0000"
                  className="rounded-xl px-4 py-3 text-sm outline-none transition-all"
                  style={{
                    backgroundColor: errors.customerPhone
                      ? "#3a2020"
                      : "#1e1e1e",
                    border: `1px solid ${errors.customerPhone ? "#ef4444" : "#333"}`,
                    color: "#e5e5e5",
                  }}
                />
                {errors.customerPhone && (
                  <span className="text-xs" style={{ color: "#ef4444" }}>
                    {errors.customerPhone}
                  </span>
                )}
              </label>

              {/* 지역 */}
              <label className="flex flex-col gap-1.5">
                <span
                  className="text-sm font-semibold"
                  style={{ color: "#e5e5e5" }}>
                  지역{" "}
                  <span style={{ color: "#555", fontWeight: 400 }}>
                    (동까지만)
                  </span>
                </span>
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="예) 인천 서구 ○○동"
                  className="rounded-xl px-4 py-3 text-sm outline-none transition-all"
                  style={{
                    backgroundColor: errors.address ? "#3a2020" : "#1e1e1e",
                    border: `1px solid ${errors.address ? "#ef4444" : "#333"}`,
                    color: "#e5e5e5",
                  }}
                />
                {errors.address && (
                  <span className="text-xs" style={{ color: "#ef4444" }}>
                    {errors.address}
                  </span>
                )}
              </label>

              {/* 증상 */}
              <label className="flex flex-col gap-1.5">
                <span
                  className="text-sm font-semibold"
                  style={{ color: "#e5e5e5" }}>
                  증상 / 요청사항
                </span>
                <textarea
                  value={symptom}
                  onChange={(e) => setSymptom(e.target.value)}
                  rows={4}
                  placeholder="예) 싱크대 상부장이 떨어졌어요"
                  className="rounded-xl px-4 py-3 text-sm outline-none transition-all resize-none"
                  style={{
                    backgroundColor: errors.symptom ? "#3a2020" : "#1e1e1e",
                    border: `1px solid ${errors.symptom ? "#ef4444" : "#333"}`,
                    color: "#e5e5e5",
                    minHeight: "110px",
                  }}
                />
                {errors.symptom && (
                  <span className="text-xs" style={{ color: "#ef4444" }}>
                    {errors.symptom}
                  </span>
                )}
              </label>

              {/* 사진 안내 */}
              <div
                className="rounded-xl px-4 py-3"
                style={{
                  backgroundColor: "#2fae8a18",
                  border: "1px solid #2fae8a55",
                }}>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "#2fae8a" }}>
                  📎 사진은 문자 화면에서 <strong>첨부</strong>로 보내주세요
                </p>
                <p className="mt-1 text-xs" style={{ color: "#7a7a7a" }}>
                  가구 전체 + 문제 부위 클로즈업 1~3장 권장
                </p>
              </div>

              {/* 제출 버튼 */}
              <button
                type="submit"
                className="mt-1 rounded-xl py-4 text-base font-bold text-white transition-opacity hover:opacity-90 active:opacity-80"
                style={{ backgroundColor: "#2fae8a" }}>
                📨 상담 문자 보내기
              </button>

              <p className="text-xs text-center" style={{ color: "#555" }}>
                * PC에서는 문자 앱이 열리지 않을 수 있습니다. 모바일 권장
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* 완료 오버레이 */}
      {completed && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.8)" }}>
          <div
            className="w-full max-w-sm rounded-2xl p-6 text-center"
            style={{ backgroundColor: "#2a2a2a", border: "1px solid #333" }}>
            <Image
              src="/images/main-transparent.png"
              alt="수리담 캐릭터"
              width={160}
              height={160}
              className="mx-auto h-32 w-32 object-contain"
            />

            <span
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold mt-3"
              style={{
                backgroundColor: "#2fae8a22",
                color: "#2fae8a",
                border: "1px solid #2fae8a55",
              }}>
              ✓ 접수 완료
            </span>

            <h2 className="mt-3 text-lg font-bold" style={{ color: "white" }}>
              접수가 완료되었습니다
            </h2>
            <p className="mt-1 text-sm" style={{ color: "#7a7a7a" }}>
              수리랑이 확인 중이에요 😊
            </p>
            <p className="mt-1 text-xs" style={{ color: "#ef4444" }}>
              모바일이 아니라면 문자가 보내지지 않을 수 있어요.
            </p>

            <div className="mt-5 flex flex-col gap-2">
              <a
                href={YT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: "#242424",
                  border: "1px solid #444",
                }}>
                ▶ <span style={{ color: "#2fae8a" }}>YouTube</span> 수리담 영상
                보기
              </a>
              <a
                href={BLOG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#03C75A" }}>
                N 수리담 블로그 보기
              </a>
              <button
                type="button"
                onClick={() => setCompleted(false)}
                className="mt-1 rounded-xl py-3 text-sm font-bold transition-opacity hover:opacity-70"
                style={{ border: "1px solid #333", color: "#7a7a7a" }}>
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
