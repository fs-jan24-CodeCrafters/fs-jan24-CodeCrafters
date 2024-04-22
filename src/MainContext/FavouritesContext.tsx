import React, { useEffect } from 'react';
import { Product } from '../types/Product';

interface FavoritesContextType {
  favorites: Product[];
  setFavorites: React.Dispatch<React.SetStateAction<Product[]>>;
  toggleFavorite: (product: Product) => void;
  isFavorite: (product: Product) => boolean;
  countFavorites: number;
}

const FAVORITES_KEY = 'favorites';

export const FavoritesContext = React.createContext<FavoritesContextType>({
  favorites: [],
  setFavorites: () => {},
  toggleFavorite: () => {},
  isFavorite: () => false,
  countFavorites: 0,
});

interface Props {
  children: React.ReactNode;
}

export const FavoritesProvider: React.FC<Props> = ({ children }) => {
  const [favorites, setFavorites] = React.useState<Product[]>(() => {
    const savedFavorites = localStorage.getItem(FAVORITES_KEY);
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const countFavorites = favorites.length;
  const isFavorite = (product: Product) =>
    !!favorites.find((favorite) => favorite.id === product.id);

  const toggleFavorite = (product: Product) => {
    if (isFavorite(product)) {
      setFavorites((prevFavorites) =>
        prevFavorites.filter((favorite) => favorite.id !== product.id),
      );
    } else {
      setFavorites((prevFavorites) => [...prevFavorites, product]);
    }
  };

  useEffect(() => {
    const savedFavorites = localStorage.getItem(FAVORITES_KEY);
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const value = {
    favorites,
    setFavorites,
    toggleFavorite,
    isFavorite,
    countFavorites,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
