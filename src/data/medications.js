import medicinesData from './medicines.json';

// Scope each med id to its time slot so the same drug at different times has independent check state
const getMed = (key, slot) => ({ id: `${key}__${slot}`, ...medicinesData[key] });

export const MEDICATIONS = {
  '08:00 AM': [
    getMed('dapagliflozin',       '0800am'),
    getMed('sacubitril_valsartan','0800am'),
    getMed('clopidogrel',         '0800am'),
    getMed('furosemide',          '0800am'),
    getMed('spironolactone',      '0800am'),
    getMed('tramadol',            '0800am'),
    getMed('methocarbamol',       '0800am'),
    getMed('metformin',           '0800am'),
    getMed('glimepiride',         '0800am'),
  ],
  '02:00 PM': [
    getMed('tramadol',      '0200pm'),
    getMed('methocarbamol', '0200pm'),
  ],
  '06:00 PM': [
    getMed('sacubitril_valsartan', '0600pm'),
    getMed('metoprolol',           '0600pm'),
  ],
  '08:00 PM': [
    getMed('tramadol',      '0800pm'),
    getMed('methocarbamol', '0800pm'),
  ],
  '10:00 PM': [
    getMed('zolpidem',     '1000pm'),
    getMed('atorvastatin', '1000pm'),
  ],
  'prn': [
    getMed('peg3350',      'prn'),
    getMed('acetaminophen','prn'),
    getMed('aspirin',      'prn'),
    getMed('pravastatin',  'prn'),
  ],
};

export const TIME_BLOCKS = [
  { key: '08:00 AM', label: 'Breakfast (08:00 AM)', emoji: '🍳', color: '#1DB954', bg: '#F0FFF4', border: '#86EFAC' },
  { key: '02:00 PM', label: 'Afternoon (02:00 PM)', emoji: '🌤️', color: '#1DB954', bg: '#F0FFF4', border: '#86EFAC' },
  { key: '06:00 PM', label: 'Dinner (06:00 PM)',    emoji: '🍲', color: '#1DB954', bg: '#F0FFF4', border: '#86EFAC' },
  { key: '08:00 PM', label: 'Evening (08:00 PM)',   emoji: '🌆', color: '#1DB954', bg: '#F0FFF4', border: '#86EFAC' },
  { key: '10:00 PM', label: 'Before Bed (10:00 PM)',emoji: '🌙', color: '#121212', bg: '#F3F4F6', border: '#D1D5DB' },
  { key: 'prn',      label: 'As Needed (PRN)',      emoji: '⚠️', color: '#DC2626', bg: '#FEF2F2', border: '#FECACA' },
];

export const ALL_MEDICINES = Object.values(medicinesData);
