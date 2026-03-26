import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCommentDots, FaTimes, FaRobot, FaArrowRight, FaSpinner } from 'react-icons/fa';

const CHATBOT_API = 'http://localhost:5000/api';

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "👋 Hi! I'm your MAHA-EV assistant. I can help you learn about:\n\n• About the Project\n• Project Timeline\n• Current Work\n• Explore Datasets\n• Battery Predictor\n\nWhat would you like to know?",
      timestamp: new Date(),
      buttons: [
        { label: "About", action: "navigate", target: "/about" },
        { label: "Timeline", action: "navigate", target: "/deliverables" },
        { label: "Current", action: "navigate", target: "/deliverables" },
        { label: "Datasets", action: "navigate", target: "/datasets" },
        { label: "Predictor", action: "navigate", target: "/predictor" }
      ]
    },
  ]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messageIdCounter, setMessageIdCounter] = useState(2);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const fetchChatResponse = async (query) => {
    try {
      const response = await fetch(`${CHATBOT_API}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || `API error: ${response.status}`);
      }

      return {
        response: data.response,
        intent: data.intent,
        data: data.data,
        buttons: data.buttons || [],
      };
    } catch (error) {
      return {
        response: "Sorry, I could not reach the backend. Please make sure the Flask API is running on port 5000.",
        intent: 'error',
        data: null,
        buttons: [],
      };
    }
  };

  const appendUserMessage = (content) => {
    const msg = {
      id: messageIdCounter,
      type: 'user',
      content,
      timestamp: new Date(),
    };
    setMessages((m) => [...m, msg]);
    setMessageIdCounter((c) => c + 1);
    return msg.id;
  };

  const appendBotMessage = (result) => {
    const msg = {
      id: messageIdCounter + 1,
      type: 'bot',
      content: result.response,
      intent: result.intent,
      data: result.data,
      buttons: result.buttons || [],
      timestamp: new Date(),
    };
    setMessages((m) => [...m, msg]);
    setMessageIdCounter((c) => c + 1);
  };

  const handleSendMessage = async () => {
    const text = userInput.trim();
    if (!text || loading) return;

    appendUserMessage(text);
    setUserInput('');
    setLoading(true);

    const result = await fetchChatResponse(text);
    appendBotMessage(result);
    setLoading(false);
  };

  const quickQueries = {
    about: 'Tell me about the MAHA-EV project',
    timeline: 'What is the project timeline?',
    current: 'What is the current work status?',
    datasets: 'What datasets are used?',
    predictor: 'How does the battery predictor work?'
  };

  const handleQuickAction = async (action) => {
    const query = quickQueries[action];
    if (!query || loading) return;

    appendUserMessage(query);
    setLoading(true);
    const result = await fetchChatResponse(query);
    appendBotMessage(result);
    setLoading(false);
  };

  const handleNavigate = (target) => {
    if (target) {
      console.log('🔗 Navigating to:', target);
      setIsOpen(false);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        navigate(target);
      }, 100);
    }
  };

  const handleButtonClick = (btn) => {
    if (btn && btn.action === 'navigate' && btn.target) {
      console.log('✅ Button clicked:', btn);
      handleNavigate(btn.target);
    }
  };

  const handleNewConversation = () => {
    setMessages([
      {
        id: 1,
        type: 'bot',
        content: "👋 Hi! I'm your MAHA-EV assistant. I can help you learn about:\n\n• About the Project\n• Project Timeline\n• Current Work\n• Explore Datasets\n• Battery Predictor\n\nWhat would you like to know?",
        timestamp: new Date(),
        buttons: [
          { label: "About", action: "navigate", target: "/about" },
          { label: "Timeline", action: "navigate", target: "/deliverables" },
          { label: "Current", action: "navigate", target: "/deliverables" },
          { label: "Datasets", action: "navigate", target: "/datasets" },
          { label: "Predictor", action: "navigate", target: "/predictor" }
        ]
      },
    ]);
    setUserInput('');
    setLoading(false);
    setMessageIdCounter(2);
  };

  const chatContainerStyle = {
    position: 'fixed',
    bottom: 'clamp(1rem, 2vw, 1.5rem)',
    right: 'clamp(1rem, 2vw, 1.5rem)',
    zIndex: isOpen ? 9999 : 50,
    pointerEvents: isOpen ? 'auto' : 'auto',
  };

  const chatButtonStyle = {
    width: 'clamp(50px, 10vw, 60px)',
    height: 'clamp(50px, 10vw, 60px)',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
    border: 'none',
    color: '#fff',
    fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(30, 58, 138, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '44px',
    minWidth: '44px',
    padding: 0,
  };

  const chatWindowStyle = {
    position: 'fixed',
    bottom: 'clamp(5rem, 18vw, 6rem)',
    right: 'clamp(1rem, 2vw, 1.5rem)',
    width: 'clamp(85vw, 90vw, 380px)',
    maxWidth: '90vw',
    maxHeight: 'clamp(400px, 70vh, 600px)',
    background: '#fff',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  };

  const chatHeaderStyle = {
    background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
    color: '#fff',
    padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1rem, 2vw, 1.25rem)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const chatBodyStyle = {
    padding: 'clamp(0.75rem, 2vw, 1.25rem)',
    flex: 1,
    overflowY: 'auto',
    maxHeight: 'clamp(250px, 55vh, 400px)',
    display: 'flex',
    flexDirection: 'column',
    gap: 'clamp(0.5rem, 1vw, 0.8rem)',
  };

  const inputAreaStyle = {
    padding: 'clamp(0.75rem, 2vw, 1rem)',
    borderTop: '1px solid #e2e8f0',
    display: 'flex',
    gap: 'clamp(0.35rem, 1vw, 0.5rem)',
    flexWrap: 'nowrap',
  };

  const bubbleStyle = (type) => ({
    maxWidth: '85%',
    padding: 'clamp(0.5rem, 1vw, 0.75rem) clamp(0.75rem, 1.5vw, 1rem)',
    borderRadius: type === 'user' ? '12px 12px 0 12px' : '12px 12px 12px 0',
    background: type === 'user' ? '#3b82f6' : '#f1f5f9',
    color: type === 'user' ? '#fff' : '#334155',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    lineHeight: 1.45,
    fontSize: 'clamp(0.8rem, 1.2vw, 0.9rem)',
  });

  const buttonStyle = {
    padding: 'clamp(0.4rem, 1vw, 0.5rem) clamp(0.6rem, 1.5vw, 0.8rem)',
    background: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.8rem',
    fontWeight: '600',
    marginTop: '0.5rem',
    maxWidth: '75%',
    transition: 'background 0.2s',
  };

  return (
    <div style={chatContainerStyle}>
      {!isOpen ? (
        <button style={chatButtonStyle} onClick={() => setIsOpen(true)} title="Open chat">
          <FaCommentDots />
        </button>
      ) : (
        <div style={chatWindowStyle}>
          <div style={chatHeaderStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.5rem, 1vw, 0.6rem)', fontSize: 'clamp(0.8rem, 1vw, 1rem)' }}>
              <FaRobot />
              <strong>MAHA-EV Assistant</strong>
            </div>
            <div style={{ display: 'flex', gap: 'clamp(0.3rem, 1vw, 0.4rem)' }}>
              <button
                onClick={handleNewConversation}
                style={{ 
                  background: 'transparent', 
                  border: 'none', 
                  color: '#fff', 
                  cursor: 'pointer',
                  fontSize: 'clamp(1rem, 1.2vw, 1.2rem)',
                  padding: '0.5rem',
                  minHeight: '36px',
                  minWidth: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                title="New conversation"
              >
                ↻
              </button>
              <button
                onClick={() => setIsOpen(false)}
                style={{ 
                  background: 'transparent', 
                  border: 'none', 
                  color: '#fff', 
                  cursor: 'pointer',
                  fontSize: 'clamp(1rem, 1.2vw, 1.2rem)',
                  padding: '0.5rem',
                  minHeight: '36px',
                  minWidth: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                title="Close"
              >
                <FaTimes />
              </button>
            </div>
          </div>

          <div style={chatBodyStyle}>
            {messages.map((msg) => (
              <div key={msg.id}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start',
                    alignItems: 'flex-end',
                    gap: '0.5rem',
                  }}
                >
                  {msg.type === 'bot' && <FaRobot size={14} style={{ opacity: 0.5 }} />}
                  <div style={bubbleStyle(msg.type)}>{msg.content}</div>
                </div>
                
                {msg.buttons && msg.buttons.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(0.35rem, 1vw, 0.5rem)', marginTop: 'clamp(0.35rem, 1vw, 0.5rem)' }}>
                    {msg.buttons.map((btn, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleButtonClick(btn)}
                        style={{...buttonStyle, minHeight: '32px', display: 'flex', alignItems: 'center'}}
                        onMouseEnter={(e) => (e.target.style.background = '#1d4ed8')}
                        onMouseLeave={(e) => (e.target.style.background = '#2563eb')}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b' }}>
                <FaSpinner style={{ animation: 'spin 1s linear infinite' }} /> Thinking...
              </div>
            )}

            {messages.length <= 2 && !loading && (
              <div>
                <div style={{ fontSize: 'clamp(0.65rem, 0.9vw, 0.75rem)', color: '#64748b', marginBottom: 'clamp(0.5rem, 1vw, 0.8rem)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Quick Actions</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(0.35rem, 1vw, 0.5rem)' }}>
                  {['about', 'timeline', 'current', 'datasets', 'predictor'].map((action) => (
                    <button
                      key={action}
                      onClick={() => handleQuickAction(action)}
                      style={{
                        padding: 'clamp(0.4rem, 0.8vw, 0.6rem) clamp(0.6rem, 1.2vw, 0.9rem)',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        background: '#fff',
                        cursor: 'pointer',
                        fontSize: 'clamp(0.7rem, 0.9vw, 0.8rem)',
                        fontWeight: '600',
                        textTransform: 'capitalize',
                        transition: 'all 0.2s',
                        color: '#1e293b',
                        minHeight: '32px',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = '#f1f5f9';
                        e.target.style.borderColor = '#cbd5e1';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = '#fff';
                        e.target.style.borderColor = '#e2e8f0';
                      }}
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div style={inputAreaStyle}>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !loading) handleSendMessage();
              }}
              placeholder="Ask me anything..."
              disabled={loading}
              style={{
                flex: 1,
                padding: 'clamp(0.5rem, 1vw, 0.6rem) clamp(0.6rem, 1.5vw, 0.8rem)',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                outline: 'none',
                fontSize: 'clamp(0.8rem, 1vw, 0.9rem)',
                minHeight: '36px',
              }}
            />
            <button
              onClick={handleSendMessage}
              disabled={loading || !userInput.trim()}
              style={{
                border: 'none',
                borderRadius: '8px',
                padding: 'clamp(0.5rem, 1vw, 0.6rem) clamp(0.6rem, 1.5vw, 0.9rem)',
                background: '#3b82f6',
                color: '#fff',
                cursor: loading || !userInput.trim() ? 'not-allowed' : 'pointer',
                opacity: loading || !userInput.trim() ? 0.6 : 1,
                minHeight: '36px',
                minWidth: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'clamp(0.9rem, 1.2vw, 1rem)',
              }}
              title="Send"
            >
              {loading ? <FaSpinner style={{ animation: 'spin 1s linear infinite' }} /> : <FaArrowRight />}
            </button>
          </div>

<<<<<<< HEAD
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
=======
          <style>{`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}</style>
>>>>>>> ab34d5a83700a291a6c6f3dd5efd4e84964cb2bf
        </div>
      )}
    </div>
  );
}

export default Chatbot;
