export const dynamic = "force-dynamic";

("use client");

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

type Status = "대기" | "배정" | "완료" | "취소";
type Tech = "" | "기사1" | "기사2";

interface Job {
  id: string;
  created_at: string;
  visit_date: string;
  visit_time: string;
  name: string;
  phone: string;
  region: string;
  symptom: string;
  price: number;
  status: Status;
  tech: Tech;
  memo: string;
  review_requested: boolean;
}

const TECHS: Tech[] = ["기사1", "기사2"];
const STATUSES: Status[] = ["대기", "배정", "완료", "취소"];

const STATUS_STYLE: Record<
  Status,
  { bg: string; color: string; border: string }
> = {
  대기: { bg: "#2a2a2a", color: "#7a7a7a", border: "#333" },
  배정: { bg: "#2fae8a22", color: "#2fae8a", border: "#2fae8a55" },
  완료: { bg: "#1a3a2a", color: "#4ade80", border: "#2fae8a44" },
  취소: { bg: "#3a202022", color: "#ef4444", border: "#ef444433" },
};

const STATUS_DOT: Record<Status, string> = {
  대기: "#7a7a7a",
  배정: "#2fae8a",
  완료: "#4ade80",
  취소: "#ef4444",
};

function today() {
  return new Date().toISOString().slice(0, 10);
}
function thisYearMonth() {
  return new Date().toISOString().slice(0, 7);
}
function formatDate(d: string) {
  if (!d) return "-";
  const [, m, day] = d.split("-");
  return `${parseInt(m)}/${parseInt(day)}`;
}
function formatYearMonth(ym: string) {
  const [y, m] = ym.split("-");
  return `${y}년 ${parseInt(m)}월`;
}
function formatTime(t: string) {
  if (!t) return "";
  const [h] = t.split(":");
  const hour = parseInt(h);
  const ampm = hour < 12 ? "AM" : "PM";
  const h12 = hour % 12 || 12;
  return `${ampm} ${h12}시`;
}
function formatPrice(p: number) {
  return p >= 10000
    ? `${Math.round(p / 10000)}만원`
    : `${p.toLocaleString()}원`;
}
function reviewSms(job: Job) {
  return encodeURIComponent(
    `안녕하세요 ${job.name}님, 수리담입니다 😊\n지난번 가구 수리 잘 쓰고 계신가요?\n\n네이버 지도에 후기 남겨주시면 정말 큰 힘이 됩니다.\nhttps://naver.me/XXXXXXXX\n\n감사합니다 🙏`,
  );
}

const emptyForm = () => ({
  visit_date: today(),
  visit_time: "",
  name: "",
  phone: "",
  region: "",
  symptom: "",
  price: 0,
  status: "대기" as Status,
  tech: "" as Tech,
  memo: "",
});

function getCalendarDays(year: number, month: number) {
  const first = new Date(year, month, 1).getDay();
  const last = new Date(year, month + 1, 0).getDate();
  const days: (number | null)[] = Array(first).fill(null);
  for (let d = 1; d <= last; d++) days.push(d);
  while (days.length % 7 !== 0) days.push(null);
  return days;
}
function pad(n: number) {
  return String(n).padStart(2, "0");
}

// 월 목록 생성 (jobs 데이터에서)
function getMonthOptions(jobs: Job[]) {
  const set = new Set<string>();
  jobs.forEach((j) => {
    if (j.visit_date) set.add(j.visit_date.slice(0, 7));
  });
  const cur = thisYearMonth();
  set.add(cur);
  return Array.from(set).sort().reverse();
}

