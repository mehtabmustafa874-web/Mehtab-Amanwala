
import { Hotel } from './types';

export const MOCK_HOTELS: Hotel[] = [
  {
    id: '1',
    name: 'The Grand Regency',
    location: 'London, UK',
    description: 'A masterpiece of Victorian architecture combined with modern luxury in the heart of London.',
    pricePerNight: 450,
    rating: 4.9,
    reviewsCount: 1240,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200',
    amenities: ['Spa', 'Pool', 'Fine Dining', 'Gym', 'Free WiFi'],
    featured: true
  },
  {
    id: '2',
    name: 'Azure Bay Resort',
    location: 'Maldives',
    description: 'Crystal clear waters meet pristine white sands in this ultimate tropical paradise getaway.',
    pricePerNight: 890,
    rating: 4.8,
    reviewsCount: 850,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=1200',
    amenities: ['Private Beach', 'Overwater Villas', 'Diving Center', 'All Inclusive'],
    featured: true
  },
  {
    id: '3',
    name: 'Manhattan Heights',
    location: 'New York, USA',
    description: 'Stay above the clouds with breathtaking views of the New York City skyline.',
    pricePerNight: 550,
    rating: 4.7,
    reviewsCount: 2100,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1200',
    amenities: ['Rooftop Bar', 'Business Center', 'Valet Parking', 'Gym']
  },
  {
    id: '4',
    name: 'Sapphire Sands',
    location: 'Dubai, UAE',
    description: 'Unparalleled luxury in the desert with gold-standard service and world-class shopping nearby.',
    pricePerNight: 620,
    rating: 4.9,
    reviewsCount: 3400,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1200',
    amenities: ['Pool', 'Spa', 'Butler Service', 'Shopping Concierge'],
    featured: true
  },
  {
    id: '5',
    name: 'Kyoto Zen Garden Inn',
    location: 'Kyoto, Japan',
    description: 'Experience the serenity of traditional Japanese hospitality in our meticulously designed ryokan.',
    pricePerNight: 380,
    rating: 4.6,
    reviewsCount: 920,
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=1200',
    amenities: ['Garden View', 'Tea Room', 'Traditional Bath', 'Quiet Area']
  },
  {
    id: '6',
    name: 'Alpine Lodge & Spa',
    location: 'Zermatt, Switzerland',
    description: 'Cozy fireplaces and stunning Matterhorn views await you in our premium alpine retreat.',
    pricePerNight: 710,
    rating: 4.8,
    reviewsCount: 1540,
    image: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&q=80&w=1200',
    amenities: ['Ski-in/Ski-out', 'Sauna', 'Hot Tub', 'Fine Dining']
  },
  {
    id: '7',
    name: 'The Parisian Suite',
    location: 'Paris, France',
    description: 'Elegance and romance defined. Just steps away from the Eiffel Tower and world-class bistros.',
    pricePerNight: 520,
    rating: 4.7,
    reviewsCount: 2800,
    image: 'https://images.unsplash.com/photo-1551882547-ff43c63efe81?auto=format&fit=crop&q=80&w=1200',
    amenities: ['Balcony View', 'Breakfast Included', 'Pet Friendly', 'Free WiFi']
  },
  {
    id: '8',
    name: 'Sydney Harbour Vista',
    location: 'Sydney, Australia',
    description: 'Modern luxury overlooking the world-famous Opera House and Sydney Harbour Bridge.',
    pricePerNight: 430,
    rating: 4.5,
    reviewsCount: 1750,
    image: 'https://images.unsplash.com/photo-1521783593447-5702b9bfd267?auto=format&fit=crop&q=80&w=1200',
    amenities: ['Pool', 'Gym', 'Harbour View', 'Lounge Access']
  }
];

export const ALL_AMENITIES = ['Pool', 'Spa', 'Gym', 'Free WiFi', 'Fine Dining', 'Private Beach', 'Rooftop Bar', 'Business Center', 'Pet Friendly'];
