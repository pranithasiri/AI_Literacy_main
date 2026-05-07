import React, { useState, useRef } from 'react';
import { UploadCloud, FileType, CheckCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Upload() {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      if (e.dataTransfer.files[0].type === "text/csv" || e.dataTransfer.files[0].name.endsWith('.csv')) {
        setFile(e.dataTransfer.files[0]);
        setError(null);
      } else {
        setError("Only CSV files are supported currently.");
      }
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const onButtonClick = () => {
    inputRef.current.click();
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/analyze_dataset', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      setSuccess(true);
      // Store result in local storage so analytics can read it
      localStorage.setItem('ai_literacy_analysis', JSON.stringify(response.data.results));
      
      setTimeout(() => {
        navigate('/analytics');
      }, 1500);
      
    } catch (err) {
      setError(err.response?.data?.detail || "An error occurred while uploading. Ensure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>
          Upload <span className="text-gradient">Dataset</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '500px' }}>
          Upload a CSV dataset containing student demographics and their AI usage. Start the analysis to generate metrics and insights.
        </p>
      </div>

      <div 
        className={`glass-panel ${dragActive ? 'pulse' : ''}`}
        style={{
          width: '100%',
          maxWidth: '600px',
          padding: '40px 24px',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
          borderStyle: 'dashed',
          borderWidth: '2px',
          borderColor: dragActive ? 'var(--accent-blue)' : 'var(--glass-border)',
          transition: 'all 0.3s ease',
          backgroundColor: dragActive ? 'rgba(79, 172, 254, 0.05)' : 'var(--glass-bg)'
        }}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input 
          ref={inputRef} 
          type="file" 
          accept=".csv" 
          onChange={handleChange} 
          style={{ display: 'none' }} 
        />
        
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', color: 'var(--accent-blue)' }}>
            <Loader2 size={48} className="pulse" style={{ animation: 'spin 1.5s linear infinite' }} />
            <h3 style={{ color: 'var(--text-primary)' }}>Analyzing Data...</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>This might take a few moments</p>
          </div>
        ) : success ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', color: '#4ade80' }}>
            <CheckCircle size={64} className="animate-fade-in" />
            <h3 style={{ color: 'var(--text-primary)' }}>Analysis Complete!</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Redirecting to analytics...</p>
          </div>
        ) : (
          <>
            <div style={{ padding: '24px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-secondary)' }}>
               {file ? <FileType size={48} color="var(--accent-cyan)" /> : <UploadCloud size={48} />}
            </div>
            
            <div style={{ textAlign: 'center' }}>
              {file ? (
                <>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--accent-cyan)' }}>{file.name}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{(file.size / 1024).toFixed(2)} KB</p>
                </>
              ) : (
                <>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Drag & Drop your CSV file here</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>or click to browse from your computer</p>
                </>
              )}
            </div>

            {error && (
              <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', color: '#ef4444', fontSize: '0.9rem', width: '100%', textAlign: 'center' }}>
                {error}
              </div>
            )}

            <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
              <button className="btn btn-outline" onClick={onButtonClick}>
                {file ? 'Change File' : 'Browse Files'}
              </button>
              {file && (
                <button className="btn btn-primary" onClick={handleUpload} disabled={loading}>
                  Run Analytics
                </button>
              )}
            </div>
          </>
        )}
      </div>
      
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
