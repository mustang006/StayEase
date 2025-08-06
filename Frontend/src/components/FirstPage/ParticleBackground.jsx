import React from 'react';
import "../../styles/particles.css";

export default function ParticleBackground() {
  const particleCount = 70;
  const particleColors = ['#5A80E9', '#A8C5FF', '#9370DB'];

  return (
    <div className="absolute inset-0 z-0">
      {Array.from({ length: particleCount }).map((_, index) => {
        const size = Math.random() * 3 + 1;
        const startOpacity = Math.random() * 0.5 + 0.1;
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * -20;
        const top = `${Math.random() * 100}%`;
        const left = `${Math.random() * 100}%`;
        const xEnd = `${Math.random() * 400 - 200}px`;
        const yEnd = `${Math.random() * 400 - 200}px`;

        return (
          <div
            key={`particle-${index}`}
            className="particle"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              top,
              left,
              '--start-opacity': startOpacity,
              '--x-end': xEnd,
              '--y-end': yEnd,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
              color: particleColors[index % particleColors.length],
            }}
          />
        );
      })}
    </div>
  );
}
