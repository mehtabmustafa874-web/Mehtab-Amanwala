
import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import HotelCard from './components/HotelCard';
import BookingModal from './components/BookingModal';
import LoginPage from './components/LoginPage';
import { MOCK_HOTELS, ALL_AMENITIES } from './constants';
import { Hotel, SearchParams, SortOption, Filters } from './types';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 1
  });
  
  const [sortOption, setSortOption] = useState<SortOption>(SortOption.RECOMMENDED);
  const [filters, setFilters] = useState<Filters>({
    minPrice: 0,
    maxPrice: 1000,
    minRating: 0,
    amenities: []
  });

  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);

  const filteredHotels = useMemo(() => {
    let result = [...MOCK_HOTELS];

    // Search filter
    if (searchParams.location) {
      result = result.filter(h => 
        h.location.toLowerCase().includes(searchParams.location.toLowerCase()) ||
        h.name.toLowerCase().includes(searchParams.location.toLowerCase())
      );
    }

    // Advanced filters
    result = result.filter(h => 
      h.pricePerNight >= filters.minPrice &&
      h.pricePerNight <= filters.maxPrice &&
      h.rating >= filters.minRating
    );

    if (filters.amenities.length > 0) {
      result = result.filter(h => 
        filters.amenities.every(a => h.amenities.includes(a))
      );
    }

    // Sort
    switch (sortOption) {
      case SortOption.PRICE_LOW:
        result.sort((a, b) => a.pricePerNight - b.pricePerNight);
        break;
      case SortOption.PRICE_HIGH:
        result.sort((a, b) => b.pricePerNight - a.pricePerNight);
        break;
      case SortOption.RATING:
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [searchParams, sortOption, filters]);

  const toggleAmenity = (amenity: string) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleBookingConfirm = () => {
    setSelectedHotel(null);
    setIsBookingConfirmed(true);
    setTimeout(() => setIsBookingConfirmed(false), 5000);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-16 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-transparent"></div>
          <div className="absolute top-1/4 -right-1/4 w-1/2 h-1/2 bg-indigo-200/20 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-amber-100/30 blur-[100px] rounded-full"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-6xl font-serif font-bold text-indigo-950 mb-6 tracking-tight">
            Find Your Perfect <span className="italic text-amber-600 font-normal">Sanctuary</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-500 font-medium leading-relaxed">
            Experience unparalleled luxury in the world's most breathtaking destinations. 
            Discover curated hotels designed for your comfort and style.
          </p>
        </div>

        <div className="relative z-10 px-4">
          <SearchBar onSearch={setSearchParams} initialParams={searchParams} />
        </div>
      </section>

      {/* Listings Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <aside className="lg:w-72 flex-shrink-0 space-y-8">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
              <h3 className="text-xl font-serif font-bold text-slate-900 mb-6">Filters</h3>
              
              <div className="space-y-8">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Price Range</label>
                  <input 
                    type="range" 
                    min="0" 
                    max="1000" 
                    step="50"
                    className="w-full accent-indigo-900"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({...filters, maxPrice: parseInt(e.target.value)})}
                  />
                  <div className="flex justify-between mt-2 text-sm font-medium text-slate-600">
                    <span>$0</span>
                    <span>Up to ${filters.maxPrice}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Minimum Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setFilters({...filters, minRating: star})}
                        className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                          filters.minRating === star ? 'bg-amber-100 text-amber-700 border-amber-200' : 'bg-slate-50 text-slate-400 border-slate-100'
                        } border`}
                      >
                        {star}★
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Amenities</label>
                  <div className="space-y-3">
                    {ALL_AMENITIES.map((amenity) => (
                      <label key={amenity} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          className="w-5 h-5 rounded-md border-slate-200 text-indigo-900 focus:ring-indigo-900 transition-all cursor-pointer"
                          checked={filters.amenities.includes(amenity)}
                          onChange={() => toggleAmenity(amenity)}
                        />
                        <span className="text-sm font-medium text-slate-600 group-hover:text-indigo-900 transition-colors">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Results Grid */}
          <section className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <p className="text-slate-500 font-medium">
                Showing <span className="text-slate-900 font-bold">{filteredHotels.length} hotels</span>
                {searchParams.location && <span> in {searchParams.location}</span>}
              </p>
              
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-slate-400">Sort by:</span>
                <select
                  className="bg-white border border-slate-100 rounded-xl px-4 py-2 text-sm font-bold text-slate-900 outline-none shadow-sm cursor-pointer"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as SortOption)}
                >
                  {Object.values(SortOption).map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-6">
              {filteredHotels.length > 0 ? (
                filteredHotels.map(hotel => (
                  <HotelCard
                    key={hotel.id}
                    hotel={hotel}
                    onBook={(h) => setSelectedHotel(h)}
                  />
                ))
              ) : (
                <div className="bg-white rounded-[2rem] p-20 text-center border border-slate-100 shadow-sm">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-10V4m0 10V4m-4 6h4" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-slate-900 mb-2">No hotels found</h3>
                  <p className="text-slate-500 max-w-sm mx-auto">Try adjusting your filters or searching for a different destination to find your perfect stay.</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-32 pt-20 pb-10 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-8 h-8 bg-indigo-900 rounded-full flex items-center justify-center">
              <span className="text-white font-serif text-lg">L</span>
            </div>
            <h1 className="text-xl font-serif font-bold text-indigo-950">LuxeStay</h1>
          </div>
          <div className="flex flex-wrap justify-center gap-8 mb-12 text-sm font-medium text-slate-500">
            <a href="#" className="hover:text-indigo-900 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-900 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-indigo-900 transition-colors">Contact Support</a>
            <a href="#" className="hover:text-indigo-900 transition-colors">Corporate Travel</a>
          </div>
          <p className="text-sm text-slate-400">© 2024 LuxeStay Premium Hotels & Resorts. All rights reserved.</p>
        </div>
      </footer>

      {/* Success Notification */}
      {isBookingConfirmed && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] bg-indigo-900 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-bold">Reservation Confirmed! Check your email for details.</span>
        </div>
      )}

      {/* Booking Modal */}
      {selectedHotel && (
        <BookingModal
          hotel={selectedHotel}
          searchParams={searchParams}
          onClose={() => setSelectedHotel(null)}
          onConfirm={handleBookingConfirm}
        />
      )}
    </div>
  );
};

export default App;
