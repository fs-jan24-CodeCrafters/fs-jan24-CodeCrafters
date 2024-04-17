export enum CartActionTypes {
  ADD_TO_CART = 'ADD_TO_CART',
  REMOVE_FROM_CART = 'REMOVE_FROM_CART',
}

export type AddPayload = {
  id: number;
};

export type RemovePayload = {
  id: number;
  removeAll: boolean;
};

export type PayloadOptions = AddPayload | RemovePayload;

export type CartAction<T> = { type: CartActionTypes; payload: T };

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
  removeFromCart: (id: number, removeAll?: boolean) => void;
  isProductInCart: (id: number) => boolean;
};
