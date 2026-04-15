import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCommentDots, FaTimes, FaRobot, FaArrowRight, FaChargingStation, FaClipboardList, FaFileAlt, FaPlus } from 'react-icons/fa';

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState('intro');
  const [batteryInputs, setBatteryInputs] = useState({
    voltage: '',
    temperature: '',
    cycle_count: '',
    soc: ''
  });
  const [messageAnimation, setMessageAnimation] = useState({});
  const navigate = useNavigate();

  const handleQuickAction = (action) => {
    setView(action);
    // Trigger animation
    setMessageAnimation({ [action]: true });
    setTimeout(() => setMessageAnimation({}), 300);
  };

  const handleBatterySubmit = () => {
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
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const chatButtonStyle = {
    width: '72px',
    height: '72px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #0ea5e9 100%)',
    border: '3px solid rgba(255, 255, 255, 0.4)',
    color: 'white',
    fontSize: '2rem',
    cursor: 'pointer',
    boxShadow: '0 12px 40px rgba(30, 58, 138, 0.5), 0 0 30px rgba(37, 99, 235, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
    animation: isOpen ? 'none' : 'pulse 2.5s ease-out infinite',
  };

  const chatWindowStyle = {
    position: 'absolute',
    bottom: '90px',
    right: '0',
    width: '400px',
    maxHeight: '600px',
    background: 'white',
    borderRadius: '20px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2), 0 0 1px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    animation: 'slideUp 0.4s ease-out',
  };

  const chatHeaderStyle = {
    background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #0ea5e9 100%)',
    color: 'white',
    padding: '1.25rem 1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  };

  const chatBodyStyle = {
    padding: '1.5rem',
    flex: 1,
    overflowY: 'auto',
    maxHeight: '450px',
    background: '#fafbfc',
    scrollBehavior: 'smooth',
  };

  const messageStyle = {
    background: 'white',
    padding: '1rem',
    borderRadius: '12px',
    marginBottom: '1.25rem',
    fontSize: '0.95rem',
    lineHeight: '1.6',
    color: '#334155',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    borderLeft: '4px solid #2563eb',
    animation: 'fadeInUp 0.4s ease-out',
  };

  const botMessageStyle = {
    ...messageStyle,
    borderLeft: '4px solid #0ea5e9',
  };

  const highlightMessageStyle = {
    ...messageStyle,
    background: '#eff6ff',
    borderLeft: '4px solid #2563eb',
  };

  const quickActionGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '0.875rem',
    marginTop: '1.25rem',
  };

  const quickActionButtonStyle = {
    padding: '1rem 0.875rem',
    background: 'white',
    border: '2px solid #e0e7ff',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#1e293b',
    transition: 'all 0.3s ease',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
  };

  const inputStyle = {
    width: '100%',
    padding: '0.875rem 1rem',
    border: '2px solid #e2e8f0',
    borderRadius: '10px',
    fontSize: '0.9rem',
    marginBottom: '0.75rem',
    transition: 'all 0.3s ease',
    fontFamily: 'inherit',
  };

  const submitButtonStyle = {
    width: '100%',
    padding: '0.875rem',
    background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '0.5rem',
    transition: 'all 0.3s ease',
  };

  const backButtonStyle = {
    ...submitButtonStyle,
    background: 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)',
    marginBottom: '0.75rem',
  };

  // Add styles for animations
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes pulse {
      0%, 100% { box-shadow: 0 12px 40px rgba(30, 58, 138, 0.4), 0 0 0 0 rgba(37, 99, 235, 0.5); }
      50% { box-shadow: 0 12px 40px rgba(30, 58, 138, 0.4), 0 0 0 20px rgba(37, 99, 235, 0); }
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(40px) rotateX(20deg) scale(0.9); filter: blur(10px); }
      to { opacity: 1; transform: translateY(0) rotateX(0) scale(1); filter: blur(0); }
    }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(15px) scale(0.95); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes rotateIcon {
      0%, 100% { transform: rotateZ(0deg); }
      25% { transform: rotateZ(15deg); }
      75% { transform: rotateZ(-15deg); }
    }
    .chat-body::-webkit-scrollbar { width: 8px; }
    .chat-body::-webkit-scrollbar-track { background: transparent; }
    .chat-body::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
    .chat-body::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
  `;
  if (!document.head.querySelector('style[data-chatbot-styles]')) {
    styleSheet.setAttribute('data-chatbot-styles', 'true');
    document.head.appendChild(styleSheet);
  }


  return (
    <div style={chatContainerStyle}>
      {!isOpen ? (
        <button
          style={chatButtonStyle}
          onClick={() => setIsOpen(true)}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.25) rotateZ(10deg)';
            e.currentTarget.style.boxShadow = '0 20px 60px rgba(30, 58, 138, 0.6), 0 0 50px rgba(37, 99, 235, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(30, 58, 138, 0.5), 0 0 30px rgba(37, 99, 235, 0.3)';
          }}
          title="Chat with MAHA-EV Assistant"
        >
          <FaCommentDots />
        </button>
      ) : (
        <div style={chatWindowStyle}>
          {/* Header */}
          <div style={chatHeaderStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
              <div style={{ fontSize: '1.5rem', animation: 'pulse 2s ease-in-out infinite' }}>
                <FaRobot />
              </div>
              <div>
                <div style={{ fontWeight: '700', fontSize: '1.05rem', letterSpacing: '-0.5px' }}>MAHA-EV Assistant</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.85, fontWeight: '500' }}>AI-Powered Helper</div>
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
                fontSize: '1.3rem',
                padding: '0.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(90deg)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(0)'}
            >
              <FaTimes />
            </button>
          </div>

          {/* Body */}
          <div style={chatBodyStyle} className="chat-body">
            {view === 'intro' ? (
              <>
                <div style={botMessageStyle}>
                  👋 <strong>Welcome!</strong> I'm your MAHA-EV assistant. Get instant insights about battery safety research without navigating pages.
                </div>
                
                <div style={highlightMessageStyle}>
                  <strong style={{ color: '#1e3a8a', display: 'block', marginBottom: '0.5rem' }}>⚡ Key Features:</strong>
                  Smart predictions · Live battery analysis · Quick access to docs
                </div>

                <div style={{ ...botMessageStyle, fontWeight: '600', fontSize: '0.9rem', marginBottom: '0.75rem', marginTop: '1rem' }}>
                  What can I help you with?
                </div>

                <div style={quickActionGridStyle}>
                  <button
                    style={quickActionButtonStyle}
                    onClick={() => handleQuickAction('about')}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#2563eb';
                      e.currentTarget.style.background = '#eff6ff';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#e0e7ff';
                      e.currentTarget.style.background = 'white';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <FaFileAlt size={18} />
                    Project Info
                  </button>
                  
                  <button
                    style={quickActionButtonStyle}
                    onClick={() => handleQuickAction('timeline')}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#2563eb';
                      e.currentTarget.style.background = '#eff6ff';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#e0e7ff';
                      e.currentTarget.style.background = 'white';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <FaClipboardList size={18} />
                    Timeline
                  </button>
                  
                  <button
                    style={quickActionButtonStyle}
                    onClick={() => handleQuickAction('current')}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#2563eb';
                      e.currentTarget.style.background = '#eff6ff';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#e0e7ff';
                      e.currentTarget.style.background = 'white';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <FaPlus size={18} />
                    Current Status
                  </button>
                  
                  <button
                    style={quickActionButtonStyle}
                    onClick={() => handleQuickAction('predictor-info')}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#2563eb';
                      e.currentTarget.style.background = '#eff6ff';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#e0e7ff';
                      e.currentTarget.style.background = 'white';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <FaChargingStation size={18} />
                    Battery Predictor
                  </button>
                </div>
              </>
            ) : view === 'about' ? (
              <>
                <button
                  style={backButtonStyle}
                  onClick={() => setView('intro')}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(100, 116, 139, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  ← Back
                </button>

                <div style={{ ...messageStyle, fontWeight: '700', background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)', color: 'white', borderLeft: 'none', marginTop: '0.5rem' }}>
                  📋 About MAHA-EV E-RIDES
                </div>

                <div style={messageStyle}>
                  <strong style={{ color: '#1e3a8a' }}>🎯 Focus:</strong> Real-time early-warning system for battery abuse and fire prevention in Indian EVs.
                </div>

                <div style={messageStyle}>
                  <strong style={{ color: '#1e3a8a' }}>🔥 Challenge:</strong> Indian conditions stress lithium-ion batteries, potentially triggering thermal runaway.
                </div>

                <div style={messageStyle}>
                  <strong style={{ color: '#1e3a8a' }}>💡 Solution:</strong> Predictive diagnostics with IoT sensors for proactive battery safety.
                </div>

                <button
                  style={{ ...submitButtonStyle, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                  onClick={() => { navigate('/about'); setIsOpen(false); setView('intro'); }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(37, 99, 235, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Learn More <FaArrowRight size={12} />
                </button>
              </>
            ) : view === 'timeline' ? (
              <>
                <button
                  style={backButtonStyle}
                  onClick={() => setView('intro')}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(100, 116, 139, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  ← Back
                </button>

                <div style={{ ...messageStyle, fontWeight: '700', background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)', color: 'white', borderLeft: 'none', marginTop: '0.5rem' }}>
                  📅 3-Year Research Timeline
                </div>

                <div style={{ ...messageStyle, borderLeft: '4px solid #1e3a8a', background: '#f0f4ff' }}>
                  <strong style={{ color: '#1e3a8a' }}>📍 Year 1 - Phase A</strong><br/>
                  <span style={{ fontSize: '0.85rem', color: '#475569' }}>Experimental data collection + Battery Digital Twin development</span>
                </div>

                <div style={{ ...messageStyle, borderLeft: '4px solid #f97316', background: '#fff7ed' }}>
                  <strong style={{ color: '#f97316' }}>📍 Year 2 - Phase B</strong><br/>
                  <span style={{ fontSize: '0.85rem', color: '#475569' }}>Multimodal IoT sensing suite + AI fault detection</span>
                </div>

                <div style={{ ...messageStyle, borderLeft: '4px solid #059669', background: '#ecfdf5' }}>
                  <strong style={{ color: '#059669' }}>📍 Year 3 - Phase C</strong><br/>
                  <span style={{ fontSize: '0.85rem', color: '#475569' }}>Smart battery safety diagnostic system deployment</span>
                </div>

                <button
                  style={{ ...submitButtonStyle, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                  onClick={() => { navigate('/timeline'); setIsOpen(false); setView('intro'); }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(37, 99, 235, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  View Full Timeline <FaArrowRight size={12} />
                </button>
              </>
            ) : view === 'current' ? (
              <>
                <button
                  style={backButtonStyle}
                  onClick={() => setView('intro')}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(100, 116, 139, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  ← Back
                </button>

                <div style={{ ...messageStyle, fontWeight: '700', background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)', color: 'white', borderLeft: 'none', marginTop: '0.5rem' }}>
                  🚀 Current Research Status
                </div>

                <div style={{ ...messageStyle, background: '#dcfce7', borderLeft: '4px solid #16a34a' }}>
                  <strong style={{ color: '#15803d' }}>🟢 IN DEVELOPMENT</strong><br/>
                  <span style={{ fontSize: '0.85rem', color: '#166534' }}>Active research phase - Multiple work streams in progress</span>
                </div>

                <div style={messageStyle}>
                  <strong style={{ color: '#1e3a8a', display: 'block', marginBottom: '0.5rem' }}>Current Focus:</strong>
                  • Electrothermal Abuse (ETA) Test Setup<br/>
                  • Anomaly Detection Using Deep Learning<br/>
                  • Battery Digital Twin Based Adaptive RL
                </div>

                <div style={messageStyle}>
                  <strong style={{ color: '#1e3a8a', display: 'block', marginBottom: '0.5rem' }}>Recent Progress:</strong>
                  Physical test rig development and machine learning model training.
                </div>

                <button
                  style={{ ...submitButtonStyle, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                  onClick={() => { navigate('/about'); setIsOpen(false); setView('intro'); }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(37, 99, 235, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  View Details <FaArrowRight size={12} />
                </button>
              </>
            ) : view === 'predictor-info' ? (
              <>
                <button
                  style={backButtonStyle}
                  onClick={() => setView('intro')}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(100, 116, 139, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  ← Back
                </button>

                <div style={{ ...messageStyle, fontWeight: '700', background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)', color: 'white', borderLeft: 'none', marginTop: '0.5rem' }}>
                  🔋 Battery Health Predictor
                </div>

                <div style={messageStyle}>
                  <strong style={{ color: '#1e3a8a', display: 'block', marginBottom: '0.5rem' }}>What it does:</strong>
                  Predicts battery health score (0-100) based on voltage, temperature, cycle count, and SOC.
                </div>

                <div style={messageStyle}>
                  <strong style={{ color: '#1e3a8a', display: 'block', marginBottom: '0.5rem' }}>Get insights on:</strong>
                  • Overall health grade (A-F)<br/>
                  • Capacity retention %<br/>
                  • Component breakdown<br/>
                  • Actionable recommendations
                </div>

                <div style={quickActionGridStyle}>
                  <button
                    style={quickActionButtonStyle}
                    onClick={() => setView('predictor-form')}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#2563eb';
                      e.currentTarget.style.background = '#eff6ff';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#e0e7ff';
                      e.currentTarget.style.background = 'white';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <FaChargingStation size={18} />
                    Quick Predict
                  </button>
                  
                  <button
                    style={quickActionButtonStyle}
                    onClick={() => { navigate('/predictor'); setIsOpen(false); setView('intro'); }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#2563eb';
                      e.currentTarget.style.background = '#eff6ff';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#e0e7ff';
                      e.currentTarget.style.background = 'white';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <FaArrowRight size={18} />
                    Full Predictor
                  </button>
                </div>
              </>
            ) : view === 'predictor-form' ? (
              <>
                <button
                  style={backButtonStyle}
                  onClick={() => setView('predictor-info')}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(100, 116, 139, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  ← Back
                </button>

                <div style={botMessageStyle}>
                  Enter battery parameters for a quick health prediction:
                </div>

                <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#475569', marginBottom: '0.5rem', marginTop: '0.75rem' }}>
                  Voltage (V):
                </div>
                <input
                  type="number"
                  placeholder="e.g., 3.7"
                  step="0.1"
                  value={batteryInputs.voltage}
                  onChange={(e) => setBatteryInputs({...batteryInputs, voltage: e.target.value})}
                  style={inputStyle}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#2563eb';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
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
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#2563eb';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
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
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#2563eb';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
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
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#2563eb';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />

                <button
                  style={submitButtonStyle}
                  onClick={handleBatterySubmit}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(37, 99, 235, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Get Prediction 🔮
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
