import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCommentDots, FaTimes, FaRobot, FaArrowRight } from 'react-icons/fa';

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState('intro'); // intro, about, timeline, current, predictor-info, predictor-form
  const [batteryInputs, setBatteryInputs] = useState({
    voltage: '',
    temperature: '',
    cycle_count: '',
    soc: ''
  });
  const navigate = useNavigate();

  const handleQuickAction = (action) => {
    setView(action);
  };

  const handleBatterySubmit = () => {
    // Navigate to predictor page with query params
    const params = new URLSearchParams(batteryInputs).toString();
    navigate(`/predictor?${params}`);
    setIsOpen(false);
    setView('intro');
  };

  const chatContainerStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: 9999,
  };

  const chatButtonStyle = {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
    border: 'none',
    color: 'white',
    fontSize: '1.5rem',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(30, 58, 138, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
  };

  const chatWindowStyle = {
    position: 'absolute',
    bottom: '80px',
    right: '0',
    width: '360px',
    maxHeight: '500px',
    background: 'white',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  };

  const chatHeaderStyle = {
    background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
    color: 'white',
    padding: '1rem 1.25rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const chatBodyStyle = {
    padding: '1.25rem',
    flex: 1,
    overflowY: 'auto',
    maxHeight: '400px',
  };

  const messageStyle = {
    background: '#f1f5f9',
    padding: '0.875rem 1rem',
    borderRadius: '12px',
    marginBottom: '1rem',
    fontSize: '0.9rem',
    lineHeight: '1.5',
    color: '#334155',
  };

  const quickActionGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '0.75rem',
    marginTop: '1rem',
  };

  const quickActionButtonStyle = {
    padding: '0.75rem',
    background: 'white',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#1e293b',
    transition: 'all 0.3s ease',
    textAlign: 'center',
  };

  const inputStyle = {
    width: '100%',
    padding: '0.625rem 0.875rem',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '0.875rem',
    marginBottom: '0.75rem',
    transition: 'border-color 0.3s ease',
  };

  const submitButtonStyle = {
    width: '100%',
    padding: '0.75rem',
    background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '0.5rem',
    transition: 'all 0.3s ease',
  };

  const backButtonStyle = {
    ...submitButtonStyle,
    background: '#94a3b8',
    marginBottom: '0.75rem',
  };

  return (
    <div style={chatContainerStyle}>
      {!isOpen ? (
        <button
          style={chatButtonStyle}
          onClick={() => setIsOpen(true)}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(30, 58, 138, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(30, 58, 138, 0.4)';
          }}
        >
          <FaCommentDots />
        </button>
      ) : (
        <div style={chatWindowStyle}>
          {/* Header */}
          <div style={chatHeaderStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <FaRobot size={24} />
              <div>
                <div style={{ fontWeight: '700', fontSize: '1rem' }}>MAHA-EV Assistant</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>How can I help you?</div>
              </div>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                setView('intro');
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                fontSize: '1.25rem',
                padding: '0.25rem',
              }}
            >
              <FaTimes />
            </button>
          </div>

          {/* Body */}
          <div style={chatBodyStyle}>
            {view === 'intro' ? (
              <>
                <div style={messageStyle}>
                  👋 Hi! I'm your MAHA-EV assistant. Get quick insights about our battery safety research without navigating through pages.
                </div>
                
                <div style={{ ...messageStyle, fontSize: '0.8rem', background: '#eff6ff', borderLeft: '3px solid #2563eb', padding: '0.75rem' }}>
                  <strong>💡 Why use me?</strong><br/>
                  Quick summaries · Fast battery predictions · No page navigation needed
                </div>

                <div style={{ ...messageStyle, fontWeight: '600', fontSize: '0.85rem', marginBottom: '0.5rem', marginTop: '1rem' }}>
                  What can I help you with?
                </div>

                <div style={quickActionGridStyle}>
                  <button
                    style={quickActionButtonStyle}
                    onClick={() => handleQuickAction('about')}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#1e3a8a';
                      e.currentTarget.style.background = '#eff6ff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#e2e8f0';
                      e.currentTarget.style.background = 'white';
                    }}
                  >
                    About Project
                  </button>
                  
                  <button
                    style={quickActionButtonStyle}
                    onClick={() => handleQuickAction('timeline')}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#1e3a8a';
                      e.currentTarget.style.background = '#eff6ff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#e2e8f0';
                      e.currentTarget.style.background = 'white';
                    }}
                  >
                    Timeline
                  </button>
                  
                  <button
                    style={quickActionButtonStyle}
                    onClick={() => handleQuickAction('current')}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#1e3a8a';
                      e.currentTarget.style.background = '#eff6ff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#e2e8f0';
                      e.currentTarget.style.background = 'white';
                    }}
                  >
                    Current Status
                  </button>
                  
                  <button
                    style={quickActionButtonStyle}
                    onClick={() => handleQuickAction('predictor-info')}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#1e3a8a';
                      e.currentTarget.style.background = '#eff6ff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#e2e8f0';
                      e.currentTarget.style.background = 'white';
                    }}
                  >
                    Battery Predictor
                  </button>
                </div>
              </>
            ) : view === 'about' ? (
              <>
                <button
                  style={backButtonStyle}
                  onClick={() => setView('intro')}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#64748b'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#94a3b8'}
                >
                  ← Back
                </button>

                <div style={{ ...messageStyle, fontWeight: '700', background: '#1e3a8a', color: 'white' }}>
                  About MAHA-EV E-RIDES
                </div>

                <div style={messageStyle}>
                  <strong>Focus:</strong> Real-time early-warning system for battery abuse and fire prevention in Indian EVs.
                </div>

                <div style={messageStyle}>
                  <strong>Challenge:</strong> Indian conditions (high temperature, humidity, variable road loads) stress lithium-ion batteries, potentially triggering thermal runaway.
                </div>

                <div style={messageStyle}>
                  <strong>Solution:</strong> Predictive diagnostics with IoT sensors for proactive battery safety monitoring.
                </div>

                <button
                  style={{ ...submitButtonStyle, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                  onClick={() => { navigate('/about'); setIsOpen(false); setView('intro'); }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  Learn More <FaArrowRight size={12} />
                </button>
              </>
            ) : view === 'timeline' ? (
              <>
                <button
                  style={backButtonStyle}
                  onClick={() => setView('intro')}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#64748b'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#94a3b8'}
                >
                  ← Back
                </button>

                <div style={{ ...messageStyle, fontWeight: '700', background: '#1e3a8a', color: 'white' }}>
                  3-Year Research Timeline
                </div>

                <div style={{ ...messageStyle, borderLeft: '3px solid #1e3a8a' }}>
                  <strong style={{ color: '#1e3a8a' }}>Year 1 - Phase A</strong><br/>
                  Experimental data collection + Battery Digital Twin development
                </div>

                <div style={{ ...messageStyle, borderLeft: '3px solid #f97316' }}>
                  <strong style={{ color: '#f97316' }}>Year 2 - Phase B</strong><br/>
                  Multimodal IoT sensing suite + AI fault detection integration
                </div>

                <div style={{ ...messageStyle, borderLeft: '3px solid #059669' }}>
                  <strong style={{ color: '#059669' }}>Year 3 - Phase C</strong><br/>
                  Smart battery safety diagnostic system deployment & testing
                </div>

                <button
                  style={{ ...submitButtonStyle, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                  onClick={() => { navigate('/timeline'); setIsOpen(false); setView('intro'); }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  View Full Timeline <FaArrowRight size={12} />
                </button>
              </>
            ) : view === 'current' ? (
              <>
                <button
                  style={backButtonStyle}
                  onClick={() => setView('intro')}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#64748b'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#94a3b8'}
                >
                  ← Back
                </button>

                <div style={{ ...messageStyle, fontWeight: '700', background: '#1e3a8a', color: 'white' }}>
                  Current Research Status
                </div>

                <div style={{ ...messageStyle, background: '#dcfce7', borderLeft: '3px solid #16a34a' }}>
                  <strong style={{ color: '#15803d' }}>🟢 IN DEVELOPMENT</strong><br/>
                  <span style={{ fontSize: '0.85rem', color: '#166534' }}>Active research phase - Multiple work streams in progress</span>
                </div>

                <div style={messageStyle}>
                  <strong>Current Focus:</strong><br/>
                  • Electrothermal Abuse (ETA) Test Setup<br/>
                  • Anomaly Detection Using Deep Learning<br/>
                  • Battery Digital Twin Based Adaptive RL
                </div>

                <div style={messageStyle}>
                  <strong>Recent Progress:</strong><br/>
                  Physical test rig development, machine learning model training, and real-time prediction system integration.
                </div>

                <button
                  style={{ ...submitButtonStyle, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                  onClick={() => { navigate('/about'); setIsOpen(false); setView('intro'); }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  View Details <FaArrowRight size={12} />
                </button>
              </>
            ) : view === 'predictor-info' ? (
              <>
                <button
                  style={backButtonStyle}
                  onClick={() => setView('intro')}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#64748b'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#94a3b8'}
                >
                  ← Back
                </button>

                <div style={{ ...messageStyle, fontWeight: '700', background: '#1e3a8a', color: 'white' }}>
                  Battery Health Predictor
                </div>

                <div style={messageStyle}>
                  <strong>What it does:</strong><br/>
                  Predicts battery health score (0-100) based on voltage, temperature, cycle count, SOC, and C-rate.
                </div>

                <div style={messageStyle}>
                  <strong>Get instant insights on:</strong><br/>
                  • Overall health grade (A-F)<br/>
                  • Capacity retention percentage<br/>
                  • Component-wise breakdown<br/>
                  • Actionable recommendations
                </div>

                <div style={quickActionGridStyle}>
                  <button
                    style={quickActionButtonStyle}
                    onClick={() => setView('predictor-form')}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#1e3a8a';
                      e.currentTarget.style.background = '#eff6ff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#e2e8f0';
                      e.currentTarget.style.background = 'white';
                    }}
                  >
                    Quick Predict
                  </button>
                  
                  <button
                    style={quickActionButtonStyle}
                    onClick={() => { navigate('/predictor'); setIsOpen(false); setView('intro'); }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#1e3a8a';
                      e.currentTarget.style.background = '#eff6ff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#e2e8f0';
                      e.currentTarget.style.background = 'white';
                    }}
                  >
                    Full Predictor
                  </button>
                </div>
              </>
            ) : view === 'predictor-form' ? (
              <>
                <button
                  style={backButtonStyle}
                  onClick={() => setView('predictor-info')}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#64748b'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#94a3b8'}
                >
                  ← Back
                </button>

                <div style={messageStyle}>
                  Enter battery parameters for quick health prediction:
                </div>

                <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#475569', marginBottom: '0.5rem' }}>
                  Voltage (V):
                </div>
                <input
                  type="number"
                  placeholder="e.g., 3.7"
                  step="0.1"
                  value={batteryInputs.voltage}
                  onChange={(e) => setBatteryInputs({...batteryInputs, voltage: e.target.value})}
                  style={inputStyle}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#2563eb'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                />

                <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#475569', marginBottom: '0.5rem' }}>
                  Temperature (°C):
                </div>
                <input
                  type="number"
                  placeholder="e.g., 25"
                  value={batteryInputs.temperature}
                  onChange={(e) => setBatteryInputs({...batteryInputs, temperature: e.target.value})}
                  style={inputStyle}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#2563eb'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                />

                <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#475569', marginBottom: '0.5rem' }}>
                  Cycle Count:
                </div>
                <input
                  type="number"
                  placeholder="e.g., 100"
                  value={batteryInputs.cycle_count}
                  onChange={(e) => setBatteryInputs({...batteryInputs, cycle_count: e.target.value})}
                  style={inputStyle}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#2563eb'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                />

                <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#475569', marginBottom: '0.5rem' }}>
                  State of Charge (%):
                </div>
                <input
                  type="number"
                  placeholder="e.g., 60"
                  value={batteryInputs.soc}
                  onChange={(e) => setBatteryInputs({...batteryInputs, soc: e.target.value})}
                  style={inputStyle}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#2563eb'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                />

                <button
                  style={submitButtonStyle}
                  onClick={handleBatterySubmit}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  Get Prediction →
                </button>
              </>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
