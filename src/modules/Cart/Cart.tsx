import { useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useTranslation } from 'react-i18next';

import { useCart } from '../../context/CartContext';
import { Container } from '../Shared/Container';
import { Title } from '../Shared/Title';
import { BackLink } from '../Shared/BackLink';
import { SuccessModal } from './SuccessModal';
import { CartItems } from './CartItems';
import { CartCheckout } from './CartCheckout';
import { EmptyCart } from './EmptyCart';

import styles from './Cart.module.scss';

export const Cart: React.FC = () => {
  const { t } = useTranslation();
  const { cart, totalCartQuantity, dispatch } = useCart();
  const [isModalVisible, setModalVisibility] = useState(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);

  const nodeRef = useRef(null);

  const totalPrice = cart.reduce((acc: number, item) => {
    const price = item.price || item.fullPrice;
    return acc + price * (item.quantity || 0);
  }, 0);

  const handlePaymentConfirmation = () => {
    setIsPaymentSuccess(true);
  };

  useEffect(() => {
    const body = document.body;
    body.classList.add(styles.bodyOverlay);
    if (
      isModalVisible &&
      document.documentElement.scrollHeight > window.innerHeight
    ) {
      body.classList.add('lock');
      body.classList.add(styles.bodyOverlayActive);
    } else if (isModalVisible) {
      body.classList.add(styles.bodyOverlayActive);
    } else {
      body.classList.remove(styles.bodyOverlayActive);
      body.classList.remove('lock');
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
          {t(`common:cart.cart`)}
        </Title>
        <div className={styles.cartWrapper}>
          {!cart.length ? (
            <EmptyCart isPaymentSuccess={isPaymentSuccess} />
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
              onConfirm={handlePaymentConfirmation}
              dispatch={dispatch}
            />
          </CSSTransition>
        </div>
      </Container>
    </div>
  );
};
