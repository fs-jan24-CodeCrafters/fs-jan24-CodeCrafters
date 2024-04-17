import {
  AddPayload,
  CartAction,
  CartActionTypes,
  CartModuleContext,
  PayloadOptions,
  RemovePayload,
} from './MainContext.types';

const addAction = (
  state: CartModuleContext,
  action: CartAction<AddPayload>,
) => {
  const item = state.items.find(
    (cardItem) => cardItem.id === action.payload.id,
  );

  if (item) {
    return {
      ...state,
      items: state.items.map((i) =>
        i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i,
      ),
    };
  } else {
    return {
      ...state,
      items: [...state.items, { id: action.payload.id, quantity: 1 }],
    };
  }
};

const removeAction = (
  state: CartModuleContext,
  action: CartAction<RemovePayload>,
) => {
  const item = state.items.find(
    (cardItem) => cardItem.id === action.payload.id,
  );
  if (!item) {
    return state;
  }

  if (action.payload.removeAll) {
    return {
      ...state,
      items: state.items.filter((i) => i.id !== action.payload.id),
    };
  }

  if (item.quantity > 1) {
    return {
      ...state,
      items: state.items.map((i) =>
        i.id === action.payload.id ? { ...i, quantity: i.quantity - 1 } : i,
      ),
    };
  } else {
    return {
      ...state,
      items: state.items.filter((i) => i.id !== action.payload.id),
    };
  }
};

export const cartReducer = (
  state: CartModuleContext,
  action: CartAction<PayloadOptions>,
) => {
  switch (action.type) {
    case CartActionTypes.ADD_TO_CART:
      return addAction(state, action);
    case CartActionTypes.REMOVE_FROM_CART:
      return removeAction(state, action as CartAction<RemovePayload>);
    default:
      return state;
  }
};
