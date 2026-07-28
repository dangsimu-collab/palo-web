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

const dangerBtnStyle = {
  background: 'var(--surface)',
  color: '#c0392b',
  border: '1.5px solid #e6b8b0',
  padding: '9px 16px',
  borderRadius: 12,
  fontWeight: 700,
  fontSize: 13,
  cursor: 'pointer',
  flexShrink: 0,
};

const inputStyle = {
  flex: 1,
  height: 44,
  border: '1.5px solid var(--line-2)',
  borderRadius: 12,
  background: 'var(--surface)',
  padding: '0 14px',
  fontSize: 14,
  color: 'var(--ink)',
};

const rowStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  padding: '14px 16px',
  background: 'var(--surface)',
  border: '1.5px solid var(--line)',
  borderRadius: 14,
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

function PostManagement() {
  const [query, setQuery] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load(q) {
    setLoading(true);
    let req = supabase
      .from('posts')
      .select('id,title,board,views,created_at')
      .order('created_at', { ascending: false })
      .limit(50);
    if (q) req = req.ilike('title', `%${q}%`);
    const { data, error } = await req;
    if (!error) setPosts(data);
    setLoading(false);
  }

  useEffect(() => {
    load('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleDelete(id) {
    if (!confirm('이 글을 삭제할까요? 되돌릴 수 없어요.')) return;
    const { error } = await supabase.from('posts').delete().eq('id', id);
    if (error) {
      alert('삭제 실패: ' + error.message);
      return;
    }
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') load(query);
          }}
          placeholder="제목으로 검색"
          style={inputStyle}
        />
        <button style={btnStyle} onClick={() => load(query)}>검색</button>
      </div>
      {loading ? (
        <p style={{ color: 'var(--muted)' }}>불러오는 중...</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {posts.length === 0 && <p style={{ color: 'var(--muted)' }}>글이 없어요.</p>}
          {posts.map((p) => (
            <div key={p.id} style={rowStyle}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontWeight: 700,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {p.title}
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>
                  {p.board} · 조회 {p.views} · {new Date(p.created_at).toLocaleString('ko-KR')}
                </div>
              </div>
              <button style={dangerBtnStyle} onClick={() => handleDelete(p.id)}>삭제</button>
            </div>
          ))}
        </div>
      )}
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
      <h2 style={{ fontWeight: 800, fontSize: 16, marginBottom: 12 }}>글 관리</h2>
      <PostManagement />
    </div>
  );
}
