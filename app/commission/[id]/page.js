import { createClient } from '@supabase/supabase-js';
import PaloApp from '../../PaloApp';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function generateMetadata({ params }) {
  const { id } = await params;
  const { data: c } = await supabase
    .from('commissions')
    .select('title, description, commission_images(url, sort)')
    .eq('id', id)
    .single();

  if (!c) {
    return { title: '커미션 · commi' };
  }

  const title = `${c.title || '커미션'} · commi`;
  const description = (c.description || '커미션 정보를 확인해보세요.').slice(0, 100);
  const imgs = (c.commission_images || []).slice().sort((a, b) => (a.sort || 0) - (b.sort || 0));
  const images = imgs.length && imgs[0].url ? [imgs[0].url] : undefined;

  return {
    title,
    description,
    openGraph: { title, description, images },
  };
}

export default function CommissionPage() {
  return <PaloApp />;
}
