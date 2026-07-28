'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

const btnStyle = {
  background: 'linear-gradient(120deg,var(--brand),var(--grape))',
  color: '#fff',
  border: 'none',
  padding: '12px 24px',
  borderRadius: 14,
  fontWeight: 800,
  fontSize: 14,
  cursor: 'pointer',
};

function Center({ children }) {
  return (
    <div
      style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        textAlign: 'center',
        padding: 20,
      }}
    >
      {children}
    </div>
  );
}

export default function AdminPage() {
  const [status, setStatus] = useState('loading'); // loading | unauthenticated | forbidden | admin
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    let active = true;

    async function check() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        if (active) setStatus('unauthenticated');
        return;
      }
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
      if (!active) return;
      if (error || !data || !data.is_admin) {
        setStatus('forbidden');
        return;
      }
      setProfile(data);
      setStatus('admin');
    }

    check();
    const { data: sub } = supabase.auth.onAuthStateChange(() => check());
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  function login() {
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin + '/admin' },
    });
  }

  if (status === 'loading') {
    return <Center>확인 중...</Center>;
  }

  if (status === 'unauthenticated') {
    return (
      <Center>
        <p>관리자 페이지는 로그인이 필요해요.</p>
        <button style={btnStyle} onClick={login}>구글로 로그인</button>
      </Center>
    );
  }

  if (status === 'forbidden') {
    return <Center>관리자만 접근할 수 있는 페이지예요.</Center>;
  }

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '32px 20px' }}>
      <h1 style={{ fontWeight: 900, fontSize: 24, marginBottom: 8 }}>Palo 관리자</h1>
      <p style={{ color: 'var(--muted)', marginBottom: 24 }}>{profile.nickname}님, 환영해요.</p>
      <p style={{ color: 'var(--muted)' }}>다음 단계에서 글 관리 · 회원 관리 · 공지 · 통계 기능이 여기에 추가돼요.</p>
    </div>
  );
}
