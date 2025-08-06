// components/FloatingVideo.jsx
import { useState } from 'react';
import { classNames } from './../../utils/classNames';

const FloatingVideo = () => {
  const [isEnlarged, setIsEnlarged] = useState(false);

  return (
    <>
      <div className={classNames(
        "fixed z-[60] transition-all duration-500 ease-in-out",
        isEnlarged 
          ? "inset-0 flex items-center justify-center" 
          : "bottom-8 right-28 w-24 h-24"
      )}>
        <div 
          className={classNames(
            "floating-video-container rounded-full overflow-hidden cursor-pointer border-2 border-[#5A80E9]/50 shadow-2xl shadow-[#5A80E9]/30",
            isEnlarged ? "w-[80vw] h-[45vw] max-w-[1280px] max-h-[720px] rounded-2xl" : "w-24 h-24"
          )}
          onClick={() => setIsEnlarged(!isEnlarged)}
        >
          <video 
            className="w-full h-full object-cover"
            src="https://cdn.dribbble.com/uploads/63539/original/f7d7f785ad904fef95862e22134cc6e0.mp4?1750255325" 
            autoPlay loop muted playsInline
          ></video>
        </div>
      </div>
      {isEnlarged && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          onClick={() => setIsEnlarged(false)}
        ></div>
      )}
    </>
  );
};

export default FloatingVideo;
