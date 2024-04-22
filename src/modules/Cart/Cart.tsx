import { useEffect, useRef, useState } from 'react';
import { SuccessModal } from './SuccessModal';
import { CartItems } from './CartItems';
import { CSSTransition } from 'react-transition-group';
import { CartCheckout } from './CartCheckout';
import { Container } from '../Shared/Container';
import { Title } from '../Shared/Title';
import { BackLink } from '../Shared/BackLink';

import styles from './Cart.module.scss';
import { useCart } from '../../context/CartContext';
import { EmptyCart } from './EmptyCart';
import { getScrollbarWidth } from '../../helpers/getScrollbarWidth';

export const Cart: React.FC = () => {
  const { cart, totalCartQuantity, dispatch } = useCart();
  const [isModalVisible, setModalVisibility] = useState(false);

  const nodeRef = useRef(null);

  const totalPrice = cart.reduce((acc: number, item) => {
    const price = item.price || item.fullPrice;
    return acc + price * (item.quantity || 0);
  }, 0);

  useEffect(() => {
    const body = document.body;
    const scrollbarWidth = getScrollbarWidth();
    body.classList.add(styles.bodyOverlay);
    if (isModalVisible) {
      body.classList.add('lock');
      document.body.style.paddingRight = scrollbarWidth + 'px';
      body.classList.add(styles.bodyOverlayActive);
    } else {
      body.classList.remove(styles.bodyOverlayActive);
      body.classList.remove('lock');
      document.body.style.paddingRight = '0px';
    }

    return () => {
      document.body.classList.remove(styles.bodyOverlay);
    };
  }, [isModalVisible]);

  return (
    <div className="section">
      <Container>
        <BackLink path="/" />
        <Title className={styles.title} titleTag="h1">
          Cart
        </Title>
        <div className={styles.cartWrapper}>
          {!cart.length ? (
            <EmptyCart />
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
