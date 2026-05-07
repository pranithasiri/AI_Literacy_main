import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { AlertCircle, ArrowRight, TrendingUp, TrendingDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const COLORS = ['var(--accent-cyan)', 'var(--accent-blue)', 'var(--accent-purple)', 'var(--accent-pink)', '#8884d8'];
const PIE_COLORS = ['#10b981', '#f59e0b', '#ef4444'];

export default function Analytics() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const stored = localStorage.getItem('ai_literacy_analysis');
      if (stored) {
        setData(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  if (!data) return (
    <div className="animate-fade-in flex-center" style={{ minHeight: '60vh', flexDirection: 'column', gap: '16px' }}>
      <AlertCircle size={48} color="var(--accent-blue)" />
      <h2>No Analysis Data Found</h2>
      <p style={{ color: 'var(--text-secondary)' }}>Please upload a dataset first to view analytics.</p>
      <button className="btn btn-primary" onClick={() => navigate('/upload')}>Go to Upload</button>
    </div>
  );

  // Helper to format pie data
  const formatPieData = (obj) => {
    if (!obj) return [];
    return Object.keys(obj).map(k => ({ name: k, value: obj[k] }));
  };

  const literacyData = formatPieData(data.literacy_distribution_percent);
  const technicalData = formatPieData(data.technical_understanding_percent);
  const practicalData = formatPieData(data.practical_application_percent);
  const criticalData = formatPieData(data.critical_appraisal_percent);

  // Model Influence Data mapping
  const influenceData = data.decision_tree_influence || {};
  
  const renderInfluenceCard = (title, influenceObj) => {
    if (!influenceObj) return null;
    const most = influenceObj.most_influential || ["N/A", 0];
    const least = influenceObj.least_influential || ["N/A", 0];
    
    return (
      <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', flex: '1 1 200px' }}>
        <h4 style={{ color: 'var(--text-primary)', borderBottom: '1px solid var(--glass-border)', paddingBottom: '8px' }}>{title} Factors</h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#10b981' }}>
          <TrendingUp size={24} />
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Most Influential</div>
            <div style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>{most[0]} ({(most[1] * 100).toFixed(1)}%)</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#ef4444' }}>
          <TrendingDown size={24} />
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Least Influential</div>
            <div style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>{least[0]} ({(least[1] * 100).toFixed(1)}%)</div>
          </div>
        </div>
      </div>
    );
  };

  const renderPieChart = (title, chartData) => (
    <div className="glass-panel" style={{ padding: '24px' }}>
      <h3 style={{ fontSize: '1.25rem', marginBottom: '24px', color: 'var(--text-primary)', textAlign: 'center' }}>{title}</h3>
      <div style={{ height: '250px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              innerRadius={50}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
              ))}
            </Pie>
            <RechartsTooltip 
              formatter={(value) => `${value.toFixed(1)}%`}
              contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--glass-border)', color: 'var(--text-primary)', borderRadius: '8px' }} 
            />
            <Legend iconType="circle" wrapperStyle={{ color: 'var(--text-primary)', fontSize: '0.9rem' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Model <span className="text-gradient">Analytics</span></h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Decision Tree analysis across {data.students_analyzed || 0} student records.
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/curriculum')}>
          Generate Curriculum <ArrowRight size={18} />
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {renderPieChart("Overall AI Literacy", literacyData)}
        {renderPieChart("Critical Thinking Level", criticalData)}
        {renderPieChart("Technical Understanding", technicalData)}
        {renderPieChart("Practical Application", practicalData)}
      </div>

      <h3 style={{ fontSize: '1.5rem', marginTop: '16px borderTop: "1px solid var(--glass-border)", paddingTop: "24px"' }}>
        Predictive Factors (Decision Tree Importance)
      </h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
        {renderInfluenceCard("Overall Literacy", influenceData.overall_model)}
        {renderInfluenceCard("Critical Thinking", influenceData.critical_model)}
        {renderInfluenceCard("Technical Skills", influenceData.technical_model)}
        {renderInfluenceCard("Practical App", influenceData.practical_model)}
      </div>

    </div>
  );
}
