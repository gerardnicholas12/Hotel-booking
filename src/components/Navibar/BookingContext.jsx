// BookingContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('bookings');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }, [bookings]);

  const addBooking = (property, checkIn, checkOut, guests) => {
    const newBooking = {
      id: Date.now().toString(),
      propertyId: property.id,
      propertyName: property.name,
      propertyImage: property.image,
      propertyType: property.type,
      propertyLocation: property.location,
      price: property.price,
      checkIn,
      checkOut,
      guests,
      bookingDate: new Date().toISOString(),
      status: 'confirmed'
    };
    
    setBookings([newBooking, ...bookings]);
    return newBooking;
  };

  const getBookings = () => {
    return bookings.filter(b => b.status === 'confirmed');
  };

  const cancelBooking = (id) => {
    setBookings(bookings.map(b => 
      b.id === id ? { ...b, status: 'cancelled' } : b
    ));
  };

  return (
    <BookingContext.Provider value={{ 
      bookings: getBookings(), 
      addBooking, 
      cancelBooking 
    }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}