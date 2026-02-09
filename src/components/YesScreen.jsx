import { useEffect, useState } from "react";

export default function FinalYes() {
    const [hearts, setHearts] = useState([]);

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

        return () => clearInterval(interval);
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
                    {Math.random() > 0.5 ? '😘' : '💖'}
                </div>
            ))}
            
            <div style={{
                textAlign: 'center',
                position: 'relative',
                zIndex: 10
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
                    fontSize: '1.675rem',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    lineHeight: '2.25rem'
                }}>
                    YAY!! I knew you'd say yes 💕
                    <br />
                    You were just pretending 😌
                </h1>
            </div>
        </>
    );
}
