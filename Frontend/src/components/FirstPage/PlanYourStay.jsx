import React from "react";
import 'aos/dist/aos.css';
import { useInView } from './useInView';
import { classNames } from './../../utils/classNames';


const PlanYourStay = () => {
    const categories = [
        { name: 'Pet-Friendly', icon: '🐾', direction: 'animate-fade-in-right' },
        { name: 'Family Trips', icon: '👨‍👩‍👧‍👦', direction: 'animate-fade-in-up' },
        { name: 'Romantic Getaways', icon: '❤️', direction: 'animate-fade-in-up' },
        { name: 'Solo Explorer', icon: '🎒', direction: 'animate-fade-in-left' },
    ];
    
    const [ref, inView] = useInView({ threshold: 0.2 });

    return (
        <div ref={ref} className="py-24 px-8 max-w-7xl mx-auto">
            {/* Section Heading */}
            <div className={classNames("transition-opacity duration-1000", inView ? "opacity-100" : "opacity-0")}>
                <h2 className="text-5xl font-bold text-white text-center">Plan Your Perfect Stay</h2>
                <p className="text-center text-[#C5C8D7] mt-3 text-lg">Curated experiences for every traveler.</p>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
                {categories.map((cat, index) => (
                    <div
                        key={cat.name}
                        className={classNames(
                            'category-card p-8 rounded-2xl text-center cursor-pointer opacity-0',
                            inView && cat.direction
                        )}
                        style={{
                            animationDelay: inView ? `${index * 150}ms` : '0ms',
                            animationFillMode: 'forwards'
                        }}
                    >
                        <div className="text-6xl mb-4 category-icon">{cat.icon}</div>
                        <h3 className="text-xl font-bold text-white mt-4">{cat.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlanYourStay;
