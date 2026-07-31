'use client';

import Script from 'next/script';
import DOMPurify from 'dompurify';
import { BODY_HTML } from './body-html';
import { supabase } from '../lib/supabaseClient';

if (typeof window !== 'undefined') {
  window.supabase = supabase;
  window.DOMPurify = DOMPurify;
  window.VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || '';
}

export default function PaloApp() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: BODY_HTML }} />
      <Script src={`/palo.js?v=${process.env.NEXT_PUBLIC_BUILD_ID}`} strategy="afterInteractive" />
    </>
  );
}
