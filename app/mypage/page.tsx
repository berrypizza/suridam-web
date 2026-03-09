"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";
import Link from "next/link";

type Job = {
  id: string;
  visit_date: string;
  visit_time: string | null;
  name: string;
  region: string;
  symptom: string;
  price: number;
  status: string;
  tech: string;
  memo: string;
};

const STATUS_COLOR: Record<
  string,
  { bg: string; color: string; label: string }
> = {
  대기: { bg: "#f59e0b22", color: "#f59e0b", label: "대기 중" },
  배정: { bg: "#60a5fa22", color: "#60a5fa", label: "기사 배정됨" },
  완료: { bg: "#2fae8a22", color: "#2fae8a", label: "수리 완료" },
  취소: { bg: "#ef444422", color: "#ef4444", label: "취소됨" },
};

function formatDate(d: string) {
  const [y, m, day] = d.split("-");
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const dow = days[new Date(d).getDay()];
  return `${y}년 ${Number(m)}월 ${Number(day)}일 (${dow})`;
}

function formatTime(t: string) {
  const [h, m] = t.split(":");
  const hh = Number(h);
  const ampm = hh < 12 ? "오전" : "오후";
  const h12 = hh === 0 ? 12 : hh > 12 ? hh - 12 : hh;
  return `${ampm} ${h12}:${m}`;
}

function formatPrice(p: number) {
  return p.toLocaleString("ko-KR") + "원";
}

