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
            // On mobile, move button to predefined safe positions
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
            // On desktop, use wider range
            let x, y;
            do {
                x = Math.random() * 240 - 120; // -120 to 120
                y = Math.random() * 120 - 60;  // -60 to 60
            } while (Math.abs(x) < 50 && Math.abs(y) < 35); // Avoid center
            return { x, y };
        }
    };

    const handleNoInteraction = () => {
        if (noCount < 10) {
            setPosition(getRandomPosition());
            handleNo();
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-sm">
            <img
                src={currentStep.img}
                alt="emotion"
                className="mx-auto mb-4 w-44 pointer-events-none"
            />

            <p className="text-xl font-semibold text-pink-600 mb-6 pointer-events-none">
                {currentStep.text}
            </p>

            {/* Button container with enough space for movement */}
            <div className="relative flex justify-center gap-6 pt-4 pb-4" style={{ minHeight: '140px' }}>
                {/* Yes button - static position */}
                <button
                    onClick={onYes}
                    className="px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors z-20 h-fit self-start"
                >
                    Yes ❤️
                </button>

                {/* No button - appears and moves */}
                {noCount < 10 && (
                    <motion.button
                        onMouseEnter={handleNoInteraction}
                        onTouchStart={handleNoInteraction}
                        onClick={handleNoInteraction}
                        animate={position}
                        transition={{ type: "spring", stiffness: 250, damping: 15 }}
                        className="px-6 py-2 bg-gray-400 text-white rounded-full hover:bg-gray-500 transition-colors absolute left-1/2 z-10 h-fit"
                        style={{ 
                            touchAction: 'none',
                            marginLeft: '40px' // Offset from center to sit next to Yes button initially
                        }}
                    >
                        No 😐
                    </motion.button>
                )}
            </div>
        </div>
    );
}
