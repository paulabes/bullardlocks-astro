import { useState } from 'react';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="chat-button"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-avatar">
                <span>WB</span>
              </div>
              <div>
                <h3>Bullard Locks</h3>
                <p>Typically replies instantly</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="chat-close">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div className="chat-messages">
            <div className="chat-welcome">
              <p>Hello! How can I help you today?</p>
              <p className="chat-welcome-sub">
                For emergencies, call <a href="tel:07809887883">07809 887 883</a>
              </p>
            </div>
          </div>

          <div className="quick-actions">
            <a href="tel:07809887883" className="action-btn primary">
              📞 Call Now
            </a>
            <a href="/contact" className="action-btn secondary">
              Contact Form
            </a>
          </div>
        </div>
      )}
    </>
  );
}
