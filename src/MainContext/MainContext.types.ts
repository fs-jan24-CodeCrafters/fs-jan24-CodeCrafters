export enum CartActionTypes {
  ADD_TO_CART = 'ADD_TO_CART',
}

export type CartAction = { type: CartActionTypes; id: number };

export type CartProduct = {
  id: number;
  quantity: number;
};

export type CartModuleContext = {
  items: CartProduct[];
};

export type MainContextType = {
  cart: CartModuleContext;
  addToCart: (id: number) => void;
  isProductInCart: (id: number) => boolean;
};
