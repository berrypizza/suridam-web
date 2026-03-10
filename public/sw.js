const CACHE = "suridam-admin-v1";

// 캐시할 핵심 파일들
const PRECACHE = ["/admin"];

// 설치 시 핵심 파일 캐싱
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(PRECACHE)));
  self.skipWaiting();
});

// 활성화 시 이전 캐시 삭제
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)),
        ),
      ),
  );
  self.clients.claim();
});

// 요청 처리: /admin 경로만 캐시 전략 적용
self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);

  // admin 경로가 아니면 그냥 네트워크
  if (!url.pathname.startsWith("/admin")) {
    return;
  }

  // Supabase API 요청은 항상 네트워크 우선
  if (url.hostname.includes("supabase")) {
    return;
  }

  // admin 페이지: 네트워크 우선, 실패 시 캐시
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        // 성공 응답이면 캐시에도 저장
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, clone));
        }
        return res;
      })
      .catch(() =>
        // 오프라인이면 캐시에서
        caches
          .match(e.request)
          .then((cached) => cached || caches.match("/admin")),
      ),
  );
});
