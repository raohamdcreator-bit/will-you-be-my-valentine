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

    return (
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-sm relative">
            <img
                src={currentStep.img}
                alt="emotion"
                className="mx-auto mb-4 w-44"
            />

            <p className="text-xl font-semibold text-pink-600 mb-6">
                {currentStep.text}
            </p>

            <div className="flex justify-center gap-6 relative h-14">
                <button
                    onClick={onYes}
                    className="px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition"
                >
                    Yes ❤️
                </button>

                {noCount < 10 && (
                    <motion.button
                        onMouseEnter={moveNoButton}
                        animate={{
                            x: Math.random() * 200 - 100,
                            y: Math.random() * 80 - 40
                        }}
                        className="px-6 py-2 bg-gray-300 rounded-full absolute"
                    >
                        No 😐
                    </motion.button>
                )}
            </div>
        </div>
    );
}
