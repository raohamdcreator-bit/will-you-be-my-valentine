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

    // Generate safe random position that doesn't overlap Yes button
    const getRandomPosition = () => {
        const isMobile = window.innerWidth < 640;
        
        if (isMobile) {
            const directions = [
                { x: -120, y: 0 },    // Left
                { x: 120, y: 0 },     // Right
                { x: 0, y: -100 },    // Up
                { x: 0, y: 100 },     // Down
                { x: -90, y: -70 },   // Top left
                { x: 90, y: -70 },    // Top right
                { x: -90, y: 70 },    // Bottom left
                { x: 90, y: 70 },     // Bottom right
            ];
            return directions[Math.floor(Math.random() * directions.length)];
        } else {
            let x, y;
            do {
                x = Math.random() * 240 - 120;
                y = Math.random() * 120 - 60;
            } while (Math.abs(x) < 50 && Math.abs(y) < 35);
            return { x, y };
        }
    };

    const handleNoInteraction = () => {
        if (noCount < 10) {
            setPosition(getRandomPosition());
            handleNo();
        }
    };

    // Inline styles to ensure they work even without Tailwind
    const cardStyle = {
        backgroundColor: '#ffffff',
        borderRadius: '1rem',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        padding: '2rem',
        textAlign: 'center',
        maxWidth: '24rem',
        position: 'relative'
    };

    const imageStyle = {
        margin: '0 auto 1rem auto',
        width: '11rem',
        pointerEvents: 'none'
    };

    const textStyle = {
        fontSize: '1.25rem',
        fontWeight: '600',
        color: '#db2777', // pink-600
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

    const yesButtonStyle = {
        padding: '0.5rem 1.5rem',
        backgroundColor: '#ec4899', // pink-500
        color: '#ffffff',
        borderRadius: '9999px',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        zIndex: 20,
        height: 'fit-content',
        alignSelf: 'flex-start',
        fontSize: '1rem',
        fontWeight: '500'
    };

    const noButtonStyle = {
        padding: '0.5rem 1.5rem',
        backgroundColor: '#f472b6', // pink-400
        color: '#ffffff',
        borderRadius: '9999px',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        position: 'absolute',
        left: '50%',
        zIndex: 10,
        height: 'fit-content',
        touchAction: 'none',
        marginLeft: '40px',
        fontSize: '1rem',
        fontWeight: '500'
    };

    return (
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
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#db2777'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#ec4899'}
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
                        onMouseOver={(e) => e.target.style.backgroundColor = '#ec4899'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#f472b6'}
                    >
                        No 😐
                    </motion.button>
                )}
            </div>
        </div>
    );
}
