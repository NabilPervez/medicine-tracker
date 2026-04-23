import React from 'react';

export default function CallForHelp() {
  const contacts = [
    {
      name: 'Mohammad Alasaad, MD',
      role: 'Cardiology Interventional',
      phone: '817-284-3915',
      note: 'Call for follow up appt (1-2 weeks)',
    },
    {
      name: 'Minh P. Tran, MD',
      role: 'Cardiothoracic Surgery',
      phone: '469-800-1400',
      note: 'Call for follow up appt (1-2 weeks)',
    },
    {
      name: 'American Cancer Society',
      role: 'Smoking Cessation Support',
      phone: '1-800-227-2345',
    },
    {
      name: 'American Lung Association',
      role: 'Smoking Cessation Support',
      phone: '1-800-548-8252',
    },
  ];

  return (
    <div style={{ paddingBottom: '8px' }}>
      <div
        style={{
          backgroundColor: '#FFFFFF',
          color: '#121212',
          padding: '24px 20px',
          borderRadius: '16px',
          marginBottom: '20px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
          border: '1px solid #E5E7EB',
        }}
      >
        <div style={{ fontSize: '13px', fontWeight: '700', opacity: 0.8, marginBottom: '4px', color: '#526442', textTransform: 'uppercase', letterSpacing: '1px' }}>
          CONTACTS & RESOURCES
        </div>
        <div style={{ fontSize: '24px', fontWeight: '800', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          Call For Help
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {contacts.map((contact, i) => (
          <div
            key={i}
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: '16px',
              padding: '20px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
            }}
          >
            <div style={{ fontSize: '18px', fontWeight: '800', color: '#111827', marginBottom: '4px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              {contact.name}
            </div>
            <div style={{ fontSize: '15px', color: '#6B7280', fontWeight: '500', marginBottom: '16px' }}>
              {contact.role}
            </div>
            
            <a
              href={`tel:${contact.phone.replace(/-/g, '')}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                backgroundColor: '#526442',
                color: '#FFFFFF',
                textDecoration: 'none',
                padding: '12px 16px',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '700',
                transition: 'background-color 0.2s',
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>call</span>
              {contact.phone}
            </a>

            {contact.note && (
              <div style={{ marginTop: '16px', fontSize: '14px', color: '#92400E', backgroundColor: '#FEF3C7', padding: '10px 12px', borderRadius: '8px', fontWeight: '600' }}>
                <span style={{ marginRight: '6px' }}>⚠️</span> {contact.note}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
