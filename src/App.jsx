import { useState } from 'react';
import TodaysMeds from './components/TodaysMeds';
import VitalsLog from './components/VitalsLog';

const TABS = [
  { id: 'meds', label: "Today's Meds", emoji: '💊' },
  { id: 'vitals', label: 'Vitals & Fluids', emoji: '📊' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('meds');

  return (
    <div
      style={{
        fontFamily: 'Nunito, sans-serif',
        backgroundColor: '#F8F5EF',
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '600px',
        margin: '0 auto',
      }}
    >
      {/* App header */}
      <header
        style={{
          backgroundColor: activeTab === 'meds' ? '#1A3A5C' : '#0D7A8A',
          color: '#FFFFFF',
          padding: '14px 20px 0',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          transition: 'background-color 0.3s',
          paddingTop: 'max(14px, env(safe-area-inset-top))',
        }}
      >
        <span style={{ fontSize: '26px' }}>🏥</span>
        <div>
          <div style={{ fontSize: '22px', fontWeight: '900', lineHeight: 1.1 }}>
            Med Tracker
          </div>
          <div style={{ fontSize: '13px', fontWeight: '600', opacity: 0.7 }}>
            Sayed M. Pervez
          </div>
        </div>
      </header>

      {/* Tab navigation */}
      <nav
        style={{
          display: 'flex',
          backgroundColor: activeTab === 'meds' ? '#1A3A5C' : '#0D7A8A',
          padding: '8px 12px 0',
          gap: '4px',
          transition: 'background-color 0.3s',
        }}
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                padding: '12px 8px',
                fontSize: '16px',
                fontWeight: '800',
                fontFamily: 'Nunito, sans-serif',
                color: isActive ? (tab.id === 'meds' ? '#1A3A5C' : '#0D7A8A') : 'rgba(255,255,255,0.7)',
                backgroundColor: isActive ? '#F8F5EF' : 'transparent',
                border: 'none',
                borderRadius: '12px 12px 0 0',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                transition: 'all 0.15s',
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              <span style={{ fontSize: '20px' }}>{tab.emoji}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Main content */}
      <main
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '0 16px 20px',
          backgroundColor: '#F8F5EF',
          paddingBottom: 'max(20px, env(safe-area-inset-bottom))',
        }}
      >
        {activeTab === 'meds' ? <TodaysMeds /> : <VitalsLog />}
      </main>
    </div>
  );
}
