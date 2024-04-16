import { createContext, useReducer } from 'react';
import { CartActionTypes, MainContextTypes } from './MainContext.types';
import { cartReducer } from './MainContextCart';

export const MainContext = createContext<MainContextTypes | undefined>(
  undefined,
);

interface Props {
  children: React.ReactNode;
}

export const MainContextProvider: React.FC<Props> = ({ children }) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, {
    items: [],
  });

  const addToCart = (id: number) => {
    dispatchCartAction({ type: CartActionTypes.ADD_TO_CART, id });
  };

  const isProductInCart = (id: number) => {
    return !!cartState.items.find((item) => item.id === id);
  };

  return (
    <MainContext.Provider
      value={{ cart: cartState, addToCart, isProductInCart }}
    >
      {children}
    </MainContext.Provider>
  );
};
