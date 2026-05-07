import React, { useState } from 'react';
import axios from 'axios';
import { BookOpen, AlertCircle, Loader2, Sparkles, ArrowLeft, ExternalLink, Clock, Target, Lightbulb, ChevronRight } from 'lucide-react';

export default function Curriculum() {
  const [loading, setLoading] = useState(false);
  const [curriculumData, setCurriculumData] = useState(null);
  const [error, setError] = useState(null);
  const [activeTopic, setActiveTopic] = useState(null);
  const [activeModuleIdx, setActiveModuleIdx] = useState(null);

  const generateCurriculum = async () => {
    try {
      const stored = localStorage.getItem('ai_literacy_analysis');
      if (!stored) {
        setError('No dataset analysis found. Please navigate to Upload Data and analyze a dataset first.');
        return;
      }

      const payload = JSON.parse(stored);
      setLoading(true);
      setError(null);
      setCurriculumData(null);
      setActiveTopic(null);

      const response = await axios.post('/generate_curriculum', payload);
      const raw = response.data.ai_generated_curriculum;

      // Parse JSON — the backend now returns a JSON string
      let parsed;

      try {
          if (typeof raw === 'string') {
    // 🔥 clean bad characters
            const cleaned = raw
          .replace(/[\u0000-\u001F]+/g, "")   // remove control chars
          .trim();

        parsed = JSON.parse(cleaned);
       } else {
        parsed = raw;
        }
} catch (err) {
  console.error("JSON parse failed:", err);
  console.log("RAW DATA:", raw);

  setError("AI returned invalid JSON. Try regenerating.");
  setLoading(false);
  return;
}

      if (parsed.error) {
        setError(parsed.error);
      } else {
        setCurriculumData(parsed);
      }
    } catch (e) {
      console.error(e);
      setError(e.response?.data?.detail || 'Failed to generate curriculum. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  // ---------- DETAIL VIEW ----------
  if (activeTopic !== null && activeModuleIdx !== null && curriculumData) {
    const mod = curriculumData.modules[activeModuleIdx];
    const topic = mod.topics[activeTopic];

    return (
      <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>

        <button
          className="btn btn-outline"
          onClick={() => { setActiveTopic(null); setActiveModuleIdx(null); }}
          style={{ alignSelf: 'flex-start' }}
        >
          <ArrowLeft size={18} /> Back to Modules
        </button>

        <div className="glass-panel" style={{ padding: '40px', position: 'relative', overflow: 'hidden' }}>
          {/* Decorative glow */}
          <div style={{ position: 'absolute', top: '-30%', right: '-10%', width: '300px', height: '300px', background: 'var(--accent-purple)', filter: 'blur(120px)', opacity: 0.08, borderRadius: '50%' }}></div>

          <div style={{ marginBottom: '8px', fontSize: '0.85rem', color: 'var(--accent-blue)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1.5px' }}>
            {mod.module_title}
          </div>

          <h1 style={{ fontSize: '2.2rem', marginBottom: '16px' }}>{topic.topic_name}</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '32px' }}>
            {topic.description}
          </p>

          {/* Learning Objectives */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: 'var(--accent-cyan)' }}>
              <Target size={20} /> Learning Objectives
            </h3>
            <ul style={{ listStyle: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {(topic.objectives || []).map((obj, i) => (
                <li key={i} style={{
                  padding: '12px 16px',
                  background: 'rgba(255,255,255,0.03)',
                  borderLeft: '3px solid var(--accent-cyan)',
                  borderRadius: '0 8px 8px 0',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem',
                  lineHeight: 1.5
                }}>
                  {obj}
                </li>
              ))}
            </ul>
          </div>

          {/* Practical Activities */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: 'var(--accent-purple)' }}>
              <Lightbulb size={20} /> Practical Activities
            </h3>
            <ul style={{ listStyle: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {(topic.activities || []).map((act, i) => (
                <li key={i} style={{
                  padding: '12px 16px',
                  background: 'rgba(255,255,255,0.03)',
                  borderLeft: '3px solid var(--accent-purple)',
                  borderRadius: '0 8px 8px 0',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem',
                  lineHeight: 1.5
                }}>
                  {act}
                </li>
              ))}
            </ul>
          </div>

          {/* W3Schools Link */}
          {topic.w3schools_link && (
            <a
              href={topic.w3schools_link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', fontSize: '1rem', textDecoration: 'none' }}
            >
              <ExternalLink size={18} /> Learn on W3Schools
            </a>
          )}
        </div>
      </div>
    );
  }

  // ---------- GRID / MAIN VIEW ----------
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1000px', margin: '0 auto' }}>

      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>
          AI Generated <span className="text-gradient">Curriculum</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Create a dynamically tailored instructional plan based on your students' existing AI literacy metrics.
        </p>
      </div>

      {/* Initial State — No curriculum yet */}
      {!curriculumData && !loading && (
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', gap: '24px' }}>
          <div style={{ padding: '24px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '50%', color: 'var(--accent-purple)' }}>
            <Sparkles size={48} />
          </div>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Ready to Generate?</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '400px' }}>Make sure you have analyzed a dataset first to provide context for the AI curriculum builder.</p>
          </div>
          <button className="btn btn-primary" onClick={generateCurriculum} style={{ padding: '16px 32px', fontSize: '1.1rem' }}>
            Generate Custom Plan
          </button>

          {error && (
            <div style={{ marginTop: '16px', padding: '12px 16px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '8px', maxWidth: '500px', textAlign: 'left' }}>
              <AlertCircle size={20} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px', gap: '16px', color: 'var(--accent-purple)' }}>
          <Loader2 size={64} style={{ animation: 'spin 1.5s linear infinite' }} />
          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.5rem' }}>Synthesizing Curriculum...</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Our AI is designing a bespoke learning path for your students.</p>
        </div>
      )}

      {/* Curriculum Cards Grid */}
      {curriculumData && !loading && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <h2 style={{ fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <BookOpen color="var(--accent-cyan)" size={28} />
              {curriculumData.title || 'Your Curriculum'}
            </h2>
            <button className="btn btn-outline" onClick={generateCurriculum}>
              Regenerate
            </button>
          </div>

          {curriculumData.modules && curriculumData.modules.map((mod, modIdx) => (
            <section key={modIdx} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Module Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--glass-border)', paddingBottom: '12px', marginTop: '16px' }}>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--accent-blue)' }}>{mod.module_title}</h3>
                {mod.duration && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                    <Clock size={14} /> {mod.duration}
                  </span>
                )}
              </div>

              {/* Topic Cards Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                {mod.topics && mod.topics.map((topic, topicIdx) => (
                  <div
                    key={topicIdx}
                    className="glass-panel"
                    onClick={() => { setActiveModuleIdx(modIdx); setActiveTopic(topicIdx); }}
                    style={{
                      padding: '24px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <h4 style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>{topic.topic_name}</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5, flex: 1 }}>
                      {topic.description}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontWeight: 500 }}>
                        {(topic.objectives || []).length} objectives
                      </span>
                      <ChevronRight size={18} color="var(--text-secondary)" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
