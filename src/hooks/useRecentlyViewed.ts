import { useState, useEffect } from 'react';
import { Cryptocurrency } from '@/lib/types';

const MAX_RECENT_ITEMS = 10;

export const useRecentlyViewed = () => {
  const [recentlyViewed, setRecentlyViewed] = useState<Cryptocurrency[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('recentlyViewed');
    if (stored) {
      setRecentlyViewed(JSON.parse(stored));
    }
  }, []);

  const addToRecentlyViewed = (crypto: Cryptocurrency) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(item => item.id !== crypto.id);
      const updated = [crypto, ...filtered].slice(0, MAX_RECENT_ITEMS);
      localStorage.setItem('recentlyViewed', JSON.stringify(updated));
      return updated;
    });
  };

  return { recentlyViewed, addToRecentlyViewed };
};