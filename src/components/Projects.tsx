'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

type ProjectData = {
  id: number;
  title: string;
  category: string;
  location: string;
  image: string;
  mediaType?: 'image' | 'video' | 'tour';
  tourUrl?: string;
};

const PROJECTS: ProjectData[] = [
  {
    id: 1,
    title: 'Azure Bay Residences',
    category: 'חוץ',
    location: 'ישראל',
    image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%97%D7%95%D7%A5/Azure_Bay_Residences_pool.jpg',
  },
  {
    id: 2,
    title: 'Eden Curve Residences',
    category: 'חוץ',
    location: 'ישראל',
    image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%97%D7%95%D7%A5/Eden_Curve_Residences_front.jpg',
  },
  {
    id: 3,
    title: 'Eden Curve Residences',
    category: 'חוץ',
    location: 'ישראל',
    image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%97%D7%95%D7%A5/Eden_Curve_Residences_exterior_loby.jpg',
  },
  {
    id: 4,
    title: 'Parkline Heights Tower',
    category: 'חוץ',
    location: 'ישראל',
    image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%97%D7%95%D7%A5/Parkline%20Heights%20Tower.jpg',
  },
  {
    id: 5,
    title: 'Parkline Heights Tower',
    category: 'חוץ',
    location: 'ישראל',
    image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%97%D7%95%D7%A5/Parkline%20Heights%20Tower_top.jpg',
  },
  {
    id: 6,
    title: 'The Illuminated City Peak',
    category: 'חוץ',
    location: 'ישראל',
    image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%97%D7%95%D7%A5/The_Illuminated_City_Peak.jpg',
  },
  {
    id: 7,
    title: 'Urban Breeze',
    category: 'חוץ',
    location: 'ישראל',
    image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%97%D7%95%D7%A5/Urban_Breeze.jpg',
  },
  {
    id: 8,
    title: 'The Cube',
    category: 'חוץ',
    location: 'ישראל',
    image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%97%D7%95%D7%A5/the_cube_buildings_drone.jpg',
  },
  {
    id: 9,
    title: 'The Cube',
    category: 'חוץ',
    location: 'ישראל',
    image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%97%D7%95%D7%A5/the_cube_buildings_human.jpg',
  },
  {
    id: 10,
    title: 'Robin',
    category: 'חוץ',
    location: 'הרצליה פיתוח',
    image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%97%D7%95%D7%A5/robin_herzelya_pituah.jpg',
  },
  { id: 11, title: 'Interior Render',          category: 'פנים', location: 'ישראל',         image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/3.png' },
  { id: 12, title: 'Azure Bay Residences',     category: 'פנים', location: 'ישראל',         image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/Azure_Bay_Residences_balcony.jpg' },
  { id: 13, title: 'Azure Bay Residences',     category: 'פנים', location: 'ישראל',         image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/Azure_Bay_Residences_spa.jpg' },
  { id: 14, title: 'Azure Bay Residences',     category: 'פנים', location: 'ישראל',         image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/Azure_Bay_Residences_resturant.jpg' },
  { id: 15, title: 'Eden Curve Residences',    category: 'פנים', location: 'ישראל',         image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/Eden_Curve_Residences_interior_loby_people.jpg' },
  { id: 16, title: 'Eden Curve Residences',    category: 'פנים', location: 'ישראל',         image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/Eden_Curve_Residences_bed_room.jpg' },
  { id: 17, title: 'Eden Curve Residences',    category: 'פנים', location: 'ישראל',         image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/Eden_Curve_Residences_balcony.jpg' },
  { id: 18, title: 'Interior Render',          category: 'פנים', location: 'ישראל',         image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/Generated%20Image%20April%2015%2C%202026%20-%2010_21AM.jpg' },
  { id: 19, title: 'Interior Render',          category: 'פנים', location: 'ישראל',         image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/Generated%20Image%20April%2015%2C%202026%20-%2010_22AM.jpg' },
  { id: 20, title: 'Interior Render',          category: 'פנים', location: 'ישראל',         image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/Generated%20Image%20April%2015%2C%202026%20-%2010_25AM.jpg' },
  { id: 21, title: 'Interior Render',          category: 'פנים', location: 'ישראל',         image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/Generated%20Image%20April%2015%2C%202026%20-%2010_23AM.jpg' },
  { id: 22, title: 'Interior Render',          category: 'פנים', location: 'ישראל',         image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/Generated%20Image%20April%2015%2C%202026%20-%2010_29AM.jpg' },
  { id: 23, title: 'Interior Render',          category: 'פנים', location: 'ישראל',         image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/Generated%20Image%20April%2015%2C%202026%20-%2010_31AM.jpg' },
  { id: 24, title: 'Interior Render',          category: 'פנים', location: 'ישראל',         image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/Generated%20Image%20April%2015%2C%202026%20-%2010_34AM.jpg' },
  { id: 25, title: 'Interior Render',          category: 'פנים', location: 'ישראל',         image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/Generated%20Image%20April%2015%2C%202026%20-%2012_14PM.jpg' },
  { id: 26, title: 'Interior Render',          category: 'פנים', location: 'ישראל',         image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/Generated%20Image%20April%2015%2C%202026%20-%2010_59AM.jpg' },
  { id: 27, title: 'Interior Render',          category: 'פנים', location: 'ישראל',         image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/Generated%20Image%20April%2022%2C%202026%20-%208_31PM.jpg' },
  { id: 28, title: 'Parkline Heights Tower',   category: 'פנים', location: 'ישראל',         image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/Parkline%20Heights%20Tower_office.jpg' },
  { id: 29, title: 'The Illuminated City Peak',category: 'פנים', location: 'ישראל',         image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/The_Illuminated_City_Peak_resturant.jpg' },
  { id: 30, title: 'Urban Breeze',             category: 'פנים', location: 'ישראל',         image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/Urban%20Breeze_interiors.jpg' },
  { id: 31, title: 'The Cube',                 category: 'פנים', location: 'ישראל',         image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/the_cube_buildings_GYM.jpg' },
  { id: 32, title: 'The Cube',                 category: 'פנים', location: 'ישראל',         image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/the_cube_buildings_penthouse.jpg' },
  { id: 33, title: 'The Cube',                 category: 'פנים', location: 'ישראל',         image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/the_cube_buildings_bed_room.jpg' },
  { id: 34, title: 'Graphic Design', category: 'גרפיקה', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%92%D7%A8%D7%A4%D7%99%D7%A7%D7%94/AP%209.jpg' },
  { id: 35, title: 'Graphic Design', category: 'גרפיקה', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%92%D7%A8%D7%A4%D7%99%D7%A7%D7%94/FLOOR_02.jpg' },
  { id: 36, title: 'Graphic Design', category: 'גרפיקה', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%92%D7%A8%D7%A4%D7%99%D7%A7%D7%94/Generated%20Image%20April%2012%2C%202026%20-%202_05PM.jpg' },
  { id: 37, title: 'Graphic Design', category: 'גרפיקה', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%92%D7%A8%D7%A4%D7%99%D7%A7%D7%94/Generated%20Image%20April%2015%2C%202026%20-%201_52PM.jpg' },
  { id: 38, title: 'Graphic Design', category: 'גרפיקה', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%92%D7%A8%D7%A4%D7%99%D7%A7%D7%94/Generated%20Image%20April%2015%2C%202026%20-%202_00PM.jpg' },
  { id: 39, title: 'Graphic Design', category: 'גרפיקה', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%92%D7%A8%D7%A4%D7%99%D7%A7%D7%94/all%201%20copy.jpg' },
  { id: 40, title: 'Graphic Design', category: 'גרפיקה', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%92%D7%A8%D7%A4%D7%99%D7%A7%D7%94/b2%20copy.jpg' },
  { id: 41, title: 'Graphic Design', category: 'גרפיקה', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%92%D7%A8%D7%A4%D7%99%D7%A7%D7%94/%D7%A7%D7%95%D7%9E%D7%94%20%D7%A8%D7%91%D7%99%D7%A2%D7%99%D7%AA%20%D7%93%D7%99%D7%A8%D7%94%20%D7%9E%D7%A1\'%2012.jpg' },
  { id: 42, title: 'Graphic Design', category: 'גרפיקה', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%92%D7%A8%D7%A4%D7%99%D7%A7%D7%94/%D7%A7%D7%95%D7%9E%D7%AA%20%D7%A7%D7%A8%D7%A7%D7%A2%20%D7%93%D7%99%D7%A8%D7%94%20%D7%9E%D7%A1\'%201.jpg' },
  { id: 43, title: 'רובין הרצליה',   category: 'אנימציה', location: 'הרצליה', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%A1%D7%A8%D7%98%D7%95%D7%A0%D7%99%D7%9D/%D7%A8%D7%95%D7%91%D7%99%D7%9F%20%D7%94%D7%A8%D7%A6%D7%9C%D7%99%D7%94.mp4', mediaType: 'video' },
  { id: 44, title: 'גבעת אולגה',     category: 'אנימציה', location: 'ישראל',  image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%A1%D7%A8%D7%98%D7%95%D7%A0%D7%99%D7%9D/givat%20olga.mp4', mediaType: 'video' },
  { id: 45, title: 'סיור וירטואלי — רובין הרצליה', category: 'סיור וירטואלי', location: 'הרצליה פיתוח', image: '', mediaType: 'tour', tourUrl: 'https://app.seekbeak.com/v/rNj7DdoZqJd' },
];

type Project = ProjectData;
type Category = 'הכל' | 'חוץ' | 'פנים' | 'גרפיקה' | 'אנימציה' | 'סיור וירטואלי';
const CATEGORIES: Category[] = ['הכל', 'חוץ', 'פנים', 'גרפיקה', 'אנימציה', 'סיור וירטואלי'];

// Deep links: /#gallery opens straight on the gallery, /#gallery/interior also
// pre-selects a filter. Slugs stay in English so the URL survives copy-paste.
const CATEGORY_SLUGS: Record<string, Category> = {
  all:       'הכל',
  exterior:  'חוץ',
  interior:  'פנים',
  graphics:  'גרפיקה',
  animation: 'אנימציה',
  tour:      'סיור וירטואלי',
};

const CATEGORY_LABELS: Record<Category, { he: string; en: string }> = {
  'הכל':          { he: 'הכל',          en: 'All'          },
  'חוץ':          { he: 'חוץ',          en: 'Exterior'     },
  'פנים':         { he: 'פנים',         en: 'Interior'     },
  'גרפיקה':       { he: 'גרפיקה',       en: 'Graphics'     },
  'אנימציה':      { he: 'אנימציה',      en: 'Animation'    },
  'סיור וירטואלי': { he: '360°', en: '360°' },
};

function Lightbox({
  project,
  currentIndex,
  total,
  onClose,
  onPrev,
  onNext,
}: {
  project: Project;
  currentIndex: number;
  total: number;
  onClose: () => void;
  onPrev: (() => void) | null;
  onNext: (() => void) | null;
}) {
  const isVideo = project.mediaType === 'video';
  const isTour  = project.mediaType === 'tour';

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')                    onClose();
      if (e.key === 'ArrowLeft'  && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onPrev, onNext]);

  const navBtn = 'absolute top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center text-[#c0bcb8] hover:text-[#ffffff] transition-colors duration-200 border border-[#282828] hover:border-[#505050] bg-[#080808]/80 disabled:opacity-20';

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 lg:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute inset-0 bg-[#080808]/92 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* ── Prev ── */}
      <button
        onClick={onPrev ?? undefined}
        disabled={!onPrev}
        className={`${navBtn} left-3 lg:left-6`}
        aria-label="הקודם"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>

      {/* ── Next ── */}
      <button
        onClick={onNext ?? undefined}
        disabled={!onNext}
        className={`${navBtn} right-3 lg:right-6`}
        aria-label="הבא"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>

      {/* ── Content ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={project.id}
          className={[
            'relative z-10 w-full flex items-center justify-center',
            isTour ? 'max-w-6xl h-[85vh]' : 'max-w-5xl max-h-[90vh]',
          ].join(' ')}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {isTour ? (
            <iframe
              src={project.tourUrl}
              className="w-full h-full border-0"
              allowFullScreen
              allow="xr-spatial-tracking; gyroscope; accelerometer"
            />
          ) : isVideo ? (
            <video
              src={project.image}
              controls
              autoPlay
              className="max-w-full max-h-[90vh] w-auto h-auto"
            />
          ) : (
            <img
              src={project.image}
              alt=""
              role="presentation"
              className="max-w-full max-h-[90vh] w-auto h-auto object-contain"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* ── Counter ── */}
      {total > 1 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 font-sans text-[11px] tracking-widest text-[#c0bcb8]">
          {currentIndex + 1} / {total}
        </div>
      )}

      {/* ── Close ── */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-20 w-10 h-10 flex items-center justify-center text-[#c0bcb8] hover:text-[#ffffff] transition-colors duration-200 border border-[#282828] hover:border-[#505050] bg-[#080808]/60"
        aria-label="סגור"
      >
        ✕
      </button>
    </motion.div>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<Category>('הכל');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const headRef  = useRef<HTMLDivElement>(null);
  const inView   = useInView(headRef, { once: false, margin: '-80px' });
  const { lang } = useLanguage();
  const isHe     = lang === 'he';

  // Land directly on the gallery when the URL carries #gallery / #projects.
  // Runs on load and on every hash change — editing the hash on an already-open
  // page fires `hashchange` instead of reloading, so a mount-only read would
  // leave the gallery stuck on whichever filter it was showing.
  useEffect(() => {
    let timers: number[] = [];

    // Any real scroll input means the visitor took over — stop repositioning them.
    const stopAligning = () => {
      timers.forEach(clearTimeout);
      timers = [];
    };

    const applyHash = () => {
      const [name, slug] = window.location.hash.slice(1).toLowerCase().split('/');
      if (name !== 'gallery' && name !== 'projects') return;

      setActiveFilter(slug ? CATEGORY_SLUGS[slug] ?? 'הכל' : 'הכל');

      // 'instant' overrides the global scroll-behavior: smooth — the page should
      // already be on the gallery when it appears, not scroll there in front of you.
      const align = () =>
        document.getElementById('projects')?.scrollIntoView({ block: 'start', behavior: 'instant' });

      // The masonry images stream in and keep pushing the section down, so one
      // scroll lands in the wrong place — re-align until the layout settles.
      stopAligning();
      align();
      timers = [100, 400, 900, 1600, 2500].map((ms) => window.setTimeout(align, ms));
    };

    applyHash();
    window.addEventListener('hashchange', applyHash);
    window.addEventListener('wheel', stopAligning, { passive: true });
    window.addEventListener('touchstart', stopAligning, { passive: true });
    window.addEventListener('keydown', stopAligning);

    return () => {
      stopAligning();
      window.removeEventListener('hashchange', applyHash);
      window.removeEventListener('wheel', stopAligning);
      window.removeEventListener('touchstart', stopAligning);
      window.removeEventListener('keydown', stopAligning);
    };
  }, []);

  const filtered =
    activeFilter === 'הכל'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  const lightboxProject = lightboxIndex !== null ? filtered[lightboxIndex] : null;
  const onPrev = lightboxIndex !== null && lightboxIndex > 0 ? () => setLightboxIndex(lightboxIndex - 1) : null;
  const onNext = lightboxIndex !== null && lightboxIndex < filtered.length - 1 ? () => setLightboxIndex(lightboxIndex + 1) : null;

  return (
    <>
      <AnimatePresence>
        {lightboxProject && (
          <Lightbox
            project={lightboxProject}
            currentIndex={lightboxIndex!}
            total={filtered.length}
            onClose={() => setLightboxIndex(null)}
            onPrev={onPrev}
            onNext={onNext}
          />
        )}
      </AnimatePresence>

      <section id="projects" className="relative py-32 lg:py-48 bg-[#080808]">
        <div className="rule-fade absolute top-0 inset-x-0" />

        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">

          <div ref={headRef} className="mb-14">
            <motion.div
              initial={{ opacity: 0, y: 56, scale: 0.97 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 56, scale: 0.97 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="section-label block mb-5">{isHe ? 'גלריה' : 'Gallery'}</span>
              <h2
                className="font-serif font-light leading-[1.1] text-[#ffffff]"
                style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.2rem)' }}
              >
                {isHe ? (
                  <>מגוון שלם<br />של שירותים <span className="font-bold text-[#c8a96c]">ויזואלים</span></>
                ) : (
                  <>A Complete Range<br />of <span className="font-bold text-[#c8a96c]">Visual Services</span></>
                )}
              </h2>
            </motion.div>
          </div>

          <motion.div
            className="flex flex-wrap gap-2 mb-12"
            initial={{ opacity: 0, y: 44, scale: 0.97 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 56, scale: 0.97 }}
            transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={[
                  'font-sans text-[11px] px-4 py-2.5 border transition-all duration-300',
                  activeFilter === cat
                    ? 'border-[#c8a96c]/60 text-[#c8a96c] bg-[#c8a96c]/05'
                    : 'border-[#282828] text-[#c0bcb8] hover:border-[#2a2a2a] hover:text-[#ffffff]',
                ].join(' ')}
              >
                {CATEGORY_LABELS[cat][lang]}
              </button>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              className="columns-2 lg:columns-3 gap-3 lg:gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  className="break-inside-avoid mb-3 lg:mb-4 group cursor-pointer overflow-hidden"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setLightboxIndex(i)}
                >
                  {project.mediaType === 'tour' ? (
                    <div className="aspect-square bg-[#0e0e0e] border border-[#1e1e1e] flex flex-col items-center justify-center gap-3 transition-all duration-500 group-hover:border-[#c8a96c]/40">
                      <div className="w-10 h-10 lg:w-14 lg:h-14 rounded-full border border-[#c8a96c]/40 flex items-center justify-center group-hover:border-[#c8a96c]/80 transition-colors duration-300">
                        <span className="font-sans text-[9px] lg:text-[11px] tracking-widest text-[#c8a96c]">360°</span>
                      </div>
                      <div className="text-center px-3">
                        <p className="font-sans text-[10px] leading-snug text-[#ffffff] mb-1">{project.title}</p>
                        <p className="font-sans text-[9px] text-[#c0bcb8]">{project.location}</p>
                      </div>
                      <p className="font-sans text-[10px] tracking-[0.15em] text-[#c8a96c]/60 group-hover:text-[#c8a96c] transition-colors duration-300">
                        {isHe ? 'לחץ לצפייה' : 'Click to View'}
                      </p>
                    </div>
                  ) : project.mediaType === 'video' ? (
                    <div className="aspect-video overflow-hidden">
                      <video
                        src={project.image}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <img
                      src={project.image}
                      alt=""
                      role="presentation"
                      className="w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  )}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          <motion.div
            className="mt-16 flex justify-center"
            initial={{ opacity: 0, y: 44, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7 }}
          >
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="group flex items-center gap-4 font-sans text-[12px] text-[#c0bcb8] hover:text-[#c8a96c] transition-colors duration-300"
            >
              <span className="h-px w-8 bg-[#2a2520] group-hover:bg-[#c8a96c]/60 transition-colors duration-300" />
              {isHe ? 'פנה אלינו לגבי פרויקט' : 'Contact Us About a Project'}
              <span className="h-px w-8 bg-[#2a2520] group-hover:bg-[#c8a96c]/60 transition-colors duration-300" />
            </button>
          </motion.div>
        </div>

      </section>
    </>
  );
}
