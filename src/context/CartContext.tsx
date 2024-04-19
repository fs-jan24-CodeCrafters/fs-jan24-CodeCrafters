import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { Product } from '../types/Product';

type State = {
  cart: Product[];
};

const initialState: State = {
  cart: [],
};

type CartContextType = State & {
  dispatch: React.Dispatch<Action>;
  totalCartQuantity: number;
};

const CartContext = createContext<CartContextType>({
  ...initialState,
  dispatch: () => {},
  totalCartQuantity: 0,
});

export type Action =
  | { type: 'cart/addItem'; payload: Product }
  | { type: 'cart/removeItem'; payload: number }
  | { type: 'cart/increaseQuantity'; payload: number }
  | { type: 'cart/decreaseQuantity'; payload: number }
  | { type: 'cart/clearCart' };

type Props = {
  children: React.ReactNode;
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'cart/addItem':
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };

    case 'cart/removeItem':
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };

    case 'cart/increaseQuantity':
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity! + 1 }
            : item,
        ),
      };

    case 'cart/decreaseQuantity':
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity! > 1 ? item.quantity! - 1 : 1 }
            : item,
        ),
      };

    case 'cart/clearCart':
      return {
        ...initialState,
      };

    default:
      return state;
  }
}

const CartProvider: React.FC<Props> = ({ children }) => {
  const [storedCart, setStoredCart] = useLocalStorage<Product[]>('cart', []);

  const [{ cart }, dispatch] = useReducer(reducer, initialState, () => {
    return {
      ...initialState,
      cart: Array.isArray(storedCart) ? storedCart : [],
    };
  });

  useEffect(() => {
    setStoredCart(cart);
  }, [cart, setStoredCart]);

  const totalCartQuantity = useMemo(() => {
    return cart.reduce(
      (acc: number, item: Product) => acc + (item.quantity || 0),
      0,
    );
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        dispatch,
        cart,
        totalCartQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('CartContext was used outside of the PostProvider');
  }

  return context;
};

export { useCart, CartProvider };
