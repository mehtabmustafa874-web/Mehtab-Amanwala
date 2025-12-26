
import React from 'react';
import { Hotel } from '../types';

interface HotelCardProps {
  hotel: Hotel;
  onBook: (hotel: Hotel) => void;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel, onBook }) => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 flex flex-col md:flex-row group">
      <div className="relative md:w-80 h-64 md:h-auto overflow-hidden">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {hotel.featured && (
          <span className="absolute top-4 left-4 bg-indigo-900 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
            Featured
          </span>
        )}
      </div>
      <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-sm text-slate-500 font-medium">{hotel.location}</p>
              <h3 className="text-2xl font-serif font-bold text-slate-900">{hotel.name}</h3>
            </div>
            <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
              <span className="text-amber-500 font-bold">★</span>
              <span className="text-amber-900 text-sm font-bold">{hotel.rating}</span>
              <span className="text-slate-400 text-xs">({hotel.reviewsCount})</span>
            </div>
          </div>
          <p className="text-slate-600 text-sm mb-6 line-clamp-2">{hotel.description}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {hotel.amenities.map((amenity) => (
              <span key={amenity} className="text-[10px] bg-slate-50 text-slate-600 px-2 py-1 rounded-md font-medium">
                {amenity}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-end justify-between pt-4 border-t border-slate-100">
          <div>
            <span className="text-2xl font-bold text-slate-900">${hotel.pricePerNight}</span>
            <span className="text-slate-500 text-sm font-medium"> / night</span>
          </div>
          <button
            onClick={() => onBook(hotel)}
            className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-900 transition-colors"
          >
            Reserve Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
