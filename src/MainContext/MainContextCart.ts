import {
  CartAction,
  CartActionTypes,
  CartModuleContext,
} from './MainContext.types';

const addAction = (state: CartModuleContext, action: CartAction) => {
  const item = state.items.find((cardItem) => cardItem.id === action.id);

  if (item) {
    return {
      ...state,
      items: state.items.map((i) =>
        i.id === action.id ? { ...i, quantity: i.quantity + 1 } : i,
      ),
    };
  } else {
    return {
      ...state,
      items: [...state.items, { id: action.id, quantity: 1 }],
    };
  }
};

export const cartReducer = (state: CartModuleContext, action: CartAction) => {
  switch (action.type) {
    case CartActionTypes.ADD_TO_CART:
      return addAction(state, action);
    default:
      return state;
  }
};
