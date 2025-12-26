
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-900 rounded-full flex items-center justify-center">
              <span className="text-white font-serif text-2xl">L</span>
            </div>
            <h1 className="text-2xl font-serif font-bold tracking-tight text-indigo-950">LuxeStay</h1>
          </div>
          <nav className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-indigo-900 transition-colors">Hotels</a>
            <a href="#" className="hover:text-indigo-900 transition-colors">Resorts</a>
            <a href="#" className="hover:text-indigo-900 transition-colors">Destinations</a>
            <a href="#" className="hover:text-indigo-900 transition-colors">Offers</a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="text-sm font-medium text-indigo-900 hover:text-indigo-700">Sign In</button>
            <button className="bg-indigo-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-indigo-800 transition-all shadow-lg shadow-indigo-900/10">
              Join Now
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
