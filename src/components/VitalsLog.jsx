import { useState } from 'react';
import { useLocalStorage, getTodayKey, formatDateDisplay } from '../hooks/useLocalStorage';

const EMPTY_VITALS = {
  weight: '',
  temp: '',
  bp: '',
  pulse: '',
  resp: '',
  pain: '',
  fluids: '',
};

function InputField({ label, value, onChange, placeholder, inputMode, hint }) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <label
        style={{
          display: 'block',
          fontSize: '15px',
          fontWeight: '700',
          color: '#374151',
          marginBottom: '5px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}
      >
        {label}
        {hint && (
          <span
            style={{
              fontSize: '12px',
              fontWeight: '600',
              color: '#9CA3AF',
              textTransform: 'none',
              letterSpacing: 0,
              marginLeft: '6px',
            }}
          >
            {hint}
          </span>
        )}
      </label>
      <input
        type="text"
        inputMode={inputMode || 'text'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '14px 16px',
          fontSize: '22px',
          fontWeight: '700',
          fontFamily: 'Nunito, sans-serif',
          color: '#1A3A5C',
          backgroundColor: '#FFFFFF',
          border: '2px solid #D1D5DB',
          borderRadius: '12px',
          outline: 'none',
          boxSizing: 'border-box',
          transition: 'border-color 0.15s',
        }}
        onFocus={(e) => (e.target.style.borderColor = '#0D7A8A')}
        onBlur={(e) => (e.target.style.borderColor = '#D1D5DB')}
      />
    </div>
  );
}

