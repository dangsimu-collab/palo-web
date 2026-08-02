import { createClient } from '@supabase/supabase-js';
import PaloApp from '../../PaloApp';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function generateMetadata({ params }) {
  const { id } = await params;
  const { data: post } = await supabase
    .from('posts')
    .select('title, content')
    .eq('id', id)
    .single();

  if (!post) {
    return { title: 'commi · 그림 그리는 사람들의 커뮤니티' };
  }

  const title = `${post.title} · commi`;
  const description = (post.content || '').slice(0, 80);

  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default function PostPage() {
  return <PaloApp />;
}
