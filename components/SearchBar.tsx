
import React, { useState } from 'react';
import { SearchParams } from '../types';

interface SearchBarProps {
  onSearch: (params: SearchParams) => void;
  initialParams?: SearchParams;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, initialParams }) => {
  const [params, setParams] = useState<SearchParams>(initialParams || {
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 1
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(params);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-5xl mx-auto bg-white p-4 rounded-3xl shadow-2xl flex flex-col md:flex-row items-stretch gap-4 border border-slate-100">
      <div className="flex-1 px-4 py-2 border-r border-slate-100 last:border-0">
        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Destination</label>
        <input
          type="text"
          placeholder="Where are you going?"
          className="w-full text-slate-800 placeholder-slate-400 bg-transparent outline-none font-medium"
          value={params.location}
          onChange={(e) => setParams({ ...params, location: e.target.value })}
        />
      </div>
      
      <div className="flex-1 px-4 py-2 border-r border-slate-100 last:border-0">
        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Check In</label>
        <input
          type="date"
          className="w-full text-slate-800 bg-transparent outline-none font-medium"
          value={params.checkIn}
          onChange={(e) => setParams({ ...params, checkIn: e.target.value })}
        />
      </div>

      <div className="flex-1 px-4 py-2 border-r border-slate-100 last:border-0">
        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Check Out</label>
        <input
          type="date"
          className="w-full text-slate-800 bg-transparent outline-none font-medium"
          value={params.checkOut}
          onChange={(e) => setParams({ ...params, checkOut: e.target.value })}
        />
      </div>

      <div className="flex-[0.5] px-4 py-2 border-r border-slate-100 last:border-0">
        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Guests</label>
        <input
          type="number"
          min="1"
          className="w-full text-slate-800 bg-transparent outline-none font-medium"
          value={params.guests}
          onChange={(e) => setParams({ ...params, guests: parseInt(e.target.value) })}
        />
      </div>

      <button
        type="submit"
        className="bg-indigo-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-indigo-800 transition-all flex items-center justify-center gap-2 group"
      >
        <span>Search</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </button>
    </form>
  );
};

export default SearchBar;
