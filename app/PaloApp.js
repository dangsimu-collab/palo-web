'use client';

import Script from 'next/script';
import { BODY_HTML } from './body-html';
import { supabase } from '../lib/supabaseClient';

if (typeof window !== 'undefined') {
  window.supabase = supabase;
}

export default function PaloApp() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: BODY_HTML }} />
      <Script src="/palo.js" strategy="afterInteractive" />
    </>
  );
}
