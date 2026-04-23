import medicinesData from './medicines.json';

// Helper to quickly build medication entries from the JSON database
const getMed = (key) => ({ id: key, ...medicinesData[key] });

export const MEDICATIONS = {
  '08:00 AM': [
    getMed('furosemide'),
    getMed('spironolactone'),
    getMed('sacubitril_valsartan'),
    getMed('pravastatin'),
    getMed('methocarbamol'),
  ],
  '10:00 AM': [
    getMed('dapagliflozin'),
    getMed('metformin'),
    getMed('glimepiride'),
  ],
  '12:00 PM': [
    getMed('clopidogrel'),
    getMed('aspirin'),
  ],
  '02:00 PM': [
    getMed('methocarbamol'),
  ],
  '06:00 PM': [
    getMed('metoprolol'),
    getMed('sacubitril_valsartan'),
    getMed('spironolactone'),
  ],
  '10:00 PM': [
    getMed('atorvastatin'),
    getMed('zolpidem'),
    getMed('methocarbamol'),
  ],
  'prn': [
    getMed('methocarbamol'),
    getMed('tramadol'),
    getMed('peg3350'),
    getMed('acetaminophen'),
    getMed('aspirin'),
  ],
};

export const TIME_BLOCKS = [
  { key: '08:00 AM', label: 'Breakfast (08:00 AM)', emoji: '🍳', color: '#D97706', bg: '#FFFBEB', border: '#FDE68A' },
  { key: '10:00 AM', label: 'Morning (10:00 AM)', emoji: '☀️', color: '#B45309', bg: '#FEF3C7', border: '#FCD34D' },
  { key: '12:00 PM', label: 'Lunch (12:00 PM)', emoji: '🥪', color: '#047857', bg: '#ECFDF5', border: '#A7F3D0' },
  { key: '02:00 PM', label: 'Afternoon (02:00 PM)', emoji: '🌤️', color: '#0369A1', bg: '#F0F9FF', border: '#BAE6FD' },
  { key: '06:00 PM', label: 'Dinner (06:00 PM)', emoji: '🍲', color: '#EA580C', bg: '#FFF7ED', border: '#FED7AA' },
  { key: '10:00 PM', label: 'Before Bed (10:00 PM)', emoji: '🌙', color: '#4F46E5', bg: '#EEF2FF', border: '#C7D2FE' },
  { key: 'prn',     label: 'As Needed (PRN)', emoji: '⚠️', color: '#DC2626', bg: '#FEF2F2', border: '#FECACA' },
];

export const ALL_MEDICINES = Object.values(medicinesData);
