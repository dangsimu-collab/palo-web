'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

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

// ---------- 사이트 디자인(.rules-scrim/.rules)을 재사용하는 confirm/alert 대체 ----------
const DialogContext = createContext(null);

function DialogProvider({ children }) {
  const [dialog, setDialog] = useState(null); // { message, mode: 'confirm'|'alert', resolve }

  const confirmDialog = useCallback((message) => {
    return new Promise((resolve) => setDialog({ message, mode: 'confirm', resolve }));
  }, []);

  const notify = useCallback((message) => {
    return new Promise((resolve) => setDialog({ message, mode: 'alert', resolve }));
  }, []);

  function handleOk() {
    dialog.resolve(true);
    setDialog(null);
  }
  function handleCancel() {
    dialog.resolve(false);
    setDialog(null);
  }

  return (
    <DialogContext.Provider value={{ confirmDialog, notify }}>
      {children}
      {dialog && (
        <div
          className="rules-scrim open"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCancel();
          }}
        >
          <div className="rules">
            <h3>{dialog.mode === 'confirm' ? '⚠️ 확인해주세요' : '알림'}</h3>
            <p style={{ color: 'var(--ink-2)', lineHeight: 1.6, marginBottom: 20, whiteSpace: 'pre-wrap' }}>
              {dialog.message}
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {dialog.mode === 'confirm' && (
                <button
                  className="r-ok"
                  style={{ background: 'var(--surface-2)', color: 'var(--ink)' }}
                  onClick={handleCancel}
                >
                  취소
                </button>
              )}
              <button className="r-ok" onClick={handleOk}>확인</button>
            </div>
          </div>
        </div>
      )}
    </DialogContext.Provider>
  );
}

function useDialog() {
  return useContext(DialogContext);
}

