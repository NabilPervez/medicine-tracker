import medicinesData from './medicines.json';

const getMed = (key) => ({ id: key, ...medicinesData[key] });

export const MEDICATIONS = {
  '08:00 AM': [
    getMed('dapagliflozin'),
    getMed('sacubitril_valsartan'),
    getMed('clopidogrel'),
    getMed('furosemide'),
    getMed('spironolactone'),
    getMed('tramadol'),
    getMed('methocarbamol'),
  ],
  '02:00 PM': [
    getMed('tramadol'),
    getMed('methocarbamol'),
  ],
  '06:00 PM': [
    getMed('dapagliflozin'),
    getMed('sacubitril_valsartan'),
    getMed('metoprolol'),
  ],
  '08:00 PM': [
    getMed('tramadol'),
    getMed('methocarbamol'),
  ],
  '10:00 PM': [
    getMed('zolpidem'),
    getMed('atorvastatin'),
  ],
  'prn': [
    getMed('peg3350'),
    getMed('acetaminophen'),
    getMed('aspirin'),
    getMed('metformin'),
    getMed('glimepiride'),
    getMed('pravastatin'),
  ],
};

export const TIME_BLOCKS = [
  { key: '08:00 AM', label: 'Breakfast (08:00 AM)', emoji: '🍳', color: '#1DB954', bg: '#F0FFF4', border: '#86EFAC' },
  { key: '02:00 PM', label: 'Afternoon (02:00 PM)', emoji: '🌤️', color: '#1DB954', bg: '#F0FFF4', border: '#86EFAC' },
  { key: '06:00 PM', label: 'Dinner (06:00 PM)', emoji: '🍲', color: '#1DB954', bg: '#F0FFF4', border: '#86EFAC' },
  { key: '08:00 PM', label: 'Evening (08:00 PM)', emoji: '🌆', color: '#1DB954', bg: '#F0FFF4', border: '#86EFAC' },
  { key: '10:00 PM', label: 'Before Bed (10:00 PM)', emoji: '🌙', color: '#121212', bg: '#F3F4F6', border: '#D1D5DB' },
  { key: 'prn',     label: 'As Needed (PRN)', emoji: '⚠️', color: '#DC2626', bg: '#FEF2F2', border: '#FECACA' },
];

export const ALL_MEDICINES = Object.values(medicinesData);
