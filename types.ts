
export interface Hotel {
  id: string;
  name: string;
  location: string;
  description: string;
  pricePerNight: number;
  rating: number;
  reviewsCount: number;
  image: string;
  amenities: string[];
  featured?: boolean;
}

export interface SearchParams {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

export interface Booking {
  id: string;
  hotelId: string;
  hotelName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  customerName: string;
  customerEmail: string;
}

export enum SortOption {
  RECOMMENDED = 'Recommended',
  PRICE_LOW = 'Price: Low to High',
  PRICE_HIGH = 'Price: High to Low',
  RATING = 'Top Rated'
}

export interface Filters {
  minPrice: number;
  maxPrice: number;
  minRating: number;
  amenities: string[];
}
