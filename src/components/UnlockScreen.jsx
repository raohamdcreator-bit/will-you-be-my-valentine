import { useState, useEffect } from 'react';
import { saveNames } from '../utils/storage';

export default function UnlockScreen() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('error') === 'payment_required') {
      setError('🔒 Please enter names to continue');
    }
  }, []);

  const handleUnlock = () => {
    if (!from.trim() || !to.trim()) {
      setError('Please enter both names 💝');
      return;
    }
    
    saveNames(from.trim(), to.trim());
    window.location.href = '/valentine';
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(to bottom right, #fbcfe8, #fca5a5)',
      padding: '1rem'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '1rem',
        boxShadow: '0 0 30px rgba(236, 72, 153, 0.4)',
        padding: '2.5rem',
        maxWidth: '28rem',
        width: '100%',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          color: '#db2777',
          marginBottom: '0.5rem'
        }}>
          💕 Create Your Valentine 💕
        </h1>
        
        <p style={{
          color: '#9ca3af',
          marginBottom: '2rem',
          fontSize: '0.95rem'
        }}>
          A personalized, unforgettable way to ask
        </p>

        <div style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            placeholder="Your name"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            maxLength={20}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              border: '2px solid #fbcfe8',
              fontSize: '1rem',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#ec4899'}
            onBlur={(e) => e.target.style.borderColor = '#fbcfe8'}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <input
            type="text"
            placeholder="Their name"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            maxLength={20}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              border: '2px solid #fbcfe8',
              fontSize: '1rem',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#ec4899'}
            onBlur={(e) => e.target.style.borderColor = '#fbcfe8'}
          />
        </div>

        {error && (
          <p style={{
            color: '#dc2626',
            fontSize: '0.875rem',
            marginBottom: '1rem',
            fontWeight: '500'
          }}>
            {error}
          </p>
        )}

        <button
          onClick={handleUnlock}
          style={{
            width: '100%',
            padding: '0.875rem',
            backgroundColor: '#ec4899',
            color: '#ffffff',
            borderRadius: '0.5rem',
            border: 'none',
            fontSize: '1.125rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 0 20px rgba(236, 72, 153, 0.4)'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#db2777';
            e.target.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#ec4899';
            e.target.style.transform = 'scale(1)';
          }}
        >
          Create Valentine 💖
        </button>

        <p style={{
          marginTop: '1rem',
          fontSize: '0.75rem',
          color: '#9ca3af'
        }}>
          Free demo - No payment required
        </p>
      </div>
    </div>
  );
}
