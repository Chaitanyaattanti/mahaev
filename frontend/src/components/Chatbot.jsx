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
    bottom: '20px',
    right: '20px',
    zIndex: isOpen ? 9999 : 50,
    pointerEvents: isOpen ? 'auto' : 'auto',
  };

  const chatButtonStyle = {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
    border: 'none',
    color: '#fff',
    fontSize: '1.5rem',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(30, 58, 138, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const chatWindowStyle = {
    position: 'absolute',
    bottom: '80px',
    right: '0',
    width: '380px',
    maxHeight: '600px',
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
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
  };

  const inputAreaStyle = {
    padding: '1rem',
    borderTop: '1px solid #e2e8f0',
    display: 'flex',
    gap: '0.5rem',
  };

  const bubbleStyle = (type) => ({
    maxWidth: '75%',
    padding: '0.75rem 1rem',
    borderRadius: type === 'user' ? '12px 12px 0 12px' : '12px 12px 12px 0',
    background: type === 'user' ? '#3b82f6' : '#f1f5f9',
    color: type === 'user' ? '#fff' : '#334155',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    lineHeight: 1.45,
    fontSize: '0.9rem',
  });

  const buttonStyle = {
    padding: '0.5rem 0.8rem',
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <FaRobot />
              <strong>MAHA-EV Assistant</strong>
            </div>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              <button
                onClick={handleNewConversation}
                style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}
                title="New conversation"
              >
                ↻
              </button>
              <button
                onClick={() => setIsOpen(false)}
                style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}
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
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                    {msg.buttons.map((btn, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleButtonClick(btn)}
                        style={buttonStyle}
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
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.8rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Quick Actions</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {['about', 'timeline', 'current', 'datasets', 'predictor'].map((action) => (
                    <button
                      key={action}
                      onClick={() => handleQuickAction(action)}
                      style={{
                        padding: '0.6rem 0.9rem',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        background: '#fff',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        textTransform: 'capitalize',
                        transition: 'all 0.2s',
                        color: '#1e293b'
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
                padding: '0.6rem 0.8rem',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                outline: 'none',
              }}
            />
            <button
              onClick={handleSendMessage}
              disabled={loading || !userInput.trim()}
              style={{
                border: 'none',
                borderRadius: '8px',
                padding: '0.6rem 0.9rem',
                background: '#3b82f6',
                color: '#fff',
                cursor: loading || !userInput.trim() ? 'not-allowed' : 'pointer',
                opacity: loading || !userInput.trim() ? 0.6 : 1,
              }}
              title="Send"
            >
              {loading ? <FaSpinner style={{ animation: 'spin 1s linear infinite' }} /> : <FaArrowRight />}
            </button>
          </div>

          <style>{`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
