import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCommentDots, FaTimes, FaRobot } from 'react-icons/fa';

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState('main'); // main, battery-predictor
  const [batteryInputs, setBatteryInputs] = useState({
    voltage: '',
    temperature: '',
    cycle_count: '',
    soc: ''
  });
  const navigate = useNavigate();

  const handleQuickAction = (action) => {
    switch(action) {
      case 'about':
        navigate('/about');
        setIsOpen(false);
        break;
      case 'contact':
        navigate('/contact');
        setIsOpen(false);
        break;
      case 'datasets':
        navigate('/datasets');
        setIsOpen(false);
        break;
      case 'team':
        navigate('/team');
        setIsOpen(false);
        break;
      case 'standards':
        navigate('/standards');
        setIsOpen(false);
        break;
      case 'predictor':
        setView('battery-predictor');
        break;
      default:
        break;
    }
  };

  const handleBatterySubmit = () => {
    // Navigate to predictor page with query params
    const params = new URLSearchParams(batteryInputs).toString();
    navigate(`/predictor?${params}`);
    setIsOpen(false);
    setView('main');
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
                setView('main');
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
            {view === 'main' ? (
              <>
                <div style={messageStyle}>
                  👋 Welcome! I'm here to help you navigate the MAHA-EV project website and assist with battery predictions.
                </div>
                
                <div style={{ ...messageStyle, fontWeight: '600', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                  Quick Actions:
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
                    📖 About Project
                  </button>
                  
                  <button
                    style={quickActionButtonStyle}
                    onClick={() => handleQuickAction('contact')}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#1e3a8a';
                      e.currentTarget.style.background = '#eff6ff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#e2e8f0';
                      e.currentTarget.style.background = 'white';
                    }}
                  >
                    📞 Contact Us
                  </button>
                  
                  <button
                    style={quickActionButtonStyle}
                    onClick={() => handleQuickAction('datasets')}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#1e3a8a';
                      e.currentTarget.style.background = '#eff6ff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#e2e8f0';
                      e.currentTarget.style.background = 'white';
                    }}
                  >
                    📊 Datasets
                  </button>
                  
                  <button
                    style={quickActionButtonStyle}
                    onClick={() => handleQuickAction('team')}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#1e3a8a';
                      e.currentTarget.style.background = '#eff6ff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#e2e8f0';
                      e.currentTarget.style.background = 'white';
                    }}
                  >
                    👥 Our Team
                  </button>
                  
                  <button
                    style={quickActionButtonStyle}
                    onClick={() => handleQuickAction('standards')}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#1e3a8a';
                      e.currentTarget.style.background = '#eff6ff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#e2e8f0';
                      e.currentTarget.style.background = 'white';
                    }}
                  >
                    📋 Standards
                  </button>
                  
                  <button
                    style={quickActionButtonStyle}
                    onClick={() => handleQuickAction('predictor')}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#1e3a8a';
                      e.currentTarget.style.background = '#eff6ff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#e2e8f0';
                      e.currentTarget.style.background = 'white';
                    }}
                  >
                    🔋 Battery Predictor
                  </button>
                </div>
              </>
            ) : (
              <>
                <button
                  style={backButtonStyle}
                  onClick={() => setView('main')}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#64748b'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#94a3b8'}
                >
                  ← Back to Menu
                </button>

                <div style={messageStyle}>
                  🔋 Enter battery parameters for health prediction:
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
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
