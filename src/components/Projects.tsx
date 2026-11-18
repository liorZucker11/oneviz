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
  caption?: string;
};

const EVA_CAPTION  = 'פרויקט נבחר בתקופת עבודתי במשרד אווה סטודיו';
const AMRAM_CAPTION = 'עבור הלקוח אמרם אברהם';

const PROJECTS: ProjectData[] = [
  { id: 145, title: 'Beni Ayash', category: 'חוץ', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/Exteriors/Amram_Avrham_1.jpg', caption: AMRAM_CAPTION },
  { id: 146, title: 'Beni Ayash', category: 'חוץ', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/Exteriors/Amram_Avrham_2.jpg', caption: AMRAM_CAPTION },
  { id: 147, title: 'Beni Ayash', category: 'חוץ', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/Exteriors/Amram_Avrham_3.jpg', caption: AMRAM_CAPTION },
  { id: 148, title: 'Beni Ayash', category: 'חוץ', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/Exteriors/Amram_Avrham_4.jpg', caption: AMRAM_CAPTION },
  { id: 1, title: 'AFULA', category: 'חוץ', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/Exteriors/AFULA_C4.png' },
  { id: 2, title: 'AFULA', category: 'חוץ', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/Exteriors/AFULA_C5.png' },
  { id: 3, title: 'AFULA', category: 'חוץ', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/Exteriors/AFULA_C6.png' },
  { id: 8, title: 'ATLIT', category: 'חוץ', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/Exteriors/ATLIT_C1.jpg', caption: EVA_CAPTION },
  { id: 9, title: 'ATLIT', category: 'חוץ', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/Exteriors/ATLIT_C6.jpg', caption: EVA_CAPTION },
  { id: 15, title: 'BER YAKOV', category: 'חוץ', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/Exteriors/BER_YAKOV_C1.jpg', caption: EVA_CAPTION },
  { id: 16, title: 'BER YAKOV', category: 'חוץ', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/Exteriors/BER_YAKOV_C2.jpg', caption: EVA_CAPTION },
  { id: 17, title: 'BER YAKOV', category: 'חוץ', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/Exteriors/BER_YAKOV_C4.png', caption: EVA_CAPTION },
  { id: 18, title: 'BER YAKOV', category: 'חוץ', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/Exteriors/BER_YAKOV_C5.png', caption: EVA_CAPTION },
  { id: 19, title: 'BRITANYA ISRAEL', category: 'חוץ', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/Exteriors/BRITANYA_ISRAEL_C1.jpg', caption: EVA_CAPTION },
  { id: 20, title: 'BRITANYA ISRAEL', category: 'חוץ', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/Exteriors/BRITANYA_ISRAEL_C2.jpg', caption: EVA_CAPTION },
  { id: 21, title: 'BRITANYA ISRAEL', category: 'חוץ', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/Exteriors/BRITANYA_ISRAEL_C3.jpg', caption: EVA_CAPTION },
  { id: 22, title: 'BRITANYA ISRAEL', category: 'חוץ', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/Exteriors/BRITANYA_ISRAEL_C4.jpg', caption: EVA_CAPTION },
  { id: 23, title: 'BRITANYA ISRAEL', category: 'חוץ', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/Exteriors/BRITANYA_ISRAEL_C5.jpg', caption: EVA_CAPTION },
  { id: 24, title: 'CHECKPOST', category: 'חוץ', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/Exteriors/CHECKPOST_C1.jpg' },
  { id: 25, title: 'EMEK DOTAN', category: 'חוץ', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/Exteriors/EMEK_DOTAN_C1.jpg', caption: EVA_CAPTION },
  { id: 26, title: 'HaHashmal Haifa', category: 'חוץ', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/Exteriors/EYAL_MALKA_C1.png', caption: EVA_CAPTION },
  { id: 27, title: 'HaHashmal Haifa', category: 'חוץ', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/Exteriors/EYAL_MALKA_C2.png', caption: EVA_CAPTION },
  { id: 28, title: 'Eder', category: 'חוץ', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/Exteriors/Eder_C1.png', caption: EVA_CAPTION },
  { id: 29, title: 'Eder', category: 'חוץ', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/Exteriors/Eder_C2.png', caption: EVA_CAPTION },
  { id: 30, title: 'GAY AND DORON BEER YAKOV', category: 'חוץ', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/Exteriors/GAY_AND_DORON_BEER_YAKOV.png' },
  { id: 31, title: 'GIVAT OLGA', category: 'חוץ', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/Exteriors/GIVAT_OLGA_C1.jpg' },
  { id: 32, title: 'GIVAT OLGA', category: 'חוץ', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/Exteriors/GIVAT_OLGA_C2.png' },
  { id: 33, title: 'HARISHONIM', category: 'חוץ', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/Exteriors/HARISHONIM_C1.png' },
  { id: 34, title: 'HERZELIA', category: 'חוץ', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/Exteriors/HERZELIA.jpg' },
  { id: 35, title: 'HPODIUM', category: 'חוץ', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/Exteriors/HPODIUM_104_C1.png' },
  { id: 36, title: 'HPODIUM', category: 'חוץ', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/Exteriors/HPODIUM_104_C2.png' },
  { id: 37, title: 'KARINCHI', category: 'חוץ', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/Exteriors/KARINCHI_C1.jpg', caption: EVA_CAPTION },
  { id: 38, title: 'KARINCHI', category: 'חוץ', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/Exteriors/KARINCHI_C2.jpg', caption: EVA_CAPTION },
  { id: 39, title: 'MACABI 10', category: 'חוץ', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/Exteriors/MACABI_10_C1.jpg', caption: EVA_CAPTION },
  { id: 40, title: 'MACABI 10', category: 'חוץ', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/Exteriors/MACABI_10_C2.jpg', caption: EVA_CAPTION },
  { id: 41, title: 'Moria', category: 'חוץ', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/Exteriors/Moria_C1.png', caption: EVA_CAPTION },
  { id: 42, title: 'Moshe goshen', category: 'חוץ', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/Exteriors/Moshe_goshen_C3.png', caption: EVA_CAPTION },
  { id: 43, title: 'NEVE DAVID', category: 'חוץ', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/Exteriors/NEVE_DAVID_C1.jpg', caption: EVA_CAPTION },
  { id: 44, title: 'NEVE DAVID', category: 'חוץ', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/Exteriors/NEVE_DAVID_C2.jpg', caption: EVA_CAPTION },
  { id: 45, title: 'NEVE DAVID', category: 'חוץ', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/Exteriors/NEVE_DAVID_C3.jpg', caption: EVA_CAPTION },
  { id: 46, title: 'NEVE DAVID', category: 'חוץ', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/Exteriors/NEVE_DAVID_C4.jpg', caption: EVA_CAPTION },
  { id: 47, title: 'ORENARCH', category: 'חוץ', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/Exteriors/ORENARCH_C1.png' },
  { id: 52, title: 'RAMAT GAN', category: 'חוץ', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/Exteriors/RAMAT_GAN_C2.jpg', caption: EVA_CAPTION },
  { id: 53, title: 'RAMAT GAN', category: 'חוץ', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/Exteriors/RAMAT_GAN_C3.png', caption: EVA_CAPTION },
  { id: 54, title: 'RANNA', category: 'חוץ', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/Exteriors/RANNA_C1.jpg' },
  { id: 55, title: 'AP 9', category: 'גרפיקה', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%92%D7%A8%D7%A4%D7%99%D7%A7%D7%94/AP%209.jpg' },
  { id: 56, title: 'AP 9 bright-style', category: 'גרפיקה', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%92%D7%A8%D7%A4%D7%99%D7%A7%D7%94/AP%209_bright-style.jpg' },
  { id: 57, title: 'AP 9 colord-style', category: 'גרפיקה', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%92%D7%A8%D7%A4%D7%99%D7%A7%D7%94/AP%209_colord-style.jpg' },
  { id: 58, title: 'AP 9 dark-style', category: 'גרפיקה', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%92%D7%A8%D7%A4%D7%99%D7%A7%D7%94/AP%209_dark-style.png' },
  { id: 59, title: 'AP 9 erth-style', category: 'גרפיקה', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%92%D7%A8%D7%A4%D7%99%D7%A7%D7%94/AP%209_erth-style.png' },
  { id: 60, title: 'AP10', category: 'גרפיקה', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%92%D7%A8%D7%A4%D7%99%D7%A7%D7%94/AP10.jpg' },
  { id: 61, title: 'AP11', category: 'גרפיקה', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%92%D7%A8%D7%A4%D7%99%D7%A7%D7%94/AP11.jpg' },
  { id: 62, title: 'FLOOR 02', category: 'גרפיקה', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%92%D7%A8%D7%A4%D7%99%D7%A7%D7%94/FLOOR_02.jpg' },
  { id: 63, title: 'GIVAT OLGA', category: 'גרפיקה', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%92%D7%A8%D7%A4%D7%99%D7%A7%D7%94/GIVAT_OLGA.jpg' },
  { id: 64, title: 'GIVAT OLGA BLUE', category: 'גרפיקה', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%92%D7%A8%D7%A4%D7%99%D7%A7%D7%94/GIVAT_OLGA_BLUE.jpg' },
  { id: 65, title: 'MasterPlan Crop', category: 'גרפיקה', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%92%D7%A8%D7%A4%D7%99%D7%A7%D7%94/MasterPlan_Crop.jpg' },
  { id: 66, title: 'REFERENCE 1', category: 'גרפיקה', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%92%D7%A8%D7%A4%D7%99%D7%A7%D7%94/REFERENCE_1.jpg' },
  { id: 67, title: 'REFERENCE 3', category: 'גרפיקה', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%92%D7%A8%D7%A4%D7%99%D7%A7%D7%94/REFERENCE_3.jpg' },
  { id: 68, title: '1', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/1.png' },
  { id: 71, title: 'ATLIT INTERIOR C1', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/ATLIT_INTERIOR_C1.png' },
  { id: 72, title: 'ATLIT INTERIOR C2', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/ATLIT_INTERIOR_C2.png' },
  { id: 73, title: 'ATLIT INTERIOR C3', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/ATLIT_INTERIOR_C3.png' },
  { id: 74, title: 'Azure Bay Residences apartment', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/Azure_Bay_Residences_apartment.jpg' },
  { id: 75, title: 'Azure Bay Residences balcony', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/Azure_Bay_Residences_balcony.jpg' },
  { id: 76, title: 'Azure Bay Residences pool', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/Azure_Bay_Residences_pool.jpg' },
  { id: 77, title: 'Azure Bay Residences resturant', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/Azure_Bay_Residences_resturant.jpg' },
  { id: 78, title: 'Azure Bay Residences spa', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/Azure_Bay_Residences_spa.jpg' },
  { id: 79, title: 'B2', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/B2.jpg' },
  { id: 80, title: 'D4 FINAL', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/D4_FINAL.jpeg' },
  { id: 81, title: 'Eden Curve Residences balcony', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/Eden_Curve_Residences_balcony.jpg' },
  { id: 82, title: 'Eden Curve Residences bed room', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/Eden_Curve_Residences_bed_room.jpg' },
  { id: 83, title: 'Eden Curve Residences interior loby people', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/Eden_Curve_Residences_interior_loby_people.jpg' },
  { id: 84, title: 'Eden Curve Residences kitchen', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/Eden_Curve_Residences_kitchen.jpg' },
  { id: 85, title: 'Eden Curve Residences living room', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/Eden_Curve_Residences_living_room.jpg' },
  { id: 86, title: 'Interior Render', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/Generated%20Image%20April%2015%2C%202026%20-%2010_11AM.jpg' },
  { id: 87, title: 'Interior Render', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/Generated%20Image%20April%2015%2C%202026%20-%2010_21AM.jpg' },
  { id: 89, title: 'Interior Render', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/Generated%20Image%20April%2015%2C%202026%20-%2010_23AM.jpg' },
  { id: 92, title: 'Interior Render', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/Generated%20Image%20April%2015%2C%202026%20-%2010_31AM.jpg' },
  { id: 93, title: 'Interior Render', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/Generated%20Image%20April%2015%2C%202026%20-%2010_34AM.jpg' },
  { id: 94, title: 'Interior Render', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/Generated%20Image%20April%2015%2C%202026%20-%2010_37AM.jpg' },
  { id: 95, title: 'Interior Render', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/Generated%20Image%20April%2015%2C%202026%20-%2010_40AM.jpg' },
  { id: 96, title: 'Interior Render', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/Generated%20Image%20April%2015%2C%202026%20-%2010_54AM.jpg' },
  { id: 97, title: 'Interior Render', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/Generated%20Image%20April%2015%2C%202026%20-%2010_57AM.jpg' },
  { id: 98, title: 'Interior Render', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/Generated%20Image%20April%2015%2C%202026%20-%2010_59AM.jpg' },
  { id: 99, title: 'Interior Render', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/Generated%20Image%20April%2015%2C%202026%20-%2011_05AM.jpg' },
  { id: 100, title: 'Interior Render', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/Generated%20Image%20April%2015%2C%202026%20-%2011_19AM.jpg' },
  { id: 101, title: 'Interior Render', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/Generated%20Image%20April%2015%2C%202026%20-%2012_02PM.jpg' },
  { id: 103, title: 'Interior Render', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/Generated%20Image%20April%2015%2C%202026%20-%209_56AM.jpg' },
  { id: 104, title: 'Interior Render', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/Generated%20Image%20April%2022%2C%202026%20-%208_31PM.jpg' },
  { id: 105, title: 'LIVINGROOM C1', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/LIVINGROOM_C1.png' },
  { id: 106, title: 'Parkline Heights Tower loby', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/Parkline%20Heights%20Tower_loby.jpg' },
  { id: 107, title: 'Parkline Heights Tower office collage', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/Parkline%20Heights%20Tower_office%20collage.jpg' },
  { id: 108, title: 'Parkline Heights Tower office', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/Parkline%20Heights%20Tower_office.jpg' },
  { id: 109, title: 'The Illuminated City Peak balcony', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/The_Illuminated_City_Peak_balcony.jpg' },
  { id: 110, title: 'The Illuminated City Peak loby', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/The_Illuminated_City_Peak_loby.jpg' },
  { id: 111, title: 'The Illuminated City Peak resturant', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/The_Illuminated_City_Peak_resturant.jpg' },
  { id: 112, title: 'Urban Breeze interiors', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/Urban%20Breeze_interiors.jpg' },
  { id: 113, title: 'akba court', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/akba%20court.png' },
  { id: 114, title: 'bath', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/bath.png' },
  { id: 115, title: 'bedroom', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/bedroom.png' },
  { id: 116, title: 'bio tower', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/bio_tower.png' },
  { id: 117, title: 'livingroom', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/livingroom.png' },
  { id: 118, title: 'lobby', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/lobby.jpg' },
  { id: 119, title: 'office', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/office.jpg' },
  { id: 120, title: 'office example', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/office_example.png' },
  { id: 121, title: 'poolrooftop', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/poolrooftop.jpg' },
  { id: 122, title: 'rooftop', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/rooftop.jpg' },
  { id: 123, title: 'rothsield corner balcony', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/rothsield_corner_balcony.jpg' },
  { id: 124, title: 'rothsield corner bed room', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/rothsield_corner_bed_room.jpg' },
  { id: 125, title: 'rothsield corner living room', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/rothsield_corner_living_room.jpg' },
  { id: 126, title: 'rothsield corner loby', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/rothsield_corner_loby.png' },
  { id: 127, title: 'rothsield corner resturant', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/rothsield_corner_resturant.jpg' },
  { id: 128, title: 'the cube buildings GYM', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/the_cube_buildings_GYM.jpg' },
  { id: 129, title: 'the cube buildings balcony', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/the_cube_buildings_balcony.jpg' },
  { id: 130, title: 'the cube buildings bed room', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/the_cube_buildings_bed_room.jpg' },
  { id: 131, title: 'the cube buildings living room', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/the_cube_buildings_living_room.jpeg' },
  { id: 132, title: 'the cube buildings loby', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/the_cube_buildings_loby.jpg' },
  { id: 133, title: 'the cube buildings penthouse', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/the_cube_buildings_penthouse.jpg' },
  { id: 134, title: 'the cube buildings resturant', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/the_cube_buildings_resturant.jpg' },
  { id: 135, title: 'tlv3 09 apartment interior 20260515 122539 017301', category: 'פנים', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%94%D7%93%D7%9E%D7%99%D7%95%D7%AA%20%D7%A4%D7%A0%D7%99%D7%9D/tlv3_09_apartment_interior_20260515_122539_017301.png' },
  { id: 136, title: 'AURA MARINA', category: 'אנימציה', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%A1%D7%A8%D7%98%D7%95%D7%A0%D7%99%D7%9D/AURA_MARINA.mp4', mediaType: 'video' },
  { id: 137, title: 'Copper Tower', category: 'אנימציה', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%A1%D7%A8%D7%98%D7%95%D7%A0%D7%99%D7%9D/Copper_Tower.mp4', mediaType: 'video' },
  { id: 138, title: 'EYN HATHELET under 300MB', category: 'אנימציה', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%A1%D7%A8%D7%98%D7%95%D7%A0%D7%99%D7%9D/EYN_HATHELET_under_300MB.mp4', mediaType: 'video' },
  { id: 139, title: 'RUBIN HERZELYA', category: 'אנימציה', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%A1%D7%A8%D7%98%D7%95%D7%A0%D7%99%D7%9D/RUBIN_HERZELYA.mp4', mediaType: 'video' },
  { id: 140, title: 'The Nazarene', category: 'אנימציה', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%A1%D7%A8%D7%98%D7%95%D7%A0%D7%99%D7%9D/The%20Nazarene.mp4', mediaType: 'video' },
  { id: 141, title: 'Villa 03', category: 'אנימציה', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%A1%D7%A8%D7%98%D7%95%D7%A0%D7%99%D7%9D/Villa_03.mp4', mediaType: 'video' },
  { id: 142, title: 'givat olga', category: 'אנימציה', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%A1%D7%A8%D7%98%D7%95%D7%A0%D7%99%D7%9D/givat%20olga.mp4', mediaType: 'video' },
  { id: 143, title: 'rothsield corner 2K', category: 'אנימציה', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%A1%D7%A8%D7%98%D7%95%D7%A0%D7%99%D7%9D/rothsield_corner_2K.mp4', mediaType: 'video' },
  { id: 144, title: 'לוגו אנימטיב 01', category: 'אנימציה', location: 'ישראל', image: 'https://pub-89c442ddd6cf4d069c34410d67fb2569.r2.dev/%D7%A1%D7%A8%D7%98%D7%95%D7%A0%D7%99%D7%9D/%D7%9C%D7%95%D7%92%D7%95%20%D7%90%D7%A0%D7%99%D7%9E%D7%98%D7%99%D7%91_01.mp4', mediaType: 'video' },
];

type Project = ProjectData;
type Category = 'חוץ' | 'פנים' | 'גרפיקה' | 'אנימציה' | 'סיור וירטואלי';
const CATEGORIES: Category[] = ['חוץ', 'פנים', 'גרפיקה', 'אנימציה', 'סיור וירטואלי'];
const DEFAULT_CATEGORY: Category = 'חוץ';

// Deep links: /#gallery opens straight on the gallery, /#gallery/interior also
// pre-selects a filter. Slugs stay in English so the URL survives copy-paste.
const CATEGORY_SLUGS: Record<string, Category> = {
  exterior: 'חוץ',
  interior:  'פנים',
  graphics:  'גרפיקה',
  animation: 'אנימציה',
  tour:      'סיור וירטואלי',
};

const CATEGORY_LABELS: Record<Category, { he: string; en: string }> = {
  'חוץ':          { he: 'חוץ',          en: 'Exterior'     },
  'פנים':         { he: 'פנים',         en: 'Interior'     },
  'גרפיקה':       { he: 'גרפיקה',       en: 'Graphics'     },
  'אנימציה':      { he: 'אנימציה',      en: 'Animation'    },
  'סיור וירטואלי': { he: '360°', en: '360°' },
};

type Card = { key: string; cover: Project; items: Project[]; grouped: boolean };

// Exterior renders get one card per project — a cover image that opens that
// project's own set — so the project name and its caption are written once, not
// on every image. Every other category stays one card per item.
function buildCards(items: Project[]): Card[] {
  const cards: Card[] = [];
  const byProject = new Map<string, Card>();
  for (const p of items) {
    if (p.category !== 'חוץ') {
      cards.push({ key: String(p.id), cover: p, items: [p], grouped: false });
      continue;
    }
    const existing = byProject.get(p.title);
    if (existing) {
      existing.items.push(p);
    } else {
      const card: Card = { key: `project-${p.title}`, cover: p, items: [p], grouped: true };
      byProject.set(p.title, card);
      cards.push(card);
    }
  }
  return cards;
}

// Grid preview for a video: a still frame, not the whole file.
// The <video> only mounts once the tile is near the viewport, and preload="metadata"
// makes the browser fetch just enough to paint that frame.
// The full video loads only when the visitor opens it in the lightbox.
function VideoThumb({ src }: { src: string }) {
  const ref  = useRef<HTMLDivElement>(null);
  const near = useInView(ref, { once: true, margin: '300px' });

  return (
    <div ref={ref} className="relative aspect-video overflow-hidden bg-[#0e0e0e]">
      {near && (
        <video
          src={`${src}#t=0.1`}
          preload="metadata"
          muted
          playsInline
          // Many clips open on a black or fade-in frame, so seek a bit into the
          // video — the browser then fetches only that range, not the whole file.
          onLoadedMetadata={(e) => {
            const v = e.currentTarget;
            if (v.duration > 1) v.currentTime = v.duration * 0.3;
          }}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full border border-[#ffffff]/60 bg-[#080808]/50 flex items-center justify-center group-hover:border-[#c8a96c] transition-colors duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#ffffff"><polygon points="8 5 19 12 8 19 8 5"/></svg>
        </div>
      </div>
    </div>
  );
}

// Slide transition: the incoming image glides in from the side it was navigated
// towards while un-blurring, and the outgoing one drifts off and blurs away.
const SLIDE_VARIANTS = {
  enter:  (dir: number) => ({ opacity: 0, x: dir * 90,  scale: 1.04, filter: 'blur(10px)' }),
  center: { opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' },
  exit:   (dir: number) => ({ opacity: 0, x: dir * -90, scale: 0.97, filter: 'blur(10px)' }),
};

type Zoom = { s: number; x: number; y: number };
const MAX_ZOOM  = 5;
const ZOOM_STEP = 1.4;   // per +/- press or wheel notch
const TAP_ZOOM  = 2.5;   // tapping / clicking the image

function Lightbox({
  project,
  showTitle,
  direction,
  thumbs,
  currentIndex,
  total,
  onClose,
  onPrev,
  onNext,
  onSelect,
}: {
  project: Project;
  showTitle: boolean;
  direction: number;
  // Filmstrip of the whole set — only passed for a project's own (small) set.
  thumbs: Project[] | null;
  currentIndex: number;
  total: number;
  onClose: () => void;
  onPrev: (() => void) | null;
  onNext: (() => void) | null;
  onSelect: (index: number) => void;
}) {
  const isVideo = project.mediaType === 'video';
  const isTour  = project.mediaType === 'tour';
  const isImage = !isVideo && !isTour;
  const hasStrip = !!thumbs && thumbs.length > 1;

  // ── Zoom & pan (images only) ──
  // The image is scaled inside a frame that clips it to its own bounds, so zooming
  // in lets you pan around the picture without it spilling over the caption or UI.
  const [zoom, setZoom]       = useState<Zoom>({ s: 1, x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const zoomRef    = useRef(zoom);
  zoomRef.current  = zoom;
  const frameRef   = useRef<HTMLDivElement>(null);
  const pointers   = useRef(new Map<number, { x: number; y: number }>());
  const pinchStart = useRef<{ dist: number; s: number } | null>(null);
  const downAt     = useRef<{ x: number; y: number } | null>(null);

  // A new slide always starts un-zoomed.
  useEffect(() => { setZoom({ s: 1, x: 0, y: 0 }); }, [project.id]);

  const clampZoom = (z: Zoom): Zoom => {
    const el = frameRef.current;
    const s = Math.min(MAX_ZOOM, Math.max(1, z.s));
    if (!el || s === 1) return { s, x: 0, y: 0 };
    const maxX = (el.clientWidth  * (s - 1)) / 2;
    const maxY = (el.clientHeight * (s - 1)) / 2;
    return { s, x: Math.min(maxX, Math.max(-maxX, z.x)), y: Math.min(maxY, Math.max(-maxY, z.y)) };
  };

  // Scale to `next`, keeping the point (cx, cy) — measured from the frame's centre —
  // fixed under the cursor/fingers.
  const zoomTo = (next: number, cx = 0, cy = 0) =>
    setZoom((z) => {
      const s = Math.min(MAX_ZOOM, Math.max(1, next));
      const k = s / z.s;
      return clampZoom({ s, x: cx - (cx - z.x) * k, y: cy - (cy - z.y) * k });
    });
  const zoomToRef = useRef(zoomTo);
  zoomToRef.current = zoomTo;

  const fromCentre = (e: { clientX: number; clientY: number }) => {
    const r = frameRef.current!.getBoundingClientRect();
    return { cx: e.clientX - (r.left + r.width / 2), cy: e.clientY - (r.top + r.height / 2) };
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')                    onClose();
      if (e.key === 'ArrowLeft'  && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (!isImage) return;
      if (e.key === '+' || e.key === '=') zoomToRef.current(zoomRef.current.s * ZOOM_STEP);
      if (e.key === '-' || e.key === '_') zoomToRef.current(zoomRef.current.s / ZOOM_STEP);
      if (e.key === '0')                  zoomToRef.current(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onPrev, onNext, isImage]);

  // Wheel zoom needs a non-passive listener so the page behind doesn't scroll.
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const r = el.getBoundingClientRect();
      zoomToRef.current(
        zoomRef.current.s * (e.deltaY < 0 ? ZOOM_STEP : 1 / ZOOM_STEP),
        e.clientX - (r.left + r.width / 2),
        e.clientY - (r.top + r.height / 2),
      );
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [project.id, isImage]);

  const onFrameDown = (e: React.PointerEvent<HTMLDivElement>) => {
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    downAt.current = { x: e.clientX, y: e.clientY };
    setDragging(true);
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      pinchStart.current = { dist: Math.hypot(a.x - b.x, a.y - b.y), s: zoomRef.current.s };
    }
    if (zoomRef.current.s > 1 || pointers.current.size === 2) e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onFrameMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const prev = pointers.current.get(e.pointerId);
    if (!prev) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 2 && pinchStart.current) {
      const [a, b] = [...pointers.current.values()];
      zoomTo((pinchStart.current.s * Math.hypot(a.x - b.x, a.y - b.y)) / pinchStart.current.dist);
      return;
    }
    if (zoomRef.current.s > 1) {
      const dx = e.clientX - prev.x;
      const dy = e.clientY - prev.y;
      setZoom((z) => clampZoom({ ...z, x: z.x + dx, y: z.y + dy }));
    }
  };

  const onFrameUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const wasSingle = pointers.current.size === 1;
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinchStart.current = null;
    setDragging(false);
    // A tap that barely moved toggles zoom: in at the tap point, or back out.
    const d = downAt.current;
    if (wasSingle && d && Math.hypot(e.clientX - d.x, e.clientY - d.y) < 6) {
      if (zoomRef.current.s > 1) zoomTo(1);
      else { const { cx, cy } = fromCentre(e); zoomTo(TAP_ZOOM, cx, cy); }
    }
    downAt.current = null;
  };

  const zoomed = zoom.s > 1;
  const zoomBtn = 'w-10 h-10 flex items-center justify-center text-[#c0bcb8] hover:text-[#ffffff] transition-colors duration-200 border border-[#282828] hover:border-[#505050] bg-[#080808]/60 disabled:opacity-30 disabled:hover:text-[#c0bcb8] disabled:hover:border-[#282828]';

  const navBtn = 'absolute top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center text-[#c0bcb8] hover:text-[#ffffff] transition-colors duration-200 border border-[#282828] hover:border-[#505050] bg-[#080808]/80 disabled:opacity-20';

  return (
    <motion.div
      className={`fixed inset-0 z-[60] flex items-center justify-center pt-16 ${
        hasStrip
          ? 'px-14 pb-32 lg:pl-20 lg:pr-[9.5rem] lg:pb-12'
          : 'px-14 lg:px-24 pb-4 lg:pb-6'
      }`}
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
        className={`${navBtn} ${hasStrip ? 'right-3 lg:right-[6.75rem]' : 'right-3 lg:right-6'}`}
        aria-label="הבא"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>

      {/* ── Content ── */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={project.id}
          custom={direction}
          variants={SLIDE_VARIANTS}
          className={[
            'relative z-10 w-full flex items-center justify-center',
            isTour ? 'max-w-6xl h-[85vh]' : 'max-w-full max-h-full',
          ].join(' ')}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
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
              className="max-w-full max-h-[80vh] w-auto h-auto"
            />
          ) : (
            // Swipe sideways to step through the set — but not while zoomed in,
            // where dragging pans the image instead.
            <motion.div
              className="flex flex-col items-center gap-3"
              drag={!zoomed && (onPrev || onNext) ? 'x' : false}
              dragSnapToOrigin
              dragElastic={0.25}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80 && onNext) onNext();
                else if (info.offset.x > 80 && onPrev) onPrev();
              }}
            >
              <div
                ref={frameRef}
                className="relative max-w-full overflow-hidden select-none touch-none"
                style={{ cursor: zoomed ? (dragging ? 'grabbing' : 'grab') : 'zoom-in' }}
                onPointerDown={onFrameDown}
                onPointerMove={onFrameMove}
                onPointerUp={onFrameUp}
                onPointerCancel={onFrameUp}
              >
                <img
                  src={project.image}
                  alt=""
                  role="presentation"
                  draggable={false}
                  className={`block max-w-full w-auto h-auto object-contain select-none will-change-transform ${
                    hasStrip
                      ? 'max-h-[58vh] lg:max-h-[77vh]'
                      : showTitle || project.caption ? 'max-h-[77vh]' : 'max-h-[85vh]'
                  }`}
                  style={{
                    transform: `translate(${zoom.x}px, ${zoom.y}px) scale(${zoom.s})`,
                    transition: dragging ? 'none' : 'transform 0.25s ease-out',
                  }}
                />
              </div>
              {(showTitle || project.caption) && (
                <div className="text-center">
                  <p className="font-sans text-[13px] font-bold tracking-wide text-[#c8a96c]">{project.title}</p>
                  {project.caption && (
                    <p className="font-sans text-[12px] text-[#ffffff]">{project.caption}</p>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* ── Filmstrip carousel ── */}
      {/* Vertical strip down the right edge on desktop (frees the full height for the
          image); a horizontal strip along the bottom on phones, where width is scarce. */}
      {hasStrip && thumbs && (
        <div className="absolute z-20 flex gap-2 overflow-auto bottom-12 inset-x-0 justify-center px-16 py-1.5 lg:inset-x-auto lg:bottom-auto lg:right-3 lg:top-1/2 lg:-translate-y-1/2 lg:flex-col lg:max-h-[72vh] lg:px-1.5 lg:py-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {thumbs.map((t, i) => (
            <button
              key={t.id}
              onClick={() => onSelect(i)}
              aria-label={`${i + 1} / ${thumbs.length}`}
              className={[
                'relative shrink-0 w-20 h-14 lg:w-20 lg:h-14 overflow-hidden border transition-all duration-300',
                i === currentIndex
                  ? 'border-[#c8a96c] opacity-100 scale-105'
                  : 'border-[#282828] opacity-50 hover:opacity-100 hover:border-[#505050]',
              ].join(' ')}
            >
              <img
                src={t.image}
                alt=""
                role="presentation"
                loading="lazy"
                decoding="async"
                draggable={false}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* ── Counter ── */}
      {total > 1 && (
        <div dir="ltr" className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 font-sans text-[11px] tracking-widest text-[#c0bcb8]">
          {currentIndex + 1} / {total}
        </div>
      )}

      {/* ── Zoom controls ── */}
      {isImage && (
        <div className="absolute top-5 right-[4.25rem] z-20 flex gap-2">
          {zoomed && (
            <button onClick={() => zoomTo(1)} className={`${zoomBtn} font-sans text-[11px] tracking-wide`} aria-label="איפוס זום">
              {Math.round(zoom.s * 100)}%
            </button>
          )}
          <button onClick={() => zoomTo(zoom.s / ZOOM_STEP)} disabled={!zoomed} className={zoomBtn} aria-label="הקטן">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
          <button onClick={() => zoomTo(zoom.s * ZOOM_STEP)} disabled={zoom.s >= MAX_ZOOM} className={zoomBtn} aria-label="הגדל">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
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
  const [activeFilter, setActiveFilter] = useState<Category>(DEFAULT_CATEGORY);
  const [lightbox, setLightbox] = useState<{ slides: Project[]; index: number; grouped: boolean; dir: number } | null>(null);
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

      setActiveFilter((slug && CATEGORY_SLUGS[slug]) || DEFAULT_CATEGORY);

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

  const filtered = PROJECTS.filter((p) => p.category === activeFilter);

  const cards = buildCards(filtered);

  // A grouped card opens just that project's images; any other card opens a
  // lightbox over all the ungrouped items currently shown, as before.
  const openCard = (card: Card) => {
    if (card.grouped) {
      setLightbox({ slides: card.items, index: 0, grouped: true, dir: 0 });
      return;
    }
    const slides = cards.filter((c) => !c.grouped).map((c) => c.cover);
    setLightbox({ slides, index: slides.indexOf(card.cover), grouped: false, dir: 0 });
  };

  const goTo = (index: number) =>
    setLightbox((lb) => (lb ? { ...lb, index, dir: index > lb.index ? 1 : -1 } : lb));

  const lightboxProject = lightbox ? lightbox.slides[lightbox.index] : null;
  const onPrev = lightbox && lightbox.index > 0 ? () => goTo(lightbox.index - 1) : null;
  const onNext = lightbox && lightbox.index < lightbox.slides.length - 1 ? () => goTo(lightbox.index + 1) : null;

  return (
    <>
      <AnimatePresence>
        {lightbox && lightboxProject && (
          <Lightbox
            project={lightboxProject}
            showTitle={lightbox.grouped}
            direction={lightbox.dir}
            thumbs={lightbox.grouped ? lightbox.slides : null}
            onSelect={goTo}
            currentIndex={lightbox.index}
            total={lightbox.slides.length}
            onClose={() => setLightbox(null)}
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
              {cards.map((card, i) => {
                const project = card.cover;
                return (
                <motion.div
                  key={card.key}
                  className="break-inside-avoid mb-3 lg:mb-4 group cursor-pointer overflow-hidden"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => openCard(card)}
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
                    <VideoThumb src={project.image} />
                  ) : (
                    <div className="relative">
                      <img
                        src={project.image}
                        alt=""
                        role="presentation"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      {/* Hover cue: the tile dims, gets a gold frame and a "+" that pops in. */}
                      <div className="absolute inset-0 pointer-events-none bg-[#080808]/0 group-hover:bg-[#080808]/40 ring-1 ring-inset ring-[#c8a96c]/0 group-hover:ring-[#c8a96c]/70 transition-all duration-500 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full border border-[#c8a96c] bg-[#080808]/60 flex items-center justify-center text-[#c8a96c] opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out">
                          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                        </div>
                      </div>
                      {card.grouped && (
                        <>
                          {card.items.length > 1 && (
                            <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 px-2.5 py-1.5 bg-[#080808]/80 border border-[#c8a96c]/50 text-[#c8a96c] pointer-events-none">
                              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="7" y="7" width="14" height="14" rx="1"/><path d="M3 17V4a1 1 0 0 1 1-1h13"/></svg>
                              <span className="font-sans text-[11px] font-bold leading-none">{card.items.length}</span>
                            </div>
                          )}
                          <div className="absolute inset-x-0 bottom-0 px-3 pt-14 pb-3 text-center bg-gradient-to-t from-[#080808]/95 via-[#080808]/60 to-transparent pointer-events-none">
                            <p className="font-sans text-[11px] lg:text-[12px] font-bold tracking-wide text-[#c8a96c]">{project.title}</p>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </motion.div>
                );
              })}
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