function PainSelector({ value, onChange }) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <label
        style={{
          display: 'block',
          fontSize: '15px',
          fontWeight: '700',
          color: '#374151',
          marginBottom: '8px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}
      >
        Pain Level
        <span
          style={{
            fontSize: '12px',
            fontWeight: '600',
            color: '#9CA3AF',
            textTransform: 'none',
            letterSpacing: 0,
            marginLeft: '6px',
          }}
        >
          (1 = minimal · 10 = severe)
        </span>
      </label>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '8px',
        }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => {
          const selected = String(value) === String(n);
          const painColor =
            n <= 3 ? '#16A34A' : n <= 6 ? '#D97706' : '#DC2626';
          return (
            <button
              key={n}
              onClick={() => onChange(String(n))}
              style={{
                height: '52px',
                borderRadius: '12px',
                border: selected ? `3px solid ${painColor}` : '2px solid #E5E7EB',
                backgroundColor: selected ? painColor : '#FFFFFF',
                color: selected ? '#FFFFFF' : '#374151',
                fontSize: '22px',
                fontWeight: '900',
                fontFamily: 'Nunito, sans-serif',
                cursor: 'pointer',
                transition: 'all 0.15s',
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              {n}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function VitalsTable({ entries }) {
  if (entries.length === 0) return null;

  return (
    <div style={{ overflowX: 'auto', backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1.5px solid #E5E7EB' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
        <thead>
          <tr style={{ backgroundColor: '#F3F4F6', color: '#374151', textTransform: 'uppercase', fontSize: '12px' }}>
            <th style={{ padding: '12px', borderBottom: '2px solid #E5E7EB', fontWeight: '800' }}>Date</th>
            <th style={{ padding: '12px', borderBottom: '2px solid #E5E7EB', fontWeight: '800' }}>Weight</th>
            <th style={{ padding: '12px', borderBottom: '2px solid #E5E7EB', fontWeight: '800' }}>Temp</th>
            <th style={{ padding: '12px', borderBottom: '2px solid #E5E7EB', fontWeight: '800' }}>BP</th>
            <th style={{ padding: '12px', borderBottom: '2px solid #E5E7EB', fontWeight: '800' }}>Pulse</th>
            <th style={{ padding: '12px', borderBottom: '2px solid #E5E7EB', fontWeight: '800' }}>Resp</th>
            <th style={{ padding: '12px', borderBottom: '2px solid #E5E7EB', fontWeight: '800' }}>Pain</th>
            <th style={{ padding: '12px', borderBottom: '2px solid #E5E7EB', fontWeight: '800' }}>Fluids</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, idx) => {
            const [, m, d] = entry.date.split('-').map(Number);
            const date = new Date(Number(entry.date.split('-')[0]), m - 1, d);
            const label = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            return (
              <tr key={entry.date} style={{ borderBottom: idx === entries.length - 1 ? 'none' : '1px solid #E5E7EB' }}>
                <td style={{ padding: '12px', fontWeight: '700', color: '#1A3A5C', whiteSpace: 'nowrap' }}>{label}</td>
                <td style={{ padding: '12px', color: entry.weight ? '#1A3A5C' : '#D1D5DB' }}>{entry.weight || '—'}</td>
                <td style={{ padding: '12px', color: entry.temp ? '#1A3A5C' : '#D1D5DB' }}>{entry.temp || '—'}</td>
                <td style={{ padding: '12px', color: entry.bp ? '#1A3A5C' : '#D1D5DB' }}>{entry.bp || '—'}</td>
                <td style={{ padding: '12px', color: entry.pulse ? '#1A3A5C' : '#D1D5DB' }}>{entry.pulse || '—'}</td>
                <td style={{ padding: '12px', color: entry.resp ? '#1A3A5C' : '#D1D5DB' }}>{entry.resp || '—'}</td>
                <td style={{ padding: '12px', color: entry.pain ? '#1A3A5C' : '#D1D5DB' }}>{entry.pain || '—'}</td>
                <td style={{ padding: '12px', color: entry.fluids ? '#1A3A5C' : '#D1D5DB' }}>{entry.fluids || '—'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function VitalsLog() {
  const today = getTodayKey();
  const [vitalsLog, setVitalsLog] = useLocalStorage('vitals_log', []);
  const [saved, setSaved] = useState(false);

  const todayEntry = vitalsLog.find((e) => e.date === today) || { date: today, ...EMPTY_VITALS };
  const pastEntries = vitalsLog
    .filter((e) => e.date !== today)
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  function updateField(field, value) {
    setSaved(false);
    const updated = { ...todayEntry, [field]: value };
    setVitalsLog((prev) => {
      const others = prev.filter((e) => e.date !== today);
      return [updated, ...others];
    });
  }

  function handleSave() {
    setSaved(true);
    if (navigator.vibrate) navigator.vibrate([30, 20, 30]);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div style={{ paddingBottom: '8px' }}>
      {/* Header */}
      <div
        style={{
          backgroundColor: '#0D7A8A',
          color: '#FFFFFF',
          padding: '18px 20px 16px',
          borderRadius: '0 0 20px 20px',
          marginBottom: '16px',
        }}
      >
        <div style={{ fontSize: '14px', fontWeight: '600', opacity: 0.8, marginBottom: '2px' }}>
          VITALS & FLUIDS LOG
        </div>
        <div style={{ fontSize: '20px', fontWeight: '800' }}>
          {formatDateDisplay(today)}
        </div>
      </div>

      {/* Fluid restriction reminder */}
      <div
        style={{
          backgroundColor: '#FEF3C7',
          border: '2px solid #FCD34D',
          borderRadius: '14px',
          padding: '12px 16px',
          marginBottom: '20px',
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
        }}
      >
        <span style={{ fontSize: '22px' }}>💧</span>
        <div style={{ fontSize: '16px', fontWeight: '800', color: '#92400E' }}>
          Daily fluid limit: 1,500 mL (≈ 50 oz)
        </div>
      </div>

      {/* Today's input form */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '2px solid #0D7A8A',
          borderRadius: '18px',
          padding: '20px',
          marginBottom: '24px',
        }}
      >
        <div
          style={{
            fontSize: '18px',
            fontWeight: '900',
            color: '#0D7A8A',
            marginBottom: '18px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span>📋</span> Today's Entry
        </div>

        <InputField
          label="Weight"
          hint="(lbs)"
          value={todayEntry.weight}
          onChange={(v) => updateField('weight', v)}
          placeholder="e.g. 165"
          inputMode="decimal"
        />
        <InputField
          label="Temperature"
          hint="(°F)"
          value={todayEntry.temp}
          onChange={(v) => updateField('temp', v)}
          placeholder="e.g. 98.6"
          inputMode="decimal"
        />
        <InputField
          label="Blood Pressure"
          hint="(systolic/diastolic)"
          value={todayEntry.bp}
          onChange={(v) => updateField('bp', v)}
          placeholder="e.g. 120/80"
        />
        <InputField
          label="Pulse"
          hint="(beats per min)"
          value={todayEntry.pulse}
          onChange={(v) => updateField('pulse', v)}
          placeholder="e.g. 72"
          inputMode="numeric"
        />
        <InputField
          label="Respiration"
          hint="(breaths per min)"
          value={todayEntry.resp}
          onChange={(v) => updateField('resp', v)}
          placeholder="e.g. 16"
          inputMode="numeric"
        />

        <PainSelector value={todayEntry.pain} onChange={(v) => updateField('pain', v)} />

        {/* Fluids with 1500mL progress */}
        <InputField
          label="Fluid Intake"
          hint="(mL — daily limit: 1,500)"
          value={todayEntry.fluids}
          onChange={(v) => updateField('fluids', v)}
          placeholder="e.g. 800"
          inputMode="numeric"
        />
        {todayEntry.fluids && Number(todayEntry.fluids) > 0 && (
          <div style={{ marginTop: '-10px', marginBottom: '16px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '14px',
                fontWeight: '700',
                color:
                  Number(todayEntry.fluids) > 1500
                    ? '#DC2626'
                    : Number(todayEntry.fluids) > 1200
                    ? '#D97706'
                    : '#16A34A',
                marginBottom: '5px',
              }}
            >
              <span>
                {Number(todayEntry.fluids) > 1500
                  ? '⚠️ OVER LIMIT'
                  : `${1500 - Number(todayEntry.fluids)} mL remaining`}
              </span>
              <span>
                {Math.round((Number(todayEntry.fluids) / 1500) * 100)}% of limit
              </span>
            </div>
            <div
              style={{
                height: '10px',
                backgroundColor: '#F3F4F6',
                borderRadius: '8px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${Math.min((Number(todayEntry.fluids) / 1500) * 100, 100)}%`,
                  backgroundColor:
                    Number(todayEntry.fluids) > 1500
                      ? '#DC2626'
                      : Number(todayEntry.fluids) > 1200
                      ? '#D97706'
                      : '#0D7A8A',
                  borderRadius: '8px',
                  transition: 'width 0.3s ease',
                }}
              />
            </div>
          </div>
        )}

        {/* Save button */}
        <button
          onClick={handleSave}
          style={{
            width: '100%',
            padding: '18px',
            fontSize: '20px',
            fontWeight: '900',
            fontFamily: 'Nunito, sans-serif',
            color: '#FFFFFF',
            backgroundColor: saved ? '#16A34A' : '#0D7A8A',
            border: 'none',
            borderRadius: '14px',
            cursor: 'pointer',
            marginTop: '4px',
            transition: 'background-color 0.2s ease',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          {saved ? '✓ Saved!' : 'Save Today\'s Vitals'}
        </button>
      </div>

      {/* All entries table */}
      {vitalsLog.length > 0 ? (
        <div>
          <div
            style={{
              fontSize: '17px',
              fontWeight: '900',
              color: '#6B7280',
              marginBottom: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            All Entries Spreadsheet
          </div>
          <VitalsTable entries={vitalsLog.sort((a, b) => (a.date > b.date ? -1 : 1))} />
        </div>
      ) : (
        <div
          style={{
            textAlign: 'center',
            padding: '28px 20px',
            color: '#9CA3AF',
            fontSize: '16px',
            fontWeight: '600',
          }}
        >
          No previous entries yet.
          <br />
          Added vitals will appear here in a spreadsheet.
        </div>
      )}
    </div>
  );
}
