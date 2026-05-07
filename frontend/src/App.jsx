import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home, Upload as UploadIcon, BarChart3, BookOpen, BrainCircuit } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import Analytics from './pages/Analytics';
import Curriculum from './pages/Curriculum';

function Sidebar() {
  const location = useLocation();

  const links = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'Upload Data', path: '/upload', icon: UploadIcon },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Curriculum', path: '/curriculum', icon: BookOpen },
  ];

  return (
    <aside style={{
      width: '260px',
      height: '100vh',
      position: 'fixed',
      borderRight: '1px solid var(--glass-border)',
      background: 'rgba(10, 10, 15, 0.8)',
      backdropFilter: 'blur(20px)',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 50
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
        <div style={{ padding: '8px', background: 'var(--glass-bg)', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
          <BrainCircuit color="var(--accent-cyan)" size={28} />
        </div>
        <h2 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', margin: 0 }}>
          <span className="text-gradient">AI Literacy</span> Hub
        </h2>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {links.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.name}
              to={link.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '8px',
                color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                background: isActive ? 'rgba(79, 172, 254, 0.1)' : 'transparent',
                border: `1px solid ${isActive ? 'rgba(79, 172, 254, 0.2)' : 'transparent'}`,
                transition: 'all 0.2s ease',
                fontWeight: isActive ? 500 : 400
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'var(--glass-bg)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }
              }}
            >
              <link.icon size={20} color={isActive ? "var(--accent-cyan)" : "currentColor"} />
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div style={{ marginTop: 'auto', padding: '16px', borderRadius: '12px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}>
        <h4 style={{ fontSize: '0.85rem', marginBottom: '8px', color: 'var(--text-secondary)' }}>System Status</h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 10px #4ade80' }}></span>
          <span style={{ fontSize: '0.85rem' }}>Backend Connected</span>
        </div>
      </div>
    </aside>
  );
}

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar />
        <main style={{ flex: 1, marginLeft: '260px', padding: '40px', position: 'relative' }}>
          {/* Decorative background blurs */}
          <div style={{
            position: 'absolute', top: '-10%', left: '20%', width: '500px', height: '500px',
            background: 'var(--accent-purple)', filter: 'blur(150px)', opacity: 0.1, zIndex: -1, borderRadius: '50%'
          }}></div>
          <div style={{
            position: 'absolute', bottom: '10%', right: '10%', width: '400px', height: '400px',
            background: 'var(--accent-cyan)', filter: 'blur(150px)', opacity: 0.1, zIndex: -1, borderRadius: '50%'
          }}></div>

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/curriculum" element={<Curriculum />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
