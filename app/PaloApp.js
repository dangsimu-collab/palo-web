'use client';

import Script from 'next/script';
import DOMPurify from 'dompurify';
import { BODY_HTML } from './body-html';
import { supabase } from '../lib/supabaseClient';

if (typeof window !== 'undefined') {
  window.supabase = supabase;
  window.DOMPurify = DOMPurify;
}

export default function PaloApp() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: BODY_HTML }} />
      <Script src="/palo.js" strategy="afterInteractive" />
    </>
  );
}
