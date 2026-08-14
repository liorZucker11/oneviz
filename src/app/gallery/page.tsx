import type { Metadata } from 'next';
import GalleryRedirect from './GalleryRedirect';

// Link-preview tags live here (server side) so WhatsApp and friends see them —
// crawlers read this page rather than following the client-side redirect.
export const metadata: Metadata = {
  title: 'OneViz Studio — גלריה',
  description:
    'גלריית העבודות של OneViz — הדמיות חוץ ופנים, אנימציות, גרפיקה וסיורים וירטואליים.',
  openGraph: {
    title: 'OneViz Studio — גלריה',
    description:
      'גלריית העבודות של OneViz — הדמיות חוץ ופנים, אנימציות, גרפיקה וסיורים וירטואליים.',
    type: 'website',
    images: ['/OneViz_logo_text_white.png'],
  },
  alternates: { canonical: '/' },
  robots: { index: false, follow: true },
};

export default function GalleryPage() {
  return <GalleryRedirect />;
}
