import { useState } from 'react';
import { useMainContext } from '../../hooks/useMainContext';
import products from '../../../public/api/products.json';
import styles from './Cart.module.scss';
import { Product } from '../../types/Product';
import { SuccessModal } from './SuccessModal';
import { Button } from '../Shared/Button';
import { CartItem } from './CartItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export const Cart: React.FC = () => {
  const { cart, totalCartQuantity, addToCart, removeFromCart } =
    useMainContext();
  const [isModalVisible, setModalVisibility] = useState(false);

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

  const totalPrice = productsInCart.reduce((acc: number, item) => {
    const price = item.price || item.fullPrice;
    return acc + price * item.quantity;
  }, 0);

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
      <h2>Total price: {totalPrice}</h2>
      <h3>Total items: {totalCartQuantity}</h3>
      <Button onClick={() => setModalVisibility(!isModalVisible)}>
        Checkout
      </Button>

      {isModalVisible && (
        <SuccessModal setModalVisibility={setModalVisibility} />
      )}
      <TransitionGroup>
        {productsInCart.map((product) => (
          <CSSTransition
            key={product.id}
            timeout={300}
            classNames={{
              enter: styles.cartItemEnter,
              enterActive: styles.cartItemEnterActive,
              exit: styles.cartItemExit,
              exitActive: styles.cartItemExitActive,
            }}
          >
            <CartItem
              product={product}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};