export default function MyPage() {
  const [user, setUser] = useState<{
    id: string;
    name: string;
    avatar?: string;
    phone?: string;
  } | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [phoneInput, setPhoneInput] = useState("");
  const [phoneLinked, setPhoneLinked] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  useEffect(() => {
    const supabase = getSupabase();
    supabase.auth.getSession().then(async ({ data }) => {
      if (!data.session) {
        window.location.href = "/login";
        return;
      }
      const u = data.session.user;
      const phone = u.user_metadata?.phone_number || u.phone || "";
      const name =
        u.user_metadata?.name || u.user_metadata?.full_name || "회원";
      setUser({
        id: u.id,
        name,
        avatar: u.user_metadata?.avatar_url,
        phone,
      });

      if (phone) {
        await loadJobs(phone);
        setPhoneLinked(true);
      }
      setLoading(false);
    });
  }, []);

  const loadJobs = async (phone: string) => {
    const clean = phone.replace(/-/g, "");
    const { data } = await getSupabase()
      .from("jobs")
      .select(
        "id,visit_date,visit_time,name,region,symptom,price,status,tech,memo",
      )
      .eq("phone", clean)
      .order("visit_date", { ascending: false });
    setJobs(data || []);
  };

  const handleLinkPhone = async () => {
    const clean = phoneInput.replace(/-/g, "").trim();
    if (clean.length < 10) {
      setPhoneError("올바른 전화번호를 입력해주세요");
      return;
    }
    setPhoneError("");
    await loadJobs(clean);
    setPhoneLinked(true);
  };

  const handleLogout = async () => {
    await getSupabase().auth.signOut();
    window.location.href = "/";
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100dvh",
          backgroundColor: "#111",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <div
          style={{
            width: 32,
            height: 32,
            border: "3px solid #2fae8a",
            borderTopColor: "transparent",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const inputStyle = {
    width: "100%",
    backgroundColor: "#141414",
    border: "1px solid #2a2a2a",
    borderRadius: 12,
    padding: "12px 14px",
    color: "white",
    fontSize: 15,
    outline: "none",
    fontFamily: "inherit",
    boxSizing: "border-box" as const,
  };

  return (
    <div
      style={{
        minHeight: "100dvh",
        backgroundColor: "#111",
        fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif",
        paddingBottom: 80,
      }}>
      {/* 헤더 */}
      <div
        style={{
          backgroundColor: "#1a1a1a",
          borderBottom: "1px solid #222",
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        <Link
          href="/"
          style={{ color: "#555", textDecoration: "none", fontSize: 13 }}>
          ← 홈
        </Link>
        <span style={{ color: "white", fontSize: 15, fontWeight: 700 }}>
          내 수리 현황
        </span>
        <button
          onClick={handleLogout}
          style={{
            background: "none",
            border: "none",
            color: "#555",
            fontSize: 13,
            cursor: "pointer",
            fontFamily: "inherit",
          }}>
          로그아웃
        </button>
      </div>

      <div style={{ maxWidth: 480, margin: "0 auto", padding: "24px 20px" }}>
        {/* 프로필 카드 */}
        <div
          style={{
            backgroundColor: "#1a1a1a",
            borderRadius: 20,
            padding: "20px",
            border: "1px solid #222",
            marginBottom: 24,
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}>
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt="프로필"
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          ) : (
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                backgroundColor: "#2fae8a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                color: "white",
                fontWeight: 700,
                flexShrink: 0,
              }}>
              {user?.name?.charAt(0)}
            </div>
          )}
          <div>
            <div style={{ fontSize: 17, fontWeight: 700, color: "white" }}>
              {user?.name}님
            </div>
            <div style={{ fontSize: 12, color: "#555", marginTop: 2 }}>
              카카오 로그인
            </div>
          </div>
        </div>

        {/* 전화번호 연결 */}
        {!phoneLinked ? (
          <div
            style={{
              backgroundColor: "#1a1a1a",
              borderRadius: 20,
              padding: "20px",
              border: "1px solid #222",
              marginBottom: 24,
            }}>
            <div
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "white",
                marginBottom: 6,
              }}>
              수리 내역 불러오기
            </div>
            <div
              style={{
                fontSize: 13,
                color: "#666",
                marginBottom: 16,
                lineHeight: 1.6,
              }}>
              접수 시 입력한 연락처를 입력하면
              <br />내 수리 내역을 확인할 수 있어요
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                type="tel"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                placeholder="010-0000-0000"
                style={{ ...inputStyle, flex: 1 }}
              />
              <button
                onClick={handleLinkPhone}
                style={{
                  backgroundColor: "#2fae8a",
                  color: "white",
                  border: "none",
                  borderRadius: 12,
                  padding: "0 16px",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  flexShrink: 0,
                }}>
                확인
              </button>
            </div>
            {phoneError && (
              <div style={{ fontSize: 12, color: "#ef4444", marginTop: 8 }}>
                {phoneError}
              </div>
            )}
          </div>
        ) : null}

        {/* 수리 내역 */}
        {phoneLinked && (
          <div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "white",
                marginBottom: 14,
              }}>
              수리 내역
              <span
                style={{
                  fontSize: 13,
                  color: "#555",
                  fontWeight: 400,
                  marginLeft: 8,
                }}>
                {jobs.length}건
              </span>
            </div>

            {jobs.length === 0 ? (
              <div
                style={{
                  backgroundColor: "#1a1a1a",
                  borderRadius: 20,
                  padding: "40px 20px",
                  border: "1px solid #222",
                  textAlign: "center",
                }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>🪑</div>
                <div style={{ fontSize: 14, color: "#555", marginBottom: 20 }}>
                  아직 수리 내역이 없어요
                </div>
                <Link
                  href="/request"
                  style={{
                    display: "inline-block",
                    backgroundColor: "#2fae8a",
                    color: "white",
                    textDecoration: "none",
                    borderRadius: 12,
                    padding: "12px 24px",
                    fontSize: 14,
                    fontWeight: 700,
                  }}>
                  수리 접수하기
                </Link>
              </div>
            ) : (
              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {jobs.map((job) => {
                  const st = STATUS_COLOR[job.status] || STATUS_COLOR["대기"];
                  return (
                    <div
                      key={job.id}
                      style={{
                        backgroundColor: "#1a1a1a",
                        borderRadius: 20,
                        padding: "18px",
                        border: "1px solid #222",
                      }}>
                      {/* 상태 + 날짜 */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: 12,
                        }}>
                        <span
                          style={{
                            fontSize: 12,
                            fontWeight: 700,
                            backgroundColor: st.bg,
                            color: st.color,
                            borderRadius: 20,
                            padding: "4px 10px",
                          }}>
                          {st.label}
                        </span>
                        <span style={{ fontSize: 12, color: "#555" }}>
                          {formatDate(job.visit_date)}
                          {job.visit_time
                            ? " " + formatTime(job.visit_time)
                            : ""}
                        </span>
                      </div>

                      {/* 내용 */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 4,
                        }}>
                        <div
                          style={{
                            display: "flex",
                            gap: 8,
                            alignItems: "center",
                          }}>
                          <span
                            style={{
                              fontSize: 14,
                              fontWeight: 700,
                              color: "white",
                            }}>
                            {job.region}
                          </span>
                          <span style={{ fontSize: 13, color: "#666" }}>
                            {job.symptom}
                          </span>
                        </div>
                        {job.price > 0 && (
                          <div
                            style={{
                              fontSize: 15,
                              fontWeight: 700,
                              color: "#2fae8a",
                            }}>
                            {formatPrice(job.price)}
                          </div>
                        )}
                        {job.tech && (
                          <div style={{ fontSize: 12, color: "#555" }}>
                            담당 기사: {job.tech}
                          </div>
                        )}
                        {job.memo && (
                          <div
                            style={{
                              fontSize: 12,
                              color: "#555",
                              marginTop: 4,
                              padding: "8px 10px",
                              backgroundColor: "#141414",
                              borderRadius: 8,
                            }}>
                            💬 {job.memo}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* 추가 접수 버튼 */}
            <div style={{ marginTop: 20, textAlign: "center" }}>
              <Link
                href="/request"
                style={{
                  display: "inline-block",
                  backgroundColor: "#1a1a1a",
                  color: "#2fae8a",
                  textDecoration: "none",
                  borderRadius: 12,
                  padding: "12px 24px",
                  fontSize: 14,
                  fontWeight: 700,
                  border: "1px solid #2fae8a44",
                }}>
                + 새 수리 접수하기
              </Link>
            </div>
          </div>
        )}
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
