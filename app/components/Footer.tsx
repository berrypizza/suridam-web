export default function Footer() {
  return (
    <footer className="px-6 py-10 border-t">
      <div className="mx-auto max-w-5xl text-sm text-gray-600 space-y-2">
        <div className="font-semibold text-gray-900">수리담</div>
        <div>활동지역: 인천 / 부천 / 서울 강서구 중심</div>
        <div>
          문의:{" "}
          <a className="underline" href="tel:01091273024">
            010-9127-3024
          </a>
        </div>
        <div>
          <a className="underline" href="/privacy">
            개인정보처리방침
          </a>
        </div>

        <div className="pt-4 text-gray-500">
          © {new Date().getFullYear()} Suridam. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
