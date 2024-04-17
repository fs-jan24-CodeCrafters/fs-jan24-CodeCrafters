import { createContext, useEffect, useReducer } from 'react';
import {
  CartActionTypes,
  CartModuleContext,
  MainContextType,
} from './MainContext.types';
import { cartReducer } from './MainContextCart';

const CART_LOCAL_STORAGE_KEY = 'cart';

export const MainContext = createContext<MainContextType | undefined>(
  undefined,
);

interface Props {
  children: React.ReactNode;
}

const storeData = (state: CartModuleContext) => {
  const data = JSON.stringify(state);
  localStorage.setItem(CART_LOCAL_STORAGE_KEY, data);
};

const getData = () => {
  const data = localStorage.getItem(CART_LOCAL_STORAGE_KEY);
  if (data) {
    return JSON.parse(data);
  }
  return { items: [] };
};

export const MainContextProvider: React.FC<Props> = ({ children }) => {
  const initialState = getData();
  const [cartState, dispatchCartAction] = useReducer(cartReducer, initialState);

  useEffect(() => {
    storeData(cartState);
  }, [cartState]);

  const addToCart = (id: number) => {
    dispatchCartAction({ type: CartActionTypes.ADD_TO_CART, payload: { id } });
  };

  const removeFromCart = (id: number, removeAll: boolean = false) => {
    dispatchCartAction({
      type: CartActionTypes.REMOVE_FROM_CART,
      payload: { id, removeAll },
    });
  };

  const isProductInCart = (id: number) => {
    return !!cartState.items.find((item) => item.id === id);
  };

  const totalCartQuantity = cartState.items.reduce(
    (acc: number, item) => acc + item.quantity,
    0,
  );

  return (
    <MainContext.Provider
      value={{
        cart: cartState,
        totalCartQuantity,
        addToCart,
        removeFromCart,
        isProductInCart,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
