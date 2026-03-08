"use client";

export const dynamic = "force-dynamic";

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
  completion_photo?: string;
}

const TECHS: Tech[] = ["기사1", "기사2"];
const STATUSES: Status[] = ["대기", "배정", "완료", "취소"];

const TECH_COLOR: Record<string, string> = {
  기사1: "#2fae8a",
  기사2: "#60a5fa",
  "": "#7a7a7a",
};

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
function formatFullDate(d: string) {
  if (!d) return "-";
  const [y, m, day] = d.split("-");
  const dow = ["일", "월", "화", "수", "목", "금", "토"][new Date(d).getDay()];
  return `${y}년 ${parseInt(m)}월 ${parseInt(day)}일 (${dow})`;
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

// ── 사진 업로드/관리 팝업 ─────────────────────────────────
function PhotoCapture({
  jobId,
  currentPhoto,
  onDone,
  onCancel,
}: {
  jobId: string;
  currentPhoto?: string;
  onDone: (url: string | null) => void;
  onCancel: () => void;
}) {
  const [preview, setPreview] = useState<string | null>(currentPhoto || null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const isExisting = !!currentPhoto && preview === currentPhoto;

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    const ext = file.name.split(".").pop() || "jpg";
    const path = `${jobId}-${Date.now()}.${ext}`;
    const { error } = await getSupabase()
      .storage.from("completion-photos")
      .upload(path, file, { upsert: true });
    if (error) {
      alert("업로드 실패: " + error.message);
      setUploading(false);
      return;
    }
    const { data } = getSupabase()
      .storage.from("completion-photos")
      .getPublicUrl(path);
    setUploading(false);
    onDone(data.publicUrl);
  };

  const handleDelete = async () => {
    if (!confirm("사진을 삭제할까요?")) return;
    onDone(null);
  };

  const handleDownload = () => {
    if (!preview) return;
    const a = document.createElement("a");
    a.href = preview;
    a.download = `suridam-${jobId}.jpg`;
    a.target = "_blank";
    a.click();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.92)" }}>
      <div
        className="w-full max-w-sm rounded-2xl overflow-hidden"
        style={{ backgroundColor: "#1e1e1e", border: "1px solid #333" }}>
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{ borderBottom: "1px solid #2a2a2a" }}>
          <span className="text-sm font-bold" style={{ color: "white" }}>
            완료 사진
          </span>
          <button onClick={onCancel} style={{ color: "#555" }}>
            ✕
          </button>
        </div>

        {!preview ? (
          <div className="flex flex-col items-center justify-center py-10 gap-3">
            <p className="text-sm" style={{ color: "#555" }}>
              수리 완료 사진을 추가해주세요
            </p>
            <label
              className="rounded-xl px-6 py-3 text-sm font-bold text-white cursor-pointer"
              style={{ backgroundColor: "#2fae8a" }}>
              📷 카메라로 찍기
              <input
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={handleFile}
              />
            </label>
            <label
              className="rounded-xl px-6 py-3 text-sm font-bold cursor-pointer"
              style={{ backgroundColor: "#2a2a2a", color: "#aaa" }}>
              🖼 갤러리에서 선택
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFile}
              />
            </label>
          </div>
        ) : (
          <div>
            <img
              src={preview}
              alt="완료 사진"
              className="w-full"
              style={{ maxHeight: 340, objectFit: "cover" }}
            />
            {isExisting ? (
              /* 기존 사진 관리 버튼 */
              <div className="flex gap-2 p-3">
                <button
                  onClick={handleDownload}
                  className="flex-1 rounded-xl py-2.5 text-xs font-bold"
                  style={{ backgroundColor: "#2a2a2a", color: "#aaa" }}>
                  ⬇ 다운로드
                </button>
                <label
                  className="flex-1 rounded-xl py-2.5 text-xs font-bold text-center cursor-pointer"
                  style={{
                    backgroundColor: "#2fae8a22",
                    color: "#2fae8a",
                    border: "1px solid #2fae8a44",
                  }}>
                  🔄 교체
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFile}
                  />
                </label>
                <button
                  onClick={handleDelete}
                  className="flex-1 rounded-xl py-2.5 text-xs font-bold"
                  style={{ backgroundColor: "#ef444422", color: "#ef4444" }}>
                  🗑 삭제
                </button>
              </div>
            ) : (
              /* 새 사진 저장 버튼 */
              <div className="flex gap-2 p-3">
                <button
                  onClick={() => {
                    setPreview(null);
                    setFile(null);
                  }}
                  className="flex-1 rounded-xl py-3 text-sm font-bold"
                  style={{ backgroundColor: "#2a2a2a", color: "#aaa" }}>
                  다시 찍기
                </button>
                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="flex-1 rounded-xl py-3 text-sm font-bold text-white"
                  style={{
                    backgroundColor: "#2fae8a",
                    opacity: uploading ? 0.7 : 1,
                  }}>
                  {uploading ? "저장 중..." : "저장 ✓"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ── 잡 카드 컴포넌트 ─────────────────────────────────────
function JobCard({
  job,
  onUpdate,
  onEdit,
  onDelete,
}: {
  job: Job;
  onUpdate: (id: string, patch: Partial<Job>) => void;
  onEdit: (job: Job) => void;
  onDelete: (id: string) => void;
}) {
  const techColor = TECH_COLOR[job.tech || ""];
  const [showPhoto, setShowPhoto] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handlePhotoDone = (url: string | null) => {
    onUpdate(job.id, { completion_photo: url ?? "" });
    setShowPhoto(false);
  };

  return (
    <>
      {showPhoto && (
        <PhotoCapture
          jobId={job.id}
          currentPhoto={job.completion_photo || undefined}
          onDone={handlePhotoDone}
          onCancel={() => setShowPhoto(false)}
        />
      )}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          backgroundColor: "#1e1e1e",
          border: "1px solid #2a2a2a",
          borderLeft: `3px solid ${techColor}`,
        }}>
        {/* 상단 행: 상태 드롭다운 + 날짜 + 시간 + 기사 */}
        <div className="flex items-center gap-2 px-3 pt-3 pb-2 flex-wrap">
          <select
            value={job.status}
            onChange={(e) =>
              onUpdate(job.id, { status: e.target.value as Status })
            }
            className="text-xs font-semibold rounded-full px-2 py-1 border cursor-pointer"
            style={{ ...STATUS_STYLE[job.status], outline: "none" }}>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <span className="text-xs" style={{ color: "#444" }}>
            {formatFullDate(job.visit_date)}
          </span>
          {job.visit_time && (
            <span className="text-xs font-bold" style={{ color: "#aaa" }}>
              {formatTime(job.visit_time)}
            </span>
          )}
          <select
            value={job.tech}
            onChange={(e) => onUpdate(job.id, { tech: e.target.value as Tech })}
            className="text-xs rounded-full px-2 py-1 border cursor-pointer font-semibold"
            style={{
              backgroundColor: "#2a2a2a",
              border: `1px solid ${techColor}44`,
              color: techColor,
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

        {/* 메인 정보 */}
        <div className="flex items-start gap-3 px-3 pb-2">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-0.5">
              <span className="text-sm font-bold" style={{ color: "white" }}>
                {job.name || "?"}
              </span>
              <span className="text-xs" style={{ color: "#555" }}>
                {job.region}
              </span>
              <span className="text-xs" style={{ color: "#7a7a7a" }}>
                {job.symptom}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-1">
              {job.price > 0 && (
                <span
                  className="text-sm font-bold"
                  style={{ color: "#2fae8a" }}>
                  {formatPrice(job.price)}
                </span>
              )}
              {job.memo && (
                <span
                  className="text-xs flex items-center gap-1"
                  style={{ color: "#7a7a7a" }}>
                  <span style={{ fontSize: 10 }}>💬</span>
                  {job.memo}
                </span>
              )}
            </div>

            {/* 완료 사진 썸네일 */}
            {job.completion_photo && (
              <div className="mt-2">
                <img
                  src={job.completion_photo}
                  alt="완료 사진"
                  onClick={() => setPhotoPreview(job.completion_photo!)}
                  className="rounded-xl cursor-pointer"
                  style={{
                    height: 72,
                    width: 96,
                    objectFit: "cover",
                    border: "1px solid #2fae8a44",
                  }}
                />
              </div>
            )}
          </div>

          {/* 액션 버튼들 */}
          <div className="flex flex-col gap-1 flex-shrink-0">
            {job.phone && (
              <a
                href={`tel:${job.phone}`}
                className="w-8 h-8 flex items-center justify-center rounded-xl text-sm"
                style={{
                  backgroundColor: "#ef444422",
                  color: "#ef4444",
                  border: "1px solid #ef444433",
                }}>
                📞
              </a>
            )}
            <button
              onClick={() => onEdit(job)}
              className="w-8 h-8 flex items-center justify-center rounded-xl text-xs font-bold"
              style={{
                backgroundColor: "#2a2a2a",
                color: "#aaa",
                border: "1px solid #333",
              }}>
              수정
            </button>
            <button
              onClick={() => onDelete(job.id)}
              className="w-8 h-8 flex items-center justify-center rounded-xl text-xs font-bold"
              style={{
                backgroundColor: "#ef444422",
                color: "#ef4444",
                border: "1px solid #ef444433",
              }}>
              삭제
            </button>
          </div>
        </div>

        {/* 하단 완료 버튼 바 */}
        <div className="flex gap-2 px-3 pb-3">
          {job.status !== "완료" ? (
            <button
              onClick={() => {
                onUpdate(job.id, { status: "완료" });
                setShowPhoto(true);
              }}
              className="flex-1 rounded-xl py-2.5 text-xs font-bold text-white"
              style={{ backgroundColor: "#2fae8a" }}>
              ✓ 완료 처리
            </button>
          ) : (
            <button
              onClick={() => setShowPhoto(true)}
              className="flex-1 rounded-xl py-2.5 text-xs font-bold"
              style={{
                backgroundColor: job.completion_photo ? "#2fae8a22" : "#2a2a2a",
                color: job.completion_photo ? "#2fae8a" : "#aaa",
                border: `1px solid ${job.completion_photo ? "#2fae8a44" : "#333"}`,
              }}>
              {job.completion_photo ? "📷 사진 관리" : "📷 사진 추가"}
            </button>
          )}
        </div>
      </div>

      {/* 사진 전체보기 */}
      {photoPreview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.95)" }}
          onClick={() => setPhotoPreview(null)}>
          <img
            src={photoPreview}
            alt="완료 사진"
            className="rounded-2xl max-w-full max-h-full"
            style={{ maxHeight: "85vh" }}
          />
        </div>
      )}
    </>
  );
}

export default function AdminDashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"오늘" | "전체" | "달력" | "통계">("달력");
  const [statusFilter, setStatusFilter] = useState<Status | "전체">("전체");
  const [techFilter, setTechFilter] = useState<Tech | "전체">("전체");
  const [calTechFilter, setCalTechFilter] = useState<Tech | "전체">("전체");
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

  const filtered = jobs.filter((j) => {
    if (tab === "오늘" && j.visit_date !== dateFilter) return false;
    if (tab === "전체" && !j.visit_date?.startsWith(monthFilter)) return false;
    if (statusFilter !== "전체" && j.status !== statusFilter) return false;
    if (techFilter !== "전체" && j.tech !== techFilter) return false;
    return true;
  });

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

  // 달력
  const calDays = getCalendarDays(calYear, calMonth);
  const jobsByDate: Record<string, Job[]> = {};
  jobs.forEach((j) => {
    if (!jobsByDate[j.visit_date]) jobsByDate[j.visit_date] = [];
    jobsByDate[j.visit_date].push(j);
  });

  const selectedJobs = selectedDay
    ? (jobsByDate[selectedDay] ?? []).filter(
        (j) => calTechFilter === "전체" || j.tech === calTechFilter,
      )
    : [];
  const todayStr = today();

  const MonthSelector = () => (
    <div
      className="flex items-center justify-between mb-4 rounded-xl p-2"
      style={{ backgroundColor: "#1e1e1e", border: "1px solid #2a2a2a" }}>
      <button
        onClick={() => {
          const d = new Date(monthFilter + "-01");
          d.setMonth(d.getMonth() - 1);
          setMonthFilter(d.toISOString().slice(0, 7));
        }}
        className="px-4 py-2 rounded-lg text-lg font-bold"
        style={{ color: "#e5e5e5" }}>
        ‹
      </button>
      <span className="text-sm font-bold" style={{ color: "white" }}>
        {formatYearMonth(monthFilter)}
      </span>
      <button
        onClick={() => {
          const d = new Date(monthFilter + "-01");
          d.setMonth(d.getMonth() + 1);
          setMonthFilter(d.toISOString().slice(0, 7));
        }}
        className="px-4 py-2 rounded-lg text-lg font-bold"
        style={{ color: "#e5e5e5" }}>
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
            {/* 월 네비 + 기사 드롭다운 */}
            <div className="flex items-center gap-2 mb-3">
              <button
                onClick={() => {
                  const d = new Date(calYear, calMonth - 1);
                  setCalYear(d.getFullYear());
                  setCalMonth(d.getMonth());
                  setSelectedDay(null);
                }}
                className="px-3 py-2 rounded-lg"
                style={{
                  backgroundColor: "#1e1e1e",
                  color: "#e5e5e5",
                  border: "1px solid #2a2a2a",
                }}>
                ‹
              </button>
              <span
                className="flex-1 text-center text-base font-bold"
                style={{ color: "white" }}>
                {calYear}년 {calMonth + 1}월
              </span>
              <button
                onClick={() => {
                  const d = new Date(calYear, calMonth + 1);
                  setCalYear(d.getFullYear());
                  setCalMonth(d.getMonth());
                  setSelectedDay(null);
                }}
                className="px-3 py-2 rounded-lg"
                style={{
                  backgroundColor: "#1e1e1e",
                  color: "#e5e5e5",
                  border: "1px solid #2a2a2a",
                }}>
                ›
              </button>

              {/* 기사 드롭다운 */}
              <select
                value={calTechFilter}
                onChange={(e) =>
                  setCalTechFilter(e.target.value as Tech | "전체")
                }
                className="rounded-xl px-3 py-2 text-xs font-bold cursor-pointer"
                style={{
                  backgroundColor:
                    calTechFilter === "기사1"
                      ? "#2fae8a22"
                      : calTechFilter === "기사2"
                        ? "#60a5fa22"
                        : "#1e1e1e",
                  color:
                    calTechFilter === "기사1"
                      ? "#2fae8a"
                      : calTechFilter === "기사2"
                        ? "#60a5fa"
                        : "#aaa",
                  border: `1px solid ${calTechFilter === "기사1" ? "#2fae8a44" : calTechFilter === "기사2" ? "#60a5fa44" : "#2a2a2a"}`,
                  outline: "none",
                }}>
                <option value="전체">전체</option>
                <option value="기사1">기사1</option>
                <option value="기사2">기사2</option>
              </select>
            </div>

            {/* 기사 컬러 레전드 */}
            <div className="flex items-center gap-3 mb-3 px-1">
              {TECHS.filter(Boolean).map((t) => (
                <div key={t} className="flex items-center gap-1.5">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: TECH_COLOR[t] }}
                  />
                  <span className="text-xs" style={{ color: TECH_COLOR[t] }}>
                    {t}
                  </span>
                </div>
              ))}
              <div className="flex items-center gap-1.5">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: "#7a7a7a" }}
                />
                <span className="text-xs" style={{ color: "#555" }}>
                  미배정
                </span>
              </div>
            </div>

            {/* 요일 헤더 */}
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

            {/* 날짜 그리드 */}
            <div className="grid grid-cols-7 gap-0.5">
              {calDays.map((day, i) => {
                if (!day) return <div key={`e-${i}`} />;
                const dateStr = `${calYear}-${pad(calMonth + 1)}-${pad(day)}`;
                const allDayJobs = jobsByDate[dateStr] ?? [];
                const dayJobs =
                  calTechFilter === "전체"
                    ? allDayJobs
                    : allDayJobs.filter((j) => j.tech === calTechFilter);
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
                          className="flex items-center gap-1 overflow-hidden">
                          <span
                            className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                            style={{
                              backgroundColor: TECH_COLOR[j.tech || ""],
                            }}
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

            {/* 선택 날짜 타임테이블 */}
            {selectedDay && (
              <div
                className="mt-4 rounded-2xl overflow-hidden"
                style={{ border: "1px solid #2a2a2a" }}>
                {/* 헤더 */}
                <div
                  className="flex items-center justify-between px-4 py-3"
                  style={{
                    backgroundColor: "#1e1e1e",
                    borderBottom: "1px solid #2a2a2a",
                  }}>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-sm font-bold"
                      style={{ color: "white" }}>
                      {formatDate(selectedDay)}
                    </span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: "#2a2a2a", color: "#aaa" }}>
                      {selectedJobs.length}건
                    </span>
                    {calTechFilter !== "전체" && (
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-bold"
                        style={{
                          backgroundColor: TECH_COLOR[calTechFilter] + "22",
                          color: TECH_COLOR[calTechFilter],
                        }}>
                        {calTechFilter}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      setForm({ ...emptyForm(), visit_date: selectedDay });
                      setEditId(null);
                      setShowForm(true);
                    }}
                    className="text-xs px-3 py-1.5 rounded-lg font-bold"
                    style={{ backgroundColor: "#2fae8a", color: "white" }}>
                    + 추가
                  </button>
                </div>

                {selectedJobs.length === 0 ? (
                  <div
                    className="text-center py-10"
                    style={{ backgroundColor: "#141414", color: "#333" }}>
                    <p className="text-2xl mb-2">📋</p>
                    <p className="text-sm">일정 없음</p>
                  </div>
                ) : (
                  <div
                    className="flex flex-col gap-0"
                    style={{ backgroundColor: "#141414" }}>
                    {/* 시간 있는 일정: 시간순 */}
                    {[...selectedJobs]
                      .sort((a, b) => {
                        if (!a.visit_time && !b.visit_time) return 0;
                        if (!a.visit_time) return 1;
                        if (!b.visit_time) return -1;
                        return a.visit_time.localeCompare(b.visit_time);
                      })
                      .map((job, idx, arr) => (
                        <div key={job.id}>
                          {/* 시간 구분선 */}
                          {job.visit_time &&
                            (idx === 0 ||
                              !arr[idx - 1].visit_time ||
                              arr[idx - 1].visit_time?.slice(0, 2) !==
                                job.visit_time.slice(0, 2)) && (
                              <div
                                className="flex items-center gap-2 px-4 py-1.5"
                                style={{ borderBottom: "1px solid #1f1f1f" }}>
                                <span
                                  className="text-xs font-bold"
                                  style={{ color: "#444" }}>
                                  {formatTime(job.visit_time)}
                                </span>
                                <div
                                  className="flex-1 h-px"
                                  style={{ backgroundColor: "#1f1f1f" }}
                                />
                              </div>
                            )}
                          {!job.visit_time && idx === 0 && (
                            <div
                              className="px-4 py-1.5"
                              style={{ borderBottom: "1px solid #1f1f1f" }}>
                              <span
                                className="text-xs font-bold"
                                style={{ color: "#444" }}>
                                시간 미정
                              </span>
                            </div>
                          )}
                          {!job.visit_time &&
                            idx > 0 &&
                            arr[idx - 1].visit_time && (
                              <div
                                className="px-4 py-1.5"
                                style={{ borderBottom: "1px solid #1f1f1f" }}>
                                <span
                                  className="text-xs font-bold"
                                  style={{ color: "#444" }}>
                                  시간 미정
                                </span>
                              </div>
                            )}
                          <div className="px-3 py-2">
                            <JobCard
                              job={job}
                              onUpdate={update}
                              onEdit={startEdit}
                              onDelete={remove}
                            />
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
                      style={{ color: TECH_COLOR[tech] }}>
                      {tech}
                    </span>
                    <span
                      className="text-xs px-2 py-1 rounded-full"
                      style={{
                        backgroundColor: TECH_COLOR[tech] + "22",
                        color: TECH_COLOR[tech],
                      }}>
                      {techJobs.length}건
                    </span>
                  </div>
                  <div
                    className="text-xl font-bold mb-3"
                    style={{ color: TECH_COLOR[tech] }}>
                    {formatPrice(techRevenue)}
                  </div>
                  <div
                    className="h-1.5 rounded-full overflow-hidden"
                    style={{ backgroundColor: "#2a2a2a" }}>
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${revenue > 0 ? (techRevenue / revenue) * 100 : 0}%`,
                        backgroundColor: TECH_COLOR[tech],
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

        {/* ── 오늘 탭 ── */}
        {!loading && tab === "오늘" && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <button
                onClick={() => {
                  const d = new Date(dateFilter);
                  d.setDate(d.getDate() - 1);
                  setDateFilter(d.toISOString().slice(0, 10));
                }}
                className="px-3 py-2 rounded-lg"
                style={{
                  backgroundColor: "#1e1e1e",
                  color: "#e5e5e5",
                  border: "1px solid #2a2a2a",
                }}>
                ‹
              </button>
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="flex-1 text-center text-sm font-bold rounded-xl py-2"
                style={{
                  backgroundColor: "#1e1e1e",
                  color: "white",
                  border: "1px solid #2a2a2a",
                  outline: "none",
                }}
              />
              <button
                onClick={() => {
                  const d = new Date(dateFilter);
                  d.setDate(d.getDate() + 1);
                  setDateFilter(d.toISOString().slice(0, 10));
                }}
                className="px-3 py-2 rounded-lg"
                style={{
                  backgroundColor: "#1e1e1e",
                  color: "#e5e5e5",
                  border: "1px solid #2a2a2a",
                }}>
                ›
              </button>
              <select
                value={techFilter}
                onChange={(e) => setTechFilter(e.target.value as Tech | "전체")}
                className="rounded-xl px-3 py-2 text-xs font-bold cursor-pointer"
                style={{
                  backgroundColor:
                    techFilter === "기사1"
                      ? "#2fae8a22"
                      : techFilter === "기사2"
                        ? "#60a5fa22"
                        : "#1e1e1e",
                  color:
                    techFilter === "기사1"
                      ? "#2fae8a"
                      : techFilter === "기사2"
                        ? "#60a5fa"
                        : "#aaa",
                  border: `1px solid ${techFilter === "기사1" ? "#2fae8a44" : techFilter === "기사2" ? "#60a5fa44" : "#2a2a2a"}`,
                  outline: "none",
                }}>
                <option value="전체">전체</option>
                <option value="기사1">기사1</option>
                <option value="기사2">기사2</option>
              </select>
            </div>
            <div className="flex flex-wrap gap-1 mb-4">
              {(["전체", ...STATUSES] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s as Status | "전체")}
                  className="rounded-full px-3 py-1.5 text-xs font-semibold"
                  style={{
                    backgroundColor: statusFilter === s ? "#2fae8a" : "#1e1e1e",
                    color: statusFilter === s ? "white" : "#555",
                    border: "1px solid #2a2a2a",
                  }}>
                  {s}
                </button>
              ))}
            </div>
            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: "1px solid #2a2a2a" }}>
              <div
                className="flex items-center justify-between px-4 py-3"
                style={{
                  backgroundColor: "#1e1e1e",
                  borderBottom: "1px solid #2a2a2a",
                }}>
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className="text-sm font-bold"
                    style={{ color: "white" }}>
                    {formatDate(dateFilter)} 일정
                  </span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: "#2a2a2a", color: "#aaa" }}>
                    {filtered.length}건
                  </span>
                  <span className="text-xs" style={{ color: "#2fae8a" }}>
                    완료 {filtered.filter((j) => j.status === "완료").length}건
                    ·{" "}
                    {formatPrice(
                      filtered
                        .filter((j) => j.status === "완료")
                        .reduce((s, j) => s + (j.price || 0), 0),
                    )}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setForm({ ...emptyForm(), visit_date: dateFilter });
                    setEditId(null);
                    setShowForm(true);
                  }}
                  className="text-xs px-3 py-1.5 rounded-lg font-bold"
                  style={{ backgroundColor: "#2fae8a", color: "white" }}>
                  + 추가
                </button>
              </div>
              {filtered.length === 0 ? (
                <div
                  className="text-center py-12"
                  style={{ backgroundColor: "#141414", color: "#333" }}>
                  <p className="text-3xl mb-2">📋</p>
                  <p className="text-sm">일정 없음</p>
                </div>
              ) : (
                <div
                  className="flex flex-col gap-0"
                  style={{ backgroundColor: "#141414" }}>
                  {[...filtered]
                    .sort((a, b) => {
                      if (!a.visit_time && !b.visit_time) return 0;
                      if (!a.visit_time) return 1;
                      if (!b.visit_time) return -1;
                      return a.visit_time.localeCompare(b.visit_time);
                    })
                    .map((job, idx, arr) => (
                      <div key={job.id}>
                        {job.visit_time &&
                          (idx === 0 ||
                            arr[idx - 1].visit_time?.slice(0, 2) !==
                              job.visit_time.slice(0, 2)) && (
                            <div
                              className="flex items-center gap-2 px-4 py-1.5"
                              style={{ borderBottom: "1px solid #1f1f1f" }}>
                              <span
                                className="text-xs font-bold"
                                style={{ color: "#444" }}>
                                {formatTime(job.visit_time)}
                              </span>
                              <div
                                className="flex-1 h-px"
                                style={{ backgroundColor: "#1f1f1f" }}
                              />
                            </div>
                          )}
                        {!job.visit_time &&
                          (idx === 0 || arr[idx - 1].visit_time) && (
                            <div
                              className="px-4 py-1.5"
                              style={{ borderBottom: "1px solid #1f1f1f" }}>
                              <span
                                className="text-xs font-bold"
                                style={{ color: "#444" }}>
                                시간 미정
                              </span>
                            </div>
                          )}
                        <div className="px-3 py-2">
                          <JobCard
                            job={job}
                            onUpdate={update}
                            onEdit={startEdit}
                            onDelete={remove}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── 전체 탭 ── */}
        {!loading && tab === "전체" && (
          <>
            <MonthSelector />
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
              <select
                value={techFilter}
                onChange={(e) => setTechFilter(e.target.value as Tech | "전체")}
                className="rounded-xl px-3 py-1.5 text-xs font-bold cursor-pointer"
                style={{
                  backgroundColor:
                    techFilter === "기사1"
                      ? "#2fae8a22"
                      : techFilter === "기사2"
                        ? "#60a5fa22"
                        : "#1e1e1e",
                  color:
                    techFilter === "기사1"
                      ? "#2fae8a"
                      : techFilter === "기사2"
                        ? "#60a5fa"
                        : "#aaa",
                  border: `1px solid ${techFilter === "기사1" ? "#2fae8a44" : techFilter === "기사2" ? "#60a5fa44" : "#2a2a2a"}`,
                  outline: "none",
                }}>
                <option value="전체">전체 기사</option>
                <option value="기사1">기사1</option>
                <option value="기사2">기사2</option>
              </select>
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
              <div className="flex flex-col gap-2">
                {filtered.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onUpdate={update}
                    onEdit={startEdit}
                    onDelete={remove}
                  />
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
