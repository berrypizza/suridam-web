-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- 수리담 관리툴 Supabase 셋업
-- Supabase → SQL Editor에 붙여넣고 실행
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CREATE TABLE jobs (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  visit_date   DATE NOT NULL,
  name         TEXT NOT NULL,
  phone        TEXT,
  region       TEXT NOT NULL,
  symptom      TEXT NOT NULL,
  price        INTEGER DEFAULT 0,
  status       TEXT DEFAULT '대기' CHECK (status IN ('대기','배정','완료','취소')),
  tech         TEXT DEFAULT '' CHECK (tech IN ('','기사1','기사2')),
  memo         TEXT DEFAULT '',
  review_requested BOOLEAN DEFAULT FALSE
);

-- 실시간 활성화
ALTER TABLE jobs REPLICA IDENTITY FULL;

-- Row Level Security 비활성화 (내부 전용 앱이므로)
ALTER TABLE jobs DISABLE ROW LEVEL SECURITY;