import { useRef, useState } from 'react';
import { SuccessModal } from './SuccessModal';
import { CartItems } from './CartItems';
import { CSSTransition } from 'react-transition-group';
import { CartCheckout } from './CartCheckout';
import { Container } from '../Shared/Container';
import { Title } from '../Shared/Title';
import { BackLink } from '../Shared/BackLink';
import { useDisableScroll } from '../../hooks/useDisableScroll';

import styles from './Cart.module.scss';
import { useCart } from '../../context/CartContext';

export const Cart: React.FC = () => {
  const { cart, totalCartQuantity, dispatch } = useCart();
  const [isModalVisible, setModalVisibility] = useState(false);

  const nodeRef = useRef(null);

  const totalPrice = cart.reduce((acc: number, item) => {
    const price = item.price || item.fullPrice;
    return acc + price * (item.quantity || 0);
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
          {!cart.length ? (
            <h1>Your cart is empty</h1>
          ) : (
            <>
              <CartItems cart={cart} dispatch={dispatch} />

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
              dispatch={dispatch}
            />
          </CSSTransition>
        </div>
      </Container>
    </div>
  );
};
