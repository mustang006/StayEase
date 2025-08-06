// components/FeaturedProperties.jsx
import PropertyCard from './PropertyCard';
import { classNames } from './../../utils/classNames';
import { useInView } from './useInView';

const FeaturedProperties = () => {
  const featuredProperties = [
    { id: 1, title: 'Serenity Villa', location: 'Goa, India', price: 25000, rating: 4.9, badge: 'Guest Favourite', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1920&auto=format&fit=crop' },
    { id: 2, title: 'The Glass House', location: 'Lonavala, India', price: 35000, rating: 4.95, badge: 'Guest Favourite', image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1920&auto=format&fit=crop' },
    { id: 3, title: 'Mountain Retreat', location: 'Manali, India', price: 18000, rating: 4.8, badge: 'New', image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1920&auto=format&fit=crop' },
  ];

  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <div ref={ref} className="py-24 px-8 max-w-7xl mx-auto">
      <div className={classNames("transition-all duration-1000", inView ? "animate-fade-in-up" : "opacity-0")}>
        <h2 className="text-5xl font-bold text-white text-center">Featured Properties</h2>
        <p className="text-center text-[#C5C8D7] mt-3 text-lg">Handpicked homes for an unforgettable stay.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-16">
        {featuredProperties.map((prop, index) => (
          <div key={prop.id} className={classNames("transition-all duration-700", inView ? "animate-fade-in-up" : "opacity-0")} style={{ animationDelay: `${index * 150 + 200}ms` }}>
            <PropertyCard property={prop} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProperties;
