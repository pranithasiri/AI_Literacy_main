import React from 'react';
import { ArrowRight, Brain, Lightbulb, TrendingUp, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const features = [
  { icon: Brain, title: 'Understand AI', desc: 'Demystify artificial intelligence and learn how models perceive data.' },
  { icon: Lightbulb, title: 'Critical Thinking', desc: 'Analyze AI outputs critically to find biases or inaccuracies.' },
  { icon: TrendingUp, title: 'Future Proof Skills', desc: 'Equip yourself or your students with indispensable modern skills.' },
  { icon: ShieldCheck, title: 'Ethical Usage', desc: 'Learn the boundaries of data privacy and ethical AI integration.' }
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto', gap: '32px', display: 'flex', flexDirection: 'column' }}>
      
      {/* Hero Section */}
      <section style={{ 
        padding: '60px 40px', 
        borderRadius: '24px', 
        background: 'linear-gradient(135deg, rgba(79, 172, 254, 0.1), rgba(127, 0, 255, 0.05))',
        border: '1px solid var(--glass-border)',
        boxShadow: 'var(--shadow-glow)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative elements */}
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '300px', height: '300px', background: 'var(--accent-purple)', filter: 'blur(100px)', opacity: 0.1, borderRadius: '50%' }}></div>
        
        <h1 style={{ fontSize: '3rem', marginBottom: '24px', lineHeight: '1.2' }}>
          Empower the Future with <br />
          <span className="text-gradient">AI Literacy</span>.
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '32px', maxWidth: '600px', lineHeight: '1.6' }}>
          Welcome to the AI Literacy Hub. Our mission is to bridge the gap between human curiosity and artificial intelligence. Upload your datasets, analyze trends, and dynamically generate curriculum designed to prepare students for an AI-driven world.
        </p>
        
        <div style={{ display: 'flex', gap: '16px' }}>
          <button className="btn btn-primary" onClick={() => navigate('/upload')}>
            Get Started <ArrowRight size={18} />
          </button>
          <button className="btn btn-outline" onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}>
            Learn More
          </button>
        </div>
      </section>

      {/* Stats/Dashboard Overview */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        {[
          { label: 'Datasets Analyzed', val: '24+', color: 'var(--accent-blue)' },
          { label: 'Curriculums Generated', val: '12', color: 'var(--accent-cyan)' },
          { label: 'Students Reached', val: '1,040', color: 'var(--accent-purple)' },
        ].map((stat, i) => (
          <div key={i} className="glass-panel" style={{ padding: '24px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', color: stat.color, marginBottom: '8px' }}>{stat.val}</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px' }}>
              {stat.label}
            </p>
          </div>
        ))}
      </section>

      {/* Why AI Literacy Features */}
      <section id="features" style={{ marginTop: '20px' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '24px', textAlign: 'center' }}>Why <span className="text-gradient">AI Literacy</span> Matters</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
          {features.map((feat, i) => (
            <div key={i} className="glass-panel" style={{ padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '16px' }}>
              <div style={{ padding: '16px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '50%', color: 'var(--accent-cyan)' }}>
                <feat.icon size={32} />
              </div>
              <h3 style={{ fontSize: '1.25rem' }}>{feat.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5' }}>{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
