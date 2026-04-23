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
        fontFamily: 'Inter, sans-serif',
        backgroundColor: '#F9F9F9',
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '600px',
        margin: '0 auto',
        position: 'relative',
      }}
    >
      {/* App header */}
      <header
        style={{
          backgroundColor: '#526442',
          color: '#FFFFFF',
          padding: '16px 20px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          paddingTop: 'max(16px, env(safe-area-inset-top))',
        }}
      >
        <span style={{ fontSize: '24px' }}>🌿</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '22px', fontWeight: '700', fontFamily: 'Plus Jakarta Sans, sans-serif', letterSpacing: '-0.5px' }}>
            Medicine Recall
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <button 
            onClick={() => setShowSettings(!showSettings)}
            style={{ background: 'transparent', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#FFFFFF', display: 'flex', alignItems: 'center' }}
          >
            <span className="material-symbols-outlined">settings</span>
          </button>
          {showSettings && (
            <div style={{
              position: 'absolute', right: 0, top: '40px', background: '#FFFFFF', 
              color: '#121212', borderRadius: '12px', padding: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              minWidth: '150px', zIndex: 100
            }}>
              <input type="file" accept=".json" ref={fileInputRef} onChange={handleImport} style={{ display: 'none' }} />
              <button onClick={() => fileInputRef.current.click()} style={{ display: 'block', width: '100%', padding: '10px', background: 'transparent', border: 'none', textAlign: 'left', fontWeight: 'bold', cursor: 'pointer', color: '#121212' }}>📥 Import Data</button>
              <hr style={{ border: 'none', borderTop: '1px solid #E5E7EB', margin: '4px 0' }} />
              <button onClick={handleExport} style={{ display: 'block', width: '100%', padding: '10px', background: 'transparent', border: 'none', textAlign: 'left', fontWeight: 'bold', cursor: 'pointer', color: '#121212' }}>📤 Export Data</button>
            </div>
          )}
        </div>
      </header>

      {/* Main content */}
      <main
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px 16px 20px',
          backgroundColor: '#F9F9F9',
          paddingBottom: 'calc(90px + env(safe-area-inset-bottom))', // Space for bottom nav
        }}
      >
        {activeTab === 'meds' && <TodaysMeds />}
        {activeTab === 'vitals' && <VitalsLog />}
        {activeTab === 'library' && <MedicineLibrary />}
      </main>

      {/* Bottom Tab navigation */}
      <nav
        style={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: '600px',
          display: 'flex',
          backgroundColor: '#FFFFFF',
          padding: '8px 12px',
          paddingBottom: 'max(8px, env(safe-area-inset-bottom))',
          boxShadow: '0 -4px 16px rgba(0,0,0,0.05)',
          borderTop: '1px solid #E5E7EB',
          zIndex: 50,
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
                padding: '6px 4px',
                fontSize: '12px',
                fontWeight: '600',
                fontFamily: 'Inter, sans-serif',
                color: isActive ? '#526442' : '#9CA3AF',
                backgroundColor: 'transparent',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                transition: 'all 0.2s ease',
              }}
            >
              <span style={{ fontSize: '24px', opacity: isActive ? 1 : 0.6, transform: isActive ? 'scale(1.1)' : 'scale(1)' }}>
                {tab.emoji}
              </span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
        {activeTab === 'meds' && <TodaysMeds />}
        {activeTab === 'vitals' && <VitalsLog />}
        {activeTab === 'library' && <MedicineLibrary />}
      </main>
    </div>
  );
}