function PostManagement() {
  const { confirmDialog, notify } = useDialog();
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
    if (!(await confirmDialog('이 글을 삭제할까요? 되돌릴 수 없어요.'))) return;
    const { error } = await supabase.from('posts').delete().eq('id', id);
    if (error) {
      await notify('삭제 실패: ' + error.message);
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

function UserManagement() {
  const { confirmDialog, notify } = useDialog();
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [levelInfo, setLevelInfo] = useState({});

  async function load(q) {
    setLoading(true);
    let req = supabase
      .from('profiles')
      .select('id,nickname,level,score,is_admin,is_banned,created_at')
      .order('created_at', { ascending: false })
      .limit(50);
    if (q) req = req.ilike('nickname', `%${q}%`);
    const { data, error } = await req;
    if (!error) setUsers(data);
    setLoading(false);
  }

  useEffect(() => {
    load('');
    supabase
      .from('level_thresholds')
      .select('level,name,emoji')
      .then(({ data, error }) => {
        if (error || !data) return;
        const map = {};
        data.forEach((row) => {
          map[row.level] = { name: row.name, emoji: row.emoji };
        });
        setLevelInfo(map);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function toggleBan(u) {
    const next = !u.is_banned;
    const ok = await confirmDialog(next ? `${u.nickname}님을 차단할까요?` : `${u.nickname}님 차단을 해제할까요?`);
    if (!ok) return;
    const { error } = await supabase.from('profiles').update({ is_banned: next }).eq('id', u.id);
    if (error) {
      await notify('처리 실패: ' + error.message);
      return;
    }
    setUsers((prev) => prev.map((x) => (x.id === u.id ? { ...x, is_banned: next } : x)));
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
          placeholder="닉네임으로 검색"
          style={inputStyle}
        />
        <button style={btnStyle} onClick={() => load(query)}>검색</button>
      </div>
      {loading ? (
        <p style={{ color: 'var(--muted)' }}>불러오는 중...</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {users.length === 0 && <p style={{ color: 'var(--muted)' }}>회원이 없어요.</p>}
          {users.map((u) => (
            <div key={u.id} style={rowStyle}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700 }}>
                  {u.nickname}
                  {u.is_admin && (
                    <span style={{ marginLeft: 8, fontSize: 11, color: 'var(--brand)', fontWeight: 800 }}>
                      관리자
                    </span>
                  )}
                  {u.is_banned && (
                    <span style={{ marginLeft: 8, fontSize: 11, color: '#c0392b', fontWeight: 800 }}>
                      차단됨
                    </span>
                  )}
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>
                  {levelInfo[u.level] ? `${levelInfo[u.level].emoji || ''} ${levelInfo[u.level].name}` : `${u.level}등급`} · {u.score ?? 0}점 · 가입 {new Date(u.created_at).toLocaleDateString('ko-KR')}
                </div>
              </div>
              {!u.is_admin && (
                <button
                  style={u.is_banned ? btnStyle : dangerBtnStyle}
                  onClick={() => toggleBan(u)}
                >
                  {u.is_banned ? '차단 해제' : '차단'}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function NoticeManagement() {
  const { confirmDialog, notify } = useDialog();
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [saving, setSaving] = useState(false);
  const contentRef = useRef(null);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from('notices')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(30);
    if (!error) setNotices(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function applyBold() {
    contentRef.current.focus();
    document.execCommand('bold');
  }

  async function handleCreate() {
    if (!title.trim()) {
      await notify('제목을 입력해주세요');
      return;
    }
    const html = contentRef.current.innerHTML.trim();
    setSaving(true);
    const { error } = await supabase
      .from('notices')
      .insert({ title: title.trim(), content: html || null });
    setSaving(false);
    if (error) {
      await notify('등록 실패: ' + error.message);
      return;
    }
    setTitle('');
    contentRef.current.innerHTML = '';
    load();
  }

  async function handleDelete(id) {
    if (!(await confirmDialog('이 공지를 삭제할까요?'))) return;
    const { error } = await supabase.from('notices').delete().eq('id', id);
    if (error) {
      await notify('삭제 실패: ' + error.message);
      return;
    }
    setNotices((prev) => prev.filter((n) => n.id !== id));
  }

  return (
    <div>
      <div style={{ ...rowStyle, flexDirection: 'column', alignItems: 'stretch', gap: 10, marginBottom: 20 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="공지 제목"
          style={inputStyle}
        />
        <div>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={applyBold}
            style={{
              width: 34,
              height: 30,
              border: '1.5px solid var(--line-2)',
              borderRadius: 8,
              background: 'var(--surface)',
              fontWeight: 900,
              cursor: 'pointer',
              marginBottom: 6,
            }}
          >
            B
          </button>
          <div
            ref={contentRef}
            contentEditable
            suppressContentEditableWarning
            style={{
              ...inputStyle,
              height: 'auto',
              minHeight: 80,
              padding: 12,
              lineHeight: 1.6,
            }}
          />
          <div style={{ fontSize: 11, color: 'var(--muted-2)', marginTop: 4 }}>
            공지 내용 (선택). 굵게 하고 싶은 부분을 드래그해서 선택한 뒤 B 버튼을 눌러줘.
          </div>
        </div>
        <button style={{ ...btnStyle, alignSelf: 'flex-end' }} onClick={handleCreate} disabled={saving}>
          {saving ? '등록 중...' : '공지 등록'}
        </button>
      </div>
      {loading ? (
        <p style={{ color: 'var(--muted)' }}>불러오는 중...</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {notices.length === 0 && <p style={{ color: 'var(--muted)' }}>등록된 공지가 없어요.</p>}
          {notices.map((n) => (
            <div key={n.id} style={rowStyle}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700 }}>{n.title}</div>
                {n.content && (
                  <div
                    style={{ fontSize: 13, color: 'var(--ink-2)', marginTop: 4, lineHeight: 1.6 }}
                    dangerouslySetInnerHTML={{ __html: n.content }}
                  />
                )}
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>
                  {new Date(n.created_at).toLocaleString('ko-KR')}
                </div>
              </div>
              <button style={dangerBtnStyle} onClick={() => handleDelete(n.id)}>삭제</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div style={{ ...rowStyle, flexDirection: 'column', alignItems: 'flex-start', gap: 4, flex: 1 }}>
      <div style={{ fontSize: 12, color: 'var(--muted)' }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 900 }}>{value ?? '-'}</div>
    </div>
  );
}

const BOARD_LABELS = {
  talk: '수다 광장',
  ask: '질문/시세문의',
  vote: '투표·수요조사',
  wip: '작업물',
  doodle: '낙서/자유 그림',
  crit: '피드백 요청',
  sketch: '그림공부',
  challenge: '챌린지',
  tip: '자료·TIP 공유',
  request: '리퀘스트',
  recruit: '커미션 구인',
  trade: '커미션 구인구직',
  used: '중고 장비',
  review: '커미션 후기',
  adult: '에치치',
};

const ACTIVITY_METRIC_LABELS = { posts: '게시글 수', comments: '댓글 수', signups: '신규 가입' };
const ACTIVITY_METRIC_COLORS = { posts: '#e07aa6', comments: '#9784d6', signups: '#7cc3e0' };

// 사이트의 "인기" 정렬과 동일한 점수 공식(조회수*0.02 + 좋아요*1 + 댓글*0.2, 하루 이내 x2,
// 이후 하루마다 -0.2, 7일째 배수(0.6)로 바닥) — 단 관리자 TOP 10은 7일 지난 글도
// 계속 후보로 둠(고정 10개 랭킹이라 목록 탭의 "부족하면 유지" 규칙이 필요 없음).
function hotMultiplier(createdAt) {
  if (!createdAt) return 0.6;
  const days = Math.floor((Date.now() - new Date(createdAt).getTime()) / 86400000);
  if (days < 7) return 2 - 0.2 * days;
  return 0.6;
}
function hotScore(views, likes, commentCount, createdAt) {
  const base = (views || 0) * 0.02 + (likes || 0) * 1 + (commentCount || 0) * 0.2;
  return base * hotMultiplier(createdAt);
}

function localDateKey(d) {
  const dt = new Date(d);
  return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
}

function bucketByDay(dates, period) {
  const days = [];
  const now = new Date();
  for (let i = period - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    days.push(localDateKey(d));
  }
  const counts = Object.fromEntries(days.map((d) => [d, 0]));
  dates.forEach((iso) => {
    const day = localDateKey(iso);
    if (day in counts) counts[day] += 1;
  });
  return days.map((d) => ({ date: d, count: counts[d] }));
}

function PeriodToggle({ period, setPeriod }) {
  return (
    <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
      {[7, 30].map((p) => (
        <button
          key={p}
          onClick={() => setPeriod(p)}
          style={{
            border: '1.5px solid var(--line-2)',
            background: period === p ? 'linear-gradient(120deg,var(--brand),var(--grape))' : 'var(--surface)',
            color: period === p ? '#fff' : 'var(--ink-2)',
            borderColor: period === p ? 'transparent' : 'var(--line-2)',
            padding: '6px 14px',
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          {p}일
        </button>
      ))}
    </div>
  );
}

function StatsPanel() {
  const [totals, setTotals] = useState(null);
  const [postDates, setPostDates] = useState([]);
  const [commentDates, setCommentDates] = useState([]);
  const [userDates, setUserDates] = useState([]);
  const [activityMetric, setActivityMetric] = useState('posts'); // posts | comments | signups
  const [activityPeriod, setActivityPeriod] = useState(7);
  const [byBoard, setByBoard] = useState([]);
  const [topPosts, setTopPosts] = useState([]);
  const [topAuthors, setTopAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  const activityDatesByMetric = { posts: postDates, comments: commentDates, signups: userDates };
  const daily = useMemo(
    () => bucketByDay(activityDatesByMetric[activityMetric], activityPeriod),
    [activityMetric, postDates, commentDates, userDates, activityPeriod]
  );

  const hourly = useMemo(() => {
    const counts = Array.from({ length: 24 }, () => 0);
    postDates.forEach((iso) => {
      counts[new Date(iso).getHours()] += 1;
    });
    return counts.map((count, hour) => ({ hour, count }));
  }, [postDates]);

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function load() {
    setLoading(true);
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayStartIso = todayStart.toISOString();
    const sevenDaysAgoIso = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

    const [
      userRes,
      postRes,
      commentRes,
      likeRes,
      pendingReportRes,
      bannedRes,
      todayPostRes,
      todayUserRes,
      recentPostRes,
      recentCommentRes,
      recentUserRes,
      boardRes,
      activePostAuthorsRes,
      activeCommentAuthorsRes,
      commentedPostIdsRes,
      rankPostsRes,
      rankLikesRes,
      rankProfilesRes,
    ] = await Promise.all([
      supabase.from('profiles').select('*', { count: 'exact', head: true }),
      supabase.from('posts').select('*', { count: 'exact', head: true }),
      supabase.from('comments').select('*', { count: 'exact', head: true }),
      supabase.from('likes').select('*', { count: 'exact', head: true }),
      supabase.from('reports').select('*', { count: 'exact', head: true }).eq('resolved', false),
      supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('is_banned', true),
      supabase.from('posts').select('*', { count: 'exact', head: true }).gte('created_at', todayStartIso),
      supabase.from('profiles').select('*', { count: 'exact', head: true }).gte('created_at', todayStartIso),
      supabase.from('posts').select('created_at').order('created_at', { ascending: false }).limit(3000),
      supabase.from('comments').select('created_at').order('created_at', { ascending: false }).limit(3000),
      supabase.from('profiles').select('created_at').order('created_at', { ascending: false }).limit(3000),
      supabase.from('posts').select('board').limit(5000),
      supabase.from('posts').select('author_id').gte('created_at', sevenDaysAgoIso),
      supabase.from('comments').select('author_id').gte('created_at', sevenDaysAgoIso),
      supabase.from('comments').select('post_id').limit(5000),
      supabase.from('posts').select('id,title,board,views,author_id,created_at').limit(5000),
      supabase.from('likes').select('post_id').limit(5000),
      supabase.from('profiles').select('id,nickname').limit(2000),
    ]);

    const likeCountByPost = {};
    (rankLikesRes.data || []).forEach((r) => {
      likeCountByPost[r.post_id] = (likeCountByPost[r.post_id] || 0) + 1;
    });
    const commentCountByPost = {};
    (commentedPostIdsRes.data || []).forEach((r) => {
      commentCountByPost[r.post_id] = (commentCountByPost[r.post_id] || 0) + 1;
    });
    const postsWithScore = (rankPostsRes.data || []).map((p) => {
      const likes = likeCountByPost[p.id] || 0;
      const commentCount = commentCountByPost[p.id] || 0;
      return { ...p, likes, score: hotScore(p.views, likes, commentCount, p.created_at) };
    });
    setTopPosts([...postsWithScore].sort((a, b) => b.score - a.score).slice(0, 10));

    const nicknameById = {};
    (rankProfilesRes.data || []).forEach((u) => { nicknameById[u.id] = u.nickname; });
    const authorAgg = {};
    postsWithScore.forEach((p) => {
      if (!p.author_id) return;
      if (!authorAgg[p.author_id]) authorAgg[p.author_id] = { authorId: p.author_id, score: 0, postCount: 0 };
      authorAgg[p.author_id].score += p.score;
      authorAgg[p.author_id].postCount += 1;
    });
    const topAuthorsComputed = Object.values(authorAgg)
      .map((a) => ({ ...a, nickname: nicknameById[a.authorId] || '알 수 없음' }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
    setTopAuthors(topAuthorsComputed);

    const activeUserIds = new Set();
    (activePostAuthorsRes.data || []).forEach((r) => { if (r.author_id) activeUserIds.add(r.author_id); });
    (activeCommentAuthorsRes.data || []).forEach((r) => { if (r.author_id) activeUserIds.add(r.author_id); });

    const commentedPostIds = new Set((commentedPostIdsRes.data || []).map((r) => r.post_id));
    const noCommentRatio = postRes.count
      ? Math.round(((postRes.count - commentedPostIds.size) / postRes.count) * 100)
      : 0;

    setTotals({
      users: userRes.count,
      posts: postRes.count,
      comments: commentRes.count,
      likes: likeRes.count,
      pendingReports: pendingReportRes.count,
      banned: bannedRes.count,
      todayPosts: todayPostRes.count,
      todayUsers: todayUserRes.count,
      activeUsers7d: activeUserIds.size,
      noCommentRatio,
    });

    setPostDates((recentPostRes.data || []).map((p) => p.created_at));
    setCommentDates((recentCommentRes.data || []).map((c) => c.created_at));
    setUserDates((recentUserRes.data || []).map((u) => u.created_at));

    const boardCounts = {};
    (boardRes.data || []).forEach((p) => {
      boardCounts[p.board] = (boardCounts[p.board] || 0) + 1;
    });
    const boardRows = Object.entries(boardCounts)
      .map(([board, count]) => ({ board, label: BOARD_LABELS[board] || board, count }))
      .sort((a, b) => b.count - a.count);
    setByBoard(boardRows);

    setLoading(false);
  }

  if (loading || !totals) return <p style={{ color: 'var(--muted)' }}>불러오는 중...</p>;

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 12, marginBottom: 28 }}>
        <StatCard label="총 회원 수" value={totals.users} />
        <StatCard label="총 글 수" value={totals.posts} />
        <StatCard label="총 댓글 수" value={totals.comments} />
        <StatCard label="총 좋아요 수" value={totals.likes} />
        <StatCard label="미처리 신고" value={totals.pendingReports} />
        <StatCard label="차단된 회원" value={totals.banned} />
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 28 }}>
        <StatCard label="오늘 새 글" value={totals.todayPosts} />
        <StatCard label="오늘 신규 가입" value={totals.todayUsers} />
        <StatCard label="최근 7일 활동 회원" value={totals.activeUsers7d} />
        <StatCard label="댓글 없는 글 비율" value={totals.posts ? `${totals.noCommentRatio}%` : '-'} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 4 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {[
            { key: 'posts', label: '게시글 수' },
            { key: 'comments', label: '댓글 수' },
            { key: 'signups', label: '신규 가입' },
          ].map((m) => (
            <button
              key={m.key}
              onClick={() => setActivityMetric(m.key)}
              style={{
                border: 'none',
                background: 'none',
                padding: '6px 4px',
                fontSize: 16,
                fontWeight: 800,
                cursor: 'pointer',
                color: activityMetric === m.key ? 'var(--brand)' : 'var(--muted)',
                borderBottom: activityMetric === m.key ? '2px solid var(--brand)' : '2px solid transparent',
              }}
            >
              {m.label}
            </button>
          ))}
        </div>
        <PeriodToggle period={activityPeriod} setPeriod={setActivityPeriod} />
      </div>
      <div style={{ marginBottom: 28 }}>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={daily} margin={{ top: 8, right: 12, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e6d3df" />
            <XAxis dataKey="date" tickFormatter={(d) => d.slice(5)} fontSize={11} stroke="#a294a0" />
            <YAxis allowDecimals={false} fontSize={11} stroke="#a294a0" />
            <Tooltip
              labelFormatter={(d) => d}
              formatter={(value) => [value, ACTIVITY_METRIC_LABELS[activityMetric]]}
              contentStyle={{ borderRadius: 10, border: '1px solid #e6d3df', fontSize: 13 }}
            />
            <Line
              type="monotone"
              dataKey="count"
              stroke={ACTIVITY_METRIC_COLORS[activityMetric]}
              strokeWidth={2.5}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <h2 style={{ fontWeight: 800, fontSize: 16, marginBottom: 4 }}>시간대별 글 작성 분포</h2>
      <p style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 12 }}>
        최근 게시글 최대 3000개 기준 (0~23시, 한국 시간)
      </p>
      <div style={{ marginBottom: 28 }}>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={hourly} margin={{ top: 8, right: 12, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e6d3df" />
            <XAxis dataKey="hour" tickFormatter={(h) => `${h}시`} fontSize={11} stroke="#a294a0" interval={1} />
            <YAxis allowDecimals={false} fontSize={11} stroke="#a294a0" />
            <Tooltip
              labelFormatter={(h) => `${h}시`}
              formatter={(value) => [value, '게시글 수']}
              contentStyle={{ borderRadius: 10, border: '1px solid #e6d3df', fontSize: 13 }}
            />
            <Bar dataKey="count" fill="#7cc3e0" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <h2 style={{ fontWeight: 800, fontSize: 16, marginBottom: 14 }}>게시판별 글 수</h2>
      {byBoard.length === 0 ? (
        <p style={{ color: 'var(--muted)' }}>글이 없어요.</p>
      ) : (
        <ResponsiveContainer width="100%" height={Math.max(200, byBoard.length * 36)}>
          <BarChart data={byBoard} layout="vertical" margin={{ top: 8, right: 24, left: 8, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e6d3df" horizontal={false} />
            <XAxis type="number" allowDecimals={false} fontSize={11} stroke="#a294a0" />
            <YAxis type="category" dataKey="label" fontSize={12} stroke="#a294a0" width={100} />
            <Tooltip
              formatter={(value) => [value, '게시글 수']}
              contentStyle={{ borderRadius: 10, border: '1px solid #e6d3df', fontSize: 13 }}
            />
            <Bar dataKey="count" fill="#a3c07a" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}

      <h2 style={{ fontWeight: 800, fontSize: 16, margin: '28px 0 14px' }}>인기 글 TOP 10</h2>
      <p style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 12 }}>
        기준: 좋아요 + 조회수 ÷ 10 (사이트 인기순 정렬과 동일)
      </p>
      {topPosts.length === 0 ? (
        <p style={{ color: 'var(--muted)' }}>글이 없어요.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {topPosts.map((p, i) => (
            <div key={p.id} style={{ ...rowStyle, padding: '10px 14px' }}>
              <div style={{ width: 22, fontWeight: 900, color: 'var(--brand)', flexShrink: 0 }}>{i + 1}</div>
              <div
                style={{
                  flex: 1,
                  minWidth: 0,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  fontWeight: 700,
                  fontSize: 13,
                }}
              >
                {p.title}
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted)', flexShrink: 0 }}>
                {BOARD_LABELS[p.board] || p.board} · 조회 {p.views} · 좋아요 {p.likes}
              </div>
            </div>
          ))}
        </div>
      )}

      <h2 style={{ fontWeight: 800, fontSize: 16, margin: '28px 0 14px' }}>인기 작성자 TOP 10</h2>
      <p style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 12 }}>
        기준: 작성한 글들의 인기 점수 합산 (익명 글은 제외)
      </p>
      {topAuthors.length === 0 ? (
        <p style={{ color: 'var(--muted)' }}>집계할 데이터가 없어요.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {topAuthors.map((a, i) => (
            <div key={a.authorId} style={{ ...rowStyle, padding: '10px 14px' }}>
              <div style={{ width: 22, fontWeight: 900, color: 'var(--brand)', flexShrink: 0 }}>{i + 1}</div>
              <div style={{ flex: 1, minWidth: 0, fontWeight: 700, fontSize: 13 }}>{a.nickname}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', flexShrink: 0 }}>
                글 {a.postCount}개 · 점수 {Math.round(a.score)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AdminDashboard({ profile }) {
  const [tab, setTab] = useState('posts'); // posts | users | notices | stats

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '32px 20px' }}>
      <h1 style={{ fontWeight: 900, fontSize: 24, marginBottom: 8 }}>Palo 관리자</h1>
      <p style={{ color: 'var(--muted)', marginBottom: 24 }}>{profile.nickname}님, 환영해요.</p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, borderBottom: '1.5px solid var(--line)' }}>
        <button
          onClick={() => setTab('posts')}
          style={{
            background: 'none',
            border: 'none',
            padding: '10px 4px',
            marginRight: 16,
            fontWeight: 800,
            fontSize: 14,
            cursor: 'pointer',
            color: tab === 'posts' ? 'var(--brand)' : 'var(--muted)',
            borderBottom: tab === 'posts' ? '2px solid var(--brand)' : '2px solid transparent',
          }}
        >
          글 관리
        </button>
        <button
          onClick={() => setTab('users')}
          style={{
            background: 'none',
            border: 'none',
            padding: '10px 4px',
            fontWeight: 800,
            fontSize: 14,
            cursor: 'pointer',
            color: tab === 'users' ? 'var(--brand)' : 'var(--muted)',
            borderBottom: tab === 'users' ? '2px solid var(--brand)' : '2px solid transparent',
          }}
        >
          회원 관리
        </button>
        <button
          onClick={() => setTab('notices')}
          style={{
            background: 'none',
            border: 'none',
            padding: '10px 4px',
            marginLeft: 16,
            fontWeight: 800,
            fontSize: 14,
            cursor: 'pointer',
            color: tab === 'notices' ? 'var(--brand)' : 'var(--muted)',
            borderBottom: tab === 'notices' ? '2px solid var(--brand)' : '2px solid transparent',
          }}
        >
          공지 작성
        </button>
        <button
          onClick={() => setTab('stats')}
          style={{
            background: 'none',
            border: 'none',
            padding: '10px 4px',
            marginLeft: 16,
            fontWeight: 800,
            fontSize: 14,
            cursor: 'pointer',
            color: tab === 'stats' ? 'var(--brand)' : 'var(--muted)',
            borderBottom: tab === 'stats' ? '2px solid var(--brand)' : '2px solid transparent',
          }}
        >
          통계
        </button>
      </div>
      {tab === 'posts' && <PostManagement />}
      {tab === 'users' && <UserManagement />}
      {tab === 'notices' && <NoticeManagement />}
      {tab === 'stats' && <StatsPanel />}
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

  return (
    <DialogProvider>
      {status === 'loading' && <Center>확인 중...</Center>}
      {status === 'unauthenticated' && (
        <Center>
          <p>관리자 페이지는 로그인이 필요해요.</p>
          <button style={btnStyle} onClick={login}>구글로 로그인</button>
        </Center>
      )}
      {status === 'forbidden' && <Center>관리자만 접근할 수 있는 페이지예요.</Center>}
      {status === 'admin' && <AdminDashboard profile={profile} />}
    </DialogProvider>
  );
}