export default function AdminDashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"오늘" | "전체" | "달력" | "통계">("달력");
  const [statusFilter, setStatusFilter] = useState<Status | "전체">("전체");
  const [techFilter, setTechFilter] = useState<Tech | "전체">("전체");
  const [dateFilter, setDateFilter] = useState(today());
  const [monthFilter, setMonthFilter] = useState(thisYearMonth());
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm());
  const [saving, setSaving] = useState(false);
  const [calYear, setCalYear] = useState(new Date().getFullYear());
  const [calMonth, setCalMonth] = useState(new Date().getMonth());
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const load = useCallback(async () => {
    const { data } = await getSupabase()
      .from("jobs")
      .select("*")
      .order("visit_date", { ascending: true })
      .order("visit_time", { ascending: true });
    setJobs(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    const supabase = getSupabase();
    const channel = supabase
      .channel("jobs_realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "jobs" },
        () => load(),
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [load]);

  const save = async () => {
    if (!form.name.trim() || !form.region.trim() || !form.symptom.trim())
      return;
    setSaving(true);
    if (editId) {
      await getSupabase().from("jobs").update(form).eq("id", editId);
    } else {
      await getSupabase().from("jobs").insert(form);
    }
    setSaving(false);
    setShowForm(false);
    setEditId(null);
    setForm(emptyForm());
  };

  const update = async (id: string, patch: Partial<Job>) => {
    await getSupabase().from("jobs").update(patch).eq("id", id);
  };

  const remove = async (id: string) => {
    if (!confirm("삭제할까요?")) return;
    await getSupabase().from("jobs").delete().eq("id", id);
  };

  const startEdit = (job: Job) => {
    setForm({
      visit_date: job.visit_date,
      visit_time: job.visit_time || "",
      name: job.name,
      phone: job.phone,
      region: job.region,
      symptom: job.symptom,
      price: job.price,
      status: job.status,
      tech: job.tech,
      memo: job.memo,
    });
    setEditId(job.id);
    setShowForm(true);
  };

  const monthOptions = getMonthOptions(jobs);

  // 전체 탭 필터 (월 + 상태 + 기사)
  const filtered = jobs.filter((j) => {
    if (tab === "오늘" && j.visit_date !== dateFilter) return false;
    if (tab === "전체" && !j.visit_date?.startsWith(monthFilter)) return false;
    if (statusFilter !== "전체" && j.status !== statusFilter) return false;
    if (techFilter !== "전체" && j.tech !== techFilter) return false;
    return true;
  });

  // 통계 탭 (선택 월 기준)
  const monthJobs = jobs.filter((j) => j.visit_date?.startsWith(monthFilter));
  const doneMonth = monthJobs.filter((j) => j.status === "완료");
  const revenue = doneMonth.reduce((s, j) => s + (j.price || 0), 0);
  const reviewPending = jobs.filter(
    (j) => j.status === "완료" && !j.review_requested && j.phone,
  );

  const inputStyle: React.CSSProperties = {
    backgroundColor: "#1e1e1e",
    border: "1px solid #333",
    color: "#e5e5e5",
    borderRadius: 10,
    padding: "8px 12px",
    fontSize: 13,
    outline: "none",
    width: "100%",
  };

  const calDays = getCalendarDays(calYear, calMonth);
  const jobsByDate: Record<string, Job[]> = {};
  jobs.forEach((j) => {
    if (!jobsByDate[j.visit_date]) jobsByDate[j.visit_date] = [];
    jobsByDate[j.visit_date].push(j);
  });
  const selectedJobs = selectedDay ? (jobsByDate[selectedDay] ?? []) : [];
  const todayStr = today();

  // 월 선택 UI
  const MonthSelector = () => (
    <div className="flex items-center gap-2 mb-4">
      <button
        onClick={() => {
          const d = new Date(monthFilter + "-01");
          d.setMonth(d.getMonth() - 1);
          setMonthFilter(d.toISOString().slice(0, 7));
        }}
        className="px-3 py-1.5 rounded-lg text-sm"
        style={{
          backgroundColor: "#1e1e1e",
          color: "#e5e5e5",
          border: "1px solid #2a2a2a",
        }}>
        ‹
      </button>
      <select
        value={monthFilter}
        onChange={(e) => setMonthFilter(e.target.value)}
        className="flex-1 text-center text-sm font-bold rounded-xl py-1.5"
        style={{
          backgroundColor: "#1e1e1e",
          color: "white",
          border: "1px solid #2a2a2a",
          outline: "none",
        }}>
        {monthOptions.map((m) => (
          <option key={m} value={m}>
            {formatYearMonth(m)}
          </option>
        ))}
      </select>
      <button
        onClick={() => {
          const d = new Date(monthFilter + "-01");
          d.setMonth(d.getMonth() + 1);
          setMonthFilter(d.toISOString().slice(0, 7));
        }}
        className="px-3 py-1.5 rounded-lg text-sm"
        style={{
          backgroundColor: "#1e1e1e",
          color: "#e5e5e5",
          border: "1px solid #2a2a2a",
        }}>
        ›
      </button>
    </div>
  );

  return (
    <main
      className="min-h-screen px-3 py-5"
      style={{ backgroundColor: "#141414", color: "#e5e5e5" }}>
      <div className="mx-auto max-w-3xl">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-xl font-bold" style={{ color: "white" }}>
              수리담 관리
            </h1>
            <p
              className="text-xs mt-0.5 flex items-center gap-1.5"
              style={{ color: "#555" }}>
              <span
                className="h-1.5 w-1.5 rounded-full inline-block"
                style={{ backgroundColor: "#2fae8a" }}
              />
              실시간 동기화 · 기사 2명 공유
            </p>
          </div>
          <button
            onClick={() => {
              setForm(emptyForm());
              setEditId(null);
              setShowForm(true);
            }}
            className="rounded-xl px-4 py-2.5 text-sm font-bold text-white"
            style={{ backgroundColor: "#2fae8a" }}>
            + 접수
          </button>
        </div>

        {/* 탭 */}
        <div
          className="flex gap-1 mb-5 rounded-xl p-1"
          style={{ backgroundColor: "#1e1e1e" }}>
          {(["달력", "오늘", "전체", "통계"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="flex-1 rounded-lg py-2 text-sm font-semibold transition-all"
              style={{
                backgroundColor: tab === t ? "#2fae8a" : "transparent",
                color: tab === t ? "white" : "#555",
              }}>
              {t}
              {t === "통계" && reviewPending.length > 0 && (
                <span
                  className="ml-1 text-xs px-1.5 py-0.5 rounded-full"
                  style={{ backgroundColor: "#ef4444", color: "white" }}>
                  {reviewPending.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {loading && (
          <div className="text-center py-20" style={{ color: "#555" }}>
            불러오는 중...
          </div>
        )}

        {/* ── 달력 탭 ── */}
        {!loading && tab === "달력" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => {
                  const d = new Date(calYear, calMonth - 1);
                  setCalYear(d.getFullYear());
                  setCalMonth(d.getMonth());
                  setSelectedDay(null);
                }}
                className="px-3 py-1.5 rounded-lg text-sm"
                style={{ backgroundColor: "#1e1e1e", color: "#e5e5e5" }}>
                ‹
              </button>
              <span className="text-base font-bold" style={{ color: "white" }}>
                {calYear}년 {calMonth + 1}월
              </span>
              <button
                onClick={() => {
                  const d = new Date(calYear, calMonth + 1);
                  setCalYear(d.getFullYear());
                  setCalMonth(d.getMonth());
                  setSelectedDay(null);
                }}
                className="px-3 py-1.5 rounded-lg text-sm"
                style={{ backgroundColor: "#1e1e1e", color: "#e5e5e5" }}>
                ›
              </button>
            </div>

            <div className="grid grid-cols-7 mb-1">
              {["일", "월", "화", "수", "목", "금", "토"].map((d, i) => (
                <div
                  key={d}
                  className="text-center text-xs py-1 font-semibold"
                  style={{
                    color: i === 0 ? "#ef4444" : i === 6 ? "#60a5fa" : "#555",
                  }}>
                  {d}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-0.5">
              {calDays.map((day, i) => {
                if (!day) return <div key={`e-${i}`} />;
                const dateStr = `${calYear}-${pad(calMonth + 1)}-${pad(day)}`;
                const dayJobs = jobsByDate[dateStr] ?? [];
                const isToday = dateStr === todayStr;
                const isSelected = dateStr === selectedDay;
                const dow = i % 7;
                return (
                  <button
                    key={dateStr}
                    onClick={() => setSelectedDay(isSelected ? null : dateStr)}
                    className="rounded-xl p-1.5 min-h-[72px] flex flex-col items-start text-left"
                    style={{
                      backgroundColor: isSelected ? "#2fae8a22" : "#1a1a1a",
                      border: isSelected
                        ? "1px solid #2fae8a"
                        : isToday
                          ? "1px solid #2fae8a55"
                          : "1px solid #222",
                    }}>
                    <span
                      className="text-xs font-bold mb-1 w-5 h-5 flex items-center justify-center rounded-full"
                      style={{
                        color:
                          dow === 0
                            ? "#ef4444"
                            : dow === 6
                              ? "#60a5fa"
                              : "#e5e5e5",
                        backgroundColor: isToday ? "#2fae8a" : "transparent",
                      }}>
                      {day}
                    </span>
                    <div className="flex flex-col gap-0.5 w-full">
                      {dayJobs.slice(0, 3).map((j) => (
                        <div
                          key={j.id}
                          className="flex items-center gap-1 w-full overflow-hidden">
                          <span
                            className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: STATUS_DOT[j.status] }}
                          />
                          <span
                            className="truncate"
                            style={{ color: "#aaa", fontSize: 10 }}>
                            {j.visit_time ? formatTime(j.visit_time) + " " : ""}
                            {j.name}
                          </span>
                        </div>
                      ))}
                      {dayJobs.length > 3 && (
                        <span style={{ color: "#555", fontSize: 10 }}>
                          +{dayJobs.length - 3}건
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {selectedDay && (
              <div
                className="mt-4 rounded-2xl p-4"
                style={{
                  backgroundColor: "#1e1e1e",
                  border: "1px solid #2a2a2a",
                }}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold" style={{ color: "white" }}>
                    {formatDate(selectedDay)} 일정 ({selectedJobs.length}건)
                  </h3>
                  <button
                    onClick={() => {
                      setForm({ ...emptyForm(), visit_date: selectedDay });
                      setEditId(null);
                      setShowForm(true);
                    }}
                    className="text-xs px-2.5 py-1 rounded-lg"
                    style={{ backgroundColor: "#2fae8a", color: "white" }}>
                    + 추가
                  </button>
                </div>
                {selectedJobs.length === 0 ? (
                  <p
                    className="text-sm text-center py-4"
                    style={{ color: "#333" }}>
                    일정 없음
                  </p>
                ) : (
                  <div className="flex flex-col gap-2">
                    {[...selectedJobs]
                      .sort((a, b) =>
                        (a.visit_time || "").localeCompare(b.visit_time || ""),
                      )
                      .map((job) => (
                        <div
                          key={job.id}
                          className="flex items-start gap-3 p-3 rounded-xl"
                          style={{ backgroundColor: "#252525" }}>
                          <div
                            className="flex-shrink-0 text-xs font-bold pt-0.5"
                            style={{ color: "#2fae8a", minWidth: 44 }}>
                            {job.visit_time
                              ? formatTime(job.visit_time)
                              : "미정"}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <select
                                value={job.status}
                                onChange={(e) =>
                                  update(job.id, {
                                    status: e.target.value as Status,
                                  })
                                }
                                className="text-xs font-semibold rounded-full px-2 py-0.5 border cursor-pointer"
                                style={{
                                  ...STATUS_STYLE[job.status],
                                  outline: "none",
                                }}>
                                {STATUSES.map((s) => (
                                  <option key={s} value={s}>
                                    {s}
                                  </option>
                                ))}
                              </select>
                              <select
                                value={job.tech}
                                onChange={(e) =>
                                  update(job.id, {
                                    tech: e.target.value as Tech,
                                  })
                                }
                                className="text-xs rounded-full px-2 py-0.5 border cursor-pointer"
                                style={{
                                  backgroundColor: "#2a2a2a",
                                  border: "1px solid #333",
                                  color: job.tech ? "#e5e5e5" : "#555",
                                  outline: "none",
                                }}>
                                <option value="">미배정</option>
                                {TECHS.filter(Boolean).map((t) => (
                                  <option key={t} value={t}>
                                    {t}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                              <span
                                className="text-sm font-bold"
                                style={{ color: "white" }}>
                                {job.name}
                              </span>
                              <span
                                className="text-xs"
                                style={{ color: "#555" }}>
                                {job.region}
                              </span>
                              <span
                                className="text-xs truncate"
                                style={{ color: "#7a7a7a" }}>
                                {job.symptom}
                              </span>
                            </div>
                            {job.price > 0 && (
                              <span
                                className="text-xs font-bold mt-1 inline-block"
                                style={{ color: "#2fae8a" }}>
                                {formatPrice(job.price)}
                              </span>
                            )}
                          </div>
                          <div className="flex gap-1 flex-shrink-0">
                            {job.phone && (
                              <a
                                href={`tel:${job.phone}`}
                                className="text-xs px-2 py-1 rounded-lg"
                                style={{
                                  backgroundColor: "#2a2a2a",
                                  color: "#e5e5e5",
                                }}>
                                📞
                              </a>
                            )}
                            <button
                              onClick={() => startEdit(job)}
                              className="text-xs px-2 py-1 rounded-lg"
                              style={{
                                backgroundColor: "#2a2a2a",
                                color: "#7a7a7a",
                              }}>
                              수정
                            </button>
                            <button
                              onClick={() => remove(job.id)}
                              className="text-xs px-2 py-1 rounded-lg"
                              style={{
                                backgroundColor: "#3a2020",
                                color: "#ef4444",
                              }}>
                              삭제
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── 통계 탭 ── */}
        {!loading && tab === "통계" && (
          <div className="flex flex-col gap-4">
            <MonthSelector />
            <div className="grid grid-cols-2 gap-3">
              <div
                className="rounded-2xl p-5"
                style={{
                  backgroundColor: "#1e1e1e",
                  border: "1px solid #2a2a2a",
                }}>
                <p className="text-xs mb-1" style={{ color: "#555" }}>
                  {formatYearMonth(monthFilter)} 매출
                </p>
                <p className="text-2xl font-bold" style={{ color: "white" }}>
                  {formatPrice(revenue)}
                </p>
              </div>
              <div
                className="rounded-2xl p-5"
                style={{
                  backgroundColor: "#1e1e1e",
                  border: "1px solid #2a2a2a",
                }}>
                <p className="text-xs mb-1" style={{ color: "#555" }}>
                  {formatYearMonth(monthFilter)} 완료
                </p>
                <p className="text-2xl font-bold" style={{ color: "white" }}>
                  {doneMonth.length}
                  <span className="text-base ml-1" style={{ color: "#7a7a7a" }}>
                    건
                  </span>
                </p>
              </div>
            </div>
            {TECHS.map((tech) => {
              const techJobs = doneMonth.filter((j) => j.tech === tech);
              const techRevenue = techJobs.reduce(
                (s, j) => s + (j.price || 0),
                0,
              );
              return (
                <div
                  key={tech}
                  className="rounded-2xl p-5"
                  style={{
                    backgroundColor: "#1e1e1e",
                    border: "1px solid #2a2a2a",
                  }}>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-sm font-bold"
                      style={{ color: "white" }}>
                      {tech}
                    </span>
                    <span
                      className="text-xs px-2 py-1 rounded-full"
                      style={{
                        backgroundColor: "#2fae8a22",
                        color: "#2fae8a",
                      }}>
                      {techJobs.length}건
                    </span>
                  </div>
                  <div
                    className="text-xl font-bold mb-3"
                    style={{ color: "#2fae8a" }}>
                    {formatPrice(techRevenue)}
                  </div>
                  <div
                    className="h-1.5 rounded-full overflow-hidden"
                    style={{ backgroundColor: "#2a2a2a" }}>
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${revenue > 0 ? (techRevenue / revenue) * 100 : 0}%`,
                        backgroundColor: "#2fae8a",
                      }}
                    />
                  </div>
                </div>
              );
            })}
            <div
              className="rounded-2xl p-5"
              style={{
                backgroundColor: "#1e1e1e",
                border: "1px solid #2a2a2a",
              }}>
              <p
                className="text-sm font-bold mb-3 flex items-center gap-2"
                style={{ color: "white" }}>
                📝 리뷰 요청 안 한 건
                {reviewPending.length > 0 && (
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: "#ef4444", color: "white" }}>
                    {reviewPending.length}건
                  </span>
                )}
              </p>
              {reviewPending.length === 0 ? (
                <p className="text-xs" style={{ color: "#555" }}>
                  모두 요청 완료! 👍
                </p>
              ) : (
                reviewPending.map((job) => (
                  <div
                    key={job.id}
                    className="flex items-center justify-between py-2.5"
                    style={{ borderBottom: "1px solid #222" }}>
                    <div>
                      <span
                        className="text-sm font-medium"
                        style={{ color: "#e5e5e5" }}>
                        {job.name}
                      </span>
                      <span className="text-xs ml-2" style={{ color: "#555" }}>
                        {job.region} · {formatDate(job.visit_date)}
                      </span>
                    </div>
                    <a
                      href={`sms:${job.phone}?&body=${reviewSms(job)}`}
                      onClick={() => update(job.id, { review_requested: true })}
                      className="text-xs px-3 py-1.5 rounded-full font-semibold"
                      style={{
                        backgroundColor: "#03C75A22",
                        color: "#03C75A",
                        border: "1px solid #03C75A44",
                      }}>
                      문자 보내기
                    </a>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ── 오늘 / 전체 탭 ── */}
        {!loading && (tab === "오늘" || tab === "전체") && (
          <>
            {tab === "전체" && <MonthSelector />}
            {tab === "오늘" && (
              <div className="mb-4">
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  style={{ ...inputStyle, width: "auto", padding: "6px 10px" }}
                />
              </div>
            )}
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="flex flex-wrap gap-1">
                {(["전체", ...STATUSES] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s as Status | "전체")}
                    className="rounded-full px-3 py-1.5 text-xs font-semibold"
                    style={{
                      backgroundColor:
                        statusFilter === s ? "#2fae8a" : "#1e1e1e",
                      color: statusFilter === s ? "white" : "#555",
                      border: "1px solid #2a2a2a",
                    }}>
                    {s}
                  </button>
                ))}
              </div>
              <div className="flex gap-1">
                {(["전체", ...TECHS.filter(Boolean)] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTechFilter(t as Tech | "전체")}
                    className="rounded-full px-3 py-1.5 text-xs font-semibold"
                    style={{
                      backgroundColor:
                        techFilter === t ? "#2a2a2a" : "transparent",
                      color: techFilter === t ? "#e5e5e5" : "#555",
                      border: "1px solid #2a2a2a",
                    }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-3 mb-4 text-xs" style={{ color: "#555" }}>
              <span>{filtered.length}건</span>
              <span>·</span>
              <span style={{ color: "#2fae8a" }}>
                완료 {filtered.filter((j) => j.status === "완료").length}건
              </span>
              <span>·</span>
              <span>
                {formatPrice(
                  filtered
                    .filter((j) => j.status === "완료")
                    .reduce((s, j) => s + (j.price || 0), 0),
                )}
              </span>
            </div>
            {filtered.length === 0 ? (
              <div className="text-center py-16" style={{ color: "#333" }}>
                <p className="text-4xl mb-3">📋</p>
                <p className="text-sm">접수된 작업이 없어요</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {filtered.map((job) => (
                  <div
                    key={job.id}
                    className="rounded-2xl p-4"
                    style={{
                      backgroundColor: "#1e1e1e",
                      border: "1px solid #2a2a2a",
                    }}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <select
                            value={job.status}
                            onChange={(e) =>
                              update(job.id, {
                                status: e.target.value as Status,
                              })
                            }
                            className="text-xs font-semibold rounded-full px-2 py-0.5 border cursor-pointer"
                            style={{
                              ...STATUS_STYLE[job.status],
                              outline: "none",
                            }}>
                            {STATUSES.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                          <span className="text-xs" style={{ color: "#555" }}>
                            {formatDate(job.visit_date)}
                            {job.visit_time
                              ? ` ${formatTime(job.visit_time)}`
                              : ""}
                          </span>
                          <select
                            value={job.tech}
                            onChange={(e) =>
                              update(job.id, { tech: e.target.value as Tech })
                            }
                            className="text-xs rounded-full px-2 py-0.5 border cursor-pointer"
                            style={{
                              backgroundColor: "#2a2a2a",
                              border: "1px solid #333",
                              color: job.tech ? "#e5e5e5" : "#555",
                              outline: "none",
                            }}>
                            <option value="">미배정</option>
                            {TECHS.filter(Boolean).map((t) => (
                              <option key={t} value={t}>
                                {t}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className="text-sm font-bold"
                            style={{ color: "white" }}>
                            {job.name}
                          </span>
                          <span className="text-xs" style={{ color: "#555" }}>
                            {job.region}
                          </span>
                          <span
                            className="text-xs"
                            style={{ color: "#7a7a7a" }}>
                            {job.symptom}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 mt-1.5">
                          {job.price > 0 && (
                            <span
                              className="text-sm font-bold"
                              style={{ color: "#2fae8a" }}>
                              {formatPrice(job.price)}
                            </span>
                          )}
                          {job.memo && (
                            <span
                              className="text-xs"
                              style={{ color: "#7a7a7a" }}>
                              💬 {job.memo}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-1.5 flex-shrink-0">
                        {job.phone && (
                          <a
                            href={`tel:${job.phone}`}
                            className="text-xs px-2.5 py-1.5 rounded-lg text-center"
                            style={{
                              backgroundColor: "#2a2a2a",
                              color: "#e5e5e5",
                              border: "1px solid #333",
                            }}>
                            📞
                          </a>
                        )}
                        <button
                          onClick={() => startEdit(job)}
                          className="text-xs px-2.5 py-1.5 rounded-lg"
                          style={{
                            backgroundColor: "#2a2a2a",
                            color: "#7a7a7a",
                            border: "1px solid #333",
                          }}>
                          수정
                        </button>
                        <button
                          onClick={() => remove(job.id)}
                          className="text-xs px-2.5 py-1.5 rounded-lg"
                          style={{
                            backgroundColor: "#3a2020",
                            color: "#ef4444",
                            border: "1px solid #ef444433",
                          }}>
                          삭제
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* 접수 폼 모달 */}
      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.85)" }}>
          <div
            className="w-full max-w-md rounded-2xl p-5 flex flex-col gap-3"
            style={{
              backgroundColor: "#1e1e1e",
              border: "1px solid #333",
              maxHeight: "90vh",
              overflowY: "auto",
            }}>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-base font-bold" style={{ color: "white" }}>
                {editId ? "수정" : "새 접수"}
              </h3>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditId(null);
                }}
                style={{ color: "#555" }}>
                ✕
              </button>
            </div>

            {(
              [
                { label: "이름 *", key: "name", placeholder: "홍길동" },
                { label: "연락처", key: "phone", placeholder: "010-0000-0000" },
                {
                  label: "지역 *",
                  key: "region",
                  placeholder: "인천 서구 ○○동",
                },
                {
                  label: "증상 *",
                  key: "symptom",
                  placeholder: "싱크대 상부장 처짐",
                },
              ] as const
            ).map((f) => (
              <label key={f.key} className="flex flex-col gap-1">
                <span
                  className="text-xs font-semibold"
                  style={{ color: "#7a7a7a" }}>
                  {f.label}
                </span>
                <input
                  value={form[f.key]}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, [f.key]: e.target.value }))
                  }
                  placeholder={f.placeholder}
                  style={inputStyle}
                />
              </label>
            ))}

            <div className="grid grid-cols-2 gap-3">
              <label className="flex flex-col gap-1">
                <span
                  className="text-xs font-semibold"
                  style={{ color: "#7a7a7a" }}>
                  방문일
                </span>
                <input
                  type="date"
                  value={form.visit_date}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, visit_date: e.target.value }))
                  }
                  style={inputStyle}
                />
              </label>
              <label className="flex flex-col gap-1">
                <span
                  className="text-xs font-semibold"
                  style={{ color: "#7a7a7a" }}>
                  도착 시간
                </span>
                <input
                  type="time"
                  value={form.visit_time}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, visit_time: e.target.value }))
                  }
                  style={inputStyle}
                />
              </label>
            </div>

            <label className="flex flex-col gap-1">
              <span
                className="text-xs font-semibold"
                style={{ color: "#7a7a7a" }}>
                금액 (원)
              </span>
              <input
                type="number"
                value={form.price || ""}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    price: parseInt(e.target.value) || 0,
                  }))
                }
                placeholder="150000"
                style={inputStyle}
              />
            </label>

            <div className="grid grid-cols-2 gap-3">
              <label className="flex flex-col gap-1">
                <span
                  className="text-xs font-semibold"
                  style={{ color: "#7a7a7a" }}>
                  기사
                </span>
                <select
                  value={form.tech}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, tech: e.target.value as Tech }))
                  }
                  style={inputStyle}>
                  <option value="">미배정</option>
                  {TECHS.filter(Boolean).map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-1">
                <span
                  className="text-xs font-semibold"
                  style={{ color: "#7a7a7a" }}>
                  상태
                </span>
                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, status: e.target.value as Status }))
                  }
                  style={inputStyle}>
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="flex flex-col gap-1">
              <span
                className="text-xs font-semibold"
                style={{ color: "#7a7a7a" }}>
                메모
              </span>
              <textarea
                value={form.memo}
                onChange={(e) =>
                  setForm((p) => ({ ...p, memo: e.target.value }))
                }
                placeholder="특이사항, 요청사항..."
                rows={2}
                style={{ ...inputStyle, resize: "none" }}
              />
            </label>

            <button
              onClick={save}
              disabled={saving}
              className="mt-1 rounded-xl py-3.5 text-sm font-bold text-white"
              style={{ backgroundColor: "#2fae8a", opacity: saving ? 0.7 : 1 }}>
              {saving ? "저장 중..." : editId ? "수정 완료" : "접수 저장"}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
