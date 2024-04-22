import React, { useEffect } from 'react';
import { Product } from '../types/Product';
import useLocalStorage from '../hooks/useLocalStorage';

interface FavoritesContextType {
  favorites: Product[];
  setFavorites: (v: Product[]) => void;
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
  const [favorites, setFavorites] = useLocalStorage<Product[]>(
    FAVORITES_KEY,
    [],
  );

  const countFavorites = favorites.length;
  const isFavorite = (product: Product) =>
    !!favorites.find((favorite) => favorite.id === product.id);

  const toggleFavorite = (product: Product) => {
    if (isFavorite(product)) {
      setFavorites(favorites.filter((favorite) => favorite.id !== product.id));
    } else {
      setFavorites([...favorites, product]);
    }
  };

  useEffect(() => {
    setFavorites(favorites);
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
