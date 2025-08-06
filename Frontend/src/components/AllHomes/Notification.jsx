import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const Notification = ({ home, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 4000); // Auto-close after 4 seconds
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <motion.div
            className="fixed top-8 right-8 z-50 flex items-center p-3 max-w-sm rounded-xl bg-[#1A1B2E]/80 backdrop-blur-lg border border-[#5A80E9]/50 shadow-2xl overflow-hidden"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100, transition: { duration: 0.3 } }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            layout
        >
            <img src={home.image} alt={home.title} className="w-16 h-16 rounded-lg object-cover mr-4" />
            <div className="flex-grow">
                <p className="font-bold text-white">Booked!</p>
                <p className="text-sm text-[#C5C8D7] truncate">{home.title}</p>
            </div>
            <motion.div
                className="absolute bottom-0 left-0 h-1 bg-[#5A80E9]"
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 4, ease: 'linear' }}
            />
        </motion.div>
    );
};

export default Notification;