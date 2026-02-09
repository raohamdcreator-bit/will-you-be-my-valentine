import { useState } from "react";
import { motion } from "framer-motion";
import { steps } from "../data/steps";

export default function ValentineCard({ onYes }) {
    const [noCount, setNoCount] = useState(0);
    const currentStep = steps[Math.min(noCount, steps.length - 1)];

    const handleNo = () => {
        if (noCount < steps.length - 1) {
            setNoCount(noCount + 1);
        }
    };

    const moveNoButton = () => {
        if (noCount < 10) handleNo();
    };

    // Generate safe random position that doesn't overlap Yes button
    const getRandomPosition = () => {
        const isMobile = window.innerWidth < 640;
        
        if (isMobile) {
            // On mobile, move button further away with more dramatic movement
            const directions = [
                { x: 0, y: -100 },    // Up
                { x: 0, y: 100 },     // Down
                { x: -80, y: -60 },   // Top left
                { x: 80, y: -60 },    // Top right
                { x: -80, y: 60 },    // Bottom left
                { x: 80, y: 60 },     // Bottom right
            ];
            return directions[Math.floor(Math.random() * directions.length)];
        } else {
            // On desktop, allow more freedom but avoid center
            let x, y;
            do {
                x = Math.random() * 200 - 100;
                y = Math.random() * 100 - 50;
            } while (Math.abs(x) < 40 && Math.abs(y) < 30); // Avoid center area
            return { x, y };
        }
    };

    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleNoInteraction = () => {
        setPosition(getRandomPosition());
        moveNoButton();
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-sm relative overflow-hidden">
            <img
                src={currentStep.img}
                alt="emotion"
                className="mx-auto mb-4 w-44"
            />

            <p className="text-xl font-semibold text-pink-600 mb-6">
                {currentStep.text}
            </p>

            <div className="flex justify-center gap-6 relative h-20 sm:h-14">
                <button
                    onClick={onYes}
                    className="px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition z-10"
                >
                    Yes ❤️
                </button>

                {noCount < 10 && (
                    <motion.button
                        onMouseEnter={handleNoInteraction}
                        onClick={handleNoInteraction}
                        animate={position}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="px-6 py-2 bg-pink-400 text-white rounded-full hover:bg-pink-500 transition absolute touch-none"
                        style={{ touchAction: 'none' }}
                    >
                        No 😐
                    </motion.button>
                )}
            </div>
        </div>
    );
}
