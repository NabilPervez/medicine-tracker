import React from 'react';
import { ALL_MEDICINES } from '../data/medications';

export default function MedicineLibrary() {
  return (
    <div style={{ paddingBottom: '8px' }}>
      <div
        style={{
          backgroundColor: '#121212',
          color: '#FFFFFF',
          padding: '18px 20px 16px',
          borderRadius: '0 0 20px 20px',
          marginBottom: '20px',
        }}
      >
        <div style={{ fontSize: '14px', fontWeight: '700', opacity: 0.8, marginBottom: '2px', color: '#1ED760' }}>
          REFERENCE
        </div>
        <div style={{ fontSize: '20px', fontWeight: '800' }}>
          Medicine Library
        </div>
      </div>

      <div style={{ padding: '0 4px' }}>
        {ALL_MEDICINES.map((med) => (
          <div
            key={med.name}
            style={{
              backgroundColor: '#FFFFFF',
              border: '1.5px solid #E5E7EB',
              borderRadius: '16px',
              padding: '18px',
              marginBottom: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
              <div>
                <div style={{ fontSize: '20px', fontWeight: '800', color: '#1A3A5C', lineHeight: 1.2 }}>
                  {med.name}
                </div>
                {med.brand && (
                  <div style={{ fontSize: '15px', fontWeight: '600', color: '#6B7280', marginTop: '2px' }}>
                    ({med.brand})
                  </div>
                )}
              </div>
              <div
                style={{
                  backgroundColor: '#F3F4F6',
                  color: '#374151',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: '800',
                  textAlign: 'center',
                  minWidth: '60px',
                }}
              >
                {typeof med.timesPerDay === 'number' ? `${med.timesPerDay}x / day` : med.timesPerDay}
              </div>
            </div>

            <div style={{ marginTop: '12px', fontSize: '16px', color: '#4B5563', lineHeight: 1.5 }}>
              <span style={{ fontWeight: '700', color: '#374151' }}>Purpose: </span>
              {med.purpose}
            </div>

            <div style={{ marginTop: '8px', fontSize: '15px', color: '#4B5563', lineHeight: 1.5 }}>
              <span style={{ fontWeight: '700', color: '#374151' }}>Dose: </span>
              {med.dose}
            </div>

            <div style={{ marginTop: '8px', fontSize: '15px', color: '#4B5563', lineHeight: 1.5 }}>
              <span style={{ fontWeight: '700', color: '#374151' }}>Instructions: </span>
              {med.instructions}
            </div>

            {med.warning && (
              <div
                style={{
                  marginTop: '12px',
                  backgroundColor: '#FEF3C7',
                  color: '#92400E',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '700',
                }}
              >
                {med.warning}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
