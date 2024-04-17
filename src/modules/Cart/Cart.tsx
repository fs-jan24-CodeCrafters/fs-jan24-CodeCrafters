import { useMainContext } from '../../hooks/useMainContext';
import products from '../../../public/api/products.json';
import styles from './Cart.module.scss';
import { Product } from '../../types/Product';

export const Cart: React.FC = () => {
  const { cart, addToCart, removeFromCart } = useMainContext();

  const productsInCart = cart.items.reduce(
    (acc: Array<Product & { quantity: number }>, item) => {
      const found = products.find((product) => product.id === item.id);
      if (found) {
        return [...acc, { ...found, quantity: item.quantity }];
      }
      return acc;
    },
    [],
  );

  return (
    <div>
      {productsInCart.length === 0 ? (
        <h1>Your cart is empty</h1>
      ) : (
        <ul>
          {productsInCart.map((item) => (
            <li key={item.id}>
              <>
                <button
                  className={styles.button}
                  onClick={() => removeFromCart(item.id, true)}
                >
                  x
                </button>
                {item!.name}
                <button
                  className={styles.button}
                  onClick={() => addToCart(item.id)}
                >
                  +
                </button>
                {item.quantity}
                <button
                  className={styles.button}
                  onClick={() => removeFromCart(item.id)}
                >
                  -
                </button>
              </>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
