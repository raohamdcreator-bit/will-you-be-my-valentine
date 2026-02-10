import { useState, useEffect } from "react";
import ValentineCard from "./ValentineCard";
import FinalYes from "./YesScreen";
import { getNames } from "../utils/storage";

export default function ValentineExperience() {
  const [saidYes, setSaidYes] = useState(false);
  const [names, setNames] = useState({ from: '', to: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Priority 1: Check URL params (for shared links)
    const params = new URLSearchParams(window.location.search);
    const fromParam = params.get('from');
    const toParam = params.get('to');

    if (fromParam && toParam) {
      setNames({ from: fromParam, to: toParam });
      setLoading(false);
      return;
    }

    // Priority 2: Check localStorage (after payment)
    const stored = getNames();
    if (stored.from && stored.to) {
      setNames(stored);
      setLoading(false);
      return;
    }

    // No valid data - redirect to unlock screen
    window.location.href = '/?error=payment_required';
  }, []);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to bottom right, #fbcfe8, #fca5a5)',
      }}>
        <p style={{ color: '#ffffff', fontSize: '1.25rem' }}>Loading... 💕</p>
      </div>
    );
  }

  const appStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(to bottom right, #fbcfe8, #fca5a5)',
    overflow: 'hidden'
  };

  return (
    <div style={appStyle}>
      {!saidYes ? (
        <ValentineCard names={names} onYes={() => setSaidYes(true)} />
      ) : (
        <FinalYes names={names} />
      )}
    </div>
  );
}
