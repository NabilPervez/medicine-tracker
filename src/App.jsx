import { useState, useEffect, useRef } from 'react';
import TodaysMeds from './components/TodaysMeds';
import VitalsLog from './components/VitalsLog';
import MedicineLibrary from './components/MedicineLibrary';

const TABS = [
  { id: 'meds', label: "Today's Meds", emoji: '💊' },
  { id: 'vitals', label: 'Vitals & Fluids', emoji: '📊' },
  { id: 'library', label: 'Library', emoji: '📚' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('meds');
  const [showSettings, setShowSettings] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if ('Notification' in window && Notification.permission !== 'granted' && Notification.permission !== 'denied') {
      Notification.requestPermission();
    }

    const checkAlerts = () => {
      const now = new Date();
      const hours = now.getHours();
      const mins = now.getMinutes();
      const timeKey = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}-${hours}`;
      
      const lastAlert = localStorage.getItem('last_alert_time');
      if (lastAlert === timeKey) return; // Already alerted for this hour

      let alertMessage = null;
      if (hours === 8 && mins < 5) alertMessage = "It's 08:00 AM! Time to take your morning medications.";
      if (hours === 20 && mins < 5) alertMessage = "It's 08:00 PM! Time to take your evening medications.";
      if (hours === 22 && mins < 5) alertMessage = "It's 10:00 PM! Time to take your bedtime medications.";

      if (alertMessage) {
        localStorage.setItem('last_alert_time', timeKey);
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('Med Tracker', { body: alertMessage, icon: '/icons/icon-192.png' });
        } else {
          alert(alertMessage);
        }
      }
    };

    const interval = setInterval(checkAlerts, 60000);
    checkAlerts();
    return () => clearInterval(interval);
  }, []);

  const handleExport = () => {
    const data = {
      vitals_log: JSON.parse(localStorage.getItem('vitals_log') || '[]'),
      meds_keys: Object.keys(localStorage).filter(k => k.startsWith('meds_')).reduce((acc, k) => {
        acc[k] = JSON.parse(localStorage.getItem(k));
        return acc;
      }, {})
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'med-tracker-backup.json';
    a.click();
    URL.revokeObjectURL(url);
    setShowSettings(false);
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (data.vitals_log) localStorage.setItem('vitals_log', JSON.stringify(data.vitals_log));
        if (data.meds_keys) {
          Object.keys(data.meds_keys).forEach(k => {
            localStorage.setItem(k, JSON.stringify(data.meds_keys[k]));
          });
        }
        alert('Data imported successfully!');
        window.location.reload();
      } catch (err) {
        alert('Invalid file format.');
      }
    };
    reader.readAsText(file);
  };

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
          backgroundColor: activeTab === 'meds' ? '#1A3A5C' : activeTab === 'vitals' ? '#0D7A8A' : '#4B5563',
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
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '22px', fontWeight: '900', lineHeight: 1.1 }}>
            Med Tracker
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <button 
            onClick={() => setShowSettings(!showSettings)}
            style={{ background: 'transparent', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#FFF' }}
          >
            ⚙️
          </button>
          {showSettings && (
            <div style={{
              position: 'absolute', right: 0, top: '40px', background: '#FFF', 
              color: '#333', borderRadius: '12px', padding: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              minWidth: '150px', zIndex: 100
            }}>
              <input type="file" accept=".json" ref={fileInputRef} onChange={handleImport} style={{ display: 'none' }} />
              <button onClick={() => fileInputRef.current.click()} style={{ display: 'block', width: '100%', padding: '10px', background: 'transparent', border: 'none', textAlign: 'left', fontWeight: 'bold', cursor: 'pointer' }}>📥 Import Data</button>
              <hr style={{ border: 'none', borderTop: '1px solid #EEE', margin: '4px 0' }} />
              <button onClick={handleExport} style={{ display: 'block', width: '100%', padding: '10px', background: 'transparent', border: 'none', textAlign: 'left', fontWeight: 'bold', cursor: 'pointer' }}>📤 Export Data</button>
            </div>
          )}
        </div>
      </header>

      {/* Tab navigation */}
      <nav
        style={{
          display: 'flex',
          backgroundColor: activeTab === 'meds' ? '#1A3A5C' : activeTab === 'vitals' ? '#0D7A8A' : '#4B5563',
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
                padding: '12px 4px',
                fontSize: '15px',
                fontWeight: '800',
                fontFamily: 'Nunito, sans-serif',
                color: isActive ? (tab.id === 'meds' ? '#1A3A5C' : tab.id === 'vitals' ? '#0D7A8A' : '#4B5563') : 'rgba(255,255,255,0.7)',
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
        {activeTab === 'meds' && <TodaysMeds />}
        {activeTab === 'vitals' && <VitalsLog />}
        {activeTab === 'library' && <MedicineLibrary />}
      </main>
    </div>
  );
}
