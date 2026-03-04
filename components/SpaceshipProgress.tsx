import React, { useEffect, useState } from 'react';
import { Rocket } from 'lucide-react';

const SpaceshipProgress: React.FC = () => {
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY;

            if (documentHeight > windowHeight) {
                const scrollPercentage = Math.min(100, Math.max(0, (scrollTop / (documentHeight - windowHeight)) * 100));
                setProgress(scrollPercentage);

                // Only show after scrolling down a bit
                if (scrollTop > 100) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Initial setup
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={`fixed right-2 top-1/4 bottom-1/4 w-1 bg-gray-800/30 rounded-full z-[45] hidden sm:block transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {/* Glowing Trail */}
            <div
                className="absolute top-0 left-0 w-full bg-gradient-to-b from-cyan-400 via-pink-500 to-purple-600 rounded-full shadow-[0_0_15px_rgba(236,72,153,0.8)]"
                style={{ height: `${progress}%` }}
            />
            {/* Spaceship */}
            <div
                className="absolute left-1/2 -translate-x-1/2 transition-all duration-75"
                style={{ top: `${progress}%`, transform: `translate(-50%, -50%)` }}
            >
                <div className="relative rotate-180 text-white drop-shadow-[0_0_10px_rgba(34,211,238,1)]">
                    <Rocket size={20} className="animate-pulse text-cyan-400 group-hover:text-pink-400 transition-colors" />
                    {/* Engine fire */}
                    <div className="absolute top-[-8px] left-1/2 -translate-x-1/2 w-1.5 h-3 bg-gradient-to-b from-orange-400 to-red-600 rounded-full blur-[2px] animate-pulse"></div>
                </div>
            </div>
        </div>
    );
};

export default SpaceshipProgress;
