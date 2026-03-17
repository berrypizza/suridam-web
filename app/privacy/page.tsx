export default function PrivacyPage() {
  return (
    <div
      style={{
        minHeight: "100dvh",
        backgroundColor: "#111",
        color: "#ccc",
        fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif",
      }}>
      <div
        style={{ maxWidth: 720, margin: "0 auto", padding: "60px 24px 80px" }}>
        <h1
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: "white",
            marginBottom: 8,
          }}>
          개인정보처리방침
        </h1>
        <p style={{ fontSize: 13, color: "#555", marginBottom: 48 }}>
          시행일: 2025년 1월 1일 &nbsp;·&nbsp; 수리담 (대표 고관호)
        </p>

        {sections.map((s, i) => (
          <div key={i} style={{ marginBottom: 40 }}>
            <h2
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "white",
                marginBottom: 12,
                paddingBottom: 8,
                borderBottom: "1px solid #1e1e1e",
              }}>
              제{i + 1}조 {s.title}
            </h2>
            <div
              style={{
                fontSize: 14,
                lineHeight: 2,
                color: "#999",
                whiteSpace: "pre-line",
              }}>
              {s.body}
            </div>
          </div>
        ))}

        <div
          style={{
            marginTop: 48,
            padding: "20px",
            backgroundColor: "#1a1a1a",
            borderRadius: 12,
            border: "1px solid #222",
            fontSize: 13,
            color: "#555",
            lineHeight: 1.8,
          }}>
          <p style={{ fontWeight: 700, color: "#888", marginBottom: 8 }}>
            개인정보 보호책임자
          </p>
          <p>성명: 고관호</p>
          <p>연락처: 010-9127-3024</p>
          <p>주소: 서울특별시 영등포구 선유서로21길 14, 2층 201-b484호</p>
        </div>
      </div>
    </div>
  );
}

const sections = [
  {
    title: "개인정보의 수집 및 이용 목적",
    body: `수리담은 다음의 목적을 위해 개인정보를 수집·이용합니다.

• 수리 접수 및 방문 일정 조율
• 수리 완료 후 결과 안내 및 AS 연락
• 회원 가입 및 본인 확인
• 수리 내역 조회 서비스 제공`,
  },
  {
    title: "수집하는 개인정보 항목",
    body: `수리담은 아래와 같은 개인정보를 수집합니다.

[필수 항목]
• 이름
• 휴대전화번호
• 수리 주소(지역)
• 수리 증상 및 가구 정보

[소셜 로그인 시 수집 항목]
• 카카오 로그인: 닉네임, 프로필 사진, 카카오계정(이메일), 카카오계정(전화번호)

[자동 수집 항목]
• 서비스 이용 기록, 접속 로그`,
  },
  {
    title: "개인정보의 보유 및 이용 기간",
    body: `수리담은 개인정보 수집 및 이용 목적이 달성된 후 해당 정보를 지체 없이 파기합니다.

단, 관계 법령에 의해 보존할 필요가 있는 경우 아래와 같이 보관합니다.

• 소비자 불만 또는 분쟁 처리 기록: 3년 (전자상거래법)
• 서비스 이용 기록, 접속 로그: 1년 (통신비밀보호법)`,
  },
  {
    title: "개인정보의 제3자 제공",
    body: `수리담은 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다.

다만, 아래의 경우에는 예외로 합니다.

• 이용자가 사전에 동의한 경우
• 법령의 규정에 의거하거나 수사 기관의 요청이 있는 경우`,
  },
  {
    title: "개인정보 처리 위탁",
    body: `수리담은 서비스 제공을 위해 아래와 같이 개인정보 처리 업무를 위탁하고 있습니다.

• 수탁 업체: Supabase Inc.
• 위탁 업무: 회원 정보 및 수리 데이터 저장·관리
• 보유 기간: 회원 탈퇴 또는 위탁 계약 종료 시까지`,
  },
  {
    title: "이용자의 권리",
    body: `이용자는 언제든지 아래의 권리를 행사할 수 있습니다.

• 개인정보 열람 요청
• 개인정보 정정·삭제 요청
• 개인정보 처리 정지 요청

요청은 전화(010-9127-3024) 또는 문자로 가능하며, 지체 없이 처리합니다.`,
  },
  {
    title: "개인정보의 파기",
    body: `개인정보 보유 기간이 경과하거나 처리 목적이 달성된 경우 지체 없이 파기합니다.

• 전자적 파일: 복구 불가능한 방법으로 영구 삭제
• 종이 문서: 분쇄 또는 소각`,
  },
  {
    title: "개인정보처리방침 변경",
    body: `이 개인정보처리방침은 법령·정책 또는 보안 기술의 변경에 따라 내용이 변경될 수 있습니다.
변경 시 시행 7일 전부터 홈페이지를 통해 공지합니다.`,
  },
];
