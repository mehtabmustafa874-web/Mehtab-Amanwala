
import React, { useState, useEffect } from 'react';
import { Hotel, SearchParams } from '../types';
import { getTravelInsights } from '../services/geminiService';

interface BookingModalProps {
  hotel: Hotel;
  searchParams: SearchParams;
  onClose: () => void;
  onConfirm: (details: { name: string; email: string }) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ hotel, searchParams, onClose, onConfirm }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [insights, setInsights] = useState<any>(null);
  const [loadingInsights, setLoadingInsights] = useState(false);

  useEffect(() => {
    const fetchInsights = async () => {
      setLoadingInsights(true);
      const res = await getTravelInsights(hotel.location, 3);
      setInsights(res);
      setLoadingInsights(false);
    };
    fetchInsights();
  }, [hotel.location]);

  const nights = searchParams.checkIn && searchParams.checkOut 
    ? Math.max(1, Math.ceil((new Date(searchParams.checkOut).getTime() - new Date(searchParams.checkIn).getTime()) / (1000 * 3600 * 24)))
    : 1;

  const total = nights * hotel.pricePerNight;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-[2rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row">
        {/* Left Side: Summary */}
        <div className="md:w-1/2 p-8 md:p-12 bg-slate-50 border-r border-slate-100">
          <button onClick={onClose} className="mb-8 text-slate-400 hover:text-slate-600 font-medium flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to results
          </button>
          
          <h2 className="text-3xl font-serif font-bold text-slate-900 mb-6">Reservation Details</h2>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <img src={hotel.image} className="w-20 h-20 rounded-2xl object-cover shadow-sm" alt="" />
              <div>
                <h3 className="font-bold text-slate-900">{hotel.name}</h3>
                <p className="text-sm text-slate-500">{hotel.location}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Check-In</p>
                <p className="font-medium text-slate-900">{searchParams.checkIn || 'Not specified'}</p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Check-Out</p>
                <p className="font-medium text-slate-900">{searchParams.checkOut || 'Not specified'}</p>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200">
              <div className="flex justify-between mb-2">
                <span className="text-slate-500">${hotel.pricePerNight} x {nights} nights</span>
                <span className="font-medium text-slate-900">${total}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-slate-500">Service Fee</span>
                <span className="font-medium text-slate-900">$25</span>
              </div>
              <div className="flex justify-between items-center pt-4 mt-4 border-t border-slate-200">
                <span className="text-xl font-bold text-slate-900">Total</span>
                <span className="text-2xl font-bold text-indigo-900">${total + 25}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form & Insights */}
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-serif font-bold text-slate-900 mb-8">Confirm Booking</h2>
            <div className="space-y-4 mb-10">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Full Name</label>
                <input
                  type="text"
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-900/20"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Email Address</label>
                <input
                  type="email"
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-900/20"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* AI Insights Card */}
            <div className="bg-indigo-50/50 rounded-2xl p-6 border border-indigo-100">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 bg-indigo-900 rounded-full flex items-center justify-center text-white text-[10px]">AI</div>
                <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-widest">Travel Insights</h4>
              </div>
              
              {loadingInsights ? (
                <div className="animate-pulse space-y-2">
                  <div className="h-4 bg-indigo-100 rounded w-3/4"></div>
                  <div className="h-4 bg-indigo-100 rounded w-1/2"></div>
                </div>
              ) : insights ? (
                <div className="space-y-3">
                  <p className="text-xs text-indigo-800 leading-relaxed italic">
                    "{insights.culturalTip}"
                  </p>
                  <div className="flex gap-2">
                    {insights.activities.slice(0, 2).map((a: string) => (
                      <span key={a} className="text-[10px] bg-white text-indigo-900 px-2 py-1 rounded border border-indigo-100">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-xs text-indigo-400">Personalizing your trip details...</p>
              )}
            </div>
          </div>

          <button
            disabled={!name || !email}
            onClick={() => onConfirm({ name, email })}
            className="w-full mt-10 bg-indigo-900 text-white py-5 rounded-2xl font-bold shadow-xl shadow-indigo-900/20 hover:bg-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-y-1"
          >
            Complete Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
