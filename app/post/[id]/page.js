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
    .select('title, content, post_images(url, sort)')
    .eq('id', id)
    .single();

  if (!post) {
    return { title: 'commi · 그림 그리는 사람들의 커뮤니티' };
  }

  const title = `${post.title} · commi`;
  const description = (post.content || 'commi에서 이 이야기를 확인해보세요.').replace(/\s+/g, ' ').trim().slice(0, 100);
  const imgs = (post.post_images || []).slice().sort((a, b) => (a.sort || 0) - (b.sort || 0));
  const images = imgs.length && imgs[0].url ? [imgs[0].url] : ['/icon-512.png'];

  return {
    title,
    description,
    openGraph: { title, description, images },
  };
}

export default function PostPage() {
  return <PaloApp />;
}
