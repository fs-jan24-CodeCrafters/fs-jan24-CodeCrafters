import React, { useContext, useEffect, useReducer } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { Product } from '../types/Product';

interface FavoritesContextType {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (product: Product) => boolean;
  countFavorites: number;
}

const FAVORITES_KEY = 'favorites';
const initialState: Product[] = [];

type Action =
  | { type: 'ADD_FAVORITE'; payload: Product }
  | { type: 'REMOVE_FAVORITE'; payload: Product };

const reducer = (state: Product[], action: Action): Product[] => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      return [...state, action.payload];

    case 'REMOVE_FAVORITE':
      return state.filter((favorite) => favorite.id !== action.payload.id);
    default:
      return state;
  }
};

export const FavoritesContext = React.createContext<FavoritesContextType>({
  favorites: [],
  toggleFavorite: () => {},
  isFavorite: () => false,
  countFavorites: 0,
});

interface Props {
  children: React.ReactNode;
}

const FavoritesProvider: React.FC<Props> = ({ children }) => {
  const [storedFavorites, setStoredFavorites] = useLocalStorage<Product[]>(
    FAVORITES_KEY,
    [],
  );
  const [favorites, dispatch] = useReducer(reducer, initialState, () => {
    return Array.isArray(storedFavorites) ? storedFavorites : initialState;
  });

  const countFavorites = favorites.length;
  const isFavorite = (product: Product) =>
    !!favorites.find((favorite) => favorite.id === product.id);

  const toggleFavorite = (product: Product) => {
    if (isFavorite(product)) {
      dispatch({ type: 'REMOVE_FAVORITE', payload: product });
    } else {
      dispatch({ type: 'ADD_FAVORITE', payload: product });
    }
  };

  useEffect(() => {
    setStoredFavorites(favorites);
  }, [favorites]);

  const value = {
    favorites,
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

const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('FavoritesContext was used outside of the PostProvider');
  }

  return context;
};

export { useFavorites, FavoritesProvider };
