// components/PropertyCard.jsx
import { useRef } from 'react';

const PropertyCard = ({ property }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left - width / 2) / 20;
    const y = (clientY - top - height / 2) / 20;
    cardRef.current.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg) scale3d(1.05, 1.05, 1.05)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale3d(1, 1, 1)';
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="property-card-container group relative transition-transform duration-300 ease-out"
    >
      <div className="relative overflow-hidden rounded-xl shadow-2xl shadow-black/50">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 z-10"></div>
        <div className="absolute inset-0 bg-yellow-300/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0 lights-on-effect"></div>
        <img src={property.image} alt={property.title} className="w-full h-96 object-cover transform group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute top-4 right-4 bg-[#F1F1F1] text-gray-900 px-3 py-1 rounded-full text-xs font-bold z-20 shadow-lg">{property.badge}</div>
      </div>
      <div className="absolute bottom-0 left-0 p-6 z-20 text-white w-full">
        <h3 className="font-bold text-xl text-[#F1F1F1]">{property.title}</h3>
        <p className="text-sm text-[#C5C8D7]">{property.location}</p>
        <div className="flex items-center mt-2">
          <span className="font-semibold text-white">₹{property.price.toLocaleString()} / 2 nights</span>
          <span className="mx-2 text-white/50">•</span>
          <span className="flex items-center gap-1 text-yellow-400">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
            <span className="text-white">{property.rating}</span>
          </span>
        </div>
      </div>
      <button className="absolute bottom-6 right-6 z-30 bg-[#5A80E9] text-white px-5 py-3 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg shadow-[#5A80E9]/40 hover:shadow-xl hover:shadow-[#5A80E9]/60">
        Book Now
      </button>
    </div>
  );
};

export default PropertyCard;
