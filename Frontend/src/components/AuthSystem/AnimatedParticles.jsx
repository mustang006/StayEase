// components/AuthSystem/AnimatedParticles.jsx
import React from 'react';

const AnimatedParticles = () => {
  const particles = Array.from({ length: 12 });

  return (
    <>
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px) scale(1); opacity: 0.1; }
          50% { transform: translateY(-30px) scale(1.05); opacity: 0.2; }
          100% { transform: translateY(0px) scale(1); opacity: 0.1; }
        }
        .particle {
          position: absolute;
          border-radius: 50%;
          background: #5A80E9;
          animation: float linear infinite;
        }
      `}</style>
      <div className="absolute inset-0">
        {particles.map((_, i) => {
          const size = Math.random() * 10 + 5;
          const duration = Math.random() * 10 + 10;
          const delay = Math.random() * 5;
          return (
            <div
              key={i}
              className="particle"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}
      </div>
    </>
  );
};

export default AnimatedParticles;
