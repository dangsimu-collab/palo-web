import { createClient } from '@supabase/supabase-js';
import PaloApp from '../../PaloApp';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function generateMetadata({ params }) {
  const { id } = await params;
  const { data: profile } = await supabase
    .from('profiles')
    .select('nickname')
    .eq('id', id)
    .single();

  if (!profile) {
    return { title: 'commi · 그림 그리는 사람들의 커뮤니티' };
  }

  const title = `${profile.nickname}님의 프로필 · commi`;
  return {
    title,
    openGraph: { title },
  };
}

export default function UserProfilePage() {
  return <PaloApp />;
}
