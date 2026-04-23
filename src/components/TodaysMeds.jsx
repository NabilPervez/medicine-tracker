import { useState, useEffect } from 'react';
import { MEDICATIONS, TIME_BLOCKS } from '../data/medications';
import { useLocalStorage, getTodayKey, formatDateDisplay } from '../hooks/useLocalStorage';

function MedItem({ med, checked, onToggle, isPrn }) {
  return (
    <div
      className={`med-item ${checked ? 'med-item--checked' : ''}`}
      style={{
        backgroundColor: checked ? '#F0FDF4' : '#FFFFFF',
        borderColor: checked ? '#86EFAC' : '#E5E7EB',
        border: '2px solid',
        borderRadius: '16px',
        padding: '16px',
        marginBottom: '12px',
        transition: 'all 0.2s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
        {/* Checkbox */}
        <button
          onClick={onToggle}
          aria-label={`Mark ${med.name} as ${checked ? 'not taken' : 'taken'}`}
          style={{
            flexShrink: 0,
            width: '52px',
            height: '52px',
            borderRadius: '12px',
            border: checked ? '3px solid #1ED760' : '3px solid #D1D5DB',
            backgroundColor: checked ? '#1ED760' : '#FFFFFF',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '26px',
            transition: 'all 0.15s ease',
            WebkitTapHighlightColor: 'transparent',
            boxShadow: checked ? '0 0 0 4px #BBF7D0' : 'none',
          }}
        >
          {checked ? '✓' : ''}
        </button>

        {/* Med info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '6px' }}>
            <span
              style={{
                fontSize: '20px',
                fontWeight: '800',
                color: checked ? '#15803D' : '#1A3A5C',
                textDecoration: checked ? 'line-through' : 'none',
                lineHeight: 1.2,
              }}
            >
              {med.name}
            </span>
            {med.brand && (
              <span
                style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  color: '#6B7280',
                  textDecoration: checked ? 'line-through' : 'none',
                }}
              >
                ({med.brand})
              </span>
            )}
          </div>

          <div
            style={{
              fontSize: '17px',
              fontWeight: '700',
              color: checked ? '#16A34A' : '#374151',
              marginTop: '3px',
            }}
          >
            {med.dose}
            {isPrn && med.condition && (
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#DC2626',
                  backgroundColor: '#FEE2E2',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  marginLeft: '8px',
                }}
              >
                {med.condition}
              </span>
            )}
          </div>

          {med.warning && !checked && (
            <div
              style={{
                fontSize: '15px',
                fontWeight: '700',
                color: '#B45309',
                backgroundColor: '#FEF3C7',
                padding: '4px 10px',
                borderRadius: '8px',
                marginTop: '6px',
                display: 'inline-block',
              }}
            >
              {med.warning}
            </div>
          )}

          <div
            style={{
              fontSize: '15px',
              color: checked ? '#6B7280' : '#4B5563',
              marginTop: '6px',
              lineHeight: 1.4,
              fontWeight: '500',
            }}
          >
            {med.instructions}
          </div>
        </div>
      </div>
    </div>
  );
}

function TimeBlock({ block, meds, checks, onToggle }) {
  const takenCount = meds.filter((m) => checks[m.id]).length;
  const total = meds.length;
  const allDone = takenCount === total;

  return (
    <div style={{ marginBottom: '28px' }}>
      {/* Block header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: block.bg,
          border: `2px solid ${block.border}`,
          borderRadius: '14px',
          padding: '12px 16px',
          marginBottom: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '26px' }}>{block.emoji}</span>
          <span
            style={{
              fontSize: '21px',
              fontWeight: '900',
              color: block.color,
              letterSpacing: '-0.3px',
            }}
          >
            {block.label}
          </span>
        </div>
        <div
          style={{
            fontSize: '16px',
            fontWeight: '800',
            color: allDone ? '#16A34A' : block.color,
            backgroundColor: allDone ? '#DCFCE7' : block.bg,
            padding: '4px 12px',
            borderRadius: '20px',
            border: `2px solid ${allDone ? '#86EFAC' : block.border}`,
          }}
        >
          {allDone ? '✓ Done' : `${takenCount} / ${total}`}
        </div>
      </div>

      {/* Med list */}
      {meds.map((med) => (
        <MedItem
          key={med.id}
          med={med}
          checked={!!checks[med.id]}
          onToggle={() => onToggle(med.id)}
          isPrn={block.key === 'prn'}
        />
      ))}
    </div>
  );
}

export default function TodaysMeds() {
  const today = getTodayKey();
  const [checks, setChecks] = useLocalStorage(`meds_${today}`, {});
  const [vitalsLog] = useLocalStorage('vitals_log', []);

  const todayVitals = vitalsLog.find((e) => e.date === today);
  const currentFluids = todayVitals && todayVitals.fluids ? Number(todayVitals.fluids) : 0;

  const allMeds = Object.values(MEDICATIONS).flat();
  const totalTaken = allMeds.filter((m) => checks[m.id]).length;
  const totalMeds = allMeds.length;

  function toggleMed(medId) {
    setChecks((prev) => ({ ...prev, [medId]: !prev[medId] }));
    // Haptic feedback if supported
    if (navigator.vibrate) navigator.vibrate(30);
  }

  return (
    <div style={{ paddingBottom: '8px' }}>
      {/* Date header */}
      <div
        style={{
          backgroundColor: '#121212',
          color: '#FFFFFF',
          padding: '18px 20px 16px',
          borderRadius: '0 0 20px 20px',
          marginBottom: '16px',
        }}
      >
        <div style={{ fontSize: '14px', fontWeight: '700', opacity: 0.8, marginBottom: '2px', color: '#1ED760' }}>
          TODAY
        </div>
        <div style={{ fontSize: '20px', fontWeight: '800', lineHeight: 1.2 }}>
          {formatDateDisplay(today)}
        </div>
        {/* Progress bar */}
        <div style={{ marginTop: '12px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '14px',
              fontWeight: '700',
              marginBottom: '6px',
              opacity: 0.9,
            }}
          >
            <span>Medications taken</span>
            <span>
              {totalTaken} of {totalMeds}
            </span>
          </div>
          <div
            style={{
              height: '10px',
              backgroundColor: 'rgba(255,255,255,0.25)',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${(totalTaken / totalMeds) * 100}%`,
                backgroundColor: totalTaken === totalMeds ? '#1ED760' : '#1DB954',
                borderRadius: '8px',
                transition: 'width 0.4s ease',
              }}
            />
          </div>
        </div>
      </div>

      {/* ⚠️ Fluid restriction warning */}
      <div
        style={{
          backgroundColor: '#FEF3C7',
          border: '2px solid #FCD34D',
          borderRadius: '14px',
          padding: '14px 16px',
          marginBottom: '20px',
          display: 'flex',
          gap: '12px',
          alignItems: 'flex-start',
        }}
      >
        <span style={{ fontSize: '26px', flexShrink: 0 }}>💧</span>
        <div style={{ width: '100%' }}>
          <div style={{ fontSize: '18px', fontWeight: '900', color: '#92400E' }}>
            FLUID RESTRICTION: 1,500 mL / day
          </div>
          <div style={{ fontSize: '15px', color: '#78350F', fontWeight: '600', marginTop: '3px' }}>
            Count water used to swallow pills toward your daily limit!
          </div>
          <div style={{ marginTop: '10px', backgroundColor: '#FDE68A', borderRadius: '8px', padding: '8px 12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', fontWeight: '800', color: '#92400E' }}>
              <span>Current Fluids: {currentFluids} mL</span>
              <span>{1500 - currentFluids > 0 ? `${1500 - currentFluids} mL left` : 'Limit reached!'}</span>
            </div>
            <div style={{ height: '8px', backgroundColor: '#FEF3C7', borderRadius: '4px', marginTop: '6px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${Math.min((currentFluids / 1500) * 100, 100)}%`, backgroundColor: currentFluids > 1500 ? '#EF4444' : '#F59E0B', borderRadius: '4px' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Medication time blocks */}
      {TIME_BLOCKS.map((block) => (
        <TimeBlock
          key={block.key}
          block={block}
          meds={MEDICATIONS[block.key]}
          checks={checks}
          onToggle={toggleMed}
        />
      ))}

      {/* All done celebration */}
      {totalTaken === totalMeds && (
        <div
          style={{
            textAlign: 'center',
            padding: '24px 16px',
            backgroundColor: '#F0FDF4',
            border: '2px solid #86EFAC',
            borderRadius: '16px',
            marginBottom: '12px',
          }}
        >
          <div style={{ fontSize: '40px' }}>🎉</div>
          <div style={{ fontSize: '22px', fontWeight: '900', color: '#15803D', marginTop: '8px' }}>
            All medications taken!
          </div>
          <div style={{ fontSize: '16px', color: '#166534', fontWeight: '600', marginTop: '4px' }}>
            Great job today.
          </div>
        </div>
      )}
    </div>
  );
}
