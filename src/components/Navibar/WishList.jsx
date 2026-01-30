// WishList.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (property) => {
    setWishlist(prev => {
      // Check if property already exists
      const exists = prev.find(item => item.id === property.id);
      if (!exists) {
        return [...prev, property];
      }
      return prev;
    });
  };

  const removeFromWishlist = (propertyId) => {
    setWishlist(prev => prev.filter(item => item.id !== propertyId));
  };

  const toggleWishlist = (property) => {
    const exists = wishlist.find(item => item.id === property.id);
    if (exists) {
      removeFromWishlist(property.id);
    } else {
      addToWishlist(property);
    }
  };

  const isInWishlist = (propertyId) => {
    return wishlist.some(item => item.id === propertyId);
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  const getWishlistCount = () => {
    return wishlist.length;
  };

  return (
    <WishlistContext.Provider value={{
      wishlist,
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
      isInWishlist,
      clearWishlist,
      getWishlistCount
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistProvider;