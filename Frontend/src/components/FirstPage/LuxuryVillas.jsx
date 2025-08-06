import React from "react";
import classNames from "classnames";
import { useInView } from './useInView';

const LuxuryVillas = () => {
    const villas = [
        { id: 1, name: 'Oceanfront Paradise', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1920&auto=format&fit=crop' },
        { id: 2, name: 'Desert Oasis', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920&auto=format&fit=crop' },
        { id: 3, name: 'Jungle Hideaway', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1920&auto=format&fit=crop' },
        { id: 4, name: 'Alpine Chalet', image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=1920&auto=format&fit=crop' },
        { id: 5, name: 'Modern Marvel', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1920&auto=format&fit=crop' },
        { id: 6, name: 'Private Island Estate', image: 'https://images.unsplash.com/photo-1598228723793-52759bba239c?q=80&w=1920&auto=format&fit=crop' },
    ];

    const [ref, inView] = useInView({ threshold: 0.1 });

    return (
        <div ref={ref} className="py-24 bg-gradient-to-b from-[#12131C] to-[#1A1B2E] overflow-hidden">
            {/* Title Section */}
            <div className={classNames("transition-all duration-1000", inView ? "animate-fade-in-up" : "opacity-0")}>
                <h2 className="text-5xl font-bold text-white text-center">Luxury Villas</h2>
                <p className="text-center text-[#C5C8D7] mt-3 text-lg">Experience opulence like never before.</p>
            </div>

            {/* Carousel */}
            <div className={classNames("mt-16 relative transition-all duration-1000", inView ? "animate-fade-in-right" : "opacity-0")}>
                <div className="villas-carousel-container">
                    <div className="villas-carousel-track">
                        {[...villas, ...villas].map((villa, index) => (
                            <div key={index} className="villa-card group">
                                <img
                                    src={villa.image}
                                    alt={villa.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                <h3 className="absolute bottom-6 left-6 text-white font-bold text-2xl">{villa.name}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LuxuryVillas;
