import { useEffect, useState } from "react";

export default function FinalYes({ names }) {
    const [hearts, setHearts] = useState([]);
    const [showLink, setShowLink] = useState(false);
    const [copied, setCopied] = useState(false);

    // Generate shareable link
    const shareableLink = names 
        ? `${window.location.origin}/valentine?from=${encodeURIComponent(names.from)}&to=${encodeURIComponent(names.to)}`
        : '';

    const copyLink = () => {
        navigator.clipboard.writeText(shareableLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    useEffect(() => {
        // Generate initial hearts
        const initialHearts = Array.from({ length: 30 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            animationDelay: Math.random() * 5,
            size: Math.random() * 20 + 20,
            duration: Math.random() * 3 + 4
        }));
        setHearts(initialHearts);

        // Add new hearts periodically
        const interval = setInterval(() => {
            setHearts(prev => [
                ...prev,
                {
                    id: Date.now(),
                    left: Math.random() * 100,
                    animationDelay: 0,
                    size: Math.random() * 20 + 20,
                    duration: Math.random() * 3 + 4
                }
            ].slice(-50)); // Keep only last 50 hearts
        }, 300);

        // Show shareable link after 2 seconds
        const linkTimer = setTimeout(() => setShowLink(true), 2000);

        return () => {
            clearInterval(interval);
            clearTimeout(linkTimer);
        };
    }, []);

    return (
        <>
            <style>
                {`
                    @keyframes floatUp {
                        0% {
                            transform: translateY(0) rotate(0deg);
                            opacity: 0;
                        }
                        10% {
                            opacity: 1;
                        }
                        90% {
                            opacity: 1;
                        }
                        100% {
                            transform: translateY(-100vh) rotate(360deg);
                            opacity: 0;
                        }
                    }
                    
                    @keyframes pulse {
                        0%, 100% {
                            transform: scale(1);
                        }
                        50% {
                            transform: scale(1.1);
                        }
                    }
                    
                    .heart {
                        position: fixed;
                        bottom: -50px;
                        font-size: 30px;
                        animation: floatUp linear forwards;
                        pointer-events: none;
                        z-index: 1000;
                    }
                    
                    .text-glow {
                        text-shadow: 0 0 10px rgba(255, 255, 255, 0.8),
                                     0 0 20px rgba(236, 72, 153, 0.6),
                                     0 0 30px rgba(236, 72, 153, 0.4);
                        animation: pulse 2s ease-in-out infinite;
                    }
                `}
            </style>
            
            {/* Animated Hearts */}
            {hearts.map(heart => (
                <div
                    key={heart.id}
                    className="heart"
                    style={{
                        left: `${heart.left}%`,
                        fontSize: `${heart.size}px`,
                        animationDelay: `${heart.animationDelay}s`,
                        animationDuration: `${heart.duration}s`
                    }}
                >
                    {Math.random() > 0.5 ? '❤️' : '💖'}
                </div>
            ))}
            
            <div style={{
                textAlign: 'center',
                position: 'relative',
                zIndex: 10,
                padding: '1rem'
            }}>
                <img
                    src="/final.jpg"
                    alt="Love"
                    style={{
                        margin: '0 auto 1.5rem auto',
                        width: '14rem',
                        borderRadius: '1rem',
                        boxShadow: '0 0 30px rgba(236, 72, 153, 0.5)',
                        border: '3px solid rgba(236, 72, 153, 0.3)'
                    }}
                />
                <h1 className="text-glow" style={{
                    fontSize: '1.875rem',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    lineHeight: '2.25rem',
                    marginBottom: '1rem'
                }}>
                    YAY!! I knew you'd say yes 💕
                    <br />
                    You were just pretending 😌
                </h1>

                {showLink && shareableLink && (
                    <div style={{
                        marginTop: '2rem',
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        padding: '1.5rem',
                        borderRadius: '0.75rem',
                        maxWidth: '400px',
                        margin: '2rem auto 0',
                        boxShadow: '0 0 20px rgba(236, 72, 153, 0.3)'
                    }}>
                        <p style={{
                            fontSize: '0.875rem',
                            color: '#db2777',
                            marginBottom: '0.75rem',
                            fontWeight: '600'
                        }}>
                            Share this moment 💝
                        </p>
                        <div style={{
                            display: 'flex',
                            gap: '0.5rem',
                            alignItems: 'center',
                            flexWrap: 'wrap'
                        }}>
                            <input
                                type="text"
                                value={shareableLink}
                                readOnly
                                onClick={(e) => e.target.select()}
                                style={{
                                    flex: 1,
                                    minWidth: '200px',
                                    padding: '0.5rem',
                                    borderRadius: '0.375rem',
                                    border: '1px solid #fbcfe8',
                                    fontSize: '0.75rem',
                                    backgroundColor: '#fef2f2',
                                    cursor: 'pointer'
                                }}
                            />
                            <button
                                onClick={copyLink}
                                style={{
                                    padding: '0.5rem 1rem',
                                    backgroundColor: copied ? '#10b981' : '#ec4899',
                                    color: '#ffffff',
                                    borderRadius: '0.375rem',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '0.875rem',
                                    fontWeight: '600',
                                    transition: 'background-color 0.2s',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {copied ? '✓ Copied!' : 'Copy Link'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
