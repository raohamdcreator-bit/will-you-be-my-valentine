import { useState } from "react";
import { motion } from "framer-motion";
import { steps } from "../data/steps";

export default function ValentineCard({ onYes }) {
    const [noCount, setNoCount] = useState(0);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    
    const currentStep = steps[Math.min(noCount, steps.length - 1)];

    const handleNo = () => {
        if (noCount < steps.length - 1) {
            setNoCount(noCount + 1);
        }
    };

    // Generate safe random position that keeps button within screen boundaries
    const getRandomPosition = () => {
        const isMobile = window.innerWidth < 640;
        
        if (isMobile) {
            // Mobile: Keep within safe boundaries (much more conservative)
            const maxX = Math.min(60, (window.innerWidth - 200) / 2);
            const maxY = 50;
            
            const directions = [
                { x: -maxX, y: 0 },           // Left
                { x: maxX, y: 0 },            // Right
                { x: 0, y: -maxY },           // Up
                { x: 0, y: maxY },            // Down
                { x: -maxX * 0.7, y: -maxY * 0.7 },  // Top left
                { x: maxX * 0.7, y: -maxY * 0.7 },   // Top right
                { x: -maxX * 0.7, y: maxY * 0.7 },   // Bottom left
                { x: maxX * 0.7, y: maxY * 0.7 },    // Bottom right
            ];
            return directions[Math.floor(Math.random() * directions.length)];
        } else {
            // Desktop: More freedom but still bounded
            let x, y;
            do {
                x = Math.random() * 160 - 80;  // -80 to 80
                y = Math.random() * 80 - 40;   // -40 to 40
            } while (Math.abs(x) < 40 && Math.abs(y) < 25); // Avoid center
            return { x, y };
        }
    };

    const handleNoInteraction = () => {
        if (noCount < 10) {
            setPosition(getRandomPosition());
            handleNo();
        }
    };

    // Styles with pink shadow and animated glowing border
    const cardStyle = {
        backgroundColor: '#ffffff',
        borderRadius: '1rem',
        boxShadow: '0 0 30px rgba(236, 72, 153, 0.4), 0 20px 25px -5px rgba(236, 72, 153, 0.2)',
        padding: '2rem',
        textAlign: 'center',
        maxWidth: '24rem',
        position: 'relative',
        border: '3px solid transparent',
        backgroundImage: 'linear-gradient(white, white), linear-gradient(45deg, #ec4899, #fbbf24, #ec4899)',
        backgroundOrigin: 'border-box',
        backgroundClip: 'padding-box, border-box',
        animation: 'borderGlow 3s ease-in-out infinite'
    };

    const imageStyle = {
        margin: '0 auto 1rem auto',
        width: '11rem',
        pointerEvents: 'none'
    };

    const textStyle = {
        fontSize: '1.25rem',
        fontWeight: '600',
        color: '#db2777',
        marginBottom: '1.5rem',
        pointerEvents: 'none'
    };

    const buttonContainerStyle = {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        gap: '1.5rem',
        paddingTop: '1rem',
        paddingBottom: '1rem',
        minHeight: '140px'
    };

    // Yes button with glowing animation
    const yesButtonStyle = {
        padding: '0.5rem 1.5rem',
        backgroundColor: '#ec4899',
        color: '#ffffff',
        borderRadius: '9999px',
        border: '2px solid #db2777',
        cursor: 'pointer',
        transition: 'all 0.2s',
        zIndex: 20,
        height: 'fit-content',
        alignSelf: 'flex-start',
        fontSize: '1rem',
        fontWeight: '600',
        boxShadow: '0 0 20px rgba(236, 72, 153, 0.6)',
        animation: 'yesGlow 2s ease-in-out infinite'
    };

    // No button with ice blue background
    const noButtonStyle = {
        padding: '0.5rem 1.5rem',
        backgroundColor: '#67e8f9', // cyan-300 (ice blue)
        color: '#164e63', // cyan-900 (dark text for contrast)
        borderRadius: '9999px',
        border: '2px solid #06b6d4', // cyan-500
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        position: 'absolute',
        left: '50%',
        zIndex: 10,
        height: 'fit-content',
        touchAction: 'none',
        marginLeft: '40px',
        fontSize: '1rem',
        fontWeight: '600'
    };

    return (
        <>
            <style>
                {`
                    @keyframes borderGlow {
                        0%, 100% {
                            filter: brightness(1) drop-shadow(0 0 10px rgba(236, 72, 153, 0.5));
                        }
                        50% {
                            filter: brightness(1.2) drop-shadow(0 0 20px rgba(251, 191, 36, 0.6));
                        }
                    }
                    
                    @keyframes yesGlow {
                        0%, 100% {
                            box-shadow: 0 0 20px rgba(236, 72, 153, 0.6), 0 0 40px rgba(236, 72, 153, 0.4);
                            transform: scale(1);
                        }
                        50% {
                            box-shadow: 0 0 30px rgba(236, 72, 153, 0.8), 0 0 60px rgba(236, 72, 153, 0.6);
                            transform: scale(1.05);
                        }
                    }
                `}
            </style>
            <div style={cardStyle}>
                <img
                    src={currentStep.img}
                    alt="emotion"
                    style={imageStyle}
                />

                <p style={textStyle}>
                    {currentStep.text}
                </p>

                <div style={buttonContainerStyle}>
                    <button
                        onClick={onYes}
                        style={yesButtonStyle}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#db2777';
                            e.target.style.transform = 'scale(1.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = '#ec4899';
                            e.target.style.transform = 'scale(1)';
                        }}
                    >
                        Yes ❤️
                    </button>

                    {noCount < 10 && (
                        <motion.button
                            onMouseEnter={handleNoInteraction}
                            onTouchStart={handleNoInteraction}
                            onClick={handleNoInteraction}
                            animate={position}
                            transition={{ type: "spring", stiffness: 250, damping: 15 }}
                            style={noButtonStyle}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#22d3ee'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#67e8f9'}
                        >
                            No 😐
                        </motion.button>
                    )}
                </div>
            </div>
        </>
    );
}
