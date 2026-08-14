'use client';

import { useEffect } from 'react';

/**
 * /gallery is a shareable short link, not a real page — it hands the visitor
 * to the gallery section on the home page. `replace` keeps it out of the
 * history stack so the back button returns to wherever they came from.
 */
export default function GalleryRedirect() {
  useEffect(() => {
    window.location.replace('/#gallery');
  }, []);

  return (
    <main className="min-h-screen bg-[#080808] text-[#e8e2d9] flex items-center justify-center p-8">
      <p className="font-sans text-[13px]">
        מעביר לגלריה…{' '}
        <a href="/#gallery" className="text-[#c8a96c] underline">
          לחצו כאן אם לא הועברתם אוטומטית
        </a>
      </p>
    </main>
  );
}
