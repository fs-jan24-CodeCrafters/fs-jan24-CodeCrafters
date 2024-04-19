import { useRef, useState } from 'react';
import { useMainContext } from '../../hooks/useMainContext';
import products from '../../../public/api/products.json';
import { Product } from '../../types/Product';
import { SuccessModal } from './SuccessModal';
import { CartItem } from './CartItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { CartCheckout } from './CartCheckout';
import { Container } from '../Shared/Container';
import { Title } from '../Shared/Title';

import styles from './Cart.module.scss';
import { BackLink } from '../Shared/BackLink';
import { useDisableScroll } from '../../hooks/useDisableScroll';

export const Cart: React.FC = () => {
  const { cart, totalCartQuantity, addToCart, removeFromCart } =
    useMainContext();
  const [isModalVisible, setModalVisibility] = useState(false);

  const nodeRef = useRef(null);

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

  useDisableScroll(isModalVisible);

  return (
    <div className="section">
      <Container>
        <BackLink path="/" />
        <Title className={styles.title} titleTag="h1">
          Cart
        </Title>
        <div className={styles.cartWrapper}>
          {productsInCart.length === 0 ? (
            <h1>Your cart is empty</h1>
          ) : (
            <>
              <ul className={styles.itemsList}>
                <TransitionGroup>
                  {productsInCart.map((product) => (
                    <CSSTransition
                      key={product.id}
                      timeout={300}
                      classNames={{
                        exit: styles.cartItemExit,
                        exitActive: styles.cartItemExitActive,
                      }}
                    >
                      <CartItem
                        key={product.id}
                        product={product}
                        addToCart={addToCart}
                        removeFromCart={removeFromCart}
                      />
                    </CSSTransition>
                  ))}
                </TransitionGroup>
              </ul>
              <CartCheckout
                totalPrice={totalPrice}
                totalCartQuantity={totalCartQuantity}
                isModalVisible={isModalVisible}
                setModalVisibility={setModalVisibility}
              />
            </>
          )}

          <CSSTransition
            in={isModalVisible}
            nodeRef={nodeRef}
            timeout={300}
            classNames={{
              enter: styles.modalEnter,
              enterActive: styles.modalEnterActive,
              exit: styles.modalExit,
              exitActive: styles.modalExitActive,
            }}
            unmountOnExit
          >
            <SuccessModal
              nodeRef={nodeRef}
              setModalVisibility={setModalVisibility}
            />
          </CSSTransition>
        </div>
      </Container>
    </div>
  );
};
